import { IconBrandGithub, IconMoon, IconStar, IconSun } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { repo } from '../content/home.en.ts'
import { cn } from '../lib/cn'
import { homePath, useStrings } from '../lib/i18n'
import { compact, useStats } from '../lib/stats'
import { MobileMenuSlot } from './MobileMenuSlot'
import { Button, LinkButton } from './ui/button'

// The next 6 am or 6 pm, when the automatic day/night theme takes over again.
function nextSwitch(now = new Date()) {
  const next = new Date(now)
  const hour = now.getHours()
  next.setHours(hour < 6 ? 6 : hour < 18 ? 18 : 30, 0, 0, 0)
  return next.getTime()
}

function toggleTheme() {
  const root = document.documentElement
  const dark = root.dataset.theme !== 'dark'
  if (dark) root.dataset.theme = 'dark'
  else delete root.dataset.theme
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    localStorage.setItem('themeUntil', String(nextSwitch()))
  } catch {}
}

export function SiteHeader({ path }: { path: string }) {
  const { locale, t, ui } = useStrings()
  const stats = useStats()
  const stars = stats.stars != null ? compact.format(stats.stars) : null

  // Transparent at the top so it blends with the hero; solid once scrolled.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Only the homepage has a Nepali version; elsewhere नेपाली is shown disabled with a hint.
  const isHome = path === '' || path === 'ne/'
  const isCurrent = (href: string) => path.startsWith(href.replace(/^\//, ''))
  const pill = (active: boolean) =>
    cn('rounded-full px-2.5 py-1', active ? 'bg-surface text-fg shadow-sm' : 'text-fg-3 transition-colors hover:text-fg')

  return (
    <header
      className={cn(
        'sticky top-0 z-30 border-b transition-colors duration-200',
        scrolled ? 'border-line bg-page/90 backdrop-blur' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-5 md:gap-8 md:px-8">
        <a href={homePath[locale]} className="flex min-w-0 items-center gap-2 font-medium text-base text-fg sm:gap-2.5 sm:text-lg">
          <img src="/assets/nepal-compliance.svg" width="28" height="28" alt="" className="shrink-0 dark:invert" />
          <span className="truncate">Nepal Compliance</span>
        </a>

        {/* The full nav needs ~1040 px beside the controls, so it starts at xl. */}
        <nav aria-label={ui.a11y.main} className="hidden h-full items-stretch gap-6 xl:flex">
          {ui.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={cn(
                '-mb-px flex items-center whitespace-nowrap border-b-2 text-sm transition-colors hover:text-fg',
                isCurrent(item.href) ? 'border-fg font-medium text-fg' : 'border-transparent text-fg-3',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <nav className="hidden items-center rounded-full bg-muted p-0.5 text-sm sm:flex" aria-label={ui.a11y.language}>
            {(['en', 'ne'] as const).map((l) =>
              l === locale ? (
                <span key={l} lang={l} aria-current="true" className={pill(true)}>
                  {t.language[l]}
                </span>
              ) : isHome || l === 'en' ? (
                <a key={l} href={homePath[l]} lang={l} hrefLang={l} className={pill(false)}>
                  {t.language[l]}
                </a>
              ) : (
                <span
                  key={l}
                  lang={l}
                  aria-disabled="true"
                  title={t.language.soon}
                  className="cursor-default rounded-full px-2.5 py-1 text-fg-4"
                >
                  {t.language[l]}
                  <span className="sr-only"> ({t.language.soon})</span>
                </span>
              ),
            )}
          </nav>

          {/* Both icons render; CSS shows the right one, so server HTML matches any saved theme. */}
          <Button
            variant="ghost"
            size="icon"
            className="max-sm:hidden"
            aria-label={ui.a11y.theme}
            title={ui.a11y.theme}
            onClick={toggleTheme}
          >
            <IconMoon className="size-4 dark:hidden" aria-hidden="true" />
            <IconSun className="hidden size-4 dark:block" aria-hidden="true" />
          </Button>

          <a
            href={repo}
            rel="noopener"
            aria-label={stars ? `${ui.a11y.github}, ${stars} ${ui.a11y.stars}` : ui.a11y.github}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-fg-2 text-sm transition-colors hover:bg-muted hover:text-fg"
          >
            <IconBrandGithub className="size-4" aria-hidden="true" />
            {stars && (
              <span className="hidden items-center gap-1 tabular-nums sm:inline-flex" aria-hidden="true">
                <IconStar className="size-3.5" />
                {stars}
              </span>
            )}
          </a>

          <LinkButton href={locale === 'ne' ? '/ne/#get-started' : ui.install.href} variant="solid" className="sm:ml-1">
            {ui.install.label}
          </LinkButton>

          <MobileMenuSlot toggleTheme={toggleTheme} showLanguage={isHome} />
        </div>
      </div>
    </header>
  )
}
