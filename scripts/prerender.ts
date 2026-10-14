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
const { render, routes, notFound, redirects, sections, features, addons, guides, guideDate, en, ne } = server

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
const built = new Date().toISOString().slice(0, 10)
const repo = 'https://github.com/yarsa/nepal-compliance'
const ogImage = abs('assets/og.png')

type QA = { question: string; answer: string }
const faqPage = (items: readonly QA[], url: string) =>
  items.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        url,
        mainEntity: items.map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
      }
    : null

const publisher = { '@type': 'Organization', name: 'Nepal Compliance', url: abs(''), logo: abs('assets/favicon.png'), sameAs: [repo] }

function structuredData(route: Route, url: string, title: string): object[] {
  if (route.noindex) return []
  if (route.kind === 'home') {
    const copy = (route.locale === 'ne' ? ne : en).t
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nepal Compliance',
        alternateName: 'ERP Nepal',
        url,
        inLanguage: route.locale,
        publisher,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Nepal Compliance',
        alternateName: 'ERP Nepal',
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'ERP software',
        operatingSystem: 'Linux, Docker',
        softwareRequirements: 'Frappe Framework, ERPNext, Frappe HR',
        isAccessibleForFree: true,
        license: 'https://www.gnu.org/licenses/gpl-3.0.html',
        downloadUrl: repo,
        areaServed: { '@type': 'Country', name: 'Nepal' },
        inLanguage: route.locale,
        image: ogImage,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NPR' },
        featureList: copy.compliance.rows.filter((r) => r.status === 'supported').map((r) => r.rule),
        publisher,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'Nepal Compliance',
        codeRepository: repo,
        programmingLanguage: ['Python', 'JavaScript'],
        runtimePlatform: 'Frappe Framework',
        license: 'https://www.gnu.org/licenses/gpl-3.0.html',
        description: route.description,
      },
      faqPage(
        copy.faq.items.map((i) => ({ question: i.q, answer: i.a })),
        url,
      ),
    ].filter(Boolean) as object[]
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
  const entry =
    route.kind === 'feature'
      ? features.find((f) => f.slug === route.slug)
      : route.kind === 'addon'
        ? addons.find((a) => a.slug === route.slug)
        : route.kind === 'guide'
          ? guides.find((g) => g.slug === route.slug)
          : undefined
  const faq = entry ? faqPage(entry.questions, url) : null
  if (faq) data.push(faq)
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
        publisher,
        image: ogImage,
        about: guide.category,
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
    route.noindex
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    ...(route.kind === 'home'
      ? [
          `<link rel="alternate" hreflang="en" href="${abs('')}" />`,
          `<link rel="alternate" hreflang="ne" href="${abs('ne/')}" />`,
          `<link rel="alternate" hreflang="x-default" href="${abs('')}" />`,
        ]
      : []),
    `<meta property="og:type" content="${route.kind === 'guide' ? 'article' : 'website'}" />`,
    '<meta property="og:site_name" content="Nepal Compliance" />',
    `<meta property="og:locale" content="${route.locale === 'ne' ? 'ne_NP' : 'en_US'}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Nepal Compliance: free and open source ERP software for Nepal" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
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
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${indexed
    .map((r) => {
      const lastmod = r.kind === 'guide' ? guideDate : built
      const alternates =
        r.kind === 'home'
          ? `<xhtml:link rel="alternate" hreflang="en" href="${abs('')}"/><xhtml:link rel="alternate" hreflang="ne" href="${abs('ne/')}"/><xhtml:link rel="alternate" hreflang="x-default" href="${abs('')}"/>`
          : ''
      return `  <url><loc>${abs(r.path)}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`
    })
    .join('\n')}\n</urlset>\n`,
)
// AI crawlers are welcome: the site exists to be found and quoted.
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]
await writeFile(
  new URL('robots.txt', dist),
  `User-agent: *\nAllow: /\n\n${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}\n\nSitemap: ${abs('sitemap.xml')}\n`,
)

// Plain-text files for AI assistants and LLM search: a short index (llms.txt)
// and the full text of every feature, add-on and guide (llms-full.txt).
const md = (s: string) => s.replace(/[[\]]/g, '\\$&')
const list = (items: readonly { title: string; description: string; slug: string }[], dir: string) =>
  items.map((i) => `- [${md(i.title)}](${abs(`${dir}/${i.slug}/`)}): ${md(i.description)}`).join('\n')
