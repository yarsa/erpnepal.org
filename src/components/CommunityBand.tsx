import { useStrings } from '../lib/i18n'
import { LinkButton } from './ui/button'

export function CommunityBand() {
  const { t } = useStrings()
  return (
    <section aria-labelledby="community-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-6 rounded-3xl bg-muted p-6 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <h2 id="community-title" className="heading text-2xl">
              {t.community.title}
            </h2>
            <p className="mt-2 text-fg-3 text-lg">{t.community.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {t.community.links.map((link, i) => (
              <LinkButton key={link.href} href={link.href} variant={i === 0 ? 'solid' : 'outline'} size="lg">
                {link.label}
              </LinkButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
