const source = (id, label, url) => ({ id, label, url });
const project = source('project', 'Nepal Compliance public repository', 'https://github.com/yarsa/nepal-compliance');
const taxes = source('taxes', 'ERPNext tax configuration', 'https://docs.frappe.io/erpnext/setting-up-taxes');
const invoice = source('invoice', 'ERPNext Sales Invoice documentation', 'https://docs.frappe.io/erpnext/sales-invoice');
const cbmsCode = source('cbms-code', 'Nepal Compliance CBMS implementation', 'https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/cbms_api.py');
const cbmsSettings = source('cbms-settings', 'Nepal Compliance CBMS Settings fields', 'https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/doctype/cbms_settings/cbms_settings.json');
const ird = source('ird', 'IRD CBMS technical documentation notice', 'https://ird.gov.np/content/9052/cbmsapitechnicaldocumentfor/');

export const guidesAccounting = [
  {
    slug: 'choosing-erp-software-nepal',
    title: 'How to choose ERP or accounting software for a business in Nepal',
    description: 'A practical evaluation checklist for Nepal businesses: test real transactions, local accounting requirements, migration, support, and total operating costs.',
    category: 'Choosing software',
    answer: 'Choose software by testing your actual sales, purchase, payment, and reporting workflows. Compare the full cost of running it, the evidence behind Nepal-specific features, and the people responsible for setup and support before committing to a migration.',
    sections: [
      {
        heading: 'Start with the work your team needs to complete',
        paragraphs: [
          'Write down the five tasks that currently cause the most repeated entry or uncertainty. Examples might include matching customer payments, finding stock available at another location, preparing a monthly sales register, or checking who approved a correction. Give each task an owner and a concrete example.',
          'A business that mainly needs invoices and account balances may need a different implementation scope from a distributor coordinating purchasing, warehouses, sales orders, and accounts. ERPNext brings several business functions into one system; that breadth is useful only if your team can configure and operate the workflows it selects.',
        ],
        items: ['Separate requirements needed at launch from later improvements.', 'List the records each team creates and the reports another team needs.', 'Include difficult cases, such as returns and partial payments, in the evaluation.'],
        sources: ['setup'],
      },
      {
        heading: 'Use a small transaction pack for every demonstration',
        paragraphs: [
          'Prepare the same fictional customer, supplier, and products for each candidate. Ask the demonstrator to record a purchase, sell part of the stock, receive a partial payment, and process a return. Your accountant should be able to follow the result from the original document to the account balance.',
          'For example, a retailer buys ten units and sells three on credit. One unit is returned after a partial payment. The demonstration should make the remaining stock, customer balance, and return reference understandable. This is an evaluation exercise, not a prescribed accounting treatment.',
        ],
        table: { headers: ['Check', 'Evidence to request'], rows: [['Billing', 'Invoice, return reference, and printed customer copy'], ['Accounting', 'Transaction entries and the remaining customer balance'], ['Operations', 'Stock movement or service completion record'], ['Review', 'Who can approve, correct, and inspect the transaction']] },
        sources: ['invoice'],
      },
      {
        heading: 'Ask what “Nepal support” includes',
        paragraphs: [
          'Ask for the installed app names and versions, the reports demonstrated, and the configuration still required. Nepal Compliance supports local registers, invoice controls, Nepali dates, and CBMS integration. Test the workflows in the version you intend to use, with your own sample transactions.',
          'Keep three questions separate: can the software represent your workflow, has your installation been configured correctly, and have the current requirements for your business been confirmed? A product name, a local calendar, or a successful demonstration cannot answer all three.',
        ],
        items: ['Request a sample report produced from your demonstration transactions.', 'Identify any separate add-on, provider enrollment, or custom development.', 'Ask your accountant which current invoicing and reporting requirements need verification.'],
        sources: ['project', 'taxes'],
      },
      {
        heading: 'Compare migration and operating responsibilities',
        paragraphs: [
          'A usable budget includes data preparation, configuration, training, hosting, maintenance, and support. Ask who fixes an incorrect opening balance, restores a backup, or investigates a failed integration after launch. Obtain a written scope with exclusions and acceptance examples.',
          'ERPNext supports importing records from spreadsheets, but a spreadsheet import does not decide whether old account codes, duplicate customers, or outstanding balances are correct. Try a small import first and reconcile its results. Decide which history must move and which records can remain in a searchable archive.',
        ],
        items: ['Assign one business owner for migration decisions.', 'Agree a cutover date and a way to compare opening balances.', 'Ask for a demonstrated data export and backup recovery process.', 'Record who maintains custom changes when the underlying software changes.'],
        sources: ['import'],
      },
      {
        heading: 'Make the decision from a completed pilot',
        paragraphs: [
          'Score the candidates after the same staff members complete the same tasks. Record failed cases and manual workarounds beside the successful ones. A short pilot that exposes a missing approval or confusing return process is more useful than a long feature checklist.',
          'Before approval, collect the sample outputs, unresolved questions, migration plan, cost assumptions, and support responsibilities in one document. Proceed when the people who will operate the system can explain the workflow and the remaining work has a clear owner.',
        ],
        sources: [],
      },
    ],
    questions: [
      { question: 'Is free software free to run?', answer: 'A software license may carry no fee while hosting, implementation, training, maintenance, and support still require a budget. Compare these costs across the same scope.' },
      { question: 'Should a small business start with every ERP module?', answer: 'Start with the workflows needed to keep records reliable. Expand after the team can operate and reconcile them; additional modules should solve a specific business need.' },
    ],
    sources: [source('setup', 'ERPNext setup documentation', 'https://docs.frappe.io/erpnext/setting-up'), invoice, project, taxes, source('import', 'ERPNext Data Import documentation', 'https://docs.frappe.io/erpnext/data-import')],
    related: ['vat-invoices-nepal', 'cbms-integration-nepal'],
    featureLinks: [{ label: 'Accounting and VAT features', path: 'features/accounting-and-vat/' }, { label: 'Invoice controls', path: 'features/invoicing/' }],
  },
  {
    slug: 'vat-invoices-nepal',
    title: 'VAT invoice setup in ERPNext: checks for a Nepal business',
    description: 'Check ERPNext company records, tax templates, invoice output, returns, and report totals before using a Nepal VAT billing setup in production.',
    category: 'Accounting and billing',
    answer: 'Check the underlying records, tax calculation, accounting entry, printed invoice, and reporting result together. Have the applicable Nepal tax treatment confirmed before configuring it, then test representative invoices and returns in a separate installation.',
    sections: [
      {
        heading: 'Agree the expected result before entering settings',
        paragraphs: [
          'Collect the business identity, registration details, customer information, item descriptions, numbering requirements, and invoice presentation your billing process needs. Ask the person responsible for tax work to confirm the applicable treatment, including any special cases. This guide is a software-checking procedure, not a complete statement of Nepal invoice law.',
          'Make one approved sample for each genuine transaction type. If your business sells only one category of goods, keep the test set small. If it also has discounts, different tax treatments, delivery charges, or foreign-currency sales, include those cases explicitly rather than assuming the default template covers them.',
        ],
        items: ['Record the expected taxable amount, tax, and total for each sample.', 'Specify which details should appear on the customer copy.', 'Identify the accounting period and company being tested.'],
        sources: ['taxes'],
      },
      {
        heading: 'Understand the records that determine the calculation',
        paragraphs: [
          'ERPNext uses tax accounts and transaction templates, with categories and rules helping select the appropriate setup. Item Tax Templates can supply item-specific treatment. Check the selected records rather than relying on a template name such as “VAT.”',
          'For example, two items may need different treatment on the same bill. A correct grand total on an ordinary single-item invoice does not prove that this mixed invoice is configured correctly. Check each line and the resulting tax account. Use the current documentation for your version because selection behavior can differ between releases.',
        ],
        table: { headers: ['Record', 'Question to answer'], rows: [['Company and accounts', 'Will the amounts post to the intended company and accounts?'], ['Transaction tax template', 'Does each row use the approved calculation and account?'], ['Tax category and rule', 'Why was this template selected for this transaction?'], ['Item Tax Template', 'Does this item require a different treatment?']] },
        sources: ['tax-overview', 'item-tax'],
      },
      {
        heading: 'Review the invoice before and after submission',
        paragraphs: [
          'In a test installation, prepare the invoice and review quantities, units, rates, discounts, charges, dates, customer details, and totals. ERPNext distinguishes a draft from a submitted Sales Invoice, so review the posted result as well as the draft screen.',
          'Print the customer copy and compare it with the saved record. Long customer names, several item lines, and multi-page output can reveal problems that a short sample hides. Ask a staff member who did not configure the template to find the invoice number, total, and relevant business details without help.',
        ],
        items: ['Compare the saved record, accounting entry, and printed output.', 'Check that the intended user can issue the invoice and access the required report.', 'Verify that a second print behaves as intended in the selected local print format.'],
        sources: ['invoice', 'project'],
      },
      {
        heading: 'Test corrections and reconcile a small reporting period',
        paragraphs: [
          'Add a return and a correction scenario to the same test set. ERPNext documents credit notes against original invoices. Nepal Compliance also provides cancellation records and invoice reprint controls. Confirm the installed workflow and the roles allowed to use it rather than improvising a correction after a live invoice is issued.',
          'Give your reviewer a short list of expected documents and totals. Run the relevant register for exactly that company and date range. When totals differ, first check document status, return treatment, filters, and dates. Do not change tax rates merely to force a report to match a spreadsheet.',
        ],
        items: ['Trace a return to its original invoice.', 'Check how cancelled documents appear in the selected report.', 'Explain each difference between the sample invoice list and the register.'],
        sources: ['invoice', 'project'],
      },
      {
        heading: 'Keep CBMS verification as a separate check',
        paragraphs: [
          'An invoice can print correctly while an external submission is pending or unsuccessful. If your workflow requires a CBMS connection, test its configuration and recorded response separately. Keep a named person responsible for reviewing exceptions after launch.',
          'Save your accepted examples and configuration notes. Repeat the relevant checks when you change tax rules, print formats, numbering, or application versions. The objective is a billing process your team can explain and maintain, with current requirements confirmed by the appropriate adviser.',
        ],
        sources: ['cbms-code'],
      },
    ],
    questions: [
      { question: 'Does selecting Nepal automatically validate my invoice?', answer: 'Do not treat a country setting as validation. Check the company data, tax configuration, installed localization, printed output, and current requirements together.' },
      { question: 'What should I investigate when one item has the wrong tax?', answer: 'Check its item-specific template and account mapping, then the transaction category, date, and selected tax template. Recheck the whole draft after correcting the setup.' },
    ],
    sources: [taxes, source('tax-overview', 'ERPNext tax configuration concepts', 'https://docs.frappe.io/erpnext/taxes'), source('item-tax', 'ERPNext Item Tax Template', 'https://docs.frappe.io/erpnext/item-tax-template'), invoice, project, cbmsCode],
    related: ['cbms-integration-nepal', 'choosing-erp-software-nepal'],
    featureLinks: [{ label: 'Accounting and VAT reports', path: 'features/accounting-and-vat/' }, { label: 'Invoice controls', path: 'features/invoicing/' }],
  },
  {
    slug: 'cbms-integration-nepal',
    title: 'Preparing and troubleshooting a CBMS integration in Nepal',
    description: 'Prepare business details, app settings, representative invoices, response evidence, and support information before relying on an ERPNext CBMS connection.',
    category: 'Accounting and billing',
    answer: 'Confirm the current IRD process for your business, record the exact application version and connection settings, and test invoice and return outcomes through the approved process. When something fails, separate local preparation, network transport, and the service response before retrying.',
    sections: [
      {
        heading: 'Separate onboarding from software configuration',
        paragraphs: [
          'CBMS is the Inland Revenue Department’s Central Billing Monitoring System. IRD publishes technical documentation for developers. Installing software that contains connection code does not establish your business’s onboarding status, approval, or readiness to send live records.',
          'Before configuration, confirm the current process and permitted test arrangements with IRD and your implementation provider. Keep an internal note of who confirmed the requirements, which company they apply to, and which software version will be used. This preparation guide does not set eligibility thresholds or replace current official instructions.',
        ],
        items: ['Identify the responsible business contact and technical contact.', 'Confirm the company identifier and authorized credentials.', 'Ask how testing, production activation, and unsuccessful submissions should be handled.'],
        sources: ['ird'],
      },
      {
        heading: 'Check what your application has actually configured',
        paragraphs: [
          'The reviewed Nepal Compliance settings include an enable option, username, password, PAN/VAT number, and separate sales and credit-note addresses. Record the installed version and ask your administrator to verify these settings. Do not copy demonstration credentials from a document into a live company.',
          'Keep credentials out of screenshots and public issue reports. If settings look complete but a request never reaches the sending stage, ask the administrator to inspect the local job and error records. Changing credentials repeatedly will not resolve an unrelated application error.',
        ],
        items: ['Verify the company and environment before enabling transmission.', 'Confirm that background processing is operating in the intended installation.', 'Record when the last configuration change was made.'],
        sources: ['cbms-settings'],
      },
      {
        heading: 'Prepare cases that expose differences',
        paragraphs: [
          'Build a small test list with an ordinary invoice, a discounted invoice, and a return linked to its original. Add other cases your business genuinely uses. Agree the permitted test destination before submitting sample records; a production service should not receive invented transactions as an experiment.',
          'For each case, write down the expected company, invoice reference, fiscal period, date, taxable amount, tax, and total. Compare those expectations with the data prepared for sending. A correctly printed bill does not show every value in an integration request.',
          'Invoices and returns follow different submission paths. Ask the implementer to demonstrate both, including the original-invoice reference for a return, and verify the response from your configured connection.',
        ],
        sources: ['cbms-code'],
      },
      {
        heading: 'Locate the failure before choosing an action',
        paragraphs: [
          'Use the following diagnostic order as an operational checklist. A browser message saying a task is queued does not establish acceptance by the remote service. Likewise, a successful network exchange does not by itself explain the business response returned in that exchange.',
        ],
        table: { headers: ['Stage', 'Evidence to collect', 'Next investigation'], rows: [['Local preparation', 'Invoice reference and application error', 'Settings, required values, and request preparation'], ['Background execution', 'Job time and completion or failure record', 'Worker availability and application exceptions'], ['Network exchange', 'Timestamp and transport status', 'Connection, approved destination, or interrupted response'], ['Service response', 'Recorded response and related invoice', 'Acceptance, rejection, or an already-recorded transaction']] },
        items: ['For a credential rejection, confirm the authorized account without publishing its password.', 'For invalid data, compare the prepared values with the current technical specification.', 'For an uncertain or duplicate result, reconcile the existing record before sending again.'],
        sources: ['cbms-code', 'ird'],
      },
      {
        heading: 'Make the support request useful',
        paragraphs: [
          'Suppose an operator reports that yesterday’s invoice is still pending. A useful support note names the app version, invoice reference, company, attempted time, visible status, and sanitized error. It also says whether other invoices succeeded and whether this is a sale or return. That narrows the investigation without exposing credentials or unrelated customer records.',
          'Assign an owner to review unresolved submissions and document the decision for each retry. After a fix, test a small approved case and verify its result before retrying a larger set. Keep evidence of the corrected cause so a later reviewer can understand what happened.',
        ],
        sources: [],
      },
    ],
    questions: [
      { question: 'Does a CBMS success status certify the whole installation?', answer: 'No. A transaction result concerns that submission. It does not establish software certification, complete accounting correctness, or satisfaction of every requirement for the business.' },
      { question: 'Should I resend every invoice after a timeout?', answer: 'First determine whether the original request was recorded. An uncertain response needs reconciliation and a controlled retry decision, not an assumption that nothing reached the service.' },
    ],
    sources: [ird, cbmsSettings, cbmsCode],
    related: ['vat-invoices-nepal', 'choosing-erp-software-nepal'],
    featureLinks: [{ label: 'CBMS integration feature', path: 'features/cbms/' }, { label: 'Audit and report features', path: 'features/audit-and-reports/' }],
  },
];
