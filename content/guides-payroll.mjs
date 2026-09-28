// Research reviewed 2026-09-28. Worked examples are fictional, not statutory rates.
export const guidesPayroll = [
  {
    slug: 'payroll-setup-nepal',
    title: 'How to set up payroll for Nepal in ERPNext',
    description: 'A practical Nepal payroll setup guide covering salary structures, employee assignments, tax configuration, sample calculations, and the first payroll review.',
    category: 'Payroll',
    answer: 'Set up payroll in a test company first: confirm your payroll rules, create earnings and deductions, assign a dated salary structure to each employee, and reconcile draft salary slips before payment. Frappe HR provides the payroll workflow; Nepal-specific settings still need review for your installed app version and current requirements.',
    sections: [
      {
        heading: 'Prepare the payroll inputs before opening the form',
        paragraphs: [
          'Start with a short worksheet approved by the person responsible for payroll. Record the company, pay frequency, payroll period, employee joining dates, salary agreements, attendance policy, contribution arrangements, and bank details. Keep a named owner beside every rule. An unexplained spreadsheet formula should become a question for that owner, rather than a formula copied into the new system.',
          'Separate the period used for annual tax calculations from the dates of the monthly pay run. Frappe HR uses Payroll Period and Income Tax Slab documents where tax-slab calculation is required. Its general documentation contains examples from India; those examples are not Nepal tax instructions.'
        ],
        items: ['Confirm which current Nepal tax rules and employee classifications apply.', 'Record opening taxable earnings and tax deducted if migrating during a year.', 'Check the exact versions of Frappe, ERPNext, Frappe HR, and Nepal Compliance.'],
        sources: ['payroll-setup', 'payroll-settings']
      },
      {
        heading: 'Build one salary structure and assign it correctly',
        paragraphs: [
          'Create named Salary Components for basic pay, allowances, employee deductions, and tax. Give each a clear abbreviation and the appropriate company account. Decide which inputs are fixed amounts and which follow a formula. Then assemble those components into a Salary Structure with the correct company and payroll frequency.',
          'A structure is a template, not an employee assignment. Create a Salary Structure Assignment with its effective date and base amount, and select the applicable tax slab. Begin with one employee whose agreed salary is easy to check. Keep different structures where genuinely different pay rules would otherwise require a long chain of exceptions.'
        ],
        sources: ['salary-structure', 'assignment', 'salary-component']
      },
      {
        heading: 'Check a worked example before adding tax rules',
        paragraphs: [
          'Use this fictional arithmetic test to check that values reach the correct columns. Assume a full paid month, basic pay of NPR 40,000, an allowance of NPR 5,000, and an employee deduction of NPR 2,000. These are test inputs, not recommended salaries or statutory contribution amounts. Before income tax and other adjustments, the expected net amount is NPR 43,000.',
          'If the result differs, inspect the component formula, payment-day adjustment, and whether a component is included in the total. Add the approved tax and contribution rules only after this simple case agrees. Then test a mid-month joiner, unpaid leave, an additional payment, and a salary change separately. Keep the expected result beside each generated slip.'
        ],
        table: { headers: ['Test line', 'NPR'], rows: [['Basic pay', '40,000'], ['Allowance', '5,000'], ['Gross earnings', '45,000'], ['Illustrative employee deduction', '2,000'], ['Net before tax and other adjustments', '43,000']] },
        sources: ['salary-component']
      },
      {
        heading: 'Review tax setup and the first payroll batch',
        paragraphs: [
          'Frappe HR links an Income Tax Slab through the employee assignment. Its tax-deduction setting can calculate a component from taxable salary. The documentation warns that adding a condition and formula to that deduction can make those settings take precedence over slab calculation. Ask your implementer to demonstrate the actual route used in your version.',
          'Generate draft salary slips through Payroll Entry and review employee count, dates, earnings, deductions, and totals. Submitting payroll and recording a bank entry are accounting steps; they do not by themselves transfer money through your bank. Keep payment approval and bank confirmation in the reconciliation.'
        ],
        items: ['Compare each employee against the approved worksheet.', 'Investigate changes from the previous month before submission.', 'Match the payroll payable balance, payment list, and bank confirmation.', 'Save the review evidence and restrict who can change approved payroll rules.'],
        sources: ['income-tax', 'tax-deduction', 'process-payroll']
      }
    ],
    questions: [
      { question: 'Why is an employee missing from the payroll batch?', answer: 'Check the batch filters, employee status, joining date, and the effective salary assignment. Confirm the assignment belongs to the selected company and covers the pay period before recreating slips.' },
      { question: 'Can I copy tax slabs from a setup tutorial?', answer: 'Use a tutorial to understand the fields. Have your payroll reviewer approve the applicable Nepal rules and effective dates before entering real tax calculations.' }
    ],
    sources: [
      { id: 'payroll-setup', label: 'Frappe HR: Payroll Setup', url: 'https://docs.frappe.io/hr/payroll-setup' },
      { id: 'payroll-settings', label: 'Frappe HR: Payroll Settings', url: 'https://docs.frappe.io/hr/payroll-settings' },
      { id: 'salary-structure', label: 'Frappe HR: Salary Structure', url: 'https://docs.frappe.io/hr/salary-structure' },
      { id: 'assignment', label: 'Frappe HR: Salary Structure Assignment Tool', url: 'https://docs.frappe.io/hr/salary-structure-assignment-tool' },
      { id: 'salary-component', label: 'Frappe HR: Salary Component', url: 'https://docs.frappe.io/hr/salary-component' },
      { id: 'income-tax', label: 'Frappe HR: Income Tax Slab', url: 'https://docs.frappe.io/hr/income-tax-slab' },
      { id: 'tax-deduction', label: 'Frappe HR: Setting Up Income Tax Deduction', url: 'https://docs.frappe.io/hr/setting-up-income-tax-deduction' },
      { id: 'process-payroll', label: 'Frappe HR: How to process Payroll', url: 'https://docs.frappe.io/hr/how-to-process-payroll-in-frappehr' }
    ],
    related: ['ssf-pf-cit-payroll', 'erpnext-hosting-backups'],
    featureLinks: [{ label: 'Nepal Compliance payroll features', path: 'features/payroll/' }, { label: 'HR and leave workflows', path: 'features/hr-and-leave/' }]
  },
  {
    slug: 'ssf-pf-cit-payroll',
    title: 'SSF, provident fund, and CIT payroll configuration explained',
    description: 'Understand how to separate employee deductions, employer costs, fund liabilities, and tax treatment when configuring SSF, provident fund, and CIT in payroll.',
    category: 'Payroll',
    answer: 'Treat fund membership, payroll deductions, employer contributions, tax treatment, and payment as separate configuration decisions. Establish the employee’s applicable scheme first, then test how each amount affects net pay and the ledger. A component named SSF, PF, or CIT does not prove that its calculation or remittance is correct.',
    sections: [
      {
        heading: 'Identify the arrangement before choosing a formula',
        paragraphs: [
          'SSF refers to the Social Security Fund. PF usually describes a provident fund arrangement; record the actual fund and account rather than relying on the abbreviation. CIT is Citizen Investment Trust, which operates multiple schemes. These names are not interchangeable salary-component labels. The official SSF site provides separate employer and contributor access, while CIT publishes scheme information and notices.',
          'For each employee, collect the relevant membership details, applicable arrangement, approved contribution basis, employee amount or rate, employer amount or rate, effective date, and remittance reference. Ask the payroll reviewer to confirm eligibility, overlapping arrangements, limits, and tax treatment. This guide deliberately does not prescribe current statutory percentages or assume every employee participates in every scheme.'
        ],
        sources: ['ssf', 'cit']
      },
      {
        heading: 'Keep four different payroll questions visible',
        paragraphs: [
          'A useful setup worksheet separates what the employee earns, what is deducted from that pay, what the employer pays in addition, and what the organization owes to the fund. Combining all four into one deduction makes it difficult to explain the salary slip or reconcile a payment.',
          'Frappe HR supports earning and deduction components, formulas, and components that do not enter salary totals. Its statistical components can supply values to other formulas without adding an earning or deduction. Choose settings by the required accounting result, not by a component name. Displaying an employer amount on a slip is not evidence that a payable or expense was posted.'
        ],
        table: { headers: ['Question', 'Check in the configuration'], rows: [['Does this reduce employee take-home pay?', 'Employee deduction and its approved basis'], ['Is this an additional employer cost?', 'Employer expense and fund liability posting'], ['Who must receive the money?', 'Fund account, employee identifier, and remittance record'], ['How does it affect taxable income?', 'Approved tax treatment, limits, and effective period']] },
        sources: ['components']
      },
      {
        heading: 'Test deduction, employer cost, and payment separately',
        paragraphs: [
          'Consider a fictional payroll with NPR 50,000 in gross earnings, an approved employee fund deduction entered as NPR 3,000, and an employer amount entered as NPR 4,000. The numbers are chosen only to test accounting flow; they are not SSF, PF, or CIT rates. Ignore tax and other adjustments for this test.',
          'The expected employee net is NPR 47,000. The fund amount to reconcile is NPR 7,000, comprising both contributions. The employer cost in this simplified example is NPR 54,000. If the salary slip instead pays NPR 51,000, the employer contribution may have been incorrectly included in take-home earnings. If only NPR 3,000 reaches the fund payable, investigate the missing employer posting.',
          'After testing, replace the fictional inputs with reviewed rules. Reconcile the employee-level schedule to the fund payable and the actual payment confirmation. A submitted salary slip can establish payroll accounting without proving that a fund received money. Keep rejected or unmatched remittances visible until they are resolved.'
        ],
        sources: ['components', 'payroll-process']
      },
      {
        heading: 'Check tax behavior and changes of membership',
        paragraphs: [
          'Avoid assuming that a deduction automatically receives the intended tax treatment. Frappe HR exposes tax-related component settings and slab-based calculation, but the right Nepal treatment depends on the applicable rules and records. Have the reviewer trace one employee from gross pay through taxable income to tax deducted, including contributions already counted elsewhere.',
          'Retain an effective-date history when an employee changes arrangement or contribution instructions. Test the final month under the old setup and the first month under the new one. Do not simply rename a component used in historical payroll: a future reviewer should still be able to explain which fund and rule applied to each period.'
        ],
        items: ['Check one participating and one nonparticipating employee.', 'Check partial pay, a bonus, and an adjustment month.', 'Confirm no employee or employer amount is counted twice.', 'Match the employee identifier and period on the remittance schedule.'],
        sources: ['tax-setup']
      }
    ],
    questions: [
      { question: 'Should everyone have SSF, PF, and CIT deductions enabled?', answer: 'Do not enable them universally from their names. Confirm each employee’s applicable arrangements and instructions with your payroll reviewer, then configure and test those cases.' },
      { question: 'Does Nepal Compliance support these contribution workflows?', answer: 'Nepal Compliance supports EPF, SSF, CIT, and optional contributions. Confirm your employee arrangements, calculation settings, and payment records with your payroll reviewer.' }
    ],
    sources: [
      { id: 'ssf', label: 'Social Security Fund: official employer and contributor resources', url: 'https://ssf.gov.np/' },
      { id: 'cit', label: 'Citizen Investment Trust: official schemes and notices', url: 'https://www.nlk.org.np/' },
      { id: 'components', label: 'Frappe HR: Salary Component', url: 'https://docs.frappe.io/hr/salary-component' },
      { id: 'payroll-process', label: 'Frappe HR: How to process Payroll', url: 'https://docs.frappe.io/hr/how-to-process-payroll-in-frappehr' },
      { id: 'tax-setup', label: 'Frappe HR: Setting Up Income Tax Deduction', url: 'https://docs.frappe.io/hr/setting-up-income-tax-deduction' },
      { id: 'nepal-project', label: 'Nepal Compliance: payroll documentation', url: 'https://github.com/yarsa/nepal-compliance#key-features' }
    ],
    related: ['payroll-setup-nepal', 'erpnext-hosting-backups'],
    featureLinks: [{ label: 'Payroll contributions in Nepal Compliance', path: 'features/payroll/' }]
  },
  {
    slug: 'erpnext-hosting-backups',
    title: 'Self-hosting ERPNext: costs, security, and backups',
    description: 'Plan ERPNext hosting with a practical cost worksheet, restricted access, complete backups, and a restore drill before putting accounting or payroll into production.',
    category: 'Implementation',
    answer: 'Budget for an ERP server, storage, backup copies, monitoring, updates, and someone responsible for recovery. Before going live, restore a complete backup into an isolated test environment and verify records, files, and essential workflows. Free software licensing does not remove these operating responsibilities.',
    sections: [
      {
        heading: 'Price the operating work as well as the server',
        paragraphs: [
          'A useful hosting comparison begins with a workload: expected users, simultaneous activity, document volume, attached files, imports, and reporting jobs. Ask each provider or administrator to quote the same workload and explain who handles updates, failed jobs, backups, and recovery. A low server rental can leave all of that work with your team.',
          'Use monthly cost = infrastructure + backup storage and transfers + monitoring and messaging + administrator time + support allowance. For a planning example, write four maintenance hours multiplied by your agreed hourly cost, then add a separate recovery-test allowance. These are budgeting inputs, not a claim about the time your installation will require. Include a test environment in the comparison.',
          'Frappe’s production guide recommends Docker images for new production setups. Match the deployment method and app versions to the Nepal Compliance installation guidance. GitHub Pages can host this static website; the live ERP needs application services, a database, and background processing.'
        ],
        sources: ['production', 'installation']
      },
      {
        heading: 'Define who can access payroll and administration',
        paragraphs: [
          'Use individual accounts, restrict payroll and administrative roles, and test access with an ordinary user. Configure HTTPS and keep administrative infrastructure access limited to the people maintaining it. Assign an owner for account removal when staff leave. Keep production credentials out of project repositories, shared screenshots, and support tickets.',
          'Frappe documents role-based two-factor authentication, with an important limitation: its documented setup does not cover Web User or API logins. Inventory those access routes separately. A connected attendance device or payment integration should have only the access its job requires, with a recorded owner and a process for replacing exposed credentials.'
        ],
        sources: ['two-factor', 'roles']
      },
      {
        heading: 'Make a complete, recoverable backup set',
        paragraphs: [
          'Bench’s basic backup command creates a database dump. Its --with-files option includes public and private files. For example, an administrator can use bench --site your-site.example backup --with-files in the appropriate Bench environment. Confirm the actual output and the backup schedule; a command written in an operations note is not a running backup job.',
          'Protect site configuration and the encryption key as part of recovery planning. Frappe’s configuration documentation says the existing encryption key is needed after a restore to use saved passwords. If backup encryption is enabled, preserve that key too. Restrict access to these materials and retain a protected copy outside the failing server’s storage.',
          'Choose frequency from the records you can afford to recreate. A nightly backup may lose a working day after a late-afternoon failure. Separately agree how long the business can operate without the ERP. Document both targets and check whether the actual backup and restore process can meet them.'
        ],
        sources: ['backup', 'site-config']
      },
      {
        heading: 'Run a restore drill before trusting the plan',
        paragraphs: [
          'Restore into an isolated test environment using compatible application versions. Bench restore accepts the database backup and separate public-file and private-file archives. Frappe does not support site downgrades as a normal restore path, so record the application versions alongside each backup set. Do not use a restore drill to overwrite the working production site.',
          'Prevent the restored environment from sending real emails, payroll notifications, or integration requests. Then follow a small acceptance checklist and record the elapsed recovery time. A successful database import is only one step; the business needs a usable system and a clear handover to staff.'
        ],
        items: ['Open a recent invoice and a private attachment with an authorized test account.', 'Check payroll records and confirm an ordinary user cannot browse other employees’ pay.', 'Verify required configuration and safely test a background job.', 'Record backup age, restore duration, missing items, and the person approving the result.'],
        sources: ['restore', 'site-assets']
      }
    ],
    questions: [
      { question: 'Is a server snapshot enough?', answer: 'Treat it as one recovery layer. Also prove that your database, uploaded files, configuration, and required keys can be recovered into a usable installation. Test the exact recovery method you intend to rely on.' },
      { question: 'How often should we test recovery?', answer: 'Set a schedule based on business needs and repeat after material changes to hosting, applications, or backup configuration. Assign an owner and keep evidence of a successful restore.' }
    ],
    sources: [
      { id: 'production', label: 'Frappe Framework: Setup Production', url: 'https://docs.frappe.io/framework/user/en/bench/guides/setup-production' },
      { id: 'installation', label: 'Nepal Compliance: Docker installation guide', url: 'https://github.com/yarsa/nepal-compliance/blob/master/docs/docker-install.md' },
      { id: 'two-factor', label: 'ERPNext: Setup Two Factor Authentication', url: 'https://docs.frappe.io/erpnext/user/manual/en/setup-two-factor-authentication' },
      { id: 'roles', label: 'ERPNext: Role and Role Profile', url: 'https://docs.frappe.io/erpnext/role-and-role-profile' },
      { id: 'backup', label: 'Frappe Framework: bench backup', url: 'https://docs.frappe.io/framework/user/en/bench/reference/backup' },
      { id: 'site-config', label: 'Frappe Framework: site configuration and encryption keys', url: 'https://docs.frappe.io/framework/user/en/basics/site_config' },
      { id: 'restore', label: 'Frappe Framework: bench restore', url: 'https://docs.frappe.io/framework/user/en/bench/reference/restore' },
      { id: 'site-assets', label: 'Frappe Framework: public files, private files, and backups', url: 'https://docs.frappe.io/framework/user/en/basics/static-assets' }
    ],
    related: ['payroll-setup-nepal', 'ssf-pf-cit-payroll'],
    featureLinks: [{ label: 'Installation options', path: '#get-started' }, { label: 'Accounting and VAT features', path: 'features/accounting-and-vat/' }]
  }
];
