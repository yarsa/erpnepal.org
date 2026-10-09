import { IconArrowUpRight } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { Donut } from './Donut'
import { Badge } from './ui/badge'

// Colour backs up the text label; it is never the only signal.
const status = {
  supported: { tone: 'green', color: { stroke: 'stroke-emerald-600 dark:stroke-emerald-400', dot: 'bg-emerald-600 dark:bg-emerald-400' } },
  beta: { tone: 'amber', color: { stroke: 'stroke-amber-500 dark:stroke-amber-400', dot: 'bg-amber-500 dark:bg-amber-400' } },
  progress: { tone: 'gray', color: { stroke: 'stroke-fg-4', dot: 'bg-fg-4' } },
} as const
type Status = keyof typeof status

export function ComplianceMap() {
  const { t } = useStrings()
  const c = t.compliance
  const label = (s: string) => (c.status as Record<string, string>)[s] ?? s
  const slices = (Object.keys(status) as Status[])
    .map((s) => ({ label: label(s), value: c.rows.filter((r) => r.status === s).length, color: status[s].color }))
    .filter((s) => s.value)

  return (
    <section id="compliance" aria-labelledby="compliance-title">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
        <div className="lg:sticky lg:top-24">
          <h2 id="compliance-title" className="heading text-3xl md:text-4xl">
            {c.title}
          </h2>
          <p className="mt-3 text-fg-3 text-lg">{c.lead}</p>
          {/* Summary of the table; the table stays the full source. */}
          <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <Donut slices={slices} center={c.chart.center} format={String} />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
          <table className="w-full text-left">
            <thead className="hidden border-line border-b bg-subtle text-fg-3 text-sm md:table-header-group">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  {c.columns.rule}
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  {c.columns.feature}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  {c.columns.status}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {c.rows.map((row) => (
                <tr
                  key={row.rule}
                  className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-5 py-3.5 transition-colors hover:bg-subtle md:table-row md:px-0 md:py-0"
                >
                  <th scope="row" className="col-start-1 row-start-1 text-left font-medium text-fg md:px-5 md:py-4 md:align-top">
                    <span className="text-base md:text-lg">{row.rule}</span>
                    {row.nepali && (
                      <span lang="ne" className="block font-normal text-fg-3 text-sm">
                        {row.nepali}
                      </span>
                    )}
                  </th>
                  <td className="col-span-2 col-start-1 row-start-2 text-fg-3 text-sm md:px-5 md:py-4 md:align-top md:text-base">
                    {row.link ? (
                      <a
                        href={row.link}
                        rel="noopener"
                        className="group/link text-fg-2 underline decoration-line-strong underline-offset-4 hover:text-fg hover:decoration-fg"
                      >
                        {row.feature.slice(0, row.feature.lastIndexOf(' ') + 1)}
                        <span className="whitespace-nowrap">
                          {row.feature.slice(row.feature.lastIndexOf(' ') + 1)}
                          <IconArrowUpRight
                            className="ml-1 inline size-3.5 align-[-2px] text-fg-3 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    ) : (
                      row.feature
                    )}
                  </td>
                  <td className="col-start-2 row-start-1 text-right md:px-5 md:py-4 md:align-top">
                    <Badge tone={status[row.status as Status]?.tone ?? 'gray'}>
                      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                      {label(row.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
