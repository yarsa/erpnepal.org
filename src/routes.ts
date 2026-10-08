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
    title: 'Nepal Compliance — IRD billing, VAT and Nepal payroll',
    description:
      'Open-source app that adds IRD-style billing, CBMS sync, VAT reports, Nepal payroll and Bikram Sambat dates to ERPNext and Frappe HR. No licence fee; runs on your own server.',
    suffix: false,
  },
  {
    path: 'ne/',
    kind: 'home',
    locale: 'ne',
    title: 'Nepal Compliance — IRD बिलिङ, भ्याट र तलब',
    description: 'IRD शैलीको बिलिङ, CBMS सिंक, भ्याट रिपोर्ट, नेपाली तलब र विक्रम संवत् मिति थप्ने खुला स्रोत एप । लाइसेन्स शुल्क छैन',
    suffix: false,
  },
  {
    path: 'features/',
    kind: 'features',
    locale: 'en',
    title: 'Features for accounting, billing, and payroll in Nepal',
    description:
      'Explore Nepal Compliance features for everyday business: VAT registers, invoice controls, payroll contributions, leave, audit records, and local dates.',
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
    title: 'Add-ons for payments, attendance, and business services',
    description:
      'Explore Nepal Compliance integration options for QR payments, CORPORATEPAY, SMS, attendance devices, ecommerce, and local business services.',
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
    title: 'Practical ERP, accounting, and payroll guides for Nepal',
    description:
      'Answers to practical questions about ERP software, VAT invoices, CBMS, payroll, payment reconciliation, attendance, migration, and backups in Nepal.',
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
    title: 'Is Nepal Compliance right for your business?',
    description:
      'See how Nepal Compliance can support a shop, trading business, service company, or growing team, and what to consider before choosing your setup.',
    suffix: site,
  },
  {
    path: 'nepal-hrms/',
    kind: 'nepal-hrms',
    locale: 'en',
    title: 'Nepal HRMS — HR and Payroll for Nepal (Beta)',
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
