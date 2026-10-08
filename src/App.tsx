import type { ReactNode } from 'react'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { type Copy, type Locale, LocaleProvider, useStrings } from './lib/i18n'
import { type Stats, StatsProvider } from './lib/stats'

function Layout({ path, children }: { path: string; children: ReactNode }) {
  const { ui } = useStrings()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-inverse focus:px-3 focus:py-2 focus:text-on-inverse"
      >
        {ui.a11y.skip}
      </a>
      <SiteHeader path={path} />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  )
}

export function App({
  locale,
  copy,
  stats,
  path,
  children,
}: {
  locale: Locale
  copy: Copy
  stats: Stats
  path: string
  children: ReactNode
}) {
  return (
    <LocaleProvider locale={locale} copy={copy}>
      <StatsProvider stats={stats}>
        <Layout path={path}>{children}</Layout>
      </StatsProvider>
    </LocaleProvider>
  )
}
