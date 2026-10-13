import { type Icon, IconArrowUpRight, IconDownload, IconGitFork, IconScale, IconStar, IconUsers } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { repo } from '../content/home.en.ts'
import { useStrings } from '../lib/i18n'
import { compact, useStats } from '../lib/stats'

export interface ProofItem {
  key: string
  icon: Icon
  value: number | null
  text: string
  label: string
  href: string
}

/** Build-time project numbers; a failed request drops that item rather than showing a stale value. */
export function useProofItems(): ProofItem[] {
  const { t } = useStrings()
  const stats = useStats()
  const item = (key: string, icon: Icon, value: number | null, label: string, href: string) =>
    value == null ? null : { key, icon, value, text: compact.format(value), label, href }
  return [
    item('stars', IconStar, stats.stars, t.proof.stars, `${repo}/stargazers`),
    item('pulls', IconDownload, stats.pulls, t.proof.pulls, 'https://hub.docker.com/r/yarsalabs/nepal-compliance'),
    item('contributors', IconUsers, stats.contributors, t.proof.contributors, `${repo}/graphs/contributors`),
    item('forks', IconGitFork, stats.forks, t.proof.forks, `${repo}/forks`),
    { key: 'license', icon: IconScale, value: null, text: 'GPL-3.0', label: t.proof.license, href: `${repo}/blob/master/LICENSE` },
  ].filter(Boolean) as ProofItem[]
}

/** Counts up from zero the first time it scrolls into view. Server HTML shows the final value. */
function CountUp({ item }: { item: ProofItem }) {
  const [text, setText] = useState(item.text)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    const target = item.value
    if (!el || target == null || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200)
        const eased = 1 - (1 - p) ** 3
        setText(p < 1 ? compact.format(Math.round(target * eased)) : item.text)
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      setText(compact.format(0))
      frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [item])
  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  )
}

export function ProofStrip() {
  const { t } = useStrings()
  const items = useProofItems()
  return (
    <section aria-label={t.proof.label}>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
          <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-5">
            {items.map((item) => (
              <li key={item.key} className="bg-surface last:odd:col-span-2 lg:last:odd:col-span-1">
                <a
                  href={item.href}
                  rel="noopener"
                  className="group flex h-full flex-col gap-4 p-5 transition-colors hover:bg-subtle md:p-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-lg bg-muted text-fg-2 transition-colors group-hover:bg-inverse group-hover:text-on-inverse">
                      <item.icon className="size-[18px]" stroke={1.75} aria-hidden="true" />
                    </span>
                    <IconArrowUpRight className="size-4 text-fg-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold text-3xl tracking-tight">
                      <CountUp item={item} />
                    </span>
                    <span className="text-fg-3 text-sm">{item.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
