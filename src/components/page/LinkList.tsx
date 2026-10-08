import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'

export function LinkList({ title, label, items }: { title: string; label?: string; items: { label: string; href: string }[] }) {
  return (
    <nav aria-label={label ?? title} className="pt-10">
      <h2 className="heading text-xl md:text-2xl">{title}</h2>
      <ul className="mt-4 border-line-strong border-t">
        {items.map((item) => {
          const external = /^https?:/.test(item.href)
          const Arrow = external ? IconArrowUpRight : IconArrowRight
          return (
            <li key={item.href} className="border-line-strong border-b">
              <a
                href={item.href}
                rel={external ? 'noopener' : undefined}
                className="flex items-center justify-between gap-4 py-3.5 text-fg-2 text-lg hover:text-fg hover:underline hover:underline-offset-4"
              >
                <span>{item.label}</span>
                <Arrow className="size-4 shrink-0 text-fg-4" aria-hidden="true" />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
