# Operations guide research

Reviewed 28 September 2026. The three articles use original operational examples and acceptance checklists. They do not claim search volume, customer adoption, certified integrations, live provider testing, or current tax/legal advice.

## Search queries and reader needs

- `site.docs.frappe.io erpnext payment reconciliation payment request qr`
- `site.nchl.com.np NEPALPAY QR merchant dynamic QR transaction confirmation`
- `site.discuss.frappe.io "QR" "reconciliation"`
- `site.docs.frappe.io hr integrating frappe hr biometric attendance`
- `site.discuss.frappe.io "attendance" "device" "duplicate"`
- `site.docs.frappe.io erpnext data import opening balances`
- `site.discuss.frappe.io "spreadsheet" "migration"`

The QR/forum query did not establish strong Nepal-specific demand; many results concerned barcode scanning, not payments. The guide addresses a concrete workflow supported by provider and ERPNext documentation, without pretending to quantify demand.

Attendance demand cues: users discussing device integration and ambiguous IN/OUT logs, plus a recent Nepal HR-software question. Migration demand cues: users asking about field mapping and import templates. Community posts inform topic selection only; correctness comes from primary documentation.

- https://discuss.frappe.io/t/how-to-integrate-biometric-device-in-erp-next-attendance/52252?page=2
- https://discuss.frappe.io/t/auto-attendance-check-in-log-type-issue/55091
- https://discuss.frappe.io/t/biometric-attendance-sync-tool/62122?page=5
- https://www.reddit.com/r/technepal/comments/1wirxpn/looking_for_an_affordable_hr_software_for_a_small/
- https://discuss.frappe.io/t/how-to-migrate-data-from-quickbook-desktop-to-erpnext/156990
- https://discuss.frappe.io/t/data-import-template-changed/63845

## Primary evidence and limits

### QR payment reconciliation

- https://nchl.com.np/nepalpay-qr/ — lists static and dynamic QR services, billing/POS integration options, and merchant enrolment route. Does not establish an ERPNext/Nepal Compliance connector, commercial pricing, or account-specific access.
- https://docs.frappe.io/erpnext/payment-request — a payment request asks for money and does not itself post a ledger receipt.
- https://docs.frappe.io/erpnext/payment-reconciliation — links existing payments/credits to invoices, supports partial allocation, distinguishes this operation from bank reconciliation. The separate bank-reconciliation URL returned an internal fetch error, so the article cites the distinction from this accessible page.

Original example: NPR 2,400 plus NPR 1,000 are two receipts; duplicate delivery is not another receipt; NPR 1,800 invoice retains NPR 800 outstanding. NPR 3,380 settlement against NPR 3,400 gross leaves an unexplained NPR 20, expressly not presumed to be a fee. These figures are invented for instruction and labelled fictional. Recommendations on exception ownership and duplicate delivery are editorial implementation checks, not claims about a shipped connector.

### Attendance devices

- https://docs.frappe.io/hr/integrating-frappe-hr-with-biometric-attendance-devices — Employee Checkin data path, import/API/sync alternatives, employee device-ID mapping, and trial recommendation.
- https://docs.frappe.io/hr/auto-attendance — check-in and shift relationship, assignment precedence, shift processing windows, holidays, last-sync behavior.

Original night-shift/offline example is an acceptance test, not a guarantee of default behavior. Device model, firmware, timezone behavior, vendor API rights, duplicate handling, and transfer of biometric templates remain unverified. No suggestion that all fingerprint/NFC equipment works, and no claim that Nepal Compliance includes these connectors.

### Spreadsheet migration

- https://docs.frappe.io/erpnext/data-import — CSV/Excel imports, insert/update modes, templates, and parent/child record structure.
- https://docs.frappe.io/erpnext/opening-balance — opening method by balance type, double-counting risk for control accounts, approved source totals, and temporary opening balance review.
- https://docs.frappe.io/erpnext/stock-reconciliation — opening stock quantity and valuation workflow.

Original NPR 12,000/NPR 8,000 receivable example illustrates duplicate opening entry risk; it is not copied from the documentation. Field mapping, trial selection, file ownership, cutover rehearsal, archive accessibility, and rollback criteria are original planning recommendations. Exact import fields and validation behavior depend on installed ERPNext/Frappe versions and customisation.

## Content controls

- Each article stores source IDs at the section that makes the corresponding technical claim.
- General editorial tests have empty source arrays rather than pretending the source prescribes them.
- All arithmetic examples are original and fictional.
- No rates, bank fees, settlement timetable, legal deadlines, device price, or search-volume figures are asserted.
- Source-derived summaries are kept under 200 words per primary page across these articles; most words are original operational guidance and examples.
- Related links point only to these three guide slugs; feature/add-on links were checked against existing content slugs.
