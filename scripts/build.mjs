import { mkdir, copyFile, cp, readFile, writeFile, rm } from 'node:fs/promises';

const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : null;
if (siteUrl && (siteUrl.protocol !== 'https:' || siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash)) {
  throw new Error('SITE_URL must be an HTTPS website URL without credentials, query parameters, or a fragment');
}
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Copy only public website assets, never the repository or reference documents.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', '404.html']) {
  await copyFile(file, `dist/${file}`);
}
await cp('assets', 'dist/assets', { recursive: true });
await writeFile('dist/.nojekyll', '');
// An absolute path also works when GitHub serves this page for a nested missing URL.
const homePath = siteUrl ? siteUrl.pathname.replace(/\/$/, '') + '/' : '/';
const notFound = await readFile('dist/404.html', 'utf8');
await writeFile('dist/404.html', notFound.replace('href="/"', `href="${escapeAttribute(homePath)}"`));
if (siteUrl) {
  const base = siteUrl.href.replace(/\/$/, '') + '/';
  const safe = escapeAttribute(base);
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('</head>', `  <link rel="canonical" href="${safe}">\n  <meta property="og:url" content="${safe}">\n</head>`);
  await writeFile('dist/index.html', html);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${safe}</loc></url></urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
}
console.log('Static website built in dist/.');
