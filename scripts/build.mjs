import { mkdir, copyFile, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { features } from '../content/features.mjs';
import { renderFeaturePage } from './feature-pages.mjs';
import { addons } from '../content/addons.mjs';
import { renderAddonPage, renderAddonDirectory } from './addon-pages.mjs';

const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
if (siteUrl && (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash)) {
  throw new Error('SITE_URL must be an HTTPS website URL without credentials, query parameters, or a fragment');
}
const base = siteUrl ? siteUrl.href.replace(/\/$/, '') + '/' : null;
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonScript = value => JSON.stringify(value).replace(/</g, '\\u003c');
for (const collection of [features, addons]) {
  const slugs = new Set();
  for (const entry of collection) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || slugs.has(entry.slug)) throw new Error(`Invalid or duplicate page slug: ${entry.slug}`);
    if (!entry.title?.trim() || !entry.description?.trim()) throw new Error(`Missing metadata: ${entry.slug}`);
    slugs.add(entry.slug);
  }
}
const address = path => base ? new URL(path, base).href : `/${path}`;
const schemaContext = 'https://schema.org';
const homepage = await readFile('index.html', 'utf8');
if (homepage.split('<!-- ADDON_DIRECTORY -->').length !== 2) throw new Error('Expected one add-on directory marker in homepage');
const pages = [{ path: '', html: homepage.replace('<!-- ADDON_DIRECTORY -->', () => renderAddonDirectory(addons)), schema: [
  { '@context': schemaContext, '@type': 'WebSite', name: 'Nepal Compliance', url: address('') },
  { '@context': schemaContext, '@type': 'SoftwareSourceCode', name: 'Nepal Compliance', codeRepository: 'https://github.com/yarsa/nepal-compliance', license: 'https://www.gnu.org/licenses/gpl-3.0.html', description: 'An open-source app extending ERPNext and Frappe HR with Nepal-specific date, accounting, HR, and payroll workflows.' },
] }];
pages.push({ path: 'nepal-hrms/', html: await readFile('nepal-hrms.html', 'utf8'), schema: [
  { '@context': schemaContext, '@type': 'WebPage', name: 'Nepal HRMS — HR and Payroll for Nepal (Beta)', description: 'An overview of Nepal HRMS: upcoming HR and payroll capabilities for Nepal Compliance, currently tested in a separate beta app before planned incorporation.', url: address('nepal-hrms/'), isPartOf: { '@type': 'WebSite', name: 'Nepal Compliance', url: address('') } },
  { '@context': schemaContext, '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: address('') },
    { '@type': 'ListItem', position: 2, name: 'Nepal HRMS', item: address('nepal-hrms/') },
  ] },
] });
for (const feature of features) {
  const path = `features/${feature.slug}/`;
  pages.push({ path, html: renderFeaturePage(feature, features), schema: [
    { '@context': schemaContext, '@type': 'WebPage', name: feature.title, description: feature.description, url: address(path), isPartOf: { '@type': 'WebSite', name: 'Nepal Compliance', url: address('') } },
    { '@context': schemaContext, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: address('') },
      { '@type': 'ListItem', position: 2, name: 'Features', item: address('#features') },
      { '@type': 'ListItem', position: 3, name: feature.title, item: address(path) },
    ] },
  ] });
}
for (const addon of addons) {
  const path = `addons/${addon.slug}/`;
  pages.push({ path, html: renderAddonPage(addon, addons), schema: [
    { '@context': schemaContext, '@type': 'WebPage', name: addon.title, description: addon.description, url: address(path), isPartOf: { '@type': 'WebSite', name: 'Nepal Compliance', url: address('') } },
    { '@context': schemaContext, '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: address('') },
      { '@type': 'ListItem', position: 2, name: 'Add-ons', item: address('#addons') },
      { '@type': 'ListItem', position: 3, name: addon.title, item: address(path) },
    ] },
  ] });
}

// Copy only public website assets, never the repository or reference documents.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['styles.css', 'app.js', '404.html']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
await writeFile('dist/.nojekyll', '');
for (const page of pages) {
  if (!page.html.includes('</head>')) throw new Error(`Missing HTML head: ${page.path}`);
  const canonical = base ? `  <link rel="canonical" href="${escapeAttribute(address(page.path))}">\n  <meta property="og:url" content="${escapeAttribute(address(page.path))}">\n` : '';
  const html = page.html.replace('</head>', () => `${canonical}  <script type="application/ld+json">${jsonScript(page.schema)}</script>\n</head>`);
  await mkdir(`dist/${page.path}`, { recursive: true });
  await writeFile(`dist/${page.path}index.html`, html);
}
// An absolute path also works when GitHub serves this page for a nested missing URL.
const homePath = siteUrl ? siteUrl.pathname.replace(/\/$/, '') + '/' : '/';
const notFound = await readFile('dist/404.html', 'utf8');
await writeFile('dist/404.html', notFound.replace('href="/"', () => `href="${escapeAttribute(homePath)}"`));
// Keep a reviewable sitemap in local previews; only this file uses the fallback domain.
const sitemapBase = base || 'https://erpnepal.org/';
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${escapeAttribute(new URL(page.path, sitemapBase).href)}</loc></url>`).join('')}</urlset>\n`);
if (base) {
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
}
const markdown = value => value.replace(/[\r\n]+/g, ' ').replace(/([\\[\]])/g, '\\$1');
await writeFile('dist/llms.txt', `# Nepal Compliance\n\n> An open-source app for Nepal-specific workflows in ERPNext and Frappe HR.\n\nThis file is an optional plain-text index of this website. Feature pages describe the upstream project; they do not establish regulatory certification or guarantee compliance.\n\n## Website\n\n- [Overview](${base || './'})\n${features.map(feature => `- [${markdown(feature.title)}](${base || './'}features/${feature.slug}/): ${markdown(feature.description)}`).join('\n')}\n\n## Nepal HRMS (Beta)\n\n- [Nepal HRMS — HR and Payroll for Nepal (Beta)](${base || './'}nepal-hrms/): Upcoming HR and payroll capabilities for Nepal Compliance, currently tested in a separate beta app before planned incorporation. Review the page for scope and evaluation guidance.\n\n## Add-ons\n\nThese pages describe related applications and integration considerations. Listing an application does not establish that it is bundled with Nepal Compliance or that a specific integration is available or tested. Review each page and its project references for scope and requirements.\n\n${addons.map(addon => `- [${markdown(addon.title)}](${base || './'}addons/${addon.slug}/): ${markdown(addon.description)}`).join('\n')}\n\n## Project\n\n- [Source code](https://github.com/yarsa/nepal-compliance)\n- [Installation guide](https://github.com/yarsa/nepal-compliance/blob/master/docs/manual-install.md)\n`);
console.log(`Static website built in dist/ (${pages.length} content pages).`);
