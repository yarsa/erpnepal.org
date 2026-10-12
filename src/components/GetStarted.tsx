import { IconArrowUpRight } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { Commands } from './Commands'
import { LinkButton } from './ui/button'

export function GetStarted() {
  const { t } = useStrings()
  const g = t.getStarted.technical
  return (
    <section id="get-started" className="bg-subtle" aria-labelledby="start-title">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div>
          <h2 id="start-title" className="heading text-3xl md:text-4xl">
            {t.getStarted.title}
          </h2>
          <p className="mt-3 text-fg-3 text-lg">{g.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={g.primary.href} variant="solid" size="lg">
              {g.primary.label}
              <IconArrowUpRight className="size-4" aria-hidden="true" />
            </LinkButton>
            <LinkButton href={g.secondary.href} size="lg">
              {g.secondary.label}
              <IconArrowUpRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
        <Commands className="min-w-0 shadow-lg" />
      </div>
    </section>
  )
}
