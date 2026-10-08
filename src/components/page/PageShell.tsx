import type { ReactNode } from 'react'
import { useStrings } from '../../lib/i18n'
import { Breadcrumbs } from './Breadcrumbs'

/** Layout for the hand-written pages: breadcrumb, page header, then the body. */
export function PageShell({
  crumb,
  eyebrow,
  heading,
  lead,
  icon,
  children,
}: {
  crumb: string
  eyebrow: string
  heading: string
  lead: string
  icon?: string
  children: ReactNode
}) {
  const { ui } = useStrings()
  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:px-8">
      <Breadcrumbs items={[{ label: ui.home, href: '/' }, { label: crumb }]} />
      <header className="mt-8 max-w-3xl">
        <p className="text-fg-4 text-sm">{eyebrow}</p>
        <h1 className="heading mt-3 flex items-center gap-4 text-4xl md:text-6xl">
          {icon && <img src={icon} width="56" height="56" alt="" className="size-12 rounded-2xl md:size-14" />}
          {heading}
        </h1>
        <p className="mt-5 text-pretty text-fg-2 text-xl md:text-2xl">{lead}</p>
      </header>
      <div className="mt-6">{children}</div>
    </div>
  )
}

/** Body text styles for the hand-written pages (headings, paragraphs, lists, links). */
export const prose =
  'measure max-w-3xl text-fg-2 text-lg [&_a]:text-fg [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-fg [&_h2]:heading [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-fg [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-fg-4'
