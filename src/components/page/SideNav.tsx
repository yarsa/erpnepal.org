import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function SideNav({
  title,
  label,
  items,
  className,
  children,
}: {
  title: string
  label: string
  items: { label: string; href: string; current?: boolean }[]
  className?: string
  children?: ReactNode
}) {
  return (
    <aside className={cn('lg:sticky lg:top-24 lg:self-start', className)}>
      <nav aria-label={label} className="border-fg border-t pt-4">
        <p className="mb-2 text-fg-4 text-sm">{title}</p>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={cn(
                  'block rounded-lg border-l-2 px-3 py-2 transition-colors',
                  item.current ? 'border-fg bg-muted font-medium text-fg' : 'border-transparent text-fg-3 hover:bg-subtle hover:text-fg',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children && <div className="mt-5 px-3 text-fg-4 text-sm">{children}</div>}
    </aside>
  )
}
