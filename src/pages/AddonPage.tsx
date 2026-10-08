import { Breadcrumbs } from '../components/page/Breadcrumbs'
import { LinkList } from '../components/page/LinkList'
import { NextStep } from '../components/page/NextStep'
import { PageIntro } from '../components/page/PageIntro'
import { bodyText, QaList, Section, SourceList } from '../components/page/Section'
import { SideNav } from '../components/page/SideNav'
import { useStrings } from '../lib/i18n'
import { addons } from '../lib/site'

export default function AddonPage({ slug }: { slug: string }) {
  const { ui } = useStrings()
  const addon = addons.find((a) => a.slug === slug)
  if (!addon) throw new Error(`Unknown add-on ${slug}`)
  const nav = addons.map((a) => ({ label: a.shortTitle, href: `/addons/${a.slug}/`, current: a.slug === slug }))
  const related = addon.related.map((s) => {
    const a = addons.find((x) => x.slug === s)
    if (!a) throw new Error(`Unknown related add-on ${s} in ${slug}`)
    return { label: a.shortTitle, href: `/addons/${a.slug}/` }
  })

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
      <Breadcrumbs
        items={[{ label: ui.home, href: '/' }, { label: ui.breadcrumbs.addons, href: '/addons/' }, { label: addon.shortTitle }]}
      />
      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <SideNav title={ui.addon.sideTitle} label="Add-on pages" items={nav} className="order-2 lg:order-1">
          {ui.addon.sideNote}{' '}
          <a href="/features/" className="underline underline-offset-4 hover:text-fg">
            {ui.addon.sideNoteLink}
          </a>
          .
        </SideNav>
        <article className="measure order-1 min-w-0 max-w-3xl lg:order-2">
          <PageIntro
            eyebrow={`${addon.category} / ${ui.addon.eyebrowSuffix}`}
            title={addon.title}
            lead={addon.intro}
            audience={addon.audience}
            forLabel={ui.forLabel}
          />
          {addon.sections.map((s, i) => (
            <Section key={s.heading} id={`section-${i + 1}`} heading={s.heading} items={s.items}>
              <p className={bodyText}>{s.body}</p>
            </Section>
          ))}
          <QaList id="questions" title={ui.addon.questions} items={addon.questions} />
          <SourceList title={ui.addon.references} note={ui.addon.referencesNote} sources={addon.sources} />
          <NextStep {...ui.addon.next} />
          <LinkList title={ui.addon.related} items={related} />
        </article>
      </div>
    </div>
  )
}
