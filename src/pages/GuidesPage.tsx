import { CardGrid } from '../components/page/LinkCard'
import { PageShell, prose } from '../components/page/PageShell'
import { guides } from '../lib/site'

export default function GuidesPage() {
  return (
    <PageShell
      crumb="Guides"
      eyebrow="ERP Nepal / Practical guides"
      heading="Working with ERP software in Nepal"
      lead="Short, sourced answers to common setup questions."
    >
      <CardGrid
        cards={guides.map((g) => ({
          eyebrow: g.category,
          title: g.title,
          body: g.description,
          href: `/guides/${g.slug}/`,
          link: 'Read guide',
        }))}
      />
      <div className={prose}>
        <h2 id="editorial">How these guides are made</h2>
        <p>
          Checked against the linked sources.{' '}
          <a href="https://github.com/yarsa/erpnepal.org/issues" rel="noopener">
            Report a correction
          </a>
          .
        </p>
      </div>
    </PageShell>
  )
}
