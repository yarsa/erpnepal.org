import { readFile, readdir, stat, access } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
import { features } from '../content/features.mjs';
import { addons } from '../content/addons.mjs';

const root = resolve('dist');
const base = process.env.SITE_URL ? new URL(process.env.SITE_URL.replace(/\/$/, '') + '/') : new URL('https://local.invalid/');
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt);/g, entity => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' })[entity]).replace(/&#(x[0-9a-f]+|\d+);/gi, (_, value) => String.fromCodePoint(value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value)));
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, name, double, single]) => [name.toLowerCase(), decode(double ?? single)]));
async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else if (entry.name.endsWith('.html')) result.push(path);
  }
  return result;
}
const documents = new Map();
for (const file of await walk(root)) {
  const html = await readFile(file, 'utf8');
  const ids = [...html.matchAll(/\bid\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(match => decode(match[1] ?? match[2]));
  assert.equal(new Set(ids).size, ids.length, `Duplicate element IDs: ${file}`);
  assert.equal((html.match(/<h1(?:\s|>)/gi) || []).length, 1, `Expected one main heading: ${file}`);
  assert.equal(attrs(html.match(/<html\b[^>]*>/i)?.[0] || '').lang, 'en', `Missing document language: ${file}`);
  documents.set(file, { html, ids });
}
const titles = new Set();
const descriptions = new Set();
const canonicalUrls = [];
const contentPaths = [];
for (const [file, { html }] of documents) {
  const relativeFile = relative(root, file).split(sep).join('/');
  const is404 = relativeFile === '404.html';
  const path = relativeFile.replace(/index\.html$/, '');
  const pageUrl = new URL(path, base);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();
  assert(title, `Missing title: ${file}`);
  assert(!titles.has(title), `Duplicate title: ${title}`);
  titles.add(title);
  const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => attrs(match[0]));
  if (!is404) {
    contentPaths.push(path);
    const description = meta.find(tag => tag.name === 'description')?.content?.trim();
    assert(description, `Missing description: ${file}`);
    assert(!descriptions.has(description), `Duplicate description: ${file}`);
    descriptions.add(description);
    const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => attrs(match[1]).type === 'application/ld+json');
    assert(scripts.length, `Missing structured data: ${file}`);
    const schemas = scripts.flatMap(match => { const value = JSON.parse(match[2]); return Array.isArray(value) ? value : [value]; });
    for (const schema of schemas) {
      assert.equal(schema['@context'], 'https://schema.org', `Invalid schema context: ${file}`);
      assert(schema['@type'], `Missing schema type: ${file}`);
    }
    const expectedTypes = path ? ['WebPage', 'BreadcrumbList'] : ['WebSite', 'SoftwareSourceCode'];
    for (const type of expectedTypes) assert(schemas.some(schema => schema['@type'] === type), `Missing ${type} schema: ${file}`);
    const breadcrumbs = schemas.find(schema => schema['@type'] === 'BreadcrumbList');
    if (breadcrumbs) {
      const isHrmsPage = path === 'nepal-hrms/';
      assert.equal(breadcrumbs.itemListElement.length, isHrmsPage ? 2 : 3, `Invalid breadcrumbs: ${file}`);
      breadcrumbs.itemListElement.forEach((item, index) => {
        assert.equal(item.position, index + 1, `Invalid breadcrumb position: ${file}`);
        assert(item.name && item.item, `Incomplete breadcrumb: ${file}`);
      });
      if (isHrmsPage) {
        assert.equal(breadcrumbs.itemListElement[1].name, 'Nepal HRMS', `Incorrect HRMS breadcrumb: ${file}`);
      } else {
        const section = path.startsWith('addons/') ? 'addons' : 'features';
        assert.equal(breadcrumbs.itemListElement[1].name, section === 'addons' ? 'Add-ons' : 'Features', `Incorrect breadcrumb section: ${file}`);
        assert.equal(breadcrumbs.itemListElement[1].item, process.env.SITE_URL ? new URL(`#${section}`, base).href : `/#${section}`, `Incorrect breadcrumb section URL: ${file}`);
      }
      assert.equal(breadcrumbs.itemListElement.at(-1).item, process.env.SITE_URL ? pageUrl.href : `/${path}`, `Incorrect breadcrumb page URL: ${file}`);
    }
    const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => attrs(match[0])).filter(tag => tag.rel === 'canonical');
    if (process.env.SITE_URL) {
      assert.equal(canonicals.length, 1, `Expected one canonical URL: ${file}`);
      assert.equal(canonicals[0].href, pageUrl.href, `Incorrect canonical URL: ${file}`);
      assert.equal(meta.find(tag => tag.property === 'og:url')?.content, pageUrl.href, `Incorrect social URL: ${file}`);
      canonicalUrls.push(pageUrl.href);
    } else assert.equal(canonicals.length, 0, `Local builds should not invent canonical URLs: ${file}`);
  }
  // Resolve relative links as a browser would, including ../ assets and cross-page fragments.
  for (const match of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/gi)) {
    const attributes = attrs(match[0]);
    const link = attributes.href ?? attributes.src;
    if (link === undefined) continue;
    assert(link && link !== '#' && !/^\s*(?:javascript|vbscript):/i.test(link), `Placeholder or unsafe link: ${file}`);
    if (/^(?:mailto|tel|data):/i.test(link)) continue;
    const target = new URL(link, pageUrl);
    if (target.origin !== base.origin) continue;
    assert(target.pathname.startsWith(base.pathname), `Link leaves deployment path: ${link} in ${file}`);
    const targetPath = decodeURIComponent(target.pathname.slice(base.pathname.length));
    let targetFile = resolve(root, targetPath);
    assert(targetFile === root || targetFile.startsWith(root + sep), `Link escapes website: ${link}`);
    if ((await stat(targetFile)).isDirectory()) targetFile = resolve(targetFile, 'index.html');
    await access(targetFile);
    if (target.hash) {
      const targetDocument = documents.get(targetFile);
      assert(targetDocument, `Fragment target is not HTML: ${link}`);
      assert(targetDocument.ids.includes(decodeURIComponent(target.hash.slice(1))), `Broken anchor: ${link} in ${file}`);
    }
  }
}
for (const feature of features) assert(documents.has(resolve(root, `features/${feature.slug}/index.html`)), `Missing feature page: ${feature.slug}`);
for (const addon of addons) assert(documents.has(resolve(root, `addons/${addon.slug}/index.html`)), `Missing add-on page: ${addon.slug}`);
assert(documents.has(resolve(root, 'nepal-hrms/index.html')), 'Missing Nepal HRMS page');
assert.equal(documents.size, features.length + addons.length + 3, 'Unexpected number of HTML pages');
assert(!documents.get(resolve(root, 'index.html')).html.includes('<!-- ADDON_DIRECTORY -->'), 'Add-on directory was not rendered');
const notFound = documents.get(resolve(root, '404.html'))?.html;
const homeTag = [...notFound.matchAll(/<a\b[^>]*>/gi)].map(match => attrs(match[0])).find(tag => tag.id === 'home');
assert.equal(homeTag?.href, base.pathname, '404 homepage link must match deployment path');
assert(!/<script\b/i.test(notFound), '404 navigation must work without JavaScript');
const llms = await readFile(resolve(root, 'llms.txt'), 'utf8');
for (const feature of features) assert(llms.includes(`features/${feature.slug}/`), `Missing discovery link: ${feature.slug}`);
for (const addon of addons) assert(llms.includes(`addons/${addon.slug}/`), `Missing add-on discovery link: ${addon.slug}`);
assert(llms.includes('nepal-hrms/') && llms.includes('Nepal HRMS (Beta)'), 'Missing beta HRMS discovery entry');
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
const expectedSitemapUrls = process.env.SITE_URL ? canonicalUrls : contentPaths.map(path => new URL(path, 'https://erpnepal.org/').href);
assert.deepEqual(locations.sort(), expectedSitemapUrls.sort(), 'Sitemap must contain every content page exactly once');
if (process.env.SITE_URL) {
  const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
  assert(robots.includes(`Sitemap: ${new URL('sitemap.xml', base).href}`), 'Incorrect sitemap address in robots.txt');
}
console.log(`Passed: ${documents.size} HTML pages, local links and cross-page anchors, assets, unique metadata, structured data, discovery index, sitemap, and 404 navigation${process.env.SITE_URL ? ', canonical URLs' : ''}.`);
