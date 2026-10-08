import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'
import en from './content/en.ts'
import ne from './content/ne.ts'
import type { Stats } from './lib/stats'
import AddonPage from './pages/AddonPage'
import AddonsPage from './pages/AddonsPage'
import FeaturePage from './pages/FeaturePage'
import FeaturesPage from './pages/FeaturesPage'
import ForYourBusinessPage from './pages/ForYourBusinessPage'
import GuidePage from './pages/GuidePage'
import GuidesPage from './pages/GuidesPage'
import HomePage from './pages/HomePage'
import NepalHrmsPage from './pages/NepalHrmsPage'
import NotFoundPage from './pages/NotFoundPage'
import type { PageComponent } from './pages/registry'
import type { PageKind, Route } from './routes'

const pages: Record<PageKind, PageComponent> = {
  home: HomePage,
  features: FeaturesPage,
  feature: FeaturePage,
  addons: AddonsPage,
  addon: AddonPage,
  guides: GuidesPage,
  guide: GuidePage,
  'for-your-business': ForYourBusinessPage,
  'nepal-hrms': NepalHrmsPage,
  'not-found': NotFoundPage,
}

export function render(route: Route, stats: Stats) {
  const Page = pages[route.kind]
  return renderToString(
    <StrictMode>
      <App locale={route.locale} copy={route.locale === 'ne' ? ne : en} stats={stats} path={route.path}>
        <Page slug={route.slug ?? ''} />
      </App>
    </StrictMode>,
  )
}

export { addons, features, guideDate, guides } from './lib/site'
export { notFound, routes, sections } from './routes'
export const homeNe = ne.t
