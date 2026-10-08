import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { LinkButton } from '../ui/button'

export function NextStep({ title, body, label, href }: { title: string; body: string; label: string; href: string }) {
  const Arrow = /^https?:/.test(href) ? IconArrowUpRight : IconArrowRight
  return (
    <section className="mt-12 rounded-2xl bg-muted p-6 md:p-8">
      <h2 className="heading text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-fg-3 text-lg">{body}</p>
      <LinkButton href={href} variant="solid" size="lg" className="mt-5">
        {label}
        <Arrow className="size-4" aria-hidden="true" />
      </LinkButton>
    </section>
  )
}
