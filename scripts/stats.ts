import { mkdir, readFile, writeFile } from 'node:fs/promises'
import type { Stats } from '../src/lib/stats'

const repoApi = 'https://api.github.com/repos/yarsa/nepal-compliance'

async function getJson(url: string, headers: Record<string, string> = {}) {
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(10000) })
    return response.ok ? await response.json() : null
  } catch {
    return null
  }
}

// Contributor count without downloading the list: one per page, read the last
// page number from the Link header (a single page has no Link).
async function getContributorCount(headers: Record<string, string>) {
  try {
    const response = await fetch(`${repoApi}/contributors?per_page=1`, { headers, signal: AbortSignal.timeout(10000) })
    if (!response.ok) return null
    const last = response.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/)
    return last ? Number(last[1]) : (await response.json()).length
  } catch {
    return null
  }
}

async function fetchStats(): Promise<Stats> {
  const token = process.env.GITHUB_TOKEN
  const github: Record<string, string> = token ? { authorization: `Bearer ${token}` } : {}
  const [repo, docker, contributors] = await Promise.all([
    getJson(repoApi, github),
    getJson('https://hub.docker.com/v2/repositories/yarsalabs/nepal-compliance/'),
    getContributorCount(github),
  ])
  return {
    stars: repo?.stargazers_count ?? null,
    forks: repo?.forks_count ?? null,
    pulls: docker?.pull_count ?? null,
    contributors,
  }
}

// Local builds reuse the last complete result for an hour, so rebuilding does
// not spend GitHub's 60-an-hour anonymous limit and blank the numbers. CI
// always fetches fresh. A failed request hides that number, never invents one.
const cacheFile = new URL('../.cache/stats.json', import.meta.url)
const CACHE_MS = 60 * 60 * 1000

export async function loadStats(): Promise<Stats> {
  if (!process.env.CI) {
    try {
      const cached = JSON.parse(await readFile(cacheFile, 'utf8'))
      if (Date.now() - cached.at < CACHE_MS) return cached.stats
    } catch {}
  }
  const stats = await fetchStats()
  if (!process.env.CI && stats.stars != null && stats.forks != null && stats.contributors != null) {
    await mkdir(new URL('.', cacheFile), { recursive: true })
    await writeFile(cacheFile, JSON.stringify({ at: Date.now(), stats }))
  }
  return stats
}
