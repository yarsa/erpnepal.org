import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const base = new URL(process.env.SITE_URL ?? 'https://erpnepal.org/')
assert.equal(base.protocol, 'https:')
const expected = await readFile('dist/sitemap.xml', 'utf8')
const urls = [...expected.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replaceAll('&amp;', '&'))
assert(urls.length > 0, 'Built sitemap is empty')

async function get(path: string) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000), cache: 'no-store' })
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`)
  assert(!/noindex|none/i.test(response.headers.get('x-robots-tag') || ''), `${path}: indexing blocked by HTTP header`)
  return { response, text: await response.text() }
}

for (let attempt = 1; attempt <= 12; attempt++) {
  try {
    const sitemap = await get('sitemap.xml')
    assert(/(?:application|text)\/xml/i.test(sitemap.response.headers.get('content-type') || ''), 'Sitemap must be served as XML')
    assert.equal(sitemap.text.trim(), expected.trim(), 'Live sitemap differs from the built sitemap')
    const robots = await get('robots.txt')
    assert(robots.text.includes(`Sitemap: ${new URL('sitemap.xml', base)}`), 'robots.txt must advertise the sitemap')
    assert(!/^Disallow:\s*\/\s*$/im.test(robots.text), 'robots.txt blocks the site')
    for (let i = 0; i < urls.length; i += 5) {
      await Promise.all(
        urls.slice(i, i + 5).map(async (url) => {
          const page = await get(url)
          assert(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*(?:noindex|none)/i.test(page.text), `${url}: noindex page`)
          // Pre-rendered pages carry their page data; a bare index.html would not.
          assert(page.text.includes('window.__PAGE__='), `${url}: page was not pre-rendered`)
        }),
      )
    }
    console.log(`Live sitemap, robots.txt, and ${urls.length} indexable pages verified at ${base}`)
    break
  } catch (error) {
    if (attempt === 12) throw error
    console.log(`Waiting for Pages/CDN update (${attempt}/12): ${(error as Error).message}`)
    await new Promise((resolve) => setTimeout(resolve, 15000))
  }
}
