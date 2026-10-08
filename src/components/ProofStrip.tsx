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
    <section aria-label={t.proof.label} className="border-line border-b">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 sm:grid-cols-3 md:px-8 lg:grid-cols-5">
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <dt className="order-2 text-fg-4 text-sm">{label}</dt>
            <dd className="heading order-1 flex items-center gap-2 text-3xl">
              <Icon className="size-5 text-fg-4" stroke={1.75} aria-hidden="true" />
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