const home = en.t
const groups = home.compliance.groups as Record<string, string>
const coverage = Object.entries(groups).map(([key, label]) => {
  const rows = home.compliance.rows.filter((r) => r.group === key)
  return `- ${label}: ${rows.map((r) => (r.status === 'supported' ? r.rule : `${r.rule} (${home.compliance.status[r.status as 'beta' | 'progress']})`)).join('; ')}`
})
const summary = [
  '# Nepal Compliance',
  '',
  `> ${routes[0].description}`,
  '',
  'Nepal Compliance (also called ERP Nepal) is a free, open-source app by Yarsa that makes ERPNext and Frappe HR fit Nepali law and business practice. It is licensed GPL-3.0, has no licence fee, and runs on your own server or with Docker.',
  '',
  '## Key facts',
  '',
  '- Cost: free, no licence fee. Hosting, setup and support are optional paid services from any provider.',
  '- Licence: GPL-3.0.',
  '- Requires: Frappe Framework with ERPNext and Frappe HR.',
  '- Install: bench get-app https://github.com/yarsa/nepal-compliance.git, or the Docker image yarsalabs/nepal-compliance.',
  '- Languages: English, with a Nepali homepage.',
  `- Coverage: ${home.compliance.rows.filter((r) => r.status === 'supported').length} of ${home.compliance.rows.length} roadmap items supported.`,
  '',
  '## Compliance coverage',
  '',
  ...coverage,
  '',
  '## Frequently asked questions',
  '',
  ...home.faq.items.flatMap((i) => [`Q: ${i.q}`, `A: ${i.a}`, '']),
]
await writeFile(
  new URL('llms.txt', dist),
  [
    ...summary,
    '## Website',
    '',
    `- [Overview](${abs('')})`,
    `- [Full text for AI tools](${abs('llms-full.txt')})`,
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
    `- [Source code](${repo})`,
    `- [Installation guide](${repo}/blob/master/docs/manual-install.md)`,
    `- [Docker image](https://hub.docker.com/r/yarsalabs/nepal-compliance)`,
    '',
  ].join('\n'),
)

type Section = { heading: string; body?: string; items?: string[]; paragraphs?: string[]; table?: { headers: string[]; rows: string[][] } }
type Entry = {
  title: string
  description: string
  slug: string
  intro?: string
  answer?: string
  sections: Section[]
  questions: QA[]
  sources: { label: string; url: string }[]
}
const page = (e: Entry, dir: string) =>
  [
    `## ${e.title}`,
    '',
    `URL: ${abs(`${dir}/${e.slug}/`)}`,
    '',
    e.answer ? `Short answer: ${e.answer}` : (e.intro ?? e.description),
    '',
    ...e.sections.flatMap((sec) => [
      `### ${sec.heading}`,
      '',
      ...(sec.body ? [sec.body, ''] : []),
      ...(sec.paragraphs ?? []).flatMap((p) => [p, '']),
      ...(sec.items?.length ? [...sec.items.map((i) => `- ${i}`), ''] : []),
      ...(sec.table ? [sec.table.headers.join(' | '), ...sec.table.rows.map((row) => row.join(' | ')), ''] : []),
    ]),
    ...(e.questions.length ? ['### Questions', '', ...e.questions.flatMap((q) => [`Q: ${q.question}`, `A: ${q.answer}`, ''])] : []),
    ...(e.sources.length ? ['### Sources', '', ...e.sources.map((src) => `- ${src.label}: ${src.url}`), ''] : []),
  ].join('\n')
await writeFile(
  new URL('llms-full.txt', dist),
  [
    ...summary,
    '# Features',
    '',
    ...(features as unknown as Entry[]).map((f) => page(f, 'features')),
    '# Add-ons',
    '',
    ...(addons as unknown as Entry[]).map((a) => page(a, 'addons')),
    '# Guides',
    '',
    ...(guides as unknown as Entry[]).map((g) => page(g, 'guides')),
  ].join('\n'),
)

await rm(new URL('../dist-ssr/', import.meta.url), { recursive: true, force: true })
await rm(new URL('.vite/', dist), { recursive: true, force: true })
console.log(`Pre-rendered ${routes.length} pages and 404.html.`)
