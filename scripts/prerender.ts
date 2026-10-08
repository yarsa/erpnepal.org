// Renders every page to static HTML after `vite build`, so content works without
// JavaScript and search engines see it. React then hydrates on the client.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import type * as Server from '../src/entry-server'
import type { PageRef } from '../src/pages/registry'
import type { Route } from '../src/routes'
import { loadStats } from './stats'

// SITE_URL is set by the Pages workflow; locally the custom domain is assumed.
const site = new URL(process.env.SITE_URL || 'https://erpnepal.org/')
if (site.protocol !== 'https:' || site.search || site.hash || site.username) {
  throw new Error('SITE_URL must be an HTTPS URL without query, hash or credentials')
}
const siteUrl = site.href.replace(/\/?$/, '/')
const abs = (path: string) => new URL(path, siteUrl).href

const dist = new URL('../dist/', import.meta.url)
const ssr = new URL('../dist-ssr/entry-server.js', import.meta.url)
const server: typeof Server = await import(ssr.href)
const { render, routes, notFound, redirects, sections, features, addons, guides, guideDate } = server

const template = await readFile(new URL('index.html', dist), 'utf8')
// Without these markers every page would ship as an empty shell.
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}; the pre-render cannot inject the page`)
}
const manifest: Record<string, { file: string; imports?: string[] }> = JSON.parse(
  await readFile(new URL('.vite/manifest.json', dist), 'utf8'),
)
const stats = await loadStats()

// The client loads the page's own chunk and locale copy before hydrating;
// preload them so they download alongside the main bundle, not after it.
function chunkFiles(key: string, seen = new Set<string>()): string[] {
  const chunk = manifest[key]
  if (!chunk || seen.has(key)) return []
  seen.add(key)
  return [chunk.file, ...(chunk.imports ?? []).flatMap((k) => chunkFiles(k, seen))]
}
const mainFiles = new Set(chunkFiles('index.html'))
const pageModule: Record<Route['kind'], string> = {
  home: 'HomePage',
  features: 'FeaturesPage',
  feature: 'FeaturePage',
  addons: 'AddonsPage',
  addon: 'AddonPage',
  guides: 'GuidesPage',
  guide: 'GuidePage',
  workflows: 'WorkflowsPage',
  'nepal-hrms': 'NepalHrmsPage',
  'not-found': 'NotFoundPage',
}
const preload = (route: Route) =>
  [...new Set([...chunkFiles(`src/content/${route.locale}.ts`), ...chunkFiles(`src/pages/${pageModule[route.kind]}.tsx`)])]
    .filter((f) => !mainFiles.has(f))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')

function structuredData(route: Route, url: string, title: string): object[] {
  if (route.noindex) return []
  if (route.kind === 'home') {
    return [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Nepal Compliance', url },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'Nepal Compliance',
        codeRepository: 'https://github.com/yarsa/nepal-compliance',
        license: 'https://www.gnu.org/licenses/gpl-3.0.html',
        description: route.description,
      },
    ]
  }
  const [section, slug] = route.path.split('/')
  const crumbs = [
    { name: 'Home', item: abs('') },
    { name: sections[section] ?? title, item: abs(`${section}/`) },
  ]
  if (slug) crumbs.push({ name: route.title, item: url })
  const data: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, ...c })),
    },
  ]
  if (route.kind === 'guide') {
    const guide = guides.find((g) => g.slug === route.slug)
    if (guide)
      data.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: url,
        datePublished: guideDate,
        dateModified: guideDate,
        inLanguage: 'en',
        author: { '@type': 'Organization', name: 'ERP Nepal', url: abs('guides/#editorial') },
        citation: guide.sources.map((s) => s.url),
      })
  }
  return data
}

async function writePage(route: Route) {
  const url = abs(route.path === '404.html' ? '' : route.path)
  const title = route.suffix ? `${route.title}${route.suffix}` : route.title
  const ref: PageRef = { kind: route.kind, slug: route.slug, locale: route.locale, path: route.path }
  const head = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    route.kind === 'not-found' ? '' : `<link rel="canonical" href="${url}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : '',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Nepal Compliance" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    '<meta name="twitter:card" content="summary" />',
    ...structuredData(route, url, route.title).map((d) => `<script type="application/ld+json">${json(d)}</script>`),
    `<script>window.__STATS__=${json(stats)};window.__PAGE__=${json(ref)}</script>`,
    ...preload(route),
  ]
    .filter(Boolean)
    .join('\n    ')

  const html = template
    .replace('<html lang="en">', `<html lang="${route.locale}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', render(route, stats))

  if (route.kind === 'not-found') {
    await writeFile(new URL('404.html', dist), html)
    return
  }
  const dir = new URL(route.path, dist)
  await mkdir(dir, { recursive: true })
  await writeFile(new URL('index.html', dir), html)
}

for (const route of routes) await writePage(route)
await writePage(notFound)
for (const [from, to] of Object.entries(redirects)) {
  const target = abs(to)
  await mkdir(new URL(from, dist), { recursive: true })
  await writeFile(
    new URL(`${from}index.html`, dist),
    `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Moved to ${target}</title>\n<link rel="canonical" href="${target}">\n<meta name="robots" content="noindex">\n<meta http-equiv="refresh" content="0; url=/${to}">\n</head>\n<body><p>This page has moved to <a href="/${to}">/${to}</a>.</p></body>\n</html>\n`,
  )
}

// Indexed pages only: the 404 page stays out.
const indexed = routes.filter((r) => !r.noindex)
await writeFile(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexed
    .map((r) => `  <url><loc>${abs(r.path)}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
await writeFile(new URL('robots.txt', dist), `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`)

// Plain-text index for AI tools, carried over from the previous site.
const md = (s: string) => s.replace(/[[\]]/g, '\\$&')
const list = (items: readonly { title: string; description: string; slug: string }[], dir: string) =>
  items.map((i) => `- [${md(i.title)}](${abs(`${dir}/${i.slug}/`)}): ${md(i.description)}`).join('\n')
await writeFile(
  new URL('llms.txt', dist),
  [
    '# Nepal Compliance',
    '',
    '> An open-source app for Nepal-specific workflows in ERPNext and Frappe HR.',
    '',
    'This file is an optional plain-text index of this website. Feature pages describe the upstream project.',
    '',
    '## Website',
    '',
    `- [Overview](${abs('')})`,
    list(features, 'features'),
    '',
    '## Nepal HRMS (Beta)',
    '',
    `- [Nepal HRMS — HR and Payroll for Nepal (Beta)](${abs('nepal-hrms/')}): Upcoming HR and payroll capabilities for Nepal Compliance, currently tested in a separate beta app before planned incorporation.`,
    '',
    '## Add-ons',
    '',
    'These pages describe related applications and how they connect to ERPNext.',
    '',
    list(addons, 'addons'),
    '',
    '## Practical guides',
    '',
    `- [All guides](${abs('guides/')}): Source-linked operational guides. Published ${guideDate}.`,
    list(guides, 'guides'),
    '',
    '## Project',
    '',
    '- [Source code](https://github.com/yarsa/nepal-compliance)',
    '- [Installation guide](https://github.com/yarsa/nepal-compliance/blob/master/docs/manual-install.md)',
    '',
  ].join('\n'),
)

await rm(new URL('../dist-ssr/', import.meta.url), { recursive: true, force: true })
await rm(new URL('.vite/', dist), { recursive: true, force: true })
console.log(`Pre-rendered ${routes.length} pages and 404.html.`)
