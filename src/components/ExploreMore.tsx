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
            <li
              key={card.title}
              className="card-link group relative flex flex-col border-line p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-muted text-fg-2 transition-colors group-hover:bg-inverse group-hover:text-on-inverse">
                <ContentIcon name={card.icon} className="size-5" />
              </span>
              <div className="mt-6 flex items-center gap-2 font-medium text-fg-3 text-sm">
                <span>{card.eyebrow}</span>
                {'badge' in card && card.badge && (
                  <Badge tone="amber" size="sm">
                    {card.badge}
                  </Badge>
                )}
              </div>
              <h3 className="heading mt-1.5 text-xl">
                <a href={card.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {card.title}
                </a>
              </h3>
              <p className="mt-2 mb-6 text-fg-3">{card.body}</p>
              <span className="mt-auto flex items-center justify-between border-line border-t pt-4 font-medium text-fg" aria-hidden="true">
                {card.link}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
