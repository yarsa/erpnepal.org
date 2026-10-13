import { IconArrowUpRight } from '@tabler/icons-react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'

type Status = 'supported' | 'beta' | 'progress'
const order: Status[] = ['supported', 'beta', 'progress']

// The node's fill carries the status; a text label always sits beside it too.
// --done is black in light mode and green in dark mode (set on the section).
// Drawn as SVG on a 24 unit grid so every size stays round and centred.
function Node({ status, small }: { status: Status; small?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('shrink-0', small ? 'size-4' : 'size-6')} aria-hidden="true">
      {status === 'supported' && (
        <>
          <circle cx="12" cy="12" r="12" className="fill-(--done)" />
          <path
            d="M5.75 12.6L9.75 16.6L18.25 8.25"
            fill="none"
            strokeWidth="3.125"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-(--on-done)"
          />
        </>
      )}
      {status === 'beta' && (
        <>
          <circle cx="12" cy="12" r="11" strokeWidth="2" className="fill-surface stroke-(--done)" />
          <path d="M12 4a8 8 0 0 0 0 16z" className="fill-(--done)" />
        </>
      )}
      {status === 'progress' && (
        <circle cx="12" cy="12" r="11" fill="none" strokeWidth="2" strokeDasharray="3.2 2.56" className="stroke-fg-3" />
      )}
    </svg>
  )
}

const bar: Record<Status, string> = {
  supported: 'bg-(--done)',
  beta: 'bg-[repeating-linear-gradient(135deg,var(--fg-3)_0_3px,transparent_3px_6px)]',
  progress: 'bg-line-strong',
}

export function ComplianceMap() {
  const { t } = useStrings()
  const c = t.compliance
  const rows = c.rows as (typeof c.rows)[number][]
  const statusOf = (s: string) => (order.includes(s as Status) ? (s as Status) : 'progress')
  const count = (s: Status) => rows.filter((r) => statusOf(r.status) === s).length
  const summary = c.progress.replace('{done}', String(count('supported'))).replace('{total}', String(rows.length))
  const groups = [...new Set(rows.map((r) => r.group))].map((key) => {
    const list = rows.filter((r) => r.group === key)
    const states = list.map((r) => statusOf(r.status))
    const status: Status = states.every((x) => x === 'supported') ? 'supported' : states.some((x) => x !== 'progress') ? 'beta' : 'progress'
    return { key, list, status }
  })

  return (
    <section
      id="compliance"
      aria-labelledby="compliance-title"
      className="[--done:var(--fg)] [--on-done:var(--page)] dark:[--done:var(--color-emerald-500)] dark:[--on-done:#ffffff]"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="max-w-2xl">
            <h2 id="compliance-title" className="heading text-3xl md:text-4xl">
              {c.title}
            </h2>
            <p className="mt-3 text-fg-3 text-lg">{c.lead}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <p className="font-medium text-fg">{summary}</p>
            <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
              {order.map((s) => (count(s) ? <span key={s} className={bar[s]} style={{ flexGrow: count(s) }} /> : null))}
            </div>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-fg-3 text-sm" aria-label={c.columns.status}>
              {order.map((s) => (
                <li key={s} className="flex items-center gap-1.5">
                  <Node status={s} small />
                  {c.status[s]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stages run left to right; on narrow screens the track scrolls sideways. */}
        <ol className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pt-1 pb-2 md:scroll-px-8 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {groups.map((group, g) => {
            const next = groups[g + 1]
            return (
              <li key={group.key} className="w-[17rem] shrink-0 snap-start pr-4 lg:w-auto">
                <div className="relative flex h-6 items-center">
                  <Node status={group.status} />
                  {/* The track: solid into finished stages, dashed into stages still underway. */}
                  <span
                    className={cn(
                      'absolute top-1/2 right-0 left-6',
                      !next && 'right-4 [mask-image:linear-gradient(90deg,#000,transparent)]',
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        'absolute inset-x-0 top-0 -mt-px border-(--done) border-t-2',
                        (next?.status ?? 'progress') !== 'supported' && 'border-dashed',
                      )}
                    />
                  </span>
                </div>
                <h3 className="mt-4 font-medium text-fg-4 text-xs uppercase tracking-wider">
                  {(c.groups as Record<string, string>)[group.key] ?? group.key}
                </h3>
                <ol className="mt-3 space-y-3">
                  {group.list.map((row) => {
                    const status = statusOf(row.status)
                    return (
                      <li
                        key={row.rule}
                        className={cn(
                          'rounded-xl border bg-surface p-4 transition hover:-translate-y-0.5 hover:shadow-md',
                          status === 'supported' ? 'border-line shadow-sm' : 'border-line-strong border-dashed',
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 font-medium text-fg-3 text-xs">
                            <Node status={status} small />
                            {c.status[status]}
                          </span>
                          {row.link && (
                            <a
                              href={row.link}
                              rel="noopener"
                              aria-label={`${c.code}: ${row.rule}`}
                              className="group/link inline-flex shrink-0 items-center gap-0.5 font-medium text-fg-2 text-xs underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                            >
                              {c.code}
                              <IconArrowUpRight
                                className="size-3.5 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px"
                                aria-hidden="true"
                              />
                            </a>
                          )}
                        </div>
                        <p className={cn('mt-3 font-semibold', status === 'supported' ? 'text-fg' : 'text-fg-2')}>{row.rule}</p>
                        {row.nepali && (
                          <p lang="ne" className="text-fg-3 text-sm">
                            {row.nepali}
                          </p>
                        )}
                        <p className="mt-1.5 text-fg-3 text-sm">{row.feature}</p>
                      </li>
                    )
                  })}
                </ol>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
