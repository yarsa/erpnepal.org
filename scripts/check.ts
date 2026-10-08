// Validates the built site in dist/. Run after `npm run build`.
import assert from 'node:assert/strict'
import { access, readdir, readFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { addons } from '../content/addons.mjs'
import { features } from '../content/features.mjs'
import { guides } from '../content/guides.mjs'
import home from '../src/content/home.en.ts'
import homeNe from '../src/content/home.ne.ts'

// Gzip budget for the JS + CSS a page loads before it is interactive (fonts excluded).
const BUDGET_KB = 150
const dist = new URL('../dist/', import.meta.url)
const read = (path: string) => readFile(new URL(path, dist), 'utf8')
const exists = (path: string) =>
  access(new URL(path, dist)).then(
    () => true,
    () => false,
  )
const decode = (html: string) =>
  html
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
const visibleText = (html: string) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<!-- -->/g, ''),
  )

// 1. URL set: exactly the previous site's pages, plus the Nepali homepage.
const expected = [
  '',
  'features/',
  'addons/',
  'guides/',
  'workflows/',
  'nepal-hrms/',
  ...features.map((f) => `features/${f.slug}/`),
  ...addons.map((a) => `addons/${a.slug}/`),
  ...guides.map((g) => `guides/${g.slug}/`),
].sort()
async function htmlDirs(dir = ''): Promise<string[]> {
  const out: string[] = []
  for (const entry of await readdir(new URL(dir || '.', dist), { withFileTypes: true })) {
    const path = dir + entry.name
    if (entry.isDirectory() && entry.name !== 'assets') out.push(...(await htmlDirs(`${path}/`)))
    else if (entry.name === 'index.html') out.push(dir)
  }
  return out
}
const all = [...expected, 'ne/'].sort()
const indexed = all
const redirects: Record<string, string> = { 'for-your-business/': 'workflows/' }
assert.deepEqual((await htmlDirs()).sort(), [...all, ...Object.keys(redirects)].sort(), 'built pages differ from the expected URL set')
for (const [from, to] of Object.entries(redirects)) {
  const html = await read(`${from}index.html`)
  assert(all.includes(to), `/${from} redirects to missing page /${to}`)
  assert.match(html, new RegExp(`http-equiv="refresh" content="0; url=/${to}"`), `/${from}: missing redirect to /${to}`)
  assert.match(html, /<meta name="robots" content="noindex">/, `/${from}: redirect page must be noindex`)
}
const sitemap = await read('sitemap.xml')
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/[^/]+\/([^<]*)<\/loc>/g)].map((m) => m[1]).sort()
assert.deepEqual(sitemapPaths, indexed, 'sitemap does not list exactly the indexed pages')
assert.match(await read('robots.txt'), /^Sitemap: https:\/\/.+sitemap\.xml$/m, 'robots.txt must point to the sitemap')
const llms = await read('llms.txt')
for (const path of expected.filter((p) => p.split('/').length > 2)) assert(llms.includes(`/${path})`), `llms.txt is missing ${path}`)
assert(await exists('404.html'), 'missing 404.html')
assert(await exists('CNAME'), 'missing CNAME')

