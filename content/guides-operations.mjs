export const guidesOperations = [
  {
    slug: 'qr-payment-reconciliation',
    title: 'How to reconcile QR payments with ERPNext invoices in Nepal',
    description: 'Match QR receipts to invoices, distinguish customer payments from bank settlements, and investigate duplicates, short payments, and missing references.',
    category: 'Payments and reconciliation',
    answer: 'Match each confirmed QR receipt to its invoice by transaction reference, then reconcile the bank settlement separately.',
    sections: [
      {
        heading: 'Get the right records',
        paragraphs: [
          'Ask your bank for a sample merchant transaction report and settlement report. Start with one account, one outlet, and one day.',
        ],
        items: ['Reference, amount, time, and status.', 'Invoice number beside each receipt.', 'Settlement reference and date.'],
        sources: ['nchl-qr'],
      },
      {
        heading: 'Record, then match',
        paragraphs: [
          'A Payment Request only asks for money. Confirm the receipt, check it is not already recorded, then match it to the invoice with Payment Reconciliation.',
        ],
        sources: ['payment-request', 'payment-reconciliation'],
      },
      {
        heading: 'Worked example',
        paragraphs: [
          'Fictional: INV-101 is NPR 2,400 and INV-102 is NPR 1,800. Receipts Q501 (2,400) and Q502 (1,000) arrive, and Q501 is notified twice.',
        ],
        table: { headers: ['Observation', 'Action'], rows: [['Q501 notification repeats', 'Check the existing receipt; do not create a second payment.'], ['Q502 covers only part of INV-102', 'Record the confirmed amount and retain the outstanding balance.'], ['Bank deposit differs from gross receipts', 'Compare settlement detail, fees, reversals, and timing.']] },
        sources: [],
      },
    ],
    questions: [
      { question: 'Do I need dynamic QR to start?', answer: 'No. Start with confirmed merchant records.' },
      { question: 'Does Nepal Compliance match QR payments automatically?', answer: 'No. That needs a separate integration.' },
    ],
    sources: [
      { id: 'nchl-qr', label: 'NCHL: NEPALPAY QR services and merchant enrolment', url: 'https://nchl.com.np/nepalpay-qr/' },
      { id: 'payment-request', label: 'ERPNext: Payment Request', url: 'https://docs.frappe.io/erpnext/payment-request' },
      { id: 'payment-reconciliation', label: 'ERPNext: Payment Reconciliation', url: 'https://docs.frappe.io/erpnext/payment-reconciliation' },
    ],
    related: ['spreadsheet-to-erpnext'],
    featureLinks: [{ label: 'QR integration options', path: 'addons/fonepay-nepalpay-qr/' }, { label: 'Invoicing features', path: 'features/invoicing/' }],
  },
  {
    slug: 'attendance-device-integration-guide',
    title: 'How to choose an attendance-device integration for Frappe HR',
    description: 'Evaluate exports, APIs, employee mappings, shift rules, and offline recovery before connecting an attendance device to Frappe HR.',
    category: 'Attendance and HR',
    answer: 'Pick the device that reliably delivers correctly mapped check-ins to Frappe HR, proven in a trial with your exact model.',
    sections: [
      {
        heading: 'Choose the data path',
        paragraphs: [
          'Frappe HR accepts file imports, API calls, or a sync tool. Trial your exact device first.',
        ],
        table: { headers: ['Route', 'Evidence to request'], rows: [['File export', 'A real sample with employee identifier, timestamp, and punch type when available.'], ['Vendor API', 'API documentation, access terms, and a test account.'], ['Device sync tool', 'A successful trial with the exact model, firmware, and network.']] },
        sources: ['device-integration'],
      },
      {
        heading: 'Map people and shifts',
        paragraphs: [
          'Each employee needs an Attendance Device ID. Auto Attendance then applies their shift.',
        ],
        items: ['Unique IDs across branches.', 'Time zone tested against a known local time.', 'Missing-punch rules approved by HR.'],
        sources: ['device-integration', 'auto-attendance'],
      },
      {
        heading: 'Test the hard cases',
        paragraphs: [
          'Try a night shift (22:00–06:00) uploaded late, the same upload twice, and a missing punch. Never invent a clock-out time.',
        ],
        sources: ['auto-attendance'],
      },
    ],
    questions: [
      { question: 'Will every fingerprint or NFC reader work?', answer: 'No. Test the exact equipment.' },
      { question: 'Is device integration included in Nepal Compliance?', answer: 'No. It is a separate integration.' },
    ],
    sources: [
      { id: 'device-integration', label: 'Frappe HR: Integrating biometric attendance devices', url: 'https://docs.frappe.io/hr/integrating-frappe-hr-with-biometric-attendance-devices' },
      { id: 'auto-attendance', label: 'Frappe HR: Auto Attendance', url: 'https://docs.frappe.io/hr/auto-attendance' },
    ],
    related: ['spreadsheet-to-erpnext'],
    featureLinks: [{ label: 'Attendance integration options', path: 'addons/attendance-devices/' }, { label: 'Employee records and leave', path: 'features/hr-and-leave/' }],
  },
  {
    slug: 'spreadsheet-to-erpnext',
    title: 'How to move spreadsheet records into ERPNext',
    description: 'Plan a spreadsheet migration with field mapping, trial imports, opening balances, reconciliation totals, and a controlled switch to ERPNext.',
    category: 'Implementation and migration',
    answer: 'Pick a cutover date, map and test-import your records in a separate site, and reconcile the opening position before going live.',
    sections: [
      {
        heading: 'Decide what moves',
        paragraphs: [
          'List the sheets staff really use, with one owner each. Bring forward opening balances or full history, and archive the rest.',
        ],
        sources: [],
      },
      {
        heading: 'Map fields and try a small import',
        paragraphs: [
          'Use the ERPNext Data Import template for each document type. Import master records before the documents that use them.',
        ],
        items: ['Keep leading zeros as text.', 'Mark dates as BS or AD.', 'Resolve duplicate customers by evidence.'],
        sources: ['data-import'],
      },
      {
        heading: 'Don’t count balances twice',
        paragraphs: [
          'Fictional: two unpaid invoices of NPR 12,000 and 8,000. Import them or post a NPR 20,000 balance, never both.',
        ],
        table: { headers: ['Check', 'Expected result in this example'], rows: [['Outstanding invoice count', 'Two invoices, with their individual references.'], ['Customer receivable total', 'NPR 20,000, matching the approved source.'], ['A later NPR 5,000 receipt', 'NPR 15,000 remaining after the intended allocation.']] },
        sources: ['opening-balances', 'stock-reconciliation'],
      },
    ],
    questions: [
      { question: 'Must every old transaction be imported?', answer: 'No. An opening position plus an archive often works.' },
      { question: 'Can I import straight into the live site?', answer: 'No. Rehearse in a separate site first.' },
    ],
    sources: [
      { id: 'data-import', label: 'ERPNext: Data Import', url: 'https://docs.frappe.io/erpnext/data-import' },
      { id: 'opening-balances', label: 'ERPNext: Opening Balance in Accounts', url: 'https://docs.frappe.io/erpnext/opening-balance' },
      { id: 'stock-reconciliation', label: 'ERPNext: Stock Reconciliation', url: 'https://docs.frappe.io/erpnext/stock-reconciliation' },
    ],
    related: ['qr-payment-reconciliation', 'attendance-device-integration-guide'],
    featureLinks: [{ label: 'Accounting and VAT reports', path: 'features/accounting-and-vat/' }, { label: 'Nepali dates and fiscal years', path: 'features/nepali-dates/' }],
  },
];
