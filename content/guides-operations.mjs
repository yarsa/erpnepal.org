export const guidesOperations = [
  {
    slug: 'qr-payment-reconciliation',
    title: 'How to reconcile QR payments with ERPNext invoices in Nepal',
    description: 'Match QR receipts to invoices, distinguish customer payments from bank settlements, and investigate duplicates, short payments, and missing references.',
    category: 'Payments and reconciliation',
    answer: 'Match each confirmed merchant receipt to an invoice using its transaction reference, then reconcile the settlement separately with the bank. A displayed QR code or payment request does not prove receipt. This workflow can be operated manually; an automatic connection requires a separately configured and tested integration.',
    sections: [
      {
        heading: 'Start with the records you can actually obtain',
        paragraphs: [
          'Ask your acquiring bank or payment provider for a sample merchant transaction report and settlement report before designing the connection. NCHL lists both static merchant QR and dynamic QR for billing-system integration. It directs merchants to their bank for enrolment and to their bank or NCHL for dynamic integration details. This establishes an available provider service, not a ready-made Nepal Compliance connector.',
          'For an initial pilot, choose one collection account, one outlet, and one day. Write down who confirms receipts, who posts them, and who investigates differences. Keep the original provider export alongside your working file so that a corrected match can be traced back to its evidence.'
        ],
        items: ['Capture merchant transaction reference, amount, currency, timestamp, and confirmed status.', 'Keep invoice number and customer identity alongside the receipt reference.', 'Record settlement reference and date separately when supplied by the provider.'],
        sources: ['nchl-qr']
      },
      {
        heading: 'Separate payment recording from matching',
        paragraphs: [
          'ERPNext Payment Request asks for payment; creating it does not post money to the ledger. Payment Reconciliation links an already recorded payment or credit to an outstanding invoice. It does not create another bank movement. Bank reconciliation serves a different purpose: matching the accounting bank records with the bank statement.',
          'Use those distinctions to design your daily procedure. First establish that a merchant receipt is genuine. Then check whether ERPNext already contains its payment entry before recording anything new. Finally connect the existing payment to the intended invoice and compare the subsequent settlement with the bank evidence. A customer screenshot can help locate a transaction, but should not be your only confirmation.'
        ],
        sources: ['payment-request', 'payment-reconciliation']
      },
      {
        heading: 'Worked example: two invoices and three messages',
        paragraphs: [
          'This is a fictional reconciliation exercise, not a provider specification. Invoice INV-101 is NPR 2,400 and INV-102 is NPR 1,800. Your merchant report confirms transaction Q501 for NPR 2,400 and Q502 for NPR 1,000. A notification for Q501 arrives twice. There are two receipts totalling NPR 3,400, not three receipts totalling NPR 5,800.',
          'Match Q501 to INV-101 after checking the reference and customer evidence. Allocate Q502 to INV-102 only after confirming its intended invoice; NPR 800 remains outstanding. If the bank later shows NPR 3,380, retain the NPR 20 difference for investigation. A supported fee statement may explain it, but the arithmetic alone does not establish a fee or justify reducing the customer payment.'
        ],
        table: { headers: ['Observation', 'Action'], rows: [['Q501 notification repeats', 'Check the existing receipt; do not create a second payment.'], ['Q502 covers only part of INV-102', 'Record the confirmed amount and retain the outstanding balance.'], ['Bank deposit differs from gross receipts', 'Compare settlement detail, fees, reversals, and timing.']] },
        sources: []
      },
      {
        heading: 'Handle exceptions before automating them',
        paragraphs: [
          'A matching amount is weak evidence when several customers pay the same price. Put uncertain receipts into an exception list with an owner and next action. Preserve the provider reference during corrections; silently changing a reference can make a later duplicate harder to detect. Treat refunds and reversals as separate events requiring their own evidence.',
          'In ERPNext, check company, customer or supplier, receivable account, and available amounts before reconciling existing entries. Review the proposed allocation rather than assuming the oldest invoice is the intended one. Afterward, inspect the remaining invoice balance.'
        ],
        items: ['Test a duplicate notification, partial payment, wrong reference, reversal, and delayed settlement.', 'Confirm that repeated delivery of one provider transaction cannot create repeated receipts.', 'Assign someone to review unresolved differences at the close of each day.'],
        sources: ['payment-reconciliation']
      }
    ],
    questions: [
      { question: 'Do I need dynamic QR to begin reconciling?', answer: 'No. Begin with confirmed merchant records and invoice references. Dynamic QR can be evaluated separately with your provider; it does not remove the need to verify payment and settlement records.' },
      { question: 'Does Nepal Compliance automatically match these payments?', answer: 'This guide does not claim an included QR connector or automatic matching. Confirm the specific integration, supported versions, and payment workflow before relying on automation.' }
    ],
    sources: [
      { id: 'nchl-qr', label: 'NCHL: NEPALPAY QR services and merchant enrolment', url: 'https://nchl.com.np/nepalpay-qr/' },
      { id: 'payment-request', label: 'ERPNext: Payment Request', url: 'https://docs.frappe.io/erpnext/payment-request' },
      { id: 'payment-reconciliation', label: 'ERPNext: Payment Reconciliation', url: 'https://docs.frappe.io/erpnext/payment-reconciliation' }
    ],
    related: ['spreadsheet-to-erpnext'],
    featureLinks: [{ label: 'QR integration options', path: 'addons/fonepay-nepalpay-qr/' }, { label: 'Invoicing features', path: 'features/invoicing/' }]
  },
  {
    slug: 'attendance-device-integration-guide',
    title: 'How to choose an attendance-device integration for Frappe HR',
    description: 'Evaluate exports, APIs, employee mappings, shift rules, and offline recovery before connecting an attendance device to Frappe HR.',
    category: 'Attendance and HR',
    answer: 'Choose the integration by testing whether it can deliver complete, correctly mapped Employee Checkin records to Frappe HR. Then test how shifts turn those records into attendance. A device brand or successful network connection is not enough to establish compatibility with your exact model and workflow.',
    sections: [
      {
        heading: 'Identify the data path before choosing hardware',
        paragraphs: [
          'Frappe HR documents three approaches: import exported check-in logs, send them through its authenticated API, or use a sync tool with supported devices. Its documentation recommends a device trial because compatibility depends on the particular setup. Ask the supplier to demonstrate your proposed path using an actual device and a test Frappe HR installation.',
          'A small organisation can start with a reviewed daily export if that meets its needs. An API connection reduces manual transfers but introduces credentials, scheduling, monitoring, and failure recovery. Decide who will operate those parts before treating automatic synchronisation as a saving.'
        ],
        table: { headers: ['Route', 'Evidence to request'], rows: [['File export', 'A real sample with employee identifier, timestamp, and punch type when available.'], ['Vendor API', 'API documentation, access terms, and a test account.'], ['Device sync tool', 'A successful trial with the exact model, firmware, and network.']] },
        sources: ['device-integration']
      },
      {
        heading: 'Map people, times, and shifts explicitly',
        paragraphs: [
          'Device punches become Employee Checkin records. Frappe HR uses an employee’s Attendance Device ID to map device identifiers to employee records. Auto Attendance then uses check-ins and the assigned shift configuration. A dated Shift Assignment takes precedence over an employee’s default shift, so investigate the assignment as well as the raw logs when a result looks wrong.',
          'Create a mapping register with employee record, device identifier, location, and effective dates. For a Nepal deployment, explicitly test the device, sync service, and application timezone settings against a known local timestamp. Do not assume that a correctly displayed device clock proves that its exported values have the same timezone interpretation.'
        ],
        items: ['Check whether identifiers are unique across branches or only within each device.', 'Document whether punches include reliable IN and OUT labels.', 'Have HR approve shift windows, holiday lists, and the interpretation of missing punches.'],
        sources: ['device-integration', 'auto-attendance']
      },
      {
        heading: 'Worked example: a night shift and a delayed upload',
        paragraphs: [
          'Consider this fictional acceptance test. Employee EMP-014 works from 22:00 on Monday to 06:00 on Tuesday. The device stores punches at 21:55 and 06:08 while the internet connection is unavailable. Both arrive on Tuesday afternoon. The expected result should follow the agreed night-shift rules, rather than treating the two dates as unrelated single punches.',
          'Run the same upload again. Your integration should detect or safely handle repeated events without creating an extra working period. Next, deliberately omit the departure punch and verify that the result is visible for review. Do not invent a clock-out time simply to make the attendance report complete.',
          'Frappe HR’s Auto Attendance documentation explains how shift windows, working-hours settings, and the last synchronisation timestamp affect processing. Include those settings in the test record so that an administrator can reproduce the result instead of guessing why attendance has not appeared.'
        ],
        sources: ['auto-attendance']
      },
      {
        heading: 'Agree the handover criteria',
        paragraphs: [
          'Write acceptance criteria before buying devices or approving an integration. A demonstration with one employee proves little about employees transferred between branches, replacement devices, or network outages. Ask who can restore a failed sync service and how HR will see missing data before payroll preparation.',
          'Keep access proportional to the task. The sync service needs to create the appropriate records, while payroll review and employee administration are separate responsibilities. Store credentials outside shared worksheets and public support threads. Confirm what the integration transfers; a punch log and a biometric template are different data sets, and this guide does not require copying templates into Frappe HR.'
        ],
        items: ['Reconcile a sample day’s device event count with accepted and rejected imports.', 'Test network loss, late uploads, employee changes, and a missing punch.', 'Record the model, firmware, connector version, support owner, and recovery procedure.'],
        sources: []
      }
    ],
    questions: [
      { question: 'Will every fingerprint or NFC reader work?', answer: 'No blanket compatibility claim is justified. Require a file, API, or supported sync route and test the exact equipment. The useful question is whether its records reach the correct employee and shift reliably.' },
      { question: 'Is device integration included in Nepal Compliance?', answer: 'This guide describes an integration evaluation using Frappe HR capabilities. It does not establish that a connector ships with Nepal Compliance. Review the separate attendance integration scope before procurement.' }
    ],
    sources: [
      { id: 'device-integration', label: 'Frappe HR: Integrating biometric attendance devices', url: 'https://docs.frappe.io/hr/integrating-frappe-hr-with-biometric-attendance-devices' },
      { id: 'auto-attendance', label: 'Frappe HR: Auto Attendance', url: 'https://docs.frappe.io/hr/auto-attendance' }
    ],
    related: ['spreadsheet-to-erpnext'],
    featureLinks: [{ label: 'Attendance integration options', path: 'addons/attendance-devices/' }, { label: 'Employee records and leave', path: 'features/hr-and-leave/' }]
  },
  {
    slug: 'spreadsheet-to-erpnext',
    title: 'How to move spreadsheet records into ERPNext',
    description: 'Plan a spreadsheet migration with field mapping, trial imports, opening balances, reconciliation totals, and a controlled switch to ERPNext.',
    category: 'Implementation and migration',
    answer: 'Choose a cutover date, clean and map your records, test imports in a separate site, and reconcile the opening position before entering live transactions. Decide explicitly which historical records will move and which will remain in a searchable archive. A successful upload alone does not prove a successful migration.',
    sections: [
      {
        heading: 'Define the migration boundary',
        paragraphs: [
          'Inventory the worksheets your staff actually use: customers, suppliers, items, unpaid invoices, bank balances, stock, and employee records. Name an owner for each file and identify the version that contains the approved figures. A workbook called final-new is not a sufficient source-control process; preserve a dated copy and record later corrections separately.',
          'Choose between importing detailed history and bringing forward the opening position with an accessible archive. This is a business decision about future reporting and evidence, not just file size. Agree where staff will look up old invoices and who can change archived data. Stop the two systems from becoming competing sources of new transactions after the cutover.'
        ],
        sources: []
      },
      {
        heading: 'Build a field map and a small trial import',
        paragraphs: [
          'ERPNext Data Import supports CSV and Excel files and distinguishes inserting records from updating existing ones. Download the template for the document type in your installation. Use its required fields and structure rather than renaming spreadsheet columns until an error disappears. Related table rows, such as invoice items, need attention because a worksheet row is not always a complete document.',
          'Create a mapping sheet that records source column, target field, transformation, and owner. Preserve identifiers as text where leading zeros matter. Mark whether source dates are Gregorian or Bikram Sambat, and test the expected input format instead of allowing spreadsheet software to guess. Resolve duplicate customers by evidence, not by similar spelling alone.'
        ],
        items: ['Test a normal customer, a duplicate-looking name, a blank required field, and a non-English name.', 'Import linked master records before documents that depend on them.', 'Keep the original source row identifier alongside the migration log.'],
        sources: ['data-import']
      },
      {
        heading: 'Worked example: two unpaid invoices',
        paragraphs: [
          'Suppose a fictional distributor has two unpaid customer invoices at cutover: NPR 12,000 and NPR 8,000. The verified receivable total is NPR 20,000. If you import those outstanding invoices and also post another NPR 20,000 to the same receivable balance, you have counted the opening position twice.',
          'ERPNext’s opening-balance documentation distinguishes outstanding invoices, advances, stock, assets, and other ledger balances, with different methods for bringing them across. It specifically warns against adding a control-account balance again when another opening document already creates it. Have the finance owner approve which method supplies each balance.'
        ],
        table: { headers: ['Check', 'Expected result in this example'], rows: [['Outstanding invoice count', 'Two invoices, with their individual references.'], ['Customer receivable total', 'NPR 20,000, matching the approved source.'], ['A later NPR 5,000 receipt', 'NPR 15,000 remaining after the intended allocation.']] },
        sources: ['opening-balances']
      },
      {
        heading: 'Compare quantities, values, and document behaviour',
        paragraphs: [
          'A row-count comparison catches omissions but cannot detect every incorrect value. Compare totals by customer, supplier, account, and warehouse as applicable. For stock, verify quantities and valuation together; ERPNext documents Stock Reconciliation as a route for opening stock. Retain the source count and valuation assumptions so that later differences can be investigated.',
          'Test what staff will do next: receive part of an old invoice, print a new invoice, find an item, or review an employee record. For Nepal Compliance, test relevant reports and date fields on the installed version after the underlying records are correct. A localisation app does not resolve inconsistent source identifiers or unexplained opening balances.'
        ],
        items: ['Compare the approved trial balance and supporting schedules with ERPNext.', 'Investigate any remaining temporary opening difference before approving cutover.', 'Record accepted exceptions with an owner and a completion date.'],
        sources: ['stock-reconciliation', 'opening-balances']
      },
      {
        heading: 'Make the final switch repeatable',
        paragraphs: [
          'Rehearse the final import using documented files and steps. Schedule a short entry freeze, capture the agreed source position, back up the target site, and run the approved import sequence. Keep import logs and correction references. Avoid rerunning an insertion file blindly after a partial failure; establish which records already exist first.',
          'Assign a decision-maker for the first operating day. If totals or essential workflows fail acceptance checks, pause new entries and investigate using the preserved records. Agree the recovery path before users create transactions, because restoring an older backup after live work begins can discard that work.'
        ],
        sources: []
      }
    ],
    questions: [
      { question: 'Must every old transaction be imported?', answer: 'No. Define the reporting and operational need first. An opening position plus an accessible archive may suit some teams; others need detailed history. Document the chosen boundary and verify that staff can find the retained evidence.' },
      { question: 'Can I import directly into the live site?', answer: 'Rehearse in a separate site first. Use a reviewed final batch only after mappings, totals, and follow-on workflows pass your acceptance checks.' }
    ],
    sources: [
      { id: 'data-import', label: 'ERPNext: Data Import', url: 'https://docs.frappe.io/erpnext/data-import' },
      { id: 'opening-balances', label: 'ERPNext: Opening Balance in Accounts', url: 'https://docs.frappe.io/erpnext/opening-balance' },
      { id: 'stock-reconciliation', label: 'ERPNext: Stock Reconciliation', url: 'https://docs.frappe.io/erpnext/stock-reconciliation' }
    ],
    related: ['qr-payment-reconciliation', 'attendance-device-integration-guide'],
    featureLinks: [{ label: 'Accounting and VAT reports', path: 'features/accounting-and-vat/' }, { label: 'Nepali dates and fiscal years', path: 'features/nepali-dates/' }]
  }
];