// 2. Every page: unique metadata, valid structured data, no third-party
//    resources, working same-site links and anchors, within budget.
const pages = new Map<string, string>()
for (const path of all) pages.set(path, await read(`${path}index.html`))
const ids = new Map([...pages].map(([path, html]) => [path, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]))
const titles = new Map<string, string>()
const descriptions = new Map<string, string>()
let maxKb = 0
for (const [path, html] of pages) {
  const where = `/${path}`
  assert.match(html, path.startsWith('ne/') ? /<html lang="ne"/ : /<html lang="en"/, `${where}: wrong or missing lang`)
  assert(!/<meta name="robots" content="noindex"/.test(html), `${where}: page is noindex`)
  assert.match(html, /<link rel="canonical" href="https:\/\//, `${where}: missing canonical`)
  assert.match(html, /<script>window\.__STATS__=.*window\.__PAGE__=/, `${where}: missing page data for hydration`)
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '')
  assert(title.length > 10, `${where}: missing title`)
  assert(description.length > 50, `${where}: missing description`)
  assert(!titles.has(title), `${where}: duplicate title with /${titles.get(title)}`)
  assert(!descriptions.has(description), `${where}: duplicate description with /${descriptions.get(description)}`)
  titles.set(title, path)
  descriptions.set(description, path)
  for (const [, ld] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(ld)

  const external = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="(https?:\/\/[^"]+)"[^>]*>/g)]
    .filter((m) => !/rel="canonical"/.test(m[0]))
    .map((m) => m[1])
  assert.deepEqual(external, [], `${where}: external resources loaded: ${external.join(', ')}`)

  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = decode(raw)
    if (/^(https?:|mailto:|data:)/.test(href)) continue
    const [file, hash] = href.split('#')
    const target = file === '' ? path : file.replace(/^\//, '')
    if (target.endsWith('/') || target === '') {
      assert(pages.has(target), `${where}: link to missing page /${target}`)
      if (hash) assert(ids.get(target)?.has(hash), `${where}: anchor #${hash} missing on /${target}`)
    } else {
      assert(await exists(target), `${where}: missing file /${target}`)
    }
  }

  let bytes = 0
  for (const [, asset] of new Set(html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.(?:js|css))"/g))) {
    bytes += gzipSync(await readFile(new URL(asset, dist))).length
  }
  const kb = bytes / 1024
  maxKb = Math.max(maxKb, kb)
  assert(kb <= BUDGET_KB, `${where}: JS+CSS ${kb.toFixed(1)} KB gzip, over the ${BUDGET_KB} KB budget`)
}

// 3. Content is in the pre-rendered HTML, so it does not depend on JavaScript.
function expectText(path: string, strings: (string | undefined)[]) {
  const text = visibleText(pages.get(path) ?? '')
  const wanted = strings.filter((s): s is string => Boolean(s))
  const missing = wanted.filter((s) => !text.includes(s))
  assert.deepEqual(missing, [], `/${path}: text missing from static HTML:\n${missing.join('\n')}`)
  return wanted.length
}
const homeStrings = (t: typeof home) => [
  t.hero.title,
  t.hero.lead,
  ...t.features.tabs.flatMap((tab) => [tab.label, ...tab.points]),
  ...t.compliance.rows.flatMap((row) => [row.rule, row.feature]),
  ...t.getStarted.technical.commands,
  ...t.faq.items.flatMap((i) => [i.q, i.a]),
  ...t.explore.cards.map((c) => c.title),
  t.footer.tagline,
]
let checked = expectText('', homeStrings(home))
checked += expectText('ne/', homeStrings(homeNe))
type Detail = {
  title: string
  intro: string
  sections: { heading: string; body: string; items?: string[] }[]
  questions: { question: string; answer: string }[]
  sources: { label: string }[]
}
const detail = (d: Detail) => [
  d.title,
  d.intro,
  ...d.sections.flatMap((s) => [s.heading, s.body, ...(s.items ?? [])]),
  ...d.questions.flatMap((q) => [q.question, q.answer]),
  ...d.sources.map((s) => s.label),
]
for (const f of features) checked += expectText(`features/${f.slug}/`, detail(f))
for (const a of addons) checked += expectText(`addons/${a.slug}/`, detail(a))
for (const g of guides) {
  checked += expectText(`guides/${g.slug}/`, [
    g.title,
    g.answer,
    ...g.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.items ?? []),
      ...(s.table ? [...s.table.headers, ...s.table.rows.flat()] : []),
    ]),
    ...g.questions.flatMap((q) => [q.question, q.answer]),
    ...g.sources.map((s) => s.label),
  ])
}
checked += expectText(
  'features/',
  features.flatMap((f) => [f.shortTitle, f.description]),
)
checked += expectText(
  'addons/',
  addons.flatMap((a) => [a.shortTitle, a.category, a.description]),
)
checked += expectText(
  'guides/',
  guides.flatMap((g) => [g.title, g.description]),
)

console.log(
  `Passed: ${pages.size} pages + 404, URL set as expected (${Object.keys(redirects).length} redirect), ${checked} content strings pre-rendered, all same-site links and anchors resolve, max JS+CSS ${maxKb.toFixed(1)} KB gzip (budget ${BUDGET_KB} KB).`,
)
