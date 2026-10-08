export const repo = 'https://github.com/yarsa/nepal-compliance'
const readme = `${repo}#readme`
const accounting = `${repo}#accounting--billing`
const hrPayroll = `${repo}#hr--payroll`
const basicSetup = `${repo}#basic-setup`

export default {
  // Dates verified with two converters (nepali-date-converter, bikram-sambat-js).
  dates: {
    invoice: { bs: '20 Ashwin 2083', ad: '6 Oct 2026' },
    fiscalStart: { bs: '1 Shrawan 2083', ad: '17 Jul 2026' },
    slipPeriod: { bs: 'Ashwin 2083', ad: 'Sep–Oct 2026' },
  },

  draft: '',
  hero: {
    eyebrow: 'Nepal\'s IRD Certified Software with CBMS',
    title: 'Open Source ERP for Nepal with HR, Payroll & Accounting ',
    lead: 'IRD-style invoicing, CBMS sync, VAT reports and Nepali dates.',
    primary: { label: 'See how it works', href: '#features' },
    secondary: { label: 'Install', href: '#get-started' },
  },
  proof: {
    label: 'Project facts',
    stars: 'GitHub stars',
    forks: 'Forks',
    pulls: 'Docker pulls',
    license: 'Licence',
    contributors: 'Contributors',
  },
  features: {
    title: 'What it does',
    lead: 'Pick a task. Cards use demo data.',
    dateLabel: 'Dates',
    calendar: { bs: 'BS', ad: 'AD' },
    tabsLabel: 'Feature',
    tabs: [
      {
        value: 'billing',
        icon: 'lucide-receipt',
        label: 'Bills and VAT',
        nepali: 'बिल र मूल्य अभिवृद्धि कर',
        points: [
          'Cancel, never delete. Reprints marked as copies.',
          'Each bill synced with IRD CBMS.',
          'VAT registers and the VAT return report.',
        ],
        link: '/features/invoicing/',
      },
      {
        value: 'payroll',
        icon: 'lucide-calculator',
        label: 'Payroll',
        nepali: 'तलब',
        points: [
          'Tax slabs by filing status.',
          'SSF, EPF and CIT contributions.',
          'Gratuity, grades and minimum salary.',
        ],
        link: '/features/payroll/',
      },
      {
        value: 'hr',
        icon: 'lucide-users',
        label: 'HR and leave',
        nepali: 'कर्मचारी र बिदा',
        points: [
          'Attendance, leave and holidays on Nepali dates.',
          'Sick and home leave from days worked.',
        ],
        link: '/features/hr-and-leave/',
      },
      {
        value: 'dates',
        icon: 'lucide-calendar-days',
        label: 'Nepali dates',
        nepali: 'विक्रम संवत्',
        points: [
          'BS dates in forms, lists and search.',
          'BS dates in reports and prints.',
        ],
        link: '/features/nepali-dates/',
      },
      {
        value: 'audit',
        icon: 'lucide-shield-check',
        label: 'Audit trails',
        nepali: 'अडिट ट्रेल',
        points: [
          'User activity and SQL query logs.',
          'Sales cancellation register.',
        ],
        link: '/features/audit-and-reports/',
      },
    ],
    docsLabel: 'How it works',
  },
  demo: {
    invoice: {
      heading: 'Tax invoice',
      number: 'SINV-2083-00042',
      customer: 'Demo Traders',
      dateLabel: 'Date',
      customerLabel: 'Customer',
      lines: [
        { label: 'Office chairs × 4', amount: '10,000.00' },
        { label: 'VAT 13%', amount: '1,300.00' },
      ],
      total: { label: 'Total (Rs)', amount: '11,300.00' },
      status: 'Synced to CBMS',
      copy: 'Copy 1 of original',
    },
    slip: {
      heading: 'Salary slip',
      lines: [
        { label: 'Basic salary', amount: '40,000' },
        { label: 'Allowances', amount: '10,000' },
        { label: 'Gross', amount: '50,000', strong: true },
        { label: 'SSF, employee 11% of basic', amount: '− 4,400' },
      ],
      total: { label: 'Net before income tax (Rs)', amount: '45,600' },
      note: 'Employer adds 20% SSF (8,000). Tax not shown.',
      chart: {
        title: 'Monthly cost of this employee (Rs)',
        center: 'Total cost',
        slices: [
          { label: 'Net pay', value: 45600 },
          { label: 'Employee SSF', value: 4400 },
          { label: 'Employer SSF', value: 8000 },
        ],
      },
    },
    leave: {
      heading: 'Leave balance',
      fiscalYear: 'Fiscal year 2083/84 started',
      rows: [
        { label: 'Days worked so far', value: '60' },
        { label: 'Home leave earned (1 per 20 days worked)', value: '3' },
        { label: 'Sick leave taken', value: '1' },
      ],
    },
    calendar: {
      heading: 'Same date, both calendars',
      rows: [
        { label: 'Invoice date', key: 'invoice' as const },
        { label: 'Fiscal year 2083/84 starts', key: 'fiscalStart' as const },
      ],
      note: 'The BS / AD switch flips every date.',
      bs: 'BS',
      ad: 'AD',
    },
    audit: {
      heading: 'Audit trail',
      rows: [
        { doc: 'SINV-2083-00041', action: 'Cancelled, reason recorded', user: 'accounts@demo' },
        { doc: 'SINV-2083-00042', action: 'Reprinted as copy 1', user: 'front-desk@demo' },
        { doc: 'SINV-2083-00042', action: 'Synced to CBMS', user: 'system' },
      ],
    },
    tag: 'Demo data',
    previewLabel: 'Product preview with demo data',
  },
  compliance: {
    title: 'Compliance Roadmap',
    lead: 'Each rule and how the app covers it. Rows link to the code.',
    chart: { title: 'Status', center: 'Rules' },
    columns: { rule: 'Rule', feature: 'How the app handles it', status: 'Status' },
    status: { supported: 'Supported', beta: 'Beta', progress: 'In Progress' },
    rows: [
      { rule: 'IRD e-billing', nepali: '', feature: 'No deleted bills; reprints marked as copies', status: 'supported', link: accounting },
      { rule: 'IRD CBMS', nepali: '', feature: 'Each bill synced with CBMS', status: 'supported', link: accounting },
      { rule: 'VAT', nepali: 'मूल्य अभिवृद्धि कर', feature: 'VAT registers and return report', status: 'supported', link: accounting },
      { rule: 'Audit trail', nepali: '', feature: 'User activity and SQL query logs', status: 'supported', link: accounting },
      { rule: 'Labour Act 2074', nepali: 'श्रम ऐन, २०७४', feature: 'Leave, minimum salary, gratuity', status: 'supported', link: hrPayroll },
      { rule: 'SSF and EPF', nepali: 'सामाजिक सुरक्षा कोष', feature: 'Payroll contributions', status: 'supported', link: hrPayroll },
      { rule: 'Income tax slabs', nepali: '', feature: 'Slabs by filing status', status: 'supported', link: hrPayroll },
      { rule: 'Bikram Sambat dates', nepali: 'विक्रम संवत्', feature: 'Forms, reports and prints', status: 'supported', link: basicSetup },
      { rule: 'Employee self-service', nepali: '', feature: 'Nepal HRMS app, in testing', status: 'beta', link: '' },
      { rule: 'Biometric attendance devices', nepali: '', feature: 'Model-by-model integration', status: 'progress', link: hrPayroll },
    ],
  },
  openSource: {
    title: 'Free and open source',
    lead: 'GPL-3.0. No licence fee.',
    free: {
      title: 'Free, always',
      items: [
        { icon: 'lucide-package', title: 'The app', body: 'No licence fee.' },
        { icon: 'lucide-git-branch', title: 'Updates and code', body: 'Public on GitHub.' },
        { icon: 'lucide-users', title: 'Community help', body: 'GitHub Discussions.' },
      ],
    },
    paid: {
      title: 'What you may pay for',
      items: [
        { icon: 'lucide-server', title: 'Hosting', body: 'A server for ERPNext.' },
        { icon: 'lucide-wrench', title: 'Setup', body: 'Your IT team or a partner.' },
        { icon: 'lucide-life-buoy', title: 'Support and training', body: 'From a provider you choose.' },
      ],
    },
    primary: { label: 'View on GitHub', href: repo },
    secondary: { label: 'Read the licence', href: `${repo}/blob/master/LICENSE` },
  },
  getStarted: {
    title: 'Get started',
    lead: 'Two ways in.',
    business: {
      title: 'I run a business',
      body: 'Your IT team or a partner installs it. Start with billing, then add payroll.',
      primary: { label: 'Ask the community', href: `${repo}/discussions` },
      secondary: { label: 'See the features', href: '#features' },
    },
    technical: {
      title: 'I set up Myself',
      body: 'Needs a Frappe site with ERPNext and Frappe HR.',
      commands: [
        'bench get-app https://github.com/yarsa/nepal-compliance.git',
        'bench --site your_site_name install-app nepal_compliance',
      ],
      copy: 'Copy',
      copied: 'Copied',
      copyFailed: 'Couldn’t copy. Select the commands instead.',
      primary: { label: 'Manual install guide', href: `${repo}/blob/master/docs/manual-install.md` },
      secondary: { label: 'Docker guide', href: `${repo}/blob/master/docs/docker-install.md` },
    },
  },
  faq: {
    title: 'Questions',
    items: [
      {
        q: 'Is it IRD compliant?',
        a: 'It follows IRD e-billing rules.',
      },
      {
        q: 'What does it cost?',
        a: 'No licence fee. Hosting, setup and support cost extra.',
      },
      {
        q: 'What do I need to run it?',
        a: 'A Frappe site with ERPNext and Frappe HR. See the install guide for versions.',
      },
      {
        q: 'Where can I get help?',
        a: 'GitHub Discussions or Issues. Community backed.',
      },
    ],
  },
  explore: {
    title: 'Explore more',
    cards: [
      { icon: 'lucide-plug', eyebrow: 'Add-ons', title: 'Connect your services', body: 'QR payments, SMS, attendance devices and more.', href: '/addons/', link: 'Browse add-ons' },
      { icon: 'lucide-book-open', eyebrow: 'Guides', title: 'Practical guides', body: 'Short answers on VAT, CBMS, payroll and migration.', href: '/guides/', link: 'Read the guides' },
      { icon: 'lucide-users', eyebrow: 'Nepal HRMS', badge: 'Beta', title: 'More HR tools are coming', body: 'Employee self-service and attendance, in beta.', href: '/nepal-hrms/', link: 'Preview Nepal HRMS' },
    ],
  },
  community: {
    title: 'Ask, share, contribute',
    body: 'A community project by Yarsa.',
    links: [
      { label: 'GitHub Discussions', href: `${repo}/discussions` },
      { label: 'Report an issue', href: `${repo}/issues` },
      { label: 'Contributing guide', href: `${repo}/blob/master/CONTRIBUTING.md` },
    ],
  },
  footer: {
    tagline: 'An app for ERPNext and Frappe HR.',
    // `name` is linked to `href`; the rest is plain text around it.
    credit: { before: 'A project by ', name: 'Yarsa', href: 'https://www.yarsalabs.com/', after: ' and contributors. Built on Frappe, ERPNext and Frappe HR.' },
    site: [
      { label: 'Features', href: '/features/' },
      { label: 'Add-ons', href: '/addons/' },
      { label: 'Guides', href: '/guides/' },
      { label: 'Nepal HRMS', badge: 'Beta', href: '/nepal-hrms/' },
      { label: 'For your business', href: '/for-your-business/' },
    ],
    links: [
      { label: 'GitHub', href: repo },
      { label: 'Discussions', href: `${repo}/discussions` },
      { label: 'Issues', href: `${repo}/issues` },
      { label: 'GPL-3.0 licence', href: `${repo}/blob/master/LICENSE` },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
    readme,
  },
  language: { en: 'EN', ne: 'नेपाली', soon: 'Only the homepage is in Nepali for now' },
}
