import type { ComponentType } from 'react'
import type { Locale } from '../lib/i18n'
import type { PageKind } from '../routes'

export interface PageRef {
  kind: PageKind
  slug?: string
  locale: Locale
  path: string
}

export type PageComponent = ComponentType<{ slug: string }>

export const loaders: Record<PageKind, () => Promise<{ default: PageComponent }>> = {
  home: () => import('./HomePage'),
  features: () => import('./FeaturesPage'),
  feature: () => import('./FeaturePage'),
  addons: () => import('./AddonsPage'),
  addon: () => import('./AddonPage'),
  guides: () => import('./GuidesPage'),
  guide: () => import('./GuidePage'),
  'for-your-business': () => import('./ForYourBusinessPage'),
  'nepal-hrms': () => import('./NepalHrmsPage'),
  'not-found': () => import('./NotFoundPage'),
}
