import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { InvoiceCard } from './InvoiceCard'
import { SlipCard } from './SlipCard'
import { Badge } from './ui/badge'
import { LinkButton } from './ui/button'

export function HomeHero() {
  const { t } = useStrings()
  const hero = t.hero as typeof t.hero & { titleTail?: string }
  return (
    <section className="-mt-16 bg-subtle pt-16" aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-5 pt-10 text-center md:px-8 md:pt-16">
        {t.draft && (
          <p className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-amber-800 text-sm dark:bg-amber-950 dark:text-amber-300">
            <IconInfoCircle className="size-4" aria-hidden="true" />
            {t.draft}
          </p>
        )}
        <div>
          <p className="mx-auto inline-flex items-center rounded-full border border-line-strong bg-surface px-3 py-1 text-fg-3 text-sm shadow-sm outline-sweep">
            {hero.eyebrow}
          </p>
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
      </div>

      {/* Product preview: demo records, partly cropped by the section edge. */}
      <div className="mx-auto mt-10 max-w-4xl px-5 pb-14 md:px-8 md:pb-20" role="img" aria-label={t.demo.previewLabel}>
        <div className="relative mx-auto grid max-w-3xl gap-5 md:grid-cols-[1.1fr_1fr] md:items-start">
          <Badge tone="inverse" className="absolute -top-3 left-4 z-10 md:left-6">
            {t.demo.tag}
          </Badge>
          <div className="overflow-hidden rounded-2xl bg-surface text-left shadow-lg" aria-hidden="true">
            <InvoiceCard />
          </div>
          <div className="hidden overflow-hidden rounded-2xl bg-surface text-left shadow-lg md:mt-12 md:block" aria-hidden="true">
            <SlipCard />
          </div>
        </div>
      </div>
    </section>
  )
}
