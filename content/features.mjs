const repository = 'https://github.com/yarsa/nepal-compliance';
const source = (label, path) => ({ label, url: `${repository}/blob/master/${path}` });
const checklist = { label: 'Project feature checklist', url: `${repository}#key-features` };

export const features = [
  {
    slug: 'accounting-and-vat',
    title: 'Nepal accounting and VAT reports for ERPNext',
    description: 'Review Nepal Compliance sales, purchase, return, and VAT reports for ERPNext, with customer and supplier registers and accounting setup considerations.',
    intro: 'Nepal Compliance adds accounting reports for businesses using ERPNext in Nepal. Its published feature list covers value-added tax (VAT) registers, sales and purchase summaries, return reports, and balance confirmation. These reports work alongside the transactions recorded in ERPNext.',
    audience: 'For accountants, finance teams, and implementation partners evaluating ERPNext for a business in Nepal.',
    sections: [
      { heading: 'VAT registers and returns', body: 'The app separates sales, purchases, and their returns into dedicated registers. This helps a finance team review the records behind a reporting period before preparing its tax work. The repository also includes a VAT Return Report.', items: ['Sales VAT Register and Sales Return VAT Register.', 'Purchase VAT Register and Purchase Return VAT Register.', 'VAT return reporting based on the accounting records in the system.'] },
      { heading: 'Review transactions by period and business partner', body: 'A business partner, called a party in ERPNext, can be a customer or supplier. The project lists reports organized by party and by month, so teams can examine a particular relationship or reporting period.', items: ['Party-wise sales and purchase registers.', 'Monthly sales and purchase registers.', 'Balance confirmation and purchase landing cost reports.'] },
      { heading: 'Prepare your accounting setup', body: 'Reports depend on the company, accounts, taxes, dates, and transactions configured in your installation. Review a sample reporting period against your existing records before adopting the reports for live work. The project notes that its feature checklist may lag the code, so confirm the reports available in your installed version.', items: ['Agree the company and fiscal period to review.', 'Check sample invoices, returns, and report totals with your accountant.', 'Use the linked source and installation guide to assess your version.'] },
    ],
    questions: [
      { question: 'Does the app replace ERPNext accounting?', answer: 'No. It extends ERPNext with Nepal-specific reports and workflows. ERPNext remains the underlying system for accounts and transactions.' },
      { question: 'Does generating a VAT report complete tax filing?', answer: 'A report is an input to your accounting work. Confirm its contents and the current filing process with your accountant; this website does not claim automatic filing or regulatory certification.' },
    ],
    related: ['invoicing', 'audit-and-reports', 'cbms'],
    sources: [checklist, source('VAT Return Report implementation', 'nepal_compliance/nepal_compliance/report/vat_return_report/vat_return_report.py'), source('Sales VAT Register implementation', 'nepal_compliance/nepal_compliance/report/sales_vat_register/sales_vat_register.py')],
  },
  {
    slug: 'invoicing',
    title: 'Nepal invoicing and billing controls for ERPNext',
    description: 'Explore sequential invoice numbering, cancellation records, invoice copy counts, and Nepali print templates in Nepal Compliance for ERPNext.',
    intro: 'Nepal Compliance adds local invoice controls to ERPNext. The project lists chronological invoice numbering, cancellation records, and copy counts on subsequent prints. These features help staff distinguish an original invoice, a later copy, and a cancelled transaction when reviewing billing records.',
    audience: 'For billing staff, accounts managers, and teams configuring invoice workflows in ERPNext.',
    sections: [
      { heading: 'Invoice numbers and printed copies', body: 'The project lists automatically incremented invoice numbers in chronological order. Its invoice print formats also support identifying subsequent copies. Review the selected print format and your numbering configuration together before issuing customer documents.', items: ['Sequential invoice numbering in the project feature list.', '“Copy # of Original” identification on subsequent invoice prints.', 'Invoice print formats with Nepal-specific fields and Nepali date support.'] },
      { heading: 'Cancellation and return records', body: 'The published workflow retains cancellation records rather than treating cancellation as deletion. The sales invoice override restricts cancellation to the Accounts Manager role and directs other users toward a return or credit note. Review this behavior with the people responsible for approving corrections.', items: ['Reports for viewing or printing cancelled invoices.', 'A Sales Cancellation Register for reviewing cancelled sales.', 'Activity audit trails alongside invoice records.'] },
      { heading: 'Check the complete billing workflow', body: 'Test invoice creation, submission, printing, reprinting, returns, and cancellation with sample transactions. Numbering and printed information should be checked in the version and company configuration you intend to use. Invoice creation and transmission to the Inland Revenue Department are separate steps; the CBMS integration has its own configuration.', items: ['Confirm which staff roles can create and cancel invoices.', 'Check your original and repeat invoice prints.', 'Review invoice records alongside VAT reports and any CBMS responses.'] },
    ],
    questions: [
      { question: 'Can every user cancel a sales invoice?', answer: 'The reviewed sales invoice override requires the Accounts Manager role for cancellation. Confirm permissions and behavior in your installed version before assigning billing responsibilities.' },
      { question: 'Does printing an invoice send it to CBMS?', answer: 'Printing and CBMS submission are different functions. Configure and test the billing integration separately, and check its recorded response rather than assuming a printed invoice was accepted.' },
    ],
    related: ['accounting-and-vat', 'cbms', 'audit-and-reports'],
    sources: [checklist, source('Sales invoice cancellation override', 'nepal_compliance/overrides/custom_sales_invoice.py'), source('Invoice print format', 'nepal_compliance/nepal_compliance/print_format/invoice_nepal_compliance/invoice_nepal_compliance.json')],
  },
  {
    slug: 'cbms',
    title: 'IRD CBMS integration for ERPNext in Nepal',
    description: 'Understand Nepal Compliance CBMS configuration, invoice and return submission code, recorded responses, and checks before connecting an ERPNext installation.',
    intro: 'Nepal Compliance includes integration code for the Inland Revenue Department’s Central Billing Monitoring System (CBMS). The integration prepares sales invoice and return data and records service responses. It requires configuration in your ERPNext installation and verification against the requirements that apply to your business.',
    audience: 'For accounts managers and administrators assessing an ERPNext connection to Nepal’s billing service.',
    sections: [
      { heading: 'Configure the connection', body: 'The CBMS Settings form includes an enable option, a username, a password, the business PAN/VAT number, and separate service addresses for sales and credit notes. The integration checks for these values before proceeding. Installing the app alone does not establish a working connection.', items: ['Enable CBMS configuration in the application settings.', 'Provide the relevant account credentials and business identifier.', 'Review the sales and credit note service configuration with your administrator.'] },
      { heading: 'Invoices, returns, and responses', body: 'The source contains payload preparation for sales invoices and returns, including fiscal year and Nepali invoice date information. It also contains handling for accepted, rejected, and unexpected responses, with status information stored on the invoice.', items: ['Separate sales invoice and credit note submission paths.', 'Recorded CBMS status and response information.', 'A function for queuing another attempt for invoices without a successful status.'] },
      { heading: 'Verify before live use', body: 'These are source-level capabilities, not an independent confirmation that a particular installation is connected or approved. Your administrator should check the installed version, credentials, invoice fields, background processing, and responses. A queued request is not proof that the billing service accepted an invoice.', items: ['Test the intended invoice and return workflow before relying on it.', 'Assign responsibility for reviewing failed or unexpected responses.', 'Confirm current operational requirements with your accountant and the relevant authority.'] },
    ],
    questions: [
      { question: 'Is CBMS enabled automatically?', answer: 'The reviewed settings define an enable option that is off by default. Credentials and other required values must be configured before the integration can proceed.' },
      { question: 'Does this website certify the integration?', answer: 'No. It describes the public project and its implementation. It does not claim IRD certification, successful live transmission, or regulatory approval for your installation.' },
    ],
    related: ['invoicing', 'accounting-and-vat', 'audit-and-reports'],
    sources: [source('CBMS integration implementation', 'nepal_compliance/cbms_api.py'), source('CBMS Settings fields', 'nepal_compliance/nepal_compliance/doctype/cbms_settings/cbms_settings.json'), checklist],
  },
  {
    slug: 'payroll',
    title: 'Nepal payroll configuration for ERPNext and Frappe HR',
    description: 'Review Nepal Compliance payroll contributions, salary components, tax slab configuration, gratuity, and employee grade support for Frappe HR.',
    intro: 'Nepal Compliance extends Frappe HR payroll with salary components and configuration for Nepal. The project lists provident fund, social security, optional contributions, tax slab allocation, and minimum basic salary configuration. The public source also includes gratuity and employee grade components.',
    audience: 'For payroll teams, accountants, and implementation partners configuring employee pay in Nepal.',
    sections: [
      { heading: 'Payroll contributions', body: 'The project covers several contribution arrangements. Their applicability depends on the employee and employer setup. Review which components belong in each salary structure before running payroll, and check the resulting amounts against your approved payroll calculations.', items: ['Employees Provident Fund (EPF) support.', 'Social Security Fund (SSF) support.', 'Citizen Investment Trust (CIT), insurance, and other optional contributions.'] },
      { heading: 'Salary components and tax slabs', body: 'Salary components are the earnings and deductions used to calculate pay. The repository contains components for basic salary, gratuity, contributions, and employee grade amounts. Its income tax slab setup includes conditions based on marital status, corresponding to the filing-status distinction in the feature checklist.', items: ['Minimum basic salary configuration listed by the project.', 'Gratuity and employee grade components in the source.', 'Income tax slab setup associated with company and fiscal year information.'] },
      { heading: 'Review payroll configuration for your period', body: 'The code contains configured formulas and tax slab values. Their presence does not establish that those values are current or appropriate for every employee. Check the effective fiscal period, salary structures, filing status, and contribution choices with the person responsible for payroll before using the results.', items: ['Test representative employee salary slips before a live pay run.', 'Review changes to tax rules and contribution arrangements separately from software installation.', 'Keep ERPNext, Frappe HR, and Nepal Compliance versions compatible with your chosen setup.'] },
    ],
    questions: [
      { question: 'Does Nepal Compliance provide a separate payroll application?', answer: 'No. It extends Frappe HR within an ERPNext installation. The installation guide requires ERPNext and Frappe HR to be installed before Nepal Compliance.' },
      { question: 'Are contribution rates and tax slabs guaranteed to stay current?', answer: 'This website makes no such guarantee. Review the installed configuration and the requirements for the relevant period with your payroll professional.' },
    ],
    related: ['hr-and-leave', 'accounting-and-vat', 'nepali-dates'],
    sources: [checklist, source('Salary component definitions', 'nepal_compliance/custom_code/payroll/salary_component.py'), source('Income tax slab setup', 'nepal_compliance/custom_code/payroll/income_tax_slab.py')],
  },
  {
    slug: 'hr-and-leave',
    title: 'Nepal employee records and leave for Frappe HR',
    description: 'Explore Nepal Compliance employee records, Nepali attendance and holiday dates, and sick and home leave allocation for ERPNext and Frappe HR.',
    intro: 'Nepal Compliance adds local human resources workflows to Frappe HR. The project lists required employee fields, attendance and holidays using Nepali dates, and automatic sick and home leave allocation based on working days. The source also includes configurable monthly leave allocation using the Bikram Sambat calendar.',
    audience: 'For human resources staff and administrators responsible for employee records, leave policies, and attendance.',
    sections: [
      { heading: 'Employee records and dates', body: 'Employee information supports both leave administration and payroll. The project lists mandatory fields in the employee database and Nepal-specific date handling. Review the records needed by your organisation before importing or updating employees.', items: ['Required employee fields listed in the project checklist.', 'Nepali dates for attendance, leave, and holiday records.', 'Fiscal year allocation based on Nepali dates.'] },
      { heading: 'Leave allocation', body: 'Allocation determines how much leave an employee can use. The checklist includes sick and home leave based on working days. The reviewed monthly allocation code uses a configured monthly amount and maximum allowance, and adds leave only to eligible active allocations.', items: ['Sick and home leave allocation in the published feature list.', 'A Bikram Sambat monthly allocation option for configured leave types.', 'Maximum allowance checks in the monthly allocation implementation.'] },
      { heading: 'Prepare policies and attendance inputs', body: 'Review leave types, allocation amounts, policy assignments, and employee start dates in a test installation. Check a sample employee’s leave record over the period you intend to use. Device-based attendance needs separate evaluation: biometric attendance compatibility remains marked as planned in the project checklist.', items: ['Confirm leave policies and amounts with your human resources team.', 'Check both initial allocations and subsequent monthly changes.', 'Verify attendance device compatibility before buying or connecting equipment.'] },
    ],
    questions: [
      { question: 'Does the app set every company’s leave policy?', answer: 'The app provides configuration and allocation workflows. Your organisation still needs to review its policies, employee records, and applicable requirements before using them.' },
      { question: 'Can I connect a fingerprint attendance device?', answer: 'The project marks biometric attendance compatibility as planned. This site does not present device integration as an available Nepal Compliance feature; confirm current support in the repository first.' },
    ],
    related: ['payroll', 'nepali-dates', 'audit-and-reports'],
    sources: [checklist, source('Monthly Nepali-calendar leave allocation', 'nepal_compliance/custom_code/leave_allocation/monthly_leave_bs.py'), source('Leave type configuration', 'nepal_compliance/custom_code/leave_type/leave_type.py')],
  },
  {
    slug: 'audit-and-reports',
    title: 'ERPNext audit trails and document history for Nepal',
    description: 'Review Nepal Compliance audit trails, document changes, SQL query audit logs, cancellation records, and materialized reports for ERPNext.',
    intro: 'Nepal Compliance includes reports for investigating recorded activity around ERPNext documents. Its feature checklist lists user activity audit trails, SQL query audit logs, and cancellation registers. The Audit Log implementation reads document version records and displays information about the recorded changes.',
    audience: 'For finance reviewers, accounts managers, and administrators investigating records in an ERPNext installation.',
    sections: [
      { heading: 'Activity and cancellation records', body: 'An audit trail helps a reviewer examine recorded changes or activity around business documents. The project includes an Audit Trail report and an Audit Log report, as well as a register for cancelled sales invoices. Review what each report captures in your installed version.', items: ['Audit trail records of user activities in the published checklist.', 'An Audit Trail report and SQL query audit logs.', 'Sales cancellation records that can be viewed or printed.'] },
      { heading: 'Investigate a document change', body: 'The Audit Log includes document type, document reference, modifying user, operation, and modification time. It can filter by document or modifying user and processes recorded field changes into old and new values. Supported document types include invoices, journal entries, payment entries, and stock records.', items: ['Find records by document reference or modifying user.', 'Review recorded field changes and modification times.', 'Examine submission and cancellation operations identified from version records.'] },
      { heading: 'Materialized reports and review scope', body: '“Materialized Report” is the name of a report in the project. Its source includes document, company, and party filters and reads sales and purchase records. Inspect the report’s available options with sample data to understand which records your configuration includes. Report availability does not establish that every action is captured or that records are tamper-proof.', items: ['Review report filters and reporting dates before comparing totals.', 'Compare a sample document with its related reports and history.', 'Agree access and review responsibilities with the system administrator.'] },
    ],
    questions: [
      { question: 'Are these reports a substitute for an audit?', answer: 'No. They provide records that can support review. The scope and conclusions of an audit depend on the reviewer, the business records, and the procedures used.' },
      { question: 'Will every project-listed report be in my installation?', answer: 'Check your installed version. The maintainers note that the public feature checklist may not stay synchronized with the code.' },
    ],
    related: ['accounting-and-vat', 'invoicing', 'cbms'],
    sources: [checklist, source('Audit Trail report', 'nepal_compliance/nepal_compliance/report/audit_trail/audit_trail.py'), source('Audit Log implementation', 'nepal_compliance/nepal_compliance/report/audit_log/audit_log.py'), source('Materialized Report implementation', 'nepal_compliance/nepal_compliance/report/materialized_report/materialized_report.py')],
  },
  {
    slug: 'nepali-dates',
    title: 'Bikram Sambat dates for ERPNext in Nepal',
    description: 'Explore Nepali date input, fiscal years, lists, filters, reports, and print templates in Nepal Compliance for ERPNext and Frappe HR.',
    intro: 'Nepal Compliance adds Bikram Sambat date support to ERPNext workflows. Bikram Sambat, often abbreviated BS, is Nepal’s calendar. The project lists support across fiscal years, input fields, lists, reports, and print templates, so staff can use Nepali dates in the business records they work with.',
    audience: 'For accounting, billing, and human resources teams that work with Nepal’s calendar.',
    sections: [
      { heading: 'Dates in forms and fiscal years', body: 'The feature checklist includes Nepali date fields and fiscal year support. A fiscal year is the accounting period used to organize financial records. Check your company’s fiscal year setup before creating or reviewing transactions in a new installation.', items: ['Nepali date support for fiscal years.', 'Nepali date input fields in supported forms.', 'Date handling used by related accounting and human resources workflows.'] },
      { heading: 'Find and review records', body: 'The project lists Nepali dates in lists, views, filters, sorting, and searching. This extends date support beyond entering a document: teams can also use date information when locating records or reviewing a reporting period.', items: ['Nepali date support in lists and views.', 'Date-aware filtering, sorting, and search in the project checklist.', 'Nepali dates in supported reports.'] },
      { heading: 'Printed documents and related workflows', body: 'Print template support allows Nepali dates to appear on documents. Attendance, holidays, payroll fiscal periods, and monthly leave allocation also use local date functionality in the project. Test the forms, reports, and print formats your team actually uses; support in the app does not imply that every custom field or third-party extension has been adapted.', items: ['Nepali dates in print templates.', 'Attendance and holiday records using local dates.', 'Bikram Sambat monthly leave allocation for configured leave types.'] },
    ],
    questions: [
      { question: 'Does Nepali date support cover custom forms automatically?', answer: 'This website makes no blanket claim for custom forms. Review the app’s supported fields and test any custom document types or extensions in your installation.' },
      { question: 'What should I check before using the date features?', answer: 'Check a sample transaction from entry through reports and printed output, including the fiscal period. Confirm the behavior in your installed version before changing live records.' },
    ],
    related: ['accounting-and-vat', 'invoicing', 'hr-and-leave'],
    sources: [checklist, source('Nepali date form overrides', 'nepal_compliance/public/js/nepali_date_override.js'), source('Report filter integration', 'nepal_compliance/public/js/report_filter.js'), source('Fiscal year date integration', 'nepal_compliance/public/js/wizard_fiscal_year_date.js')],
  },
];
