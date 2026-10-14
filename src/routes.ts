// Every page the site builds, with its metadata. The URL set matches the
// previous site, so existing links and search results keep working.
import type { Locale } from './lib/i18n'
import { addons, features, guides } from './lib/site'

export type PageKind = 'home' | 'features' | 'feature' | 'addons' | 'addon' | 'guides' | 'guide' | 'workflows' | 'nepal-hrms' | 'not-found'

export interface Route {
  /** Path without the leading slash: '' for the homepage, 'features/' … */
  path: string
  kind: PageKind
  slug?: string
  locale: Locale
  /** Page title before the site suffix. */
  title: string
  description: string
  /** Suffix after the title; false prints the title alone. */
  suffix: string | false
  /** Kept out of search and the sitemap. */
  noindex?: boolean
}

const site = ' | Nepal Compliance'
const guidesSuffix = ' | ERP Nepal Guides'

export const routes: Route[] = [
  {
    path: '',
    kind: 'home',
    locale: 'en',
    title: 'Free ERP Software for Nepal | IRD Billing, VAT & Payroll',
    description:
      'Free, open-source ERP for Nepal built on ERPNext: IRD e-billing with CBMS sync, VAT registers and returns, SSF and EPF payroll, and Nepali (BS) dates.',
    suffix: false,
  },
  {
    path: 'ne/',
    kind: 'home',
    locale: 'ne',
    title: 'नेपालका लागि निःशुल्क ERP सफ्टवेयर | IRD बिलिङ, भ्याट र तलब',
    description:
      'ERPNext मा बनेको निःशुल्क, खुला स्रोत ERP: CBMS सिंकसहित IRD ई-बिलिङ, भ्याट खाता र रिटर्न, SSF र EPF सहितको तलब, र विक्रम संवत् मिति।',
    suffix: false,
  },
  {
    path: 'features/',
    kind: 'features',
    locale: 'en',
    title: 'ERPNext Features for Nepal: VAT, IRD Billing and Payroll',
    description:
      'Every Nepal Compliance feature for ERPNext: VAT registers and returns, IRD invoice controls, CBMS sync, SSF and EPF payroll, leave, audit trails and BS dates.',
    suffix: site,
  },
  ...features.map(
    (f): Route => ({
      path: `features/${f.slug}/`,
      kind: 'feature',
      slug: f.slug,
      locale: 'en',
      title: f.title,
      description: f.description,
      suffix: site,
    }),
  ),
  {
    path: 'addons/',
    kind: 'addons',
    locale: 'en',
    title: 'ERPNext Add-ons for Nepal: QR Payments, SMS, Attendance',
    description:
      'Connect ERPNext to Nepali services: Fonepay and NEPALPAY QR, CORPORATEPAY, Sparrow SMS, NPI government payments, attendance devices and ecommerce.',
    suffix: site,
  },
  ...addons.map(
    (a): Route => ({
      path: `addons/${a.slug}/`,
      kind: 'addon',
      slug: a.slug,
      locale: 'en',
      title: a.title,
      description: a.description,
      suffix: site,
    }),
  ),
  {
    path: 'guides/',
    kind: 'guides',
    locale: 'en',
    title: 'ERP, VAT and Payroll Guides for Nepal',
    description:
      'Source-linked guides for Nepali businesses: choosing ERP software, VAT invoices, CBMS integration, payroll and SSF, QR payments, attendance and backups.',
    suffix: guidesSuffix,
  },
  ...guides.map(
    (g): Route => ({
      path: `guides/${g.slug}/`,
      kind: 'guide',
      slug: g.slug,
      locale: 'en',
      title: g.title,
      description: g.description,
      suffix: guidesSuffix,
    }),
  ),
  {
    path: 'workflows/',
    kind: 'workflows',
    locale: 'en',
    title: 'ERP Workflows for Nepali Shops, Services and Teams',
    description:
      'How shops, trading firms, service businesses and growing teams in Nepal run billing, VAT and payroll on ERPNext, and what to prepare before you start.',
    suffix: site,
  },
  {
    path: 'nepal-hrms/',
    kind: 'nepal-hrms',
    locale: 'en',
    title: 'Nepal HRMS: HR and Payroll Software for Nepal (Beta)',
    description:
      'Preview Nepal HRMS: employee self-service, attendance, leave, payroll, and reports. In beta testing ahead of its planned inclusion in Nepal Compliance.',
    suffix: site,
  },
]

export const notFound: Route = {
  path: '404.html',
  kind: 'not-found',
  locale: 'en',
  title: 'Page not found',
  description: 'This address has no page on erpnepal.org. The homepage has features, installation and project links.',
  suffix: site,
  noindex: true,
}

export function routeFor(pathname: string): Route {
  const path = pathname.replace(/^\//, '').replace(/index\.html$/, '')
  const withSlash = path && !path.endsWith('/') ? `${path}/` : path
  return routes.find((r) => r.path === withSlash) ?? notFound
}

/** Old paths kept as redirect pages, so existing links still land somewhere. */
export const redirects: Record<string, string> = {
  'for-your-business/': 'workflows/',
}

export const sections: Record<string, string> = {
  features: 'Features',
  addons: 'Add-ons',
  guides: 'Guides',
  workflows: 'Workflows',
  'nepal-hrms': 'Nepal HRMS',
}
