import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { Commands } from '../components/Commands'
import { Breadcrumbs } from '../components/page/Breadcrumbs'
import { LinkList } from '../components/page/LinkList'
import { NextStep } from '../components/page/NextStep'
import { PageIntro } from '../components/page/PageIntro'
import { bodyText, QaList, Section, SourceList } from '../components/page/Section'
import { LinkButton } from '../components/ui/button'
import { useStrings } from '../lib/i18n'
import { features, guides, landings } from '../lib/site'

export default function LandingPage({ slug }: { slug: string }) {
  const { t, ui } = useStrings()
  const install = t.getStarted.technical
  const page = landings.find((l) => l.slug === slug)
  if (!page) throw new Error(`Unknown landing page ${slug}`)
  const l = ui.landing
  const lookup = <T extends { slug: string; title: string }>(list: readonly T[], keys: readonly string[], dir: string) =>
    keys.map((key) => {
      const item = list.find((x) => x.slug === key)
      if (!item) throw new Error(`Unknown ${dir} ${key} in landing page ${slug}`)
      return { label: item.title, href: `/${dir}/${item.slug}/` }
    })
  const others = landings.filter((x) => x.slug !== slug).map((x) => ({ label: x.title, href: `/${x.slug}/` }))

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
      <Breadcrumbs items={[{ label: ui.home, href: '/' }, { label: page.title }]} />
      <article className="measure mt-8 min-w-0 max-w-3xl">
        <PageIntro eyebrow={page.eyebrow} title={page.title} lead={page.answer} audience={page.audience} forLabel={ui.forLabel}>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={l.primary.href} variant="solid" size="lg">
              {l.primary.label}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href={l.secondary.href} size="lg">
              {l.secondary.label}
            </LinkButton>
          </div>
        </PageIntro>
        {page.sections.map((s, i) => (
          <Section key={s.heading} id={`section-${i + 1}`} heading={s.heading} items={s.items}>
            <p className={bodyText}>{s.body}</p>
            {s.install && (
              <>
                <ol className="mt-6 space-y-4">
                  {s.steps.map((step, n) => (
                    <li key={step} className="flex gap-4">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-inverse font-semibold text-on-inverse text-sm tabular-nums">
                        {n + 1}
                      </span>
                      <span className="pt-1 text-fg-2 text-lg">{step}</span>
                    </li>
                  ))}
                </ol>
                <Commands className="mt-6 shadow-md" />
                <p className="mt-4 text-fg-3">{s.note}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LinkButton href={install.primary.href} variant="solid" size="lg">
                    {install.primary.label}
                    <IconArrowUpRight className="size-4" aria-hidden="true" />
                  </LinkButton>
                  <LinkButton href={install.secondary.href} size="lg">
                    {install.secondary.label}
                    <IconArrowUpRight className="size-4" aria-hidden="true" />
                  </LinkButton>
                </div>
              </>
            )}
          </Section>
        ))}
        <QaList title={l.questions} items={page.questions} />
        <LinkList title={l.features} items={lookup(features, page.features, 'features')} />
        <LinkList title={l.guides} items={lookup(guides, page.guides, 'guides')} />
        <SourceList title={l.references} note={l.referencesNote} sources={page.sources} />
        <NextStep {...l.next} />
        <LinkList title={l.more} items={others} />
      </article>
    </div>
  )
}
