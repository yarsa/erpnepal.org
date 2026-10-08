import { IconArrowRight } from '@tabler/icons-react'
import { useFeatureTab } from '../lib/featureTab'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { InvoiceCard } from './InvoiceCard'
import { SlipCard } from './SlipCard'
import { Badge } from './ui/badge'
import { LinkButton } from './ui/button'

export function HomeHero() {
  const { t } = useStrings()
  const { open } = useFeatureTab()
  const hero = t.hero as typeof t.hero & { titleTail?: string }
  return (
    <section className="-mt-16 bg-subtle pt-16" aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-5 pt-10 text-center md:px-8 md:pt-16">
        <div>
          <a
            href={hero.eyebrowHref}
            className="group mx-auto inline-flex max-w-full items-center gap-1 whitespace-nowrap rounded-full border border-line-strong bg-surface px-2.5 py-1 text-fg-3 text-xs shadow-sm outline-sweep transition-colors hover:text-fg sm:gap-1.5 sm:px-3 sm:text-sm"
          >
            {/* One line on phones: 12 px text there; on very narrow screens it truncates. */}
            <span className="truncate">{hero.eyebrow}</span>
            <IconArrowRight className="size-3 shrink-0 transition-transform sm:size-3.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <h1 id="hero-title" className="heading mx-auto mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          {hero.title}
          {hero.titleTail && <span className="text-fg-4"> {hero.titleTail}</span>}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-fg-3 text-xl">{hero.lead}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href={hero.primary.href} variant="solid" size="xl">
            {hero.primary.label}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton href={hero.secondary.href} variant="outline" size="xl">
            {hero.secondary.label}
          </LinkButton>
        </div>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-fg-3 text-sm">
          {hero.assurance.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-line-strong" aria-hidden="true">
                  ·
                </span>
              )}
              {item}
            </li>
          ))}
        </ul>

        {/* Shortcuts into "What it does": each opens its tab there. */}
        <nav aria-label={t.features.tabsLabel} className="mt-6">
          <ul className="flex flex-wrap justify-center gap-2">
            {t.features.tabs.map((tab) => (
              <li key={tab.value}>
                <a
                  href={`#feature-${tab.value}`}
                  onClick={(e) => {
                    e.preventDefault()
                    open(tab.value)
                  }}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 font-semibold text-fg-2 text-sm transition-colors hover:border-fg/70 hover:text-fg focus-visible:border-fg focus-visible:text-fg"
                >
                  <ContentIcon name={tab.icon} className="size-4 text-fg-3" />
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Product preview: demo records inside an app window, partly cropped by the section edge. */}
      <div className="mx-auto mt-12 max-w-4xl px-5 pb-14 md:px-8 md:pb-20" role="img" aria-label={t.demo.previewLabel}>
        <div className="overflow-hidden rounded-2xl bg-surface text-left shadow-lg" aria-hidden="true">
          {/* Window bar: three dots and a breadcrumb to the open record. */}
          <div className="flex h-11 items-center gap-3 border-line border-b px-4">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="size-2.5 rounded-full bg-line-strong" />
            </div>
            <p className="min-w-0 flex-1 truncate text-fg-3 text-xs">
              {t.demo.invoice.heading} <span className="px-1 text-fg-4">/</span>
              <span className="text-fg-2">{t.demo.invoice.number}</span>
            </p>
            <Badge tone="inverse" className="shrink-0">
              {t.demo.tag}
            </Badge>
          </div>
          <div className="flex">
            {/* Sidebar: one icon per feature, the first one current. */}
            <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-line border-r py-4 sm:flex">
              {t.features.tabs.map((tab, i) => (
                <span key={tab.value} className={`grid size-9 place-items-center rounded-lg ${i === 0 ? 'bg-muted text-fg' : 'text-fg-4'}`}>
                  <ContentIcon name={tab.icon} className="size-4" />
                </span>
              ))}
            </div>
            <div className="grid min-w-0 flex-1 gap-4 bg-subtle p-4 md:grid-cols-[1.1fr_1fr] md:items-start md:p-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <InvoiceCard />
              </div>
              <div className="hidden overflow-hidden rounded-2xl border border-line bg-surface md:block">
                <SlipCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
