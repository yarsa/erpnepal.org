import { IconArrowRight } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { Badge } from './ui/badge'

export function ExploreMore() {
  const { t } = useStrings()
  return (
    <section aria-labelledby="explore-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h2 id="explore-title" className="heading text-3xl md:text-4xl">
          {t.explore.title}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.explore.cards.map((card) => (
            <li key={card.title} className="card-link relative flex flex-col p-6">
              <div className="flex items-center gap-2 text-fg-4 text-sm">
                <ContentIcon name={card.icon} className="size-5 text-fg-2" />
                <span>{card.eyebrow}</span>
                {'badge' in card && card.badge && (
                  <Badge tone="amber" size="sm">
                    {card.badge}
                  </Badge>
                )}
              </div>
              <h3 className="heading mt-3 text-xl">
                <a href={card.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {card.title}
                </a>
              </h3>
              <p className="mt-2 text-fg-3">{card.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-medium text-fg" aria-hidden="true">
                {card.link} <IconArrowRight className="size-4" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
