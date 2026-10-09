import { type Icon, IconDownload, IconGitFork, IconScale, IconStar, IconUsers } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { compact, useStats } from '../lib/stats'

/** Build-time project numbers; a failed request drops that item rather than showing a stale value. */
export function ProofStrip() {
  const { t } = useStrings()
  const stats = useStats()
  const items = [
    stats.stars != null && { icon: IconStar, value: compact.format(stats.stars), label: t.proof.stars },
    stats.forks != null && { icon: IconGitFork, value: compact.format(stats.forks), label: t.proof.forks },
    stats.pulls != null && { icon: IconDownload, value: compact.format(stats.pulls), label: t.proof.pulls },
    { icon: IconScale, value: 'GPL-3.0', label: t.proof.license },
    stats.contributors != null && { icon: IconUsers, value: compact.format(stats.contributors), label: t.proof.contributors },
  ].filter(Boolean) as { icon: Icon; value: string; label: string }[]

  return (
    <section aria-label={t.proof.label}>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-5">
          {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col gap-4 bg-surface p-5 last:odd:col-span-2 md:p-6 lg:last:odd:col-span-1">
              <span className="grid size-9 place-items-center rounded-lg bg-muted text-fg-2" aria-hidden="true">
                <Icon className="size-[18px]" stroke={1.75} />
              </span>
              <div className="flex flex-col gap-1">
                <dt className="order-2 text-fg-3 text-sm">{label}</dt>
                <dd className="order-1 font-semibold text-3xl tracking-tight">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
