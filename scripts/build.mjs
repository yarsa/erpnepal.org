import { mkdir, copyFile, cp, readFile, writeFile, rm } from 'node:fs/promises';

// Copy only public website assets, never the repository or reference documents.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', '404.html']) {
  await copyFile(file, `dist/${file}`);
}
await cp('assets', 'dist/assets', { recursive: true });
await writeFile('dist/.nojekyll', '');
if (process.env.SITE_URL) {
  const url = new URL(process.env.SITE_URL);
  if (url.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS');
  const base = url.href.replace(/\/$/, '') + '/';
  const safe = base.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('</head>', `  <link rel="canonical" href="${safe}">\n  <meta property="og:url" content="${safe}">\n</head>`);
  await writeFile('dist/index.html', html);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${safe}</loc></url></urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
} else {
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
}
console.log('Static website built in dist/.');
