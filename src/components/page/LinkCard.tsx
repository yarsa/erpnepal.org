import { IconArrowRight } from '@tabler/icons-react'
import { cn } from '../../lib/cn'
import { ContentIcon } from '../../lib/icons'
import { Badge } from '../ui/badge'

export interface Card {
  title: string
  body: string
  eyebrow?: string
  badge?: string
  href?: string
  link?: string
  icon?: string
  number?: string
}

/** The one card used by every directory and grid. Linked cards lift on hover. */
export function LinkCard({ card, headingLevel: Heading = 'h2', hidden }: { card: Card; headingLevel?: 'h2' | 'h3'; hidden?: boolean }) {
  const { title, body, eyebrow, badge, href, link, icon, number } = card
  const hasTop = Boolean(icon || number || eyebrow)
  return (
    <li
      hidden={hidden}
      className={cn('relative flex flex-col p-6', href ? 'card-link' : 'rounded-2xl border border-line-strong bg-surface')}
    >
      {hasTop && (
        <div className="flex items-center gap-2 text-fg-4 text-sm">
          {icon && <ContentIcon name={icon} className="size-5 text-fg-2" />}
          {number && <span className="tabular-nums">{number}</span>}
          {eyebrow && <span>{eyebrow}</span>}
          {badge && (
            <Badge tone="amber" size="sm">
              {badge}
            </Badge>
          )}
        </div>
      )}
      <Heading className={cn('heading text-xl', hasTop && 'mt-3')}>
        {href ? (
          <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {title}
          </a>
        ) : (
          title
        )}
      </Heading>
      <p className="mt-2 text-fg-3">{body}</p>
      {href && link && (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-medium text-fg" aria-hidden="true">
          {link} <IconArrowRight className="size-4" />
        </span>
      )}
    </li>
  )
}

export function CardGrid({ cards, headingLevel, className }: { cards: readonly Card[]; headingLevel?: 'h2' | 'h3'; className?: string }) {
  return (
    <ul className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {cards.map((card) => (
        <LinkCard key={card.title} card={card} headingLevel={headingLevel} />
      ))}
    </ul>
  )
}
