const source = (label, url) => ({ label, url });
const frappeApi = source('Frappe API and integration documentation', 'https://frappe.io/framework/api-and-integrations');
const checkins = source('Frappe HR Employee Checkin documentation', 'https://docs.frappe.io/hr/employee-checkin');
const core = source('Nepal Compliance public feature checklist', 'https://github.com/yarsa/nepal-compliance#key-features');

export const addons = [
  {
    slug: 'corporatepay', title: 'CORPORATEPAY integration options for ERPNext', shortTitle: 'CORPORATEPAY', category: 'Payments',
    description: 'Plan an ERPNext payment workflow around CORPORATEPAY, including payment preparation, bank approval, transaction references, and reconciliation.',
    intro: 'Connect the preparation of business payments in ERPNext with the CORPORATEPAY process used by your finance team. CORPORATEPAY is operated by Nepal Clearing House Limited (NCHL) and accessed through participating banks. This page outlines an integration scope to assess with your bank and implementer.',
    audience: 'For finance teams preparing supplier payments, salary payments, or other business transfers.',
    sections: [
      { heading: 'Prepare payments from approved records', body: 'Start by deciding which ERPNext records should supply the beneficiary, amount, account, and payment reference. Agree whether the approved workflow uses a file or an authorized software connection before choosing an implementation.', items: ['Map beneficiary details to the bank’s required format.', 'Review payment batches before release.', 'Keep a link between each payment request and its source record.'] },
      { heading: 'Keep bank approvals in the workflow', body: 'NCHL describes distinct transaction initiator and approver roles. An integration should respect the approval arrangement established with your bank and show the finance team what still needs action.', items: ['Identify the people who prepare and approve payments.', 'Distinguish prepared, submitted, approved, and completed records.', 'Agree how rejected or returned payments will be reviewed.'] },
      { heading: 'Match the result to your accounts', body: 'The scope should include how confirmed results and bank references return to ERPNext. A submitted request should remain distinguishable from a completed transfer, including when only part of a batch succeeds.', items: ['Match results using a stable payment reference.', 'Review exceptions before another submission.', 'Confirm bank enrollment and integration access before scheduling delivery.'] },
    ],
    questions: [
      { question: 'Is this included in the public Nepal Compliance app?', answer: 'It is presented here as a separately scoped integration option. This page does not establish that a connector ships with the public app.' },
      { question: 'Can every bank account connect directly?', answer: 'Confirm your bank’s enrollment process, supported workflow, and authorized access. Public information about CORPORATEPAY does not establish direct integration access for every customer.' },
    ],
    related: ['npi-government-payments', 'custom-integrations'],
    sources: [source('NCHL CORPORATEPAY overview and approval roles', 'https://nchl.com.np/faqs/'), source('CORPORATEPAY public user manual', 'https://connectips.com/cdn/CONNECTIPS/connectipsweb/files/CPAY_User_Manual.pdf')],
  },
  {
    slug: 'fonepay-nepalpay-qr', title: 'Fonepay and NEPALPAY QR integration options for ERPNext', shortTitle: 'Fonepay and NEPALPAY QR', category: 'Payments',
    description: 'Scope invoice-linked QR payment collection for ERPNext with Fonepay or NEPALPAY QR, merchant enrollment, payment confirmation, and reconciliation.',
    intro: 'A QR payment integration can connect an ERPNext bill to the payment request shown to a customer. Fonepay and NEPALPAY QR both describe dynamic QR options for billing or point-of-sale systems. The provider, merchant account, and approved connection determine the available workflow.',
    audience: 'For shops, service businesses, and finance teams collecting customer payments against invoices.',
    sections: [
      { heading: 'Show the payment request for the bill', body: 'Dynamic QR can associate a payment request with a particular transaction. Define when the bill is ready for payment and how the customer will see its amount and reference.', items: ['Choose the merchant account for each outlet or company.', 'Connect the requested amount to the correct invoice.', 'Decide how expired or replaced payment requests are handled.'] },
      { heading: 'Confirm receipt before closing the sale', body: 'The integration scope should include confirmation from the approved provider channel and a clear pending state. A customer screenshot or a displayed QR alone should not determine whether the accounting record is marked paid.', items: ['Match the provider reference and amount to the bill.', 'Review delayed confirmations without creating duplicate payments.', 'Define how overpayments, refunds, and cancelled sales are handled.'] },
      { heading: 'Prepare merchant enrollment', body: 'Both providers direct merchants toward their bank or enrollment process. Confirm the service available to your business, the required merchant credentials, and the permitted integration method before committing to a rollout.', items: ['Identify the acquiring bank and merchant account.', 'Confirm a supported test and production process.', 'Agree daily settlement and exception review with your accounts team.'] },
    ],
    questions: [
      { question: 'Does a static QR mean my invoice is integrated?', answer: 'A static QR can receive payments, but associating each payment with an ERPNext bill requires an agreed matching workflow. Confirm what your provider account supports.' },
      { question: 'Are these connectors already part of Nepal Compliance?', answer: 'This page describes integration options, not a shipped public-app connector or a partnership with either payment network.' },
    ],
    related: ['nizipos-dynamic-qr', 'ecommerce', 'custom-integrations'],
    sources: [source('Fonepay business QR options', 'https://fonepay.com/business'), source('NCHL NEPALPAY QR services and enrollment', 'https://nchl.com.np/nepalpay-qr/')],
  },
  {
    slug: 'nizipos-dynamic-qr', title: 'NiziPOS dynamic QR display integration for ERPNext', shortTitle: 'NiziPOS dynamic QR', category: 'Payment devices',
    description: 'Plan a customer-facing NiziPOS QR display workflow for ERPNext billing, including device selection, payment feedback, and counter operation.',
    intro: 'NiziPOS is a dynamic QR display device from Yarsa Tech. Its official product page describes a customer-facing display, payment feedback, and developer resources. An ERPNext integration can be scoped around showing the current bill’s payment request at the counter.',
    audience: 'For retail counters and service desks that want a separate display for QR payment collection.',
    sections: [
      { heading: 'Display the active bill', body: 'Define how the billing workstation sends the current amount and QR to the selected device. The customer should see which payment is requested while the cashier continues working on the main screen.', items: ['Identify the device model and billing workstation.', 'Display the payment request for the active sale.', 'Clear or replace the request when a sale is cancelled or completed.'] },
      { heading: 'Connect feedback to the payment result', body: 'The device display and the payment provider perform different roles. The integration should base any success feedback on a confirmed payment result and associate that result with the correct ERPNext record.', items: ['Agree the payment provider connection separately from the display.', 'Define pending, successful, and failed payment messages.', 'Confirm whether the selected model and setup support the desired feedback.'] },
      { heading: 'Check the counter setup', body: 'Yarsa Tech publishes model information, connector resources, command documentation, and development tools. Review these against the actual workstation and device before selecting the integration approach.', items: ['Check device, connector, and workstation compatibility.', 'Test disconnected hardware and interrupted payment requests.', 'Document the cashier’s recovery steps and receipt workflow.'] },
    ],
    questions: [
      { question: 'Does buying a display connect ERPNext to a payment network?', answer: 'The display is one part of the workflow. Merchant enrollment, the payment provider connection, and the ERPNext integration need separate confirmation.' },
      { question: 'Is a NiziPOS connector included in the public app?', answer: 'This page describes an add-on scope. It does not claim that a NiziPOS connector is included in the public Nepal Compliance release.' },
    ],
    related: ['fonepay-nepalpay-qr', 'custom-integrations'],
    sources: [source('Yarsa Tech NiziPOS product and developer resources', 'https://www.yarsa.tech/products/nizipos'), source('NiziPOS supported commands', 'https://yarsa.tech/files/Dynamic%20Nizi%20POS%20Supported-Commands.pdf')],
  },
  {
    slug: 'sparrow-sms', title: 'Sparrow SMS integration options for ERPNext in Nepal', shortTitle: 'Sparrow SMS', category: 'Messaging',
    description: 'Scope Sparrow SMS notifications from ERPNext with approved events, recipient rules, message templates, and a record of sending outcomes.',
    intro: 'Sparrow SMS publishes an application interface for sending messages from software. An ERPNext integration can be scoped around selected business events, such as an order update or payment reminder, using the recipient information and message rules your team approves.',
    audience: 'For customer service, sales, and operations teams that need transactional text messages from ERPNext.',
    sections: [
      { heading: 'Choose the events that need a message', body: 'Begin with a small set of useful notifications. Decide what event triggers each message, who receives it, and whether a staff member must approve it before sending.', items: ['Order and service status updates.', 'Invoice or payment reminders with approved wording.', 'Internal operational notifications to designated staff.'] },
      { heading: 'Prepare recipients and templates', body: 'A useful message contains the information the recipient needs without exposing unrelated account details. Agree the language, sender identity, contact data, and communication preferences before enabling a trigger.', items: ['Use reviewed message templates and business references.', 'Check phone numbers and the intended recipient.', 'Keep sensitive payroll or account details out of routine text messages.'] },
      { heading: 'Review sending outcomes', body: 'The provider documentation describes credentials, sender information, recipients, and message text. The integration scope should also define how staff see request outcomes and handle failures. Confirm which delivery information is available for your account.', items: ['Store the related ERPNext document and sending outcome.', 'Control repeat sends when an event is retried.', 'Agree who maintains account access, sender settings, and message usage.'] },
    ],
    questions: [
      { question: 'Will every message be delivered immediately?', answer: 'Do not assume immediate delivery. Confirm the provider’s available status information and decide how staff should handle delayed or failed messages.' },
      { question: 'Can I use this for bulk promotions?', answer: 'That needs a separate scope covering recipient permission, sender approval, provider rules, and message management. This page focuses on business notifications and does not promise a campaign system.' },
    ],
    related: ['ecommerce', 'custom-integrations'],
    sources: [source('Sparrow SMS API documentation', 'https://docs.sparrowsms.com/'), source('Sparrow SMS outgoing request documentation', 'https://docs.sparrowsms.com/sms/documentation/')],
  },
  {
    slug: 'npi-government-payments', title: 'NPI and government payment integration options for ERPNext', shortTitle: 'NPI and government payments', category: 'Payments',
    description: 'Assess ERPNext workflows for NPI-connected services and government payments, including eligibility, payment references, approvals, and receipt matching.',
    intro: 'The National Payments Interface (NPI) brings together interfaces to payment services operated by NCHL and connected institutions. Government payment workflows also depend on the specific agency and collection service. An ERPNext add-on should begin with the exact payment use case and the access available to your organisation.',
    audience: 'For finance teams handling government-related payments or evaluating an authorized institutional payment connection.',
    sections: [
      { heading: 'Identify the payment service', body: 'Name the agency, payment purpose, and service used today. A revenue payment, an institutional transfer, and a payroll contribution may follow different processes even when payment infrastructure is shared.', items: ['Identify the destination institution and payment category.', 'Record the voucher, bill, or other required reference.', 'Confirm whether your organisation can use the proposed channel.'] },
      { heading: 'Prepare and approve the payment', body: 'The proposed workflow should connect the approved business obligation to the correct amount and reference. Keep preparation separate from the authorization required by the bank or payment service.', items: ['Map the ERPNext record to the service’s required information.', 'Assign payment preparation and approval responsibilities.', 'Validate the reference before requesting payment.'] },
      { heading: 'Record confirmation and receipts', body: 'Government payment completion may involve both a payment result and an agency receipt. Define which evidence is required to close the accounting record, and how the team investigates a debit with a delayed or missing receipt.', items: ['Match transaction references to the original obligation.', 'Retain the relevant receipt or confirmation record.', 'Resolve uncertain results before making another payment.'] },
    ],
    questions: [
      { question: 'Does an open API mean anyone can use NPI directly?', answer: 'No direct access is promised here. NCHL describes NPI in terms of participating members and available services. Eligibility, onboarding, and authorized access must be confirmed.' },
      { question: 'Will one integration cover every government payment?', answer: 'Scope each required agency and service explicitly. This page does not claim universal coverage or a ready-made connector in the public app.' },
    ],
    related: ['corporatepay', 'custom-integrations'],
    sources: [source('NCHL National Payments Interface', 'https://nchl.com.np/national-payments-interface-npi/'), source('NCHL government revenue payment guidance', 'https://nchl.com.np/faqs/')],
  },
  {
    slug: 'attendance-devices', title: 'Attendance device integration options for Frappe HR', shortTitle: 'Attendance devices', category: 'Attendance',
    description: 'Plan attendance log imports into Frappe HR with employee mapping, device compatibility, shifts, duplicate handling, and review of missing check-ins.',
    intro: 'Frappe HR can store employee check-in records and use them in attendance workflows. A device integration connects the logs produced by your hardware to those records. The required approach depends on the device model, its available export or connection method, and your attendance rules.',
    audience: 'For human resources teams connecting existing time clocks or evaluating new attendance hardware.',
    sections: [
      { heading: 'Match people and device records', body: 'Each device identifier must map to the correct employee. Review the device’s available data before committing to a connector, including the employee identifier, time, location, and any check-in or check-out indicator.', items: ['Identify the exact device model and firmware.', 'Map device users to employee records.', 'Check time settings and log information.'] },
      { heading: 'Turn logs into reviewed attendance', body: 'A recorded check-in is an input to attendance processing. Frappe HR documents automatic attendance based on employee check-ins; the integration scope should include the shifts and attendance settings needed by your team.', items: ['Test normal shifts and shifts that cross midnight.', 'Handle duplicate logs and missing check-outs.', 'Provide a review path for corrections and exceptions.'] },
      { heading: 'Plan interrupted connections', body: 'Agree what happens when the device or server is unavailable. Recovery needs to preserve original times and avoid importing the same records repeatedly. Confirm what the hardware can retain rather than assuming offline operation.', items: ['Agree import frequency and failure visibility.', 'Test reconnecting after an interruption.', 'Assign responsibility for employee mapping and device maintenance.'] },
    ],
    questions: [
      { question: 'Is biometric support already in Nepal Compliance?', answer: 'The public Nepal Compliance checklist marks biometric compatibility as planned. Frappe HR’s attendance integration facilities provide a separate starting point, not proof of a shipped Nepal Compliance connector.' },
      { question: 'Will any fingerprint or face-recognition device work?', answer: 'Compatibility needs confirmation for the exact model and connection method. This page does not promise support for every vendor or device.' },
    ],
    related: ['nizitap-nfc-attendance', 'custom-integrations'],
    sources: [checkins, source('Frappe HR automatic attendance', 'https://docs.frappe.io/hr/using-auto-attendance'), core],
  },
  {
    slug: 'nizitap-nfc-attendance', title: 'NiziTap NFC attendance integration scope for Frappe HR', shortTitle: 'NiziTap NFC attendance', category: 'Attendance',
    description: 'Assess NiziTap NFC attendance with employee card mapping, tap records, Frappe HR check-ins, and confirmation of current device capabilities.',
    intro: 'An NFC attendance workflow records a tap from an assigned card or tag and relates it to a person. Yarsa’s July 2024 NiziTap announcement described an NFC attendance product under testing. This page outlines a possible Frappe HR integration scope; current hardware availability and supported connections need confirmation.',
    audience: 'For organisations evaluating NiziTap and card-based attendance alongside Frappe HR.',
    sections: [
      { heading: 'Define the attendance event', body: 'Decide what a tap should mean at each reader: arrival, departure, or an event requiring later review. Confirm the actual device output before mapping it to an employee check-in record.', items: ['Identify the reader and current device version.', 'Assign a card or tag to the correct employee.', 'Define the location and meaning of each recorded tap.'] },
      { heading: 'Manage cards and exceptions', body: 'Card-based attendance needs a process for issuing, replacing, and withdrawing credentials. Agree how staff correct mistakes and handle missing cards without losing the link to the employee record.', items: ['Record which card is assigned to each employee.', 'Define the process for lost or replaced cards.', 'Review repeated taps and disputed attendance events.'] },
      { heading: 'Confirm the connection before rollout', body: 'The product announcement is background information, not a current compatibility specification. Review available documentation and sample event records with the supplier. Then test the selected workflow against Frappe HR check-ins and your shift rules.', items: ['Confirm the supported method for obtaining events.', 'Test interruptions and any available recovery behavior.', 'Agree the pilot location, review process, and operating responsibilities.'] },
    ],
    questions: [
      { question: 'Does this page guarantee current NiziTap specifications?', answer: 'No. It describes an integration scope using the named product. Confirm current specifications, availability, and access with the supplier before selecting hardware.' },
      { question: 'Does an NFC tap prove who used the card?', answer: 'A tap records use of a credential. Your organisation needs an appropriate card-assignment and attendance-review process; the integration should not treat a card identifier as independent proof of identity.' },
    ],
    related: ['attendance-devices', 'custom-integrations'],
    sources: [source('Yarsa NiziTap announcement, July 2024', 'https://news.yarsalabs.com/get-ready-to-tap-in-yarsa-tech-new-launch-nizi-tap-coming-soon/'), checkins],
  },
  {
    slug: 'ecommerce', title: 'Ecommerce integration options for ERPNext in Nepal', shortTitle: 'Ecommerce', category: 'Sales channels',
    description: 'Scope online-store connections to ERPNext for orders, customers, items, inventory, payments, and fulfillment, with platform and version checks.',
    intro: 'An ecommerce integration can connect online orders to the business records managed in ERPNext. Start with your actual store platform and order workflow. Frappe documents separate ecommerce connectors, including a Shopify integration; connector selection and compatibility need review for your installation.',
    audience: 'For online retailers and businesses managing website sales alongside accounting and inventory.',
    sections: [
      { heading: 'Bring orders into the business workflow', body: 'Decide which store event should create a sales order and how customers, products, discounts, shipping, and taxes map to ERPNext. Product codes and customer matching need a consistent rule to avoid duplicate records.', items: ['Map store products to ERPNext items.', 'Define customer matching and address handling.', 'Agree how discounts, shipping charges, and taxes are represented.'] },
      { heading: 'Choose which system owns each change', body: 'Inventory, prices, fulfillment, and payment status may change in different systems. The scope should name the source for each value and the direction of each update, rather than promising that everything synchronizes both ways.', items: ['Choose the source of available stock and item prices.', 'Define fulfillment and shipment status updates.', 'Plan cancellations, returns, refunds, and partial orders.'] },
      { heading: 'Review synchronization exceptions', body: 'Online stores and ERP systems will not always receive updates at the same time. Provide a way to find failed imports, retry safely, and compare store totals with ERPNext records during an initial pilot.', items: ['Preserve the original store order reference.', 'Prevent repeated events from creating duplicate orders.', 'Agree who resolves missing items or mismatched totals.'] },
    ],
    questions: [
      { question: 'Is ecommerce included in Nepal Compliance?', answer: 'This page presents a separately assessed integration option. Frappe’s ecommerce connectors and the public Nepal Compliance app are different projects.' },
      { question: 'Can any online store be connected?', answer: 'Assess the platform, its permitted connection methods, and available connectors first. This page does not claim a supported connector for every platform or version.' },
    ],
    related: ['fonepay-nepalpay-qr', 'sparrow-sms', 'custom-integrations'],
    sources: [source('Frappe Shopify integration documentation', 'https://docs.frappe.io/erpnext/shopify_integration'), source('Frappe ecommerce integrations project', 'https://github.com/frappe/ecommerce_integrations/blob/develop/README.md')],
  },
  {
    slug: 'custom-integrations', title: 'Custom ERPNext integration planning for Nepal businesses', shortTitle: 'Custom integrations', category: 'Business systems',
    description: 'Define a custom ERPNext integration around business records, approved system access, data ownership, exception handling, and a reviewable delivery scope.',
    intro: 'A custom integration connects a specific business process in ERPNext to another system. Frappe provides application interfaces and integration tools, but the useful starting point is the record or task your team needs to move between systems. This page describes how to define that scope.',
    audience: 'For businesses connecting existing software, partner systems, reporting tools, or operational devices.',
    sections: [
      { heading: 'Describe the record and the outcome', body: 'Choose a concrete workflow, such as importing an approved order or returning a shipment reference. Name the source system, destination record, required fields, and the person who will use the result.', items: ['Describe one complete business transaction.', 'Map fields and identify required business references.', 'Set the conditions that make the result ready for use.'] },
      { heading: 'Agree data ownership and access', body: 'Decide where each piece of information is maintained and which system may change it. Review the other system’s available documentation and authorized access before promising a connection or a delivery date.', items: ['Name the authoritative source for each shared value.', 'Use permissions appropriate to the agreed workflow.', 'Define update frequency and who can request changes.'] },
      { heading: 'Include exceptions and ongoing operation', body: 'An integration needs a usable process when records are missing, services are unavailable, or a request is repeated. The delivery scope should include representative tests, visible results, recovery steps, and responsibility for maintenance.', items: ['Prevent duplicate records when requests are repeated.', 'Make failed transfers identifiable and reviewable.', 'Agree acceptance examples and ownership after launch.'] },
    ],
    questions: [
      { question: 'Does having an API make an integration automatic?', answer: 'An application programming interface provides a way for software to communicate. The business mapping, permissions, validation, and recovery process still need to be designed and verified.' },
      { question: 'Will custom work become part of the public GPL app?', answer: 'That depends on the agreed scope, dependencies, and licensing. This page does not promise inclusion in the public project or prescribe terms for a future engagement.' },
    ],
    related: ['corporatepay', 'ecommerce', 'attendance-devices'],
    sources: [frappeApi, source('Frappe developer API reference', 'https://docs.frappe.io/framework/user/en/api')],
  },
];
