import { Breadcrumbs } from '../components/page/Breadcrumbs'
import { LinkList } from '../components/page/LinkList'
import { NextStep } from '../components/page/NextStep'
import { PageIntro } from '../components/page/PageIntro'
import { bodyText, QaList, Section, SourceList } from '../components/page/Section'
import { SideNav } from '../components/page/SideNav'
import { useStrings } from '../lib/i18n'
import { featureNavLabels, features } from '../lib/site'

export default function FeaturePage({ slug }: { slug: string }) {
  const { ui } = useStrings()
  const feature = features.find((f) => f.slug === slug)
  if (!feature) throw new Error(`Unknown feature ${slug}`)
  const nav = features.map((f) => ({ label: featureNavLabels[f.slug] ?? f.title, href: `/features/${f.slug}/`, current: f.slug === slug }))
  const related = feature.related.map((s) => {
    const f = features.find((x) => x.slug === s)
    if (!f) throw new Error(`Unknown related feature ${s} in ${slug}`)
    return { label: f.title, href: `/features/${f.slug}/` }
  })

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
      <Breadcrumbs
        items={[{ label: ui.home, href: '/' }, { label: ui.breadcrumbs.features, href: '/features/' }, { label: feature.title }]}
      />
      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <SideNav title={ui.feature.sideTitle} label="Feature pages" items={nav} className="order-2 lg:order-1">
          {ui.feature.sideNote}{' '}
          <a href="/#get-started" className="underline underline-offset-4 hover:text-fg">
            {ui.feature.sideNoteLink}
          </a>
        </SideNav>
        <article className="measure order-1 min-w-0 max-w-3xl lg:order-2">
          <PageIntro
            eyebrow={ui.feature.eyebrow}
            title={feature.title}
            lead={feature.intro}
            audience={feature.audience}
            forLabel={ui.forLabel}
          />
          {feature.sections.map((s, i) => (
            <Section key={s.heading} id={`section-${i + 1}`} heading={s.heading} items={s.items}>
              <p className={bodyText}>{s.body}</p>
            </Section>
          ))}
          <QaList title={ui.feature.questions} items={feature.questions} />
          <SourceList title={ui.feature.references} note={ui.feature.referencesNote} sources={feature.sources} />
          <NextStep {...ui.feature.next} />
          <LinkList title={ui.feature.related} items={related} />
        </article>
      </div>
    </div>
  )
}
