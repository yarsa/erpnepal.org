import { IconArrowUpRight } from '@tabler/icons-react'
import { homePath, useStrings } from '../lib/i18n'
import { Badge } from './ui/badge'

const isExternal = (href: string) => /^https?:/.test(href)
// min-h-10 gives each link a 40 px tap target without changing the look.
const link = 'inline-flex min-h-10 items-center gap-1 text-fg-3 transition-colors hover:text-fg'

export function SiteFooter() {
  const { locale, t, ui } = useStrings()
  const credit = t.footer.credit
  return (
    <footer className="inverse bg-surface text-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-xs">
          <a href={homePath[locale]} className="inline-flex items-center gap-2.5 font-medium text-lg">
            <img src="/assets/nepal-compliance.svg" width="28" height="28" alt="" className="invert" />
            Nepal Compliance
          </a>
          <p className="mt-3 text-fg-3 text-sm">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <nav aria-label={ui.a11y.site}>
            <ul className="flex flex-wrap gap-x-6 md:justify-end">
              {t.footer.site.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                    {'badge' in item && item.badge && (
                      <Badge tone="amber" size="sm" className="ml-1">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={ui.a11y.project}>
            <ul className="flex flex-wrap gap-x-6 md:justify-end">
              {t.footer.links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} rel={isExternal(item.href) ? 'noopener' : undefined} className={link}>
                    {item.label}
                    {isExternal(item.href) && <IconArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-line border-t">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-fg-3 text-sm md:px-8">
          {credit.before}
          <a
            href={credit.href}
            rel="noopener"
            className="text-fg-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
          >
            {credit.name}
          </a>
          {credit.after}
        </p>
      </div>
    </footer>
  )
}
