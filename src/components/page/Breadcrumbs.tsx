import { IconChevronRight } from '@tabler/icons-react'
import { Fragment } from 'react'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-fg-4 text-sm">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <li className="flex items-center gap-1.5">
              {i > 0 && <IconChevronRight className="size-3.5 text-fg-4" aria-hidden="true" />}
              {item.href ? (
                <a href={item.href} className="hover:text-fg">
                  {item.label}
                </a>
              ) : (
                <span aria-current="page" className="text-fg-2">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
