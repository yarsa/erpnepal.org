// Research reviewed 2026-09-28. Worked examples are fictional, not statutory rates.
export const guidesPayroll = [
  {
    slug: 'payroll-setup-nepal',
    title: 'How to set up payroll for Nepal in ERPNext',
    description: 'A practical Nepal payroll setup guide covering salary structures, employee assignments, tax configuration, sample calculations, and the first payroll review.',
    category: 'Payroll',
    answer: 'Set up payroll in a test company, assign a dated salary structure to each employee, and check draft slips before paying.',
    sections: [
      {
        heading: 'Agree the rules first',
        paragraphs: [
          'Write down pay period, salaries, attendance policy, and contributions, each with an owner. Frappe HR examples are from India, not Nepal.',
        ],
        items: ['Current Nepal tax rules confirmed.', 'Opening earnings and tax if you start mid-year.', 'App versions recorded.'],
        sources: ['payroll-setup', 'payroll-settings'],
      },
      {
        heading: 'One structure, one assignment',
        paragraphs: [
          'Build salary components into a Salary Structure, then assign it to an employee with an effective date and tax slab.',
        ],
        sources: ['salary-structure', 'assignment', 'salary-component'],
      },
      {
        heading: 'Check a simple slip before adding tax',
        paragraphs: [
          'Test with fictional numbers first. If the result differs, check formulas and payment days.',
        ],
        table: { headers: ['Test line', 'NPR'], rows: [['Basic pay', '40,000'], ['Allowance', '5,000'], ['Gross earnings', '45,000'], ['Illustrative employee deduction', '2,000'], ['Net before tax and other adjustments', '43,000']] },
        sources: ['salary-component', 'income-tax', 'process-payroll'],
      },
    ],
    questions: [
      { question: 'Why is an employee missing from the payroll run?', answer: 'Check their status, joining date, and salary assignment dates.' },
      { question: 'Can I copy tax slabs from a tutorial?', answer: 'No. Your payroll reviewer approves the Nepal rules.' },
    ],
    sources: [
      { id: 'payroll-setup', label: 'Frappe HR: Payroll Setup', url: 'https://docs.frappe.io/hr/payroll-setup' },
      { id: 'payroll-settings', label: 'Frappe HR: Payroll Settings', url: 'https://docs.frappe.io/hr/payroll-settings' },
      { id: 'salary-structure', label: 'Frappe HR: Salary Structure', url: 'https://docs.frappe.io/hr/salary-structure' },
      { id: 'assignment', label: 'Frappe HR: Salary Structure Assignment Tool', url: 'https://docs.frappe.io/hr/salary-structure-assignment-tool' },
      { id: 'salary-component', label: 'Frappe HR: Salary Component', url: 'https://docs.frappe.io/hr/salary-component' },
      { id: 'income-tax', label: 'Frappe HR: Income Tax Slab', url: 'https://docs.frappe.io/hr/income-tax-slab' },
      { id: 'tax-deduction', label: 'Frappe HR: Setting Up Income Tax Deduction', url: 'https://docs.frappe.io/hr/setting-up-income-tax-deduction' },
      { id: 'process-payroll', label: 'Frappe HR: How to process Payroll', url: 'https://docs.frappe.io/hr/how-to-process-payroll-in-frappehr' },
    ],
    related: ['ssf-pf-cit-payroll', 'erpnext-hosting-backups'],
    featureLinks: [{ label: 'Nepal Compliance payroll features', path: 'features/payroll/' }, { label: 'HR and leave workflows', path: 'features/hr-and-leave/' }],
  },
  {
    slug: 'ssf-pf-cit-payroll',
    title: 'SSF, provident fund, and CIT payroll configuration explained',
    description: 'Understand how to separate employee deductions, employer costs, fund liabilities, and tax treatment when configuring SSF, provident fund, and CIT in payroll.',
    category: 'Payroll',
    answer: 'Confirm which scheme applies to each employee, then test how each amount affects net pay and the ledger.',
    sections: [
      {
        heading: 'Know the scheme',
        paragraphs: [
          'SSF, provident fund, and CIT are different arrangements. Record each employee’s scheme, basis, and effective date; this guide gives no statutory rates.',
        ],
        sources: ['ssf', 'cit'],
      },
      {
        heading: 'Keep four amounts separate',
        paragraphs: [
          'Combining these into one deduction makes slips and payments hard to reconcile.',
        ],
        table: { headers: ['Question', 'Check in the configuration'], rows: [['Does this reduce employee take-home pay?', 'Employee deduction and its approved basis'], ['Is this an additional employer cost?', 'Employer expense and fund liability posting'], ['Who must receive the money?', 'Fund account, employee identifier, and remittance record'], ['How does it affect taxable income?', 'Approved tax treatment, limits, and effective period']] },
        sources: ['components'],
      },
      {
        heading: 'Test the flow with fictional numbers',
        paragraphs: [
          'If net pay shows NPR 51,000, the employer amount was wrongly added to pay.',
        ],
        table: { headers: ['Test line', 'NPR'], rows: [['Gross earnings', '50,000'], ['Employee fund deduction', '3,000'], ['Employee net', '47,000'], ['Employer fund amount', '4,000'], ['Fund payable to reconcile', '7,000']] },
        sources: ['components', 'payroll-process', 'tax-setup'],
      },
    ],
    questions: [
      { question: 'Should every employee have SSF, PF, and CIT?', answer: 'No. Enable only the schemes each employee belongs to.' },
      { question: 'Does Nepal Compliance support these?', answer: 'Yes: EPF, SSF, CIT, and optional contributions.' },
    ],
    sources: [
      { id: 'ssf', label: 'Social Security Fund: official employer and contributor resources', url: 'https://ssf.gov.np/' },
      { id: 'cit', label: 'Citizen Investment Trust: official schemes and notices', url: 'https://www.nlk.org.np/' },
      { id: 'components', label: 'Frappe HR: Salary Component', url: 'https://docs.frappe.io/hr/salary-component' },
      { id: 'payroll-process', label: 'Frappe HR: How to process Payroll', url: 'https://docs.frappe.io/hr/how-to-process-payroll-in-frappehr' },
      { id: 'tax-setup', label: 'Frappe HR: Setting Up Income Tax Deduction', url: 'https://docs.frappe.io/hr/setting-up-income-tax-deduction' },
      { id: 'nepal-project', label: 'Nepal Compliance: payroll documentation', url: 'https://github.com/yarsa/nepal-compliance#key-features' },
    ],
    related: ['payroll-setup-nepal', 'erpnext-hosting-backups'],
    featureLinks: [{ label: 'Payroll contributions in Nepal Compliance', path: 'features/payroll/' }],
  },
  {
    slug: 'erpnext-hosting-backups',
    title: 'Self-hosting ERPNext: costs, security, and backups',
    description: 'Plan ERPNext hosting with a practical cost worksheet, restricted access, complete backups, and a restore drill before putting accounting or payroll into production.',
    category: 'Implementation',
    answer: 'Budget for the server, backups, updates, and an owner for recovery. Restore a full backup into a test site before going live.',
    sections: [
      {
        heading: 'Cost the work, not just the server',
        paragraphs: [
          'Monthly cost = server + backup storage + monitoring + admin time + support. Frappe recommends Docker for new production setups.',
        ],
        sources: ['production', 'installation'],
      },
      {
        heading: 'Limit access',
        paragraphs: [
          'Use individual accounts, restrict payroll and admin roles, and keep credentials out of repositories and tickets.',
        ],
        items: ['HTTPS on.', 'Two-factor login for staff (it does not cover API logins).', 'Accounts removed when staff leave.'],
        sources: ['two-factor', 'roles'],
      },
      {
        heading: 'Back up everything, then restore it',
        paragraphs: [
          'Run bench --site your-site.example backup --with-files and keep the encryption key safe and off the server. Then restore into an isolated test site.',
        ],
        items: ['Open a recent invoice and attachment.', 'Check payroll permissions.', 'Record how long the restore took.'],
        sources: ['backup', 'site-config', 'restore', 'site-assets'],
      },
    ],
    questions: [
      { question: 'Is a server snapshot enough?', answer: 'No. Prove you can restore the database, files, and keys.' },
      { question: 'How often should we test a restore?', answer: 'On a schedule, and after any hosting or app change.' },
    ],
    sources: [
      { id: 'production', label: 'Frappe Framework: Setup Production', url: 'https://docs.frappe.io/framework/user/en/bench/guides/setup-production' },
      { id: 'installation', label: 'Nepal Compliance: Docker installation guide', url: 'https://github.com/yarsa/nepal-compliance/blob/master/docs/docker-install.md' },
      { id: 'two-factor', label: 'ERPNext: Setup Two Factor Authentication', url: 'https://docs.frappe.io/erpnext/user/manual/en/setup-two-factor-authentication' },
      { id: 'roles', label: 'ERPNext: Role and Role Profile', url: 'https://docs.frappe.io/erpnext/role-and-role-profile' },
      { id: 'backup', label: 'Frappe Framework: bench backup', url: 'https://docs.frappe.io/framework/user/en/bench/reference/backup' },
      { id: 'site-config', label: 'Frappe Framework: site configuration and encryption keys', url: 'https://docs.frappe.io/framework/user/en/basics/site_config' },
      { id: 'restore', label: 'Frappe Framework: bench restore', url: 'https://docs.frappe.io/framework/user/en/bench/reference/restore' },
      { id: 'site-assets', label: 'Frappe Framework: public files, private files, and backups', url: 'https://docs.frappe.io/framework/user/en/basics/static-assets' },
    ],
    related: ['payroll-setup-nepal', 'ssf-pf-cit-payroll'],
    featureLinks: [{ label: 'Installation options', path: '#get-started' }, { label: 'Accounting and VAT features', path: 'features/accounting-and-vat/' }],
  },
];
