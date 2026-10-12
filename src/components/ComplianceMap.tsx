import { IconArrowUpRight, IconCheck } from '@tabler/icons-react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'

type Status = 'supported' | 'beta' | 'progress'
const order: Status[] = ['supported', 'beta', 'progress']

// The node's fill carries the status; a text label always sits beside it too.
function Node({ status, small }: { status: Status; small?: boolean }) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-full',
        small ? 'size-3.5' : 'size-6',
        status === 'supported' && 'bg-inverse text-on-inverse',
        status === 'beta' && 'border-2 border-fg bg-[linear-gradient(90deg,var(--fg)_50%,var(--surface)_50%)]',
        status === 'progress' && 'border-2 border-fg-3 border-dashed bg-surface',
      )}
      aria-hidden="true"
    >
      {status === 'supported' && !small && <IconCheck className="size-3.5" stroke={3} />}
    </span>
  )
}

const bar: Record<Status, string> = {
  supported: 'bg-fg',
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
  const groups = [...new Set(rows.map((r) => r.group))]

  return (
    <section id="compliance" aria-labelledby="compliance-title">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24">
          <h2 id="compliance-title" className="heading text-3xl md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-3 text-fg-3 text-lg">{c.lead}</p>
          <div className="mt-8 rounded-2xl border border-line bg-surface p-5 shadow-sm">
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

        <ol className="relative">
          {groups.map((group, g) => (
            <li key={group}>
              <p className={cn('relative pl-10 font-medium text-fg-4 text-xs uppercase tracking-wider', g > 0 && 'pt-6')}>
                {g > 0 && <span className="absolute top-0 bottom-0 left-[11px] border-line-strong border-l" aria-hidden="true" />}
                {(c.groups as Record<string, string>)[group] ?? group}
              </p>
              <ol className="mt-3">
                {rows
                  .filter((r) => r.group === group)
                  .map((row, i, list) => {
                    const status = statusOf(row.status)
                    const last = g === groups.length - 1 && i === list.length - 1
                    return (
                      <li key={row.rule} className="relative pb-3 pl-10 last:pb-0">
                        {/* The spine: solid through supported rules, dashed where work is still underway. */}
                        <span
                          className={cn(
                            'absolute left-[11px] border-l',
                            g === 0 && i === 0 ? 'top-4' : i === 0 ? '-top-3' : 'top-0',
                            last ? 'h-6' : 'bottom-0',
                            status === 'supported' ? 'border-line-strong' : 'border-fg-3 border-dashed',
                          )}
                          aria-hidden="true"
                        />
                        <span className="absolute top-4 left-0">
                          <Node status={status} />
                        </span>
                        <div
                          className={cn(
                            'rounded-xl border bg-surface px-4 py-3.5 transition hover:-translate-y-0.5 hover:shadow-md',
                            status === 'supported' ? 'border-line shadow-sm' : 'border-line-strong border-dashed',
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className={cn('font-semibold', status === 'supported' ? 'text-fg' : 'text-fg-2')}>
                              {row.rule}
                              {row.nepali && (
                                <span lang="ne" className="block font-normal text-fg-3 text-sm">
                                  {row.nepali}
                                </span>
                              )}
                            </h3>
                            <span className="shrink-0 font-medium text-fg-3 text-xs">{c.status[status]}</span>
                          </div>
                          <div className="mt-1 flex items-end justify-between gap-3">
                            <p className="text-fg-3 text-sm">{row.feature}</p>
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
                        </div>
                      </li>
                    )
                  })}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
