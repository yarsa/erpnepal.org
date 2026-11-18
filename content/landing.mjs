// Landing pages for the main search terms. Each one answers the search directly,
// then links to the detailed feature pages and guides. Facts here must match the
// project README and the feature pages; review legal details with a professional.
const repo = 'https://github.com/yarsa/nepal-compliance'

export const landings = [
  {
    slug: 'accounting-software-nepal',
    seoTitle: 'Free Accounting Software for Nepal',
    title: 'Free accounting software for Nepal',
    description:
      'Free, open-source accounting software for Nepal on ERPNext: VAT registers and returns, IRD e-billing with CBMS, audit trails and Nepali dates.',
    eyebrow: 'Accounting software',
    answer:
      'Nepal Compliance turns ERPNext into free accounting software for Nepal, with VAT registers, IRD e-billing, CBMS sync, audit trails and Bikram Sambat dates.',
    audience: 'For accountants, finance teams and business owners in Nepal.',
    sections: [
      {
        heading: 'What you get',
        body: 'ERPNext already handles the general ledger, receivables, payables, stock and bank reconciliation. Nepal Compliance adds the parts a Nepali business needs on top, without a licence fee.',
        items: [
          'Sales and purchase VAT registers, including returns.',
          'A VAT return report for each period.',
          'Party-wise and monthly sales and purchase registers.',
          'IRD-style invoices: sequential numbers, no deletion and copy marking on reprints.',
          'Sync with the IRD Central Billing Monitoring System (CBMS).',
          'Bikram Sambat dates in forms, lists, reports and prints.',
        ],
      },
      {
        heading: 'Built for how Nepali accounts are reviewed',
        body: 'Accountants and auditors need to follow every figure back to a document. Invoices are cancelled rather than deleted, cancellations are listed in their own register, and the Audit Trail report shows who changed what and when. SQL query audit logs record database changes for deeper reviews.',
      },
      {
        heading: 'Reports your accountant will ask for',
        body: 'Most month-end questions come down to a handful of reports. Each one is filtered by period, party or company, and dates can be read in BS or AD.',
        items: [
          'VAT return report for the filing period.',
          'Sales and purchase VAT registers with returns.',
          'Balance confirmation for customers and suppliers.',
          'Landing cost reports for purchases.',
          'Materialized report for sales and purchases.',
        ],
      },
      {
        heading: 'Free, with costs you control',
        body: 'The app is open source under GPL-3.0 and has no licence fee. You pay only for what you choose: a server or hosting plan, help with setup, and support if your team needs it. Your data stays on a server you control, and you can change provider at any time.',
      },
      {
        heading: 'How to start',
        body: 'Install ERPNext and Frappe HR on a Frappe site, add the Nepal Compliance app, then set up your company, fiscal year and tax templates. Test a few real transactions, from entry to report to printout, before you move your books over.',
        items: [
          'Install with bench or the Docker image.',
          'Create the company and BS fiscal year.',
          'Set up VAT tax templates and the invoice print format.',
          'Run a sample month and compare it with your current books.',
        ],
      },
    ],
    questions: [
      {
        question: 'Is it really free?',
        answer: 'Yes. The app has no licence fee. Hosting, setup and support cost money if you buy them from a provider.',
      },
      {
        question: 'Does it replace ERPNext accounting?',
        answer: 'No. It adds Nepal-specific reports and controls on top of ERPNext accounting.',
      },
      {
        question: 'Can I keep using Nepali dates?',
        answer: 'Yes. Forms, lists, filters, reports and prints support Bikram Sambat dates.',
      },
      {
        question: 'Can I move from Excel or another system?',
        answer: 'Yes. ERPNext can import customers, suppliers, items and opening balances from spreadsheets.',
      },
      {
        question: 'Is it IRD certified?',
        answer: 'Yes. Nepal Compliance is IRD certified e-billing software with CBMS sync.',
      },
    ],
    features: ['accounting-and-vat', 'invoicing', 'audit-and-reports', 'nepali-dates'],
    guides: ['choosing-erp-software-nepal', 'vat-invoices-nepal', 'spreadsheet-to-erpnext'],
    sources: [
      { label: 'Nepal Compliance features (README)', url: `${repo}#accounting--billing` },
      { label: 'ERPNext accounting documentation', url: 'https://docs.frappe.io/erpnext/user/manual/en/accounts' },
    ],
  },
  {
    slug: 'payroll-software-nepal',
    seoTitle: 'Free Payroll Software for Nepal',
    title: 'Free payroll software for Nepal',
    description:
      'Free, open-source payroll software for Nepal on Frappe HR: SSF, EPF and CIT, tax slabs, gratuity, minimum salary, and leave on Nepali dates.',
    eyebrow: 'Payroll software',
    answer:
      'Nepal Compliance adds Nepal payroll to Frappe HR for free: SSF, EPF and CIT contributions, tax slabs by marital status, gratuity, and leave on Nepali dates.',
    audience: 'For HR teams, payroll staff and accountants in Nepal.',
    sections: [
      {
        heading: 'What you get',
        body: 'Frappe HR handles employees, salary structures and salary slips. Nepal Compliance adds the Nepal-specific rules, so each pay run follows local law and your company policy.',
        items: [
          'Social Security Fund (SSF) contributions.',
          "Employees' Provident Fund (EPF) contributions.",
          'CIT, insurance and other optional contributions.',
          'Income tax slabs by marital status and fiscal year.',
          'Grades, gratuity and minimum basic salary.',
          'Sick and home leave allocated from days worked.',
        ],
      },
      {
        heading: 'Contributions and tax slabs',
        body: 'Choose the contributions that apply to each employee. Tax slabs use the employee’s filing status, as an individual or a household, and the company fiscal year. Your payroll professional should confirm the slabs and rates at the start of each fiscal year.',
      },
      {
        heading: 'An example salary slip',
        body: 'With a basic salary of Rs 40,000 and allowances of Rs 10,000, gross pay is Rs 50,000. The employee SSF share of 11% of basic is Rs 4,400, leaving Rs 45,600 before income tax. The employer adds 20% of basic, Rs 8,000, to SSF. Check the current rates with your payroll professional.',
      },
      {
        heading: 'Leave and attendance on Nepali dates',
        body: 'Attendance, leave and holidays follow the Bikram Sambat calendar, and the fiscal year is allocated on Nepali dates. Sick and home leave are allocated from days worked, with maximum allowance checks, so leave balances stay in line with your policy.',
      },
      {
        heading: 'How to start',
        body: 'Set up employees with the required fields, create salary components and structures, then run one test month alongside your current payroll. Compare every slip before you switch.',
        items: [
          'Fill in the required employee fields.',
          'Choose contributions for each employee.',
          'Check tax slabs for the fiscal year.',
          'Run a parallel month and compare slips.',
        ],
      },
    ],
    questions: [
      {
        question: 'Is it a separate payroll app?',
        answer: 'No. It extends Frappe HR inside ERPNext, so payroll posts straight to your accounts.',
      },
      {
        question: 'Does it handle SSF and EPF?',
        answer: 'Yes. Choose SSF, EPF, CIT and other contributions for each employee.',
      },
      {
        question: 'Are tax slabs updated automatically?',
        answer: 'Slabs are set by fiscal year and filing status. Confirm them with your payroll professional each year.',
      },
      {
        question: 'Does it support biometric attendance?',
        answer: 'Biometric device support is in progress. Each device model needs its own check.',
      },
      {
        question: 'What does it cost?',
        answer: 'Nothing for the app. You pay only for hosting, setup and support if you need them.',
      },
    ],
    features: ['payroll', 'hr-and-leave', 'nepali-dates'],
    guides: ['payroll-setup-nepal', 'ssf-pf-cit-payroll', 'attendance-device-integration-guide'],
    sources: [
      { label: 'Nepal Compliance features (README)', url: `${repo}#hr--payroll` },
      { label: 'Frappe HR payroll documentation', url: 'https://docs.frappe.io/hr/payroll-setup' },
      { label: 'Social Security Fund, Nepal', url: 'https://ssf.gov.np/' },
    ],
  },
  {
    slug: 'ird-billing-software-nepal',
    seoTitle: 'IRD Certified Billing Software for Nepal',
    title: 'IRD certified billing software for Nepal',
    description:
      'Free IRD certified e-billing software for Nepal on ERPNext: CBMS sync, sequential invoice numbers, no deletion, copy marking and audit trails.',
    eyebrow: 'IRD billing software',
    answer:
      'Nepal Compliance is free, IRD certified e-billing software for ERPNext. Invoices sync with CBMS, are numbered in order, can be cancelled but never deleted, and reprints are marked as copies.',
    audience: 'For businesses that issue VAT invoices in Nepal.',
    sections: [
      {
        heading: 'What IRD-style billing needs',
        body: 'Billing software in Nepal must keep a complete, traceable record of every invoice. Nepal Compliance builds these controls into ERPNext.',
        items: [
          'Invoice numbers issued in chronological order.',
          'Cancellation instead of deletion, with a reason recorded.',
          '“Copy # of Original” printed on every reprint.',
          'A register of cancelled sales invoices.',
          'An audit trail of user activity.',
          'Sync with the IRD Central Billing Monitoring System (CBMS).',
        ],
      },
      {
        heading: 'CBMS sync',
        body: 'An administrator enters the CBMS credentials, the business PAN/VAT number and the service addresses, then switches the integration on. It starts disabled. Sales invoices and credit notes are submitted to CBMS, and each invoice shows its status and response, so failures are easy to find and retry.',
      },
      {
        heading: 'Cancellations and returns',
        body: 'Only the Accounts Manager role can cancel a sales invoice. Other users raise a return or credit note instead. Every cancellation appears in the Sales Cancellation Register, so reviewers can see what changed without hunting through documents.',
      },
      {
        heading: 'Printed invoices',
        body: 'The invoice print format shows Nepali dates and the details a tax invoice needs. The first print is the original; every later print is marked as a numbered copy.',
      },
      {
        heading: 'How to start',
        body: 'Install the app, set up your company and VAT templates, then test the full cycle with your accountant before you go live.',
        items: [
          'Issue, print and reprint a test invoice.',
          'Cancel one as Accounts Manager and check the register.',
          'Configure CBMS and confirm a successful response.',
          'Review the audit trail for the test documents.',
        ],
      },
    ],
    questions: [
      {
        question: 'Is it IRD certified?',
        answer: 'Yes. Nepal Compliance is IRD certified e-billing software with CBMS sync.',
      },
      {
        question: 'Is CBMS turned on automatically?',
        answer: 'No. It starts disabled until an administrator enters the credentials and enables it.',
      },
      {
        question: 'Does printing an invoice send it to CBMS?',
        answer: 'No. Submission is separate from printing. Check the recorded CBMS response on each invoice.',
      },
      {
        question: 'Can any user delete an invoice?',
        answer: 'No. Invoices are never deleted. Only the Accounts Manager role can cancel one.',
      },
      {
        question: 'What does it cost?',
        answer: 'The app is free. You pay only for hosting, setup and support if you need them.',
      },
    ],
    features: ['invoicing', 'cbms', 'audit-and-reports'],
    guides: ['vat-invoices-nepal', 'cbms-integration-nepal', 'qr-payment-reconciliation'],
    sources: [
      { label: 'Nepal Compliance features (README)', url: `${repo}#accounting--billing` },
      { label: 'CBMS integration technical reference', url: `${repo}/blob/master/nepal_compliance/cbms_api.py` },
      { label: 'Inland Revenue Department, Nepal', url: 'https://ird.gov.np/' },
    ],
  },
  {
    slug: 'vat-software-nepal',
    seoTitle: 'Free VAT Software for Nepal',
    title: 'Free VAT software for Nepal',
    description:
      'Free VAT software for Nepal on ERPNext: sales and purchase VAT registers with returns, VAT return report, party-wise and monthly registers.',
    eyebrow: 'VAT software',
    answer:
      'Nepal Compliance adds free VAT reporting to ERPNext: sales and purchase VAT registers with returns, a VAT return report, and party-wise and monthly registers.',
    audience: 'For VAT-registered businesses and their accountants in Nepal.',
    sections: [
      {
        heading: 'VAT registers and returns',
        body: 'Every VAT figure comes from the invoices and bills your team records in ERPNext. Review a period in the registers before you prepare the return.',
        items: [
          'Sales and sales return VAT register.',
          'Purchase and purchase return VAT register.',
          'VAT return report for the filing period.',
        ],
      },
      {
        heading: 'Review by party or month',
        body: 'Find the transactions behind a figure quickly, for one customer, one supplier or one month.',
        items: [
          'Party-wise sales and purchase registers.',
          'Monthly sales and purchase registers.',
          'Balance confirmation for customers and suppliers.',
        ],
      },
      {
        heading: 'A worked example',
        body: 'Say a month has taxable sales of Rs 2,40,000 and taxable purchases of Rs 1,50,000 at 13% VAT. Output VAT is Rs 31,200 and input VAT is Rs 19,500, so VAT payable is Rs 11,700. The VAT return report brings these figures together from the registers.',
      },
      {
        heading: 'Clean invoices make clean returns',
        body: 'VAT figures are only as good as the invoices behind them. Sequential numbering, cancellation instead of deletion and the Sales Cancellation Register keep the sales side complete, and CBMS sync records what was reported to IRD.',
      },
      {
        heading: 'How to start',
        body: 'Set up VAT tax templates for sales and purchases, record a sample month, then compare the registers and return report with your current figures.',
        items: [
          'Create sales and purchase tax templates at 13%.',
          'Record a month of real or sample transactions.',
          'Check the registers against your current books.',
          'Review the VAT return report with your accountant.',
        ],
      },
    ],
    questions: [
      {
        question: 'Does it file the VAT return for me?',
        answer: 'No. It prepares the registers and the return report; your accountant files the return.',
      },
      {
        question: 'Are sales returns included?',
        answer: 'Yes. The sales and purchase VAT registers include returns.',
      },
      {
        question: 'Can I see VAT for one customer?',
        answer: 'Yes. Party-wise registers show sales and purchases for each customer or supplier.',
      },
      {
        question: 'Can I read reports in Nepali dates?',
        answer: 'Yes. Reports can be filtered and read in Bikram Sambat dates.',
      },
      {
        question: 'What does it cost?',
        answer: 'The app is free. Hosting, setup and support cost extra only if you need them.',
      },
    ],
    features: ['accounting-and-vat', 'invoicing', 'cbms'],
    guides: ['vat-invoices-nepal', 'cbms-integration-nepal', 'choosing-erp-software-nepal'],
    sources: [
      { label: 'VAT Return Report technical reference', url: `${repo}/blob/master/nepal_compliance/nepal_compliance/report/vat_return_report/vat_return_report.py` },
      { label: 'Sales VAT Register technical reference', url: `${repo}/blob/master/nepal_compliance/nepal_compliance/report/sales_vat_register/sales_vat_register.py` },
      { label: 'Inland Revenue Department, Nepal', url: 'https://ird.gov.np/' },
    ],
  },
  {
    slug: 'erpnext-nepal',
    seoTitle: 'ERPNext for Nepal: Free Localization App',
    title: 'ERPNext for Nepal',
    description:
      'Make ERPNext fit Nepal with a free, open-source app: IRD e-billing and CBMS, VAT reports, SSF and EPF payroll, and Bikram Sambat dates.',
    eyebrow: 'ERPNext in Nepal',
    answer:
      'Nepal Compliance is a free, open-source app that localizes ERPNext and Frappe HR for Nepal: IRD e-billing with CBMS, VAT reports, Nepal payroll and Bikram Sambat dates.',
    audience: 'For ERPNext users, implementers and developers in Nepal.',
    sections: [
      {
        heading: 'Why ERPNext needs a Nepal app',
        body: 'ERPNext is a full, open-source ERP, but out of the box it does not know Nepali tax rules, payroll law or the Bikram Sambat calendar. Nepal Compliance adds them as a standard Frappe app, so you keep upgrading ERPNext as usual.',
      },
      {
        heading: 'What it adds',
        body: 'The app covers 32 of the 34 items on its compliance roadmap today.',
        items: [
          'Bikram Sambat dates in fields, lists, filters, reports and prints.',
          'IRD-style invoicing and CBMS sync.',
          'VAT registers, returns and audit reports.',
          'SSF, EPF and CIT contributions, tax slabs and gratuity.',
          'Leave and attendance on Nepali dates.',
        ],
      },
      {
        heading: 'Install in three steps',
        body: 'Add the app to a Frappe site that already runs ERPNext and Frappe HR. The installation guides list the supported versions.',
        // Renders the copyable install commands and the guide links (see LandingPage).
        install: true,
        steps: [
          'Set up a Frappe site with ERPNext and Frappe HR at a supported version.',
          'Run the two commands below from your bench folder, using your own site name.',
          'Set up your company, BS fiscal year, VAT templates and CBMS settings, then test one invoice from entry to print.',
        ],
        note: 'Prefer containers? The Docker guide runs the yarsalabs/nepal-compliance image with Docker Compose.',
      },
      {
        heading: 'Open source and community',
        body: 'The code is public on GitHub under GPL-3.0. Report issues, ask questions in GitHub Discussions, or contribute features. Add-ons connect ERPNext to Nepali services such as QR payments, SMS and attendance devices.',
      },
    ],
    questions: [
      {
        question: 'Does it work with my ERPNext version?',
        answer: 'Check the installation guide for the supported ERPNext and Frappe HR versions.',
      },
      {
        question: 'Will it block ERPNext upgrades?',
        answer: 'No. It is a standard Frappe app; test upgrades on a copy of your site first.',
      },
      {
        question: 'Can I use it without Frappe HR?',
        answer: 'The app expects ERPNext and Frappe HR together on the same site.',
      },
      {
        question: 'Is there a Docker image?',
        answer: 'Yes. Use yarsalabs/nepal-compliance from Docker Hub.',
      },
      {
        question: 'Who maintains it?',
        answer: 'Yarsa and open-source contributors, on GitHub.',
      },
    ],
    features: ['nepali-dates', 'invoicing', 'cbms', 'payroll'],
    guides: ['erpnext-hosting-backups', 'spreadsheet-to-erpnext', 'choosing-erp-software-nepal'],
    sources: [
      { label: 'Nepal Compliance on GitHub', url: repo },
      { label: 'Manual installation guide', url: `${repo}/blob/master/docs/manual-install.md` },
      { label: 'Docker installation guide', url: `${repo}/blob/master/docs/docker-install.md` },
    ],
  },
]
