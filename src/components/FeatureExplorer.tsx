import { Tabs } from '@base-ui/react/tabs'
import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { IconArrowRight, IconCircleCheckFilled } from '@tabler/icons-react'
import { type Calendar, useCalendar } from '../lib/calendar'
import { useFeatureTab } from '../lib/featureTab'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { Donut, grays } from './Donut'
import { InvoiceCard } from './InvoiceCard'
import { SlipCard } from './SlipCard'
import { Badge } from './ui/badge'
import { LinkButton } from './ui/button'

export const chip =
  'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-fg/40 border-dashed bg-surface px-3 font-semibold text-fg-2 text-sm transition-colors hover:border-fg/70 hover:text-fg focus-visible:border-fg focus-visible:border-solid focus-visible:text-fg data-active:border-inverse data-active:border-solid data-active:bg-inverse data-active:text-on-inverse'

const segment =
  'min-w-16 rounded-md px-4 py-1.5 text-center text-sm text-fg-3 transition-colors hover:text-fg data-pressed:bg-surface data-pressed:font-medium data-pressed:text-fg data-pressed:shadow-sm'

export function DemoPanel({ value }: { value: string }) {
  const { t } = useStrings()
  const { calendar } = useCalendar()
  const d = t.dates
  switch (value) {
    case 'billing':
      return <InvoiceCard />
    case 'payroll':
      return (
        <>
          <SlipCard />
          <div className="border-line border-t px-6 pt-5 pb-6">
            <p className="text-fg-4 text-sm">{t.demo.slip.chart.title}</p>
            <Donut
              className="mt-4"
              center={t.demo.slip.chart.center}
              slices={t.demo.slip.chart.slices.map((s, i) => ({ ...s, color: grays[i] }))}
            />
          </div>
        </>
      )
    case 'hr':
      return (
        <div className="p-6">
          <p className="text-fg-4 text-sm">{t.demo.leave.heading}</p>
          <p className="mt-1 font-medium text-fg text-lg">
            {t.demo.leave.fiscalYear} {d.fiscalStart[calendar]}
          </p>
          <dl className="mt-5 divide-y divide-line rounded-lg border border-line text-sm">
            {t.demo.leave.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-3 py-2.5">
                <dt className="text-fg-2">{row.label}</dt>
                <dd>
                  <Badge size="sm" className="tabular-nums">
                    {row.value}
                  </Badge>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'dates':
      return (
        <div className="p-6">
          <p className="text-fg-4 text-sm">{t.demo.calendar.heading}</p>
          <dl className="mt-5 text-sm">
            {t.demo.calendar.rows.map((row) => (
              <div key={row.key} className="grid grid-cols-[1fr_auto_auto] items-baseline gap-4 border-line border-t py-2.5">
                <dt className="text-fg-2">{row.label}</dt>
                <dd className="text-fg tabular-nums">
                  {d[row.key].bs} {t.demo.calendar.bs}
                </dd>
                <dd className="text-fg-4 tabular-nums">
                  {d[row.key].ad} {t.demo.calendar.ad}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-fg-4 text-sm">{t.demo.calendar.note}</p>
        </div>
      )
    default:
      return (
        <div className="p-6">
          <div className="flex items-center gap-2">
            <p className="text-fg-4 text-sm">{t.demo.audit.heading}</p>
            <Badge size="sm" className="tabular-nums">
              {t.demo.audit.rows.length}
            </Badge>
          </div>
          <ol className="mt-4 divide-y divide-line rounded-lg border border-line text-sm">
            {t.demo.audit.rows.map((row) => (
              <li key={`${row.doc}-${row.action}`} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-fg tabular-nums">{row.doc}</p>
                  <p className="truncate text-fg-4 text-xs">
                    {d.invoice[calendar]} · {row.user}
                  </p>
                </div>
                {/* Green only for the CBMS sync, the one success state; the rest are neutral. */}
                <Badge size="sm" tone={row.action === t.demo.invoice.status ? 'green' : 'gray'} className="shrink-0">
                  {row.action}
                </Badge>
              </li>
            ))}
          </ol>
        </div>
      )
  }
}

export function FeatureExplorer() {
  const { t } = useStrings()
  const { calendar, setCalendar } = useCalendar()
  const f = t.features
  const { active, select } = useFeatureTab()

  return (
    <section id="features" className="bg-subtle" aria-labelledby="features-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 id="features-title" className="heading text-3xl md:text-4xl">
            {f.title}
          </h2>
          <p className="mt-3 text-fg-3 text-lg">{f.lead}</p>
        </div>

        <Tabs.Root value={active} onValueChange={(v) => select(String(v))} className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs.List aria-label={f.tabsLabel} className="flex flex-wrap gap-2">
              {f.tabs.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value} className={chip}>
                  <ContentIcon name={tab.icon} className="size-4" />
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <div className="flex items-center gap-3">
              <span className="text-fg-3 text-sm" id="calendar-label">
                {f.dateLabel}
              </span>
              <ToggleGroup
                value={[calendar]}
                onValueChange={(v) => v[0] && setCalendar(v[0] as Calendar)}
                aria-labelledby="calendar-label"
                className="flex rounded-lg bg-muted p-0.5"
              >
                <Toggle value="bs" className={segment}>
                  {f.calendar.bs}
                </Toggle>
                <Toggle value="ad" className={segment}>
                  {f.calendar.ad}
                </Toggle>
              </ToggleGroup>
            </div>
          </div>

          {/* Every panel stays in the HTML (keepMounted), so search engines see all five. */}
          {f.tabs.map((tab) => (
            <Tabs.Panel
              key={tab.value}
              value={tab.value}
              keepMounted
              className="panel-in mt-6 grid overflow-hidden rounded-2xl border border-line bg-surface shadow-sm lg:grid-cols-[1fr_1.1fr]"
            >
              {/* Anchor for #feature-<tab> links. */}
              <div id={`feature-${tab.value}`} className="flex flex-col p-6 md:p-8 lg:p-10">
                <span className="grid size-10 place-items-center rounded-lg bg-muted text-fg" aria-hidden="true">
                  <ContentIcon name={tab.icon} className="size-5" />
                </span>
                <h3 className="heading mt-5 text-2xl md:text-3xl">{tab.label}</h3>
                {tab.nepali && (
                  <p lang="ne" className="mt-1 text-fg-3">
                    {tab.nepali}
                  </p>
                )}
                <ul className="mt-6 space-y-3.5">
                  {tab.points.map((point) => (
                    <li key={point} className="flex gap-3 text-fg-2 text-lg">
                      <IconCircleCheckFilled className="mt-1 size-5 shrink-0 text-fg" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <LinkButton href={tab.link} size="lg">
                    {f.docsLabel}
                    <IconArrowRight className="size-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              </div>

              {/* Demo cards: illustrative records with demo data only. */}
              <div className="border-line border-t bg-subtle p-4 md:p-6 lg:border-t-0 lg:border-l">
                <figure className="relative overflow-hidden rounded-2xl border border-line bg-surface">
                  <Badge size="sm" className="absolute top-4 right-4">
                    {t.demo.tag}
                  </Badge>
                  <DemoPanel value={tab.value} />
                </figure>
              </div>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </section>
  )
}
