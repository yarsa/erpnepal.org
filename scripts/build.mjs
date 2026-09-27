import { mkdir, copyFile, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { features } from '../content/features.mjs';
import { renderFeaturePage } from './feature-pages.mjs';

const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
if (siteUrl && (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash)) {
  throw new Error('SITE_URL must be an HTTPS website URL without credentials, query parameters, or a fragment');
}
const base = siteUrl ? siteUrl.href.replace(/\/$/, '') + '/' : null;
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonScript = value => JSON.stringify(value).replace(/</g, '\\u003c');
const slugs = new Set();
for (const feature of features) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(feature.slug) || slugs.has(feature.slug)) throw new Error(`Invalid or duplicate feature slug: ${feature.slug}`);
  if (!feature.title?.trim() || !feature.description?.trim()) throw new Error(`Missing metadata: ${feature.slug}`);
  slugs.add(feature.slug);
}
const address = path => base ? new URL(path, base).href : `/${path}`;
const schemaContext = 'https://schema.org';
const pages = [{ path: '', html: await readFile('index.html', 'utf8'), schema: [
  { '@context': schemaContext, '@type': 'WebSite', name: 'Nepal Compliance', url: address('') },
  { '@context': schemaContext, '@type': 'SoftwareSourceCode', name: 'Nepal Compliance', codeRepository: 'https://github.com/yarsa/nepal-compliance', license: 'https://www.gnu.org/licenses/gpl-3.0.html', description: 'An open-source app extending ERPNext and Frappe HR with Nepal-specific date, accounting, HR, and payroll workflows.' },
] }];
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
if (base) {
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${escapeAttribute(address(page.path))}</loc></url>`).join('')}</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
}
const markdown = value => value.replace(/[\r\n]+/g, ' ').replace(/([\\[\]])/g, '\\$1');
await writeFile('dist/llms.txt', `# Nepal Compliance\n\n> An open-source app for Nepal-specific workflows in ERPNext and Frappe HR.\n\nThis file is an optional plain-text index of this website. Feature pages describe the upstream project; they do not establish regulatory certification or guarantee compliance.\n\n## Website\n\n- [Overview](${base || './'})\n${features.map(feature => `- [${markdown(feature.title)}](${base || './'}features/${feature.slug}/): ${markdown(feature.description)}`).join('\n')}\n\n## Project\n\n- [Source code](https://github.com/yarsa/nepal-compliance)\n- [Installation guide](https://github.com/yarsa/nepal-compliance/blob/master/docs/manual-install.md)\n`);
console.log(`Static website built in dist/ (${pages.length} content pages).`);
