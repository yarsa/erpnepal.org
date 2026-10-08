import { Tabs } from '@base-ui/react/tabs'
import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { type Calendar, useCalendar } from '../lib/calendar'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { Donut, grays } from './Donut'
import { InvoiceCard } from './InvoiceCard'
import { SlipCard } from './SlipCard'
import { Badge } from './ui/badge'

const segment =
  'rounded-md px-2.5 py-1 text-sm text-fg-3 transition-colors hover:text-fg data-pressed:bg-surface data-pressed:text-fg data-pressed:shadow-sm'

function DemoPanel({ value }: { value: string }) {
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
          <dl className="mt-5 text-[15px]">
            {t.demo.leave.rows.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 border-line border-t py-2.5">
                <dt className="text-fg-2">{row.label}</dt>
                <dd className="text-fg tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )
    case 'dates':
      return (
        <div className="p-6">
          <p className="text-fg-4 text-sm">{t.demo.calendar.heading}</p>
          <dl className="mt-5 text-[15px]">
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
          <p className="text-fg-4 text-sm">{t.demo.audit.heading}</p>
          <ol className="mt-4 text-sm">
            {t.demo.audit.rows.map((row) => (
              <li key={`${row.doc}-${row.action}`} className="grid gap-0.5 border-line border-t py-2.5">
                <span className="font-medium text-fg">
                  {row.doc} · {row.action}
                </span>
                <span className="text-fg-4">
                  {d.invoice[calendar]} · {row.user}
                </span>
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

  return (
    <section id="features" className="border-line border-b bg-subtle" aria-labelledby="features-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 id="features-title" className="heading text-3xl md:text-4xl">
              {f.title}
            </h2>
            <p className="mt-3 text-fg-3 text-lg">{f.lead}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-fg-4 text-sm" id="calendar-label">
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

        <Tabs.Root defaultValue="billing" className="mt-10">
          <div className="overflow-x-auto pb-1">
            <Tabs.List aria-label={f.tabsLabel} className="relative z-0 inline-flex gap-1 rounded-lg bg-muted p-0.5">
              {f.tabs.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-fg-3 text-sm transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-fg data-active:text-fg"
                >
                  <ContentIcon name={tab.icon} className="size-4" />
                  {tab.label}
                </Tabs.Tab>
              ))}
              <Tabs.Indicator className="-z-10 absolute top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width) rounded-md bg-surface shadow-sm transition-all duration-200" />
            </Tabs.List>
          </div>

          {/* Every panel stays in the HTML (keepMounted), so search engines see all five. */}
          {f.tabs.map((tab) => (
            <Tabs.Panel
              key={tab.value}
              value={tab.value}
              keepMounted
              className="panel-in mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]"
            >
              <div>
                <h3 className="heading text-2xl">{tab.label}</h3>
                {tab.nepali && (
                  <p lang="ne" className="mt-1 text-fg-4 text-lg">
                    {tab.nepali}
                  </p>
                )}
                <ul className="mt-6 space-y-3">
                  {tab.points.map((point) => (
                    <li key={point} className="flex gap-3 text-fg-2 text-lg">
                      <IconCheck className="mt-1 size-4 shrink-0 text-fg" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tab.link}
                  className="mt-6 inline-flex items-center gap-1.5 font-medium text-fg underline decoration-line-strong underline-offset-4 hover:decoration-fg"
                >
                  {f.docsLabel} <IconArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>

              {/* Demo cards: illustrative records with demo data only. */}
              <figure className="relative overflow-hidden rounded-2xl bg-surface shadow-md">
                <Badge size="sm" className="absolute top-4 right-4">
                  {t.demo.tag}
                </Badge>
                <DemoPanel value={tab.value} />
              </figure>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </div>
    </section>
  )
}
