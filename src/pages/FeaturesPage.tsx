import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { IconArrowRight } from '@tabler/icons-react'
import { useState } from 'react'
import { LinkCard } from '../components/page/LinkCard'
import { PageShell } from '../components/page/PageShell'
import { features, featureWorkflows } from '../lib/site'

const filters = [
  { label: 'All features', value: 'all' },
  { label: 'Accounting', value: 'accounting' },
  { label: 'Billing', value: 'billing' },
  { label: 'Payroll & HR', value: 'people' },
]
const segment =
  'whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-fg-3 transition-colors hover:text-fg data-pressed:bg-surface data-pressed:text-fg data-pressed:shadow-sm'

export default function FeaturesPage() {
  const [filter, setFilter] = useState('all')
  const shown = (slug: string) => filter === 'all' || featureWorkflows[slug]?.includes(filter)
  const count = features.filter((f) => shown(f.slug)).length

  return (
    <PageShell
      crumb="Features"
      eyebrow="Features"
      heading="Keep billing, accounts, and payroll in order"
      lead="Local tools for invoices, VAT, salaries, and leave in ERPNext."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="overflow-x-auto">
          <ToggleGroup
            value={[filter]}
            onValueChange={(v) => v[0] && setFilter(v[0])}
            aria-label="Filter by workflow"
            className="flex rounded-lg bg-muted p-0.5"
          >
            {filters.map((f) => (
              <Toggle key={f.value} value={f.value} className={segment}>
                {f.label}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
        <p className="text-fg-4 text-sm" role="status" aria-live="polite">
          {count} {count === 1 ? 'feature' : 'features'}
        </p>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <LinkCard
            key={f.slug}
            hidden={!shown(f.slug)}
            card={{
              number: String(i + 1).padStart(2, '0'),
              title: f.shortTitle,
              body: f.description,
              href: `/features/${f.slug}/`,
              link: 'See how it works',
            }}
          />
        ))}
      </ul>
      <p className="mt-8 text-fg-2 text-lg">
        More HR tools are in beta.{' '}
        <a
          href="/nepal-hrms/"
          className="inline-flex items-center gap-1 text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
        >
          Preview Nepal HRMS <IconArrowRight className="size-4" aria-hidden="true" />
        </a>
      </p>
    </PageShell>
  )
}
