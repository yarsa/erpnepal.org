import { IconArrowUpRight } from '@tabler/icons-react'
import { homePath, useStrings } from '../lib/i18n'
import { Badge } from './ui/badge'

const isExternal = (href: string) => /^https?:/.test(href)
const link = 'inline-flex items-center gap-1 text-neutral-300 transition-colors hover:text-white dark:text-fg-3 dark:hover:text-fg'

export function SiteFooter() {
  const { locale, t, ui } = useStrings()
  const credit = t.footer.credit
  return (
    <footer className="bg-neutral-900 text-white dark:bg-subtle dark:text-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-xs">
          <a href={homePath[locale]} className="inline-flex items-center gap-2.5 font-medium text-lg">
            <img
              src="/assets/nepal-compliance.svg"
              width="28"
              height="28"
              alt=""
              className="rounded-md bg-white p-0.5 dark:bg-transparent dark:invert"
            />
            Nepal Compliance
          </a>
          <p className="mt-3 text-neutral-400 text-sm dark:text-fg-3">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav aria-label={ui.a11y.site}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
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
            <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
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
      <div className="border-neutral-700 border-t dark:border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-center text-neutral-400 text-sm md:px-8 dark:text-fg-3">
          {credit.before}
          <a
            href={credit.href}
            rel="noopener"
            className="text-neutral-200 underline decoration-neutral-600 underline-offset-4 transition-colors hover:text-white dark:text-fg-2 dark:decoration-line-strong dark:hover:text-fg"
          >
            {credit.name}
          </a>
          {credit.after}
        </p>
      </div>
    </footer>
  )
}
