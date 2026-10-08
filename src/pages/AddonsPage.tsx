import { CardGrid } from '../components/page/LinkCard'
import { PageShell } from '../components/page/PageShell'
import { addons } from '../lib/site'

export default function AddonsPage() {
  return (
    <PageShell
      crumb="Add-ons"
      eyebrow="Add-on integrations"
      heading="Connect the services your business already uses"
      lead="Optional integrations, agreed separately from the core app."
    >
      <CardGrid
        cards={addons.map((a) => ({
          eyebrow: a.category,
          title: a.shortTitle,
          body: a.description,
          href: `/addons/${a.slug}/`,
          link: 'Explore this integration',
        }))}
      />
    </PageShell>
  )
}
