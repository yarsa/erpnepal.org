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
    answer: 'Test each option with your own transactions, then compare the full running cost and who will support it.',
    sections: [
      {
        heading: 'Test with the same transactions',
        paragraphs: [
          'Give every vendor the same pack: buy ten units, sell three on credit, take a partial payment, and process a return. Your accountant should be able to follow each result to the balance.',
        ],
        table: { headers: ['Check', 'Evidence to request'], rows: [['Billing', 'Invoice, return reference, and printed customer copy'], ['Accounting', 'Transaction entries and the remaining customer balance'], ['Operations', 'Stock movement or service completion record'], ['Review', 'Who can approve, correct, and inspect the transaction']] },
        sources: ['invoice'],
      },
      {
        heading: 'Ask what “Nepal support” includes',
        paragraphs: [
          'Ask for app names, versions, and which reports were shown. A local calendar or a good demo does not prove your setup is correct.',
        ],
        items: ['A sample report from your own transactions.', 'Any add-ons or custom work required.', 'Requirements your accountant must confirm.'],
        sources: ['project', 'taxes'],
      },
      {
        heading: 'Count the full cost',
        paragraphs: [
          'Budget for data preparation, setup, training, hosting, and support. Try a small spreadsheet import first and reconcile it.',
        ],
        items: ['One owner for migration decisions.', 'A cutover date and opening-balance check.', 'A tested backup and export.'],
        sources: ['import', 'setup'],
      },
    ],
    questions: [
      { question: 'Is free software free to run?', answer: 'No. Hosting, setup, training, and support still cost money.' },
      { question: 'Should a small business start with every module?', answer: 'No. Start with the workflows you need, then expand.' },
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
    answer: 'Confirm the tax treatment with your accountant, then test sample invoices and returns end to end in a separate installation.',
    sections: [
      {
        heading: 'Know which records set the tax',
        paragraphs: [
          'Check the actual templates and accounts, not a template named “VAT”. A mixed invoice can be wrong even when a simple one is right.',
        ],
        table: { headers: ['Record', 'Question to answer'], rows: [['Company and accounts', 'Will the amounts post to the intended company and accounts?'], ['Transaction tax template', 'Does each row use the approved calculation and account?'], ['Tax category and rule', 'Why was this template selected for this transaction?'], ['Item Tax Template', 'Does this item require a different treatment?']] },
        sources: ['tax-overview', 'item-tax'],
      },
      {
        heading: 'Check the submitted invoice and print',
        paragraphs: [
          'Compare the saved record, the accounting entry, and the printed copy, including a reprint.',
        ],
        items: ['Totals and tax per line.', 'Long names and multi-page prints.', 'Copy marking on the second print.'],
        sources: ['invoice', 'project'],
      },
      {
        heading: 'Test returns and one reporting period',
        paragraphs: [
          'Trace a return to its invoice, then run the register for the same dates. Never change tax rates just to make a report match.',
        ],
        items: ['Returns linked to originals.', 'Cancelled documents in reports.', 'Every difference explained.'],
        sources: ['invoice', 'project'],
      },
    ],
    questions: [
      { question: 'Does choosing Nepal as the country validate my invoices?', answer: 'No. Check data, tax setup, and print output together.' },
      { question: 'One item has the wrong tax. Where do I look?', answer: 'Its Item Tax Template and account, then the transaction template.' },
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
    answer: 'Confirm the IRD process for your business, test an invoice and a return, and find where a failure happened before retrying.',
    sections: [
      {
        heading: 'Onboarding is not configuration',
        paragraphs: [
          'Having the connection code does not mean your business is onboarded with IRD. Confirm the process and test arrangements first.',
        ],
        items: ['A business and a technical contact.', 'Company PAN/VAT and authorised credentials.', 'Never post credentials in screenshots or issues.'],
        sources: ['ird', 'cbms-settings'],
      },
      {
        heading: 'Test an invoice and a return',
        paragraphs: [
          'Invoices and returns use different submission paths. Send test records only to an approved test destination.',
        ],
        sources: ['cbms-code'],
      },
      {
        heading: 'Find where it failed',
        paragraphs: [
          '“Queued” does not mean accepted. Locate the failing stage before you retry.',
        ],
        table: { headers: ['Stage', 'Evidence to collect', 'Next investigation'], rows: [['Local preparation', 'Invoice reference and application error', 'Settings, required values, and request preparation'], ['Background execution', 'Job time and completion or failure record', 'Worker availability and application exceptions'], ['Network exchange', 'Timestamp and transport status', 'Connection, approved destination, or interrupted response'], ['Service response', 'Recorded response and related invoice', 'Acceptance, rejection, or an already-recorded transaction']] },
        sources: ['cbms-code', 'ird'],
      },
    ],
    questions: [
      { question: 'Should I resend everything after a timeout?', answer: 'No. Check what was recorded first.' },
    ],
    sources: [ird, cbmsSettings, cbmsCode],
    related: ['vat-invoices-nepal', 'choosing-erp-software-nepal'],
    featureLinks: [{ label: 'CBMS integration feature', path: 'features/cbms/' }, { label: 'Audit and report features', path: 'features/audit-and-reports/' }],
  },
];
