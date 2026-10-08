import { Breadcrumbs } from '../components/page/Breadcrumbs'
import { LinkList } from '../components/page/LinkList'
import { PageIntro } from '../components/page/PageIntro'
import { BulletList, QaList, SourceList } from '../components/page/Section'
import { SideNav } from '../components/page/SideNav'
import { useStrings } from '../lib/i18n'
import { guideDate, guides } from '../lib/site'

const published = new Date(`${guideDate}T00:00:00Z`).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

export default function GuidePage({ slug }: { slug: string }) {
  const { ui } = useStrings()
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) throw new Error(`Unknown guide ${slug}`)
  const cite = (id: string) => {
    const source = guide.sources.find((s) => s.id === id)
    if (!source) throw new Error(`Unknown source ${id} in guide ${slug}`)
    return source
  }
  const toc = [
    ...guide.sections.map((s, i) => ({ label: s.heading, href: `#section-${i + 1}` })),
    { label: ui.guide.questions, href: '#questions' },
    { label: ui.guide.sources, href: '#sources' },
  ]
  const related = guide.related.map((s) => {
    const g = guides.find((x) => x.slug === s)
    if (!g) throw new Error(`Unknown related guide ${s} in ${slug}`)
    return { label: g.title, href: `/guides/${g.slug}/` }
  })
  const projectPages = guide.featureLinks.map((l) => ({ label: l.label, href: `/${l.path}` }))

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
      <Breadcrumbs items={[{ label: ui.home, href: '/' }, { label: ui.breadcrumbs.guides, href: '/guides/' }, { label: guide.title }]} />
      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <SideNav title={ui.guide.sideTitle} label={ui.onThisPage} items={toc} className="hidden lg:block" />
        <article className="measure min-w-0 max-w-3xl">
          <PageIntro eyebrow={`${guide.category} / ${ui.guide.eyebrowSuffix}`} title={guide.title} lead={guide.answer}>
            <p className="mt-4 text-fg-4 text-sm">
              {ui.guide.byline} · <time dateTime={guideDate}>{published}</time> ·{' '}
              <a href="/guides/#editorial" className="underline underline-offset-4 hover:text-fg">
                {ui.guide.editorial}
              </a>
            </p>
          </PageIntro>

          <details className="mt-6 rounded-2xl border border-line-strong lg:hidden">
            <summary className="cursor-pointer list-none px-4 py-3 font-medium text-fg [&::-webkit-details-marker]:hidden">
              {ui.onThisPage}
            </summary>
            <nav aria-label={ui.onThisPage} className="flex flex-col gap-1 border-line-strong border-t p-3">
              {toc.map((item) => (
                <a key={item.href} href={item.href} className="rounded-lg px-2 py-1.5 text-fg-2 hover:bg-muted">
                  {item.label}
                </a>
              ))}
            </nav>
          </details>

          {guide.sections.map((s, i) => (
            <section key={s.heading} id={`section-${i + 1}`} className="pt-10">
              <h2 className="heading text-2xl md:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-fg-2 text-lg">
                  {p}
                </p>
              ))}
              {s.items && s.items.length > 0 && <BulletList items={s.items} />}
              {s.table && (
                // Browsers make scrollable regions keyboard-focusable themselves.
                <section
                  className="mt-5 overflow-x-auto rounded-2xl border border-line-strong"
                  aria-label={`${s.heading} ${ui.guide.tableSuffix}`}
                >
                  <table className="w-full min-w-[480px] text-left">
                    <caption className="sr-only">{s.heading}</caption>
                    <thead className="bg-subtle text-fg-3">
                      <tr>
                        {s.table.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row) => (
                        <tr key={row[0]} className="border-line-strong border-t align-top">
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={cell} scope="row" className="px-4 py-3 font-medium text-fg">
                                {cell}
                              </th>
                            ) : (
                              <td key={cell} className="px-4 py-3 text-fg-2">
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
              {s.sources && s.sources.length > 0 && (
                <p className="mt-4 text-fg-4 text-sm">
                  {ui.guide.references}{' '}
                  {s.sources.map((id, k) => (
                    <span key={id}>
                      {k > 0 && <span aria-hidden="true"> · </span>}
                      <a href={cite(id).url} rel="noopener" className="underline decoration-line-strong underline-offset-4 hover:text-fg">
                        {cite(id).label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </section>
          ))}

          <QaList id="questions" title={ui.guide.questions} items={guide.questions} />
          <SourceList id="sources" title={ui.guide.sources} note={ui.guide.sourcesNote} sources={guide.sources} />
          <LinkList title={ui.guide.related} items={related} />
          <LinkList title={ui.guide.projectPages} items={projectPages} />
        </article>
      </div>
    </div>
  )
}
