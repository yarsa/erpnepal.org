import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { loadCopy } from './lib/i18n'
import { emptyStats, type Stats } from './lib/stats'
import { loaders, type PageRef } from './pages/registry'
import './styles.css'

declare global {
  interface Window {
    __STATS__?: Stats
    __PAGE__?: PageRef
  }
}

function devPage(): PageRef {
  const path = window.location.pathname.replace(/^\//, '')
  const [section, slug] = path.split('/')
  const kinds: Record<string, PageRef['kind']> = { features: 'feature', addons: 'addon', guides: 'guide' }
  if (path === '' || path === 'ne/') return { kind: 'home', locale: path ? 'ne' : 'en', path }
  if (slug && kinds[section]) return { kind: kinds[section], slug, locale: 'en', path }
  return { kind: section as PageRef['kind'], locale: 'en', path }
}

const page = window.__PAGE__ ?? devPage()
const [copy, { default: Page }] = await Promise.all([loadCopy(page.locale), loaders[page.kind]()])
const root = document.getElementById('root') as HTMLElement
const app = (
  <StrictMode>
    <App locale={page.locale} copy={copy} stats={window.__STATS__ ?? emptyStats} path={page.path}>
      <Page slug={page.slug ?? ''} />
    </App>
  </StrictMode>
)

if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
