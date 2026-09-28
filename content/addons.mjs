export const addons = [
  {
    "slug": "corporatepay",
    "title": "CORPORATEPAY integration options for ERPNext",
    "shortTitle": "CORPORATEPAY",
    "category": "Payments",
    "description": "Business payment preparation and reconciliation for ERPNext with CORPORATEPAY, bank approval workflows, and transaction references.",
    "intro": "Prepare business payments in ERPNext around the CORPORATEPAY process used by your finance team. CORPORATEPAY is operated by Nepal Clearing House Limited (NCHL) through participating banks. An integration is arranged separately around your bank’s approved workflow.",
    "audience": "For finance teams preparing supplier payments, salary payments, or other business transfers.",
    "sections": [
      {
        "heading": "Prepare payments from approved records",
        "body": "Start by deciding which ERPNext records should supply the beneficiary, amount, account, and payment reference. Agree whether the approved workflow uses a file or an authorized software connection before choosing an implementation.",
        "items": [
          "Map beneficiary details to the bank’s required format.",
          "Review payment batches before release.",
          "Keep a link between each payment request and its source record."
        ]
      },
      {
        "heading": "Keep bank approvals in the workflow",
        "body": "Keep the bank’s preparation and approval steps in place when connecting ERPNext. Staff should be able to see which payments await approval and which need another action.",
        "items": [
          "Identify the people who prepare and approve payments.",
          "Distinguish prepared, submitted, approved, and completed records.",
          "Agree how rejected or returned payments will be reviewed."
        ]
      },
      {
        "heading": "Match the result to your accounts",
        "body": "Match confirmed payment results and bank references to ERPNext records. Review each transfer separately when a batch contains both completed and unsuccessful payments.",
        "items": [
          "Match results using a stable payment reference.",
          "Review exceptions before another submission.",
          "Confirm bank enrollment and integration access before scheduling delivery."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is CORPORATEPAY included with Nepal Compliance?",
        "answer": "The connection is a separate integration. Confirm your bank’s supported process, account access, and implementation requirements before arranging it."
      },
      {
        "question": "Can every bank account connect directly?",
        "answer": "Your bank needs to confirm enrollment, the supported workflow, and authorized access for the account you want to use."
      }
    ],
    "related": [
      "npi-government-payments",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "NCHL CORPORATEPAY overview and approval roles",
        "url": "https://nchl.com.np/faqs/"
      },
      {
        "label": "CORPORATEPAY public user manual",
        "url": "https://connectips.com/cdn/CONNECTIPS/connectipsweb/files/CPAY_User_Manual.pdf"
      }
    ]
  },
  {
    "slug": "fonepay-nepalpay-qr",
    "title": "Fonepay and NEPALPAY QR integration options for ERPNext",
    "shortTitle": "Fonepay and NEPALPAY QR",
    "category": "Payments",
    "description": "Invoice-linked QR payment collection for ERPNext with Fonepay or NEPALPAY QR, payment confirmation, and settlement review.",
    "intro": "Use an invoice-linked QR payment workflow to associate customer payments with ERPNext bills. Fonepay and NEPALPAY QR support dynamic QR for billing or point-of-sale systems. Integration availability depends on your merchant account, provider access, and installation.",
    "audience": "For shops, service businesses, and finance teams collecting customer payments against invoices.",
    "sections": [
      {
        "heading": "Show the payment request for the bill",
        "body": "Dynamic QR can associate a payment request with a particular transaction. Define when the bill is ready for payment and how the customer will see its amount and reference.",
        "items": [
          "Choose the merchant account for each outlet or company.",
          "Connect the requested amount to the correct invoice.",
          "Decide how expired or replaced payment requests are handled."
        ]
      },
      {
        "heading": "Confirm receipt before closing the sale",
        "body": "Match the approved provider’s confirmation to the bill before marking it paid. Keep pending payments visible so staff can check delayed results without relying on a customer screenshot.",
        "items": [
          "Match the provider reference and amount to the bill.",
          "Review delayed confirmations without creating duplicate payments.",
          "Define how overpayments, refunds, and cancelled sales are handled."
        ]
      },
      {
        "heading": "Prepare merchant enrollment",
        "body": "Both providers direct merchants toward their bank or enrollment process. Confirm the service available to your business, the required merchant credentials, and the permitted integration method before committing to a rollout.",
        "items": [
          "Identify the acquiring bank and merchant account.",
          "Confirm a supported test and production process.",
          "Agree daily settlement and exception review with your accounts team."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does a static QR mean my invoice is integrated?",
        "answer": "A static QR can receive payments, but associating each payment with an ERPNext bill requires an agreed matching workflow. Confirm what your provider account supports."
      },
      {
        "question": "Are these connectors already part of Nepal Compliance?",
        "answer": "These connections are separate integrations. Confirm merchant enrollment, provider access, and compatibility with your ERPNext installation."
      }
    ],
    "related": [
      "nizipos-dynamic-qr",
      "ecommerce",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Fonepay business QR options",
        "url": "https://fonepay.com/business"
      },
      {
        "label": "NCHL NEPALPAY QR services and enrollment",
        "url": "https://nchl.com.np/nepalpay-qr/"
      }
    ]
  },
  {
    "slug": "nizipos-dynamic-qr",
    "title": "NiziPOS dynamic QR display integration for ERPNext",
    "shortTitle": "NiziPOS dynamic QR",
    "category": "Payment devices",
    "description": "Customer-facing NiziPOS QR displays for ERPNext billing, with bill amounts, payment feedback, and counter workflows.",
    "intro": "Show the current bill’s payment request on a customer-facing NiziPOS display while the cashier works in ERPNext. NiziPOS is a dynamic QR display device from Yarsa Tech. Device compatibility and the payment connection are confirmed as part of a separate integration.",
    "audience": "For retail counters and service desks that want a separate display for QR payment collection.",
    "sections": [
      {
        "heading": "Display the active bill",
        "body": "Define how the billing workstation sends the current amount and QR to the selected device. The customer should see which payment is requested while the cashier continues working on the main screen.",
        "items": [
          "Identify the device model and billing workstation.",
          "Display the payment request for the active sale.",
          "Clear or replace the request when a sale is cancelled or completed."
        ]
      },
      {
        "heading": "Connect feedback to the payment result",
        "body": "The device display and the payment provider perform different roles. The integration should base any success feedback on a confirmed payment result and associate that result with the correct ERPNext record.",
        "items": [
          "Agree the payment provider connection separately from the display.",
          "Define pending, successful, and failed payment messages.",
          "Confirm whether the selected model and setup support the desired feedback."
        ]
      },
      {
        "heading": "Check the counter setup",
        "body": "Yarsa Tech publishes model information, connector resources, command documentation, and development tools. Review these against the actual workstation and device before selecting the integration approach.",
        "items": [
          "Check device, connector, and workstation compatibility.",
          "Test disconnected hardware and interrupted payment requests.",
          "Document the cashier’s recovery steps and receipt workflow."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does buying a display connect ERPNext to a payment network?",
        "answer": "The display is one part of the workflow. Merchant enrollment, the payment provider connection, and the ERPNext integration need separate confirmation."
      },
      {
        "question": "What is needed for a NiziPOS connection?",
        "answer": "Confirm the device model, billing workstation, merchant account, and payment provider connection. The ERPNext integration is arranged separately."
      }
    ],
    "related": [
      "fonepay-nepalpay-qr",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Yarsa Tech NiziPOS product and developer resources",
        "url": "https://www.yarsa.tech/products/nizipos"
      },
      {
        "label": "NiziPOS supported commands",
        "url": "https://yarsa.tech/files/Dynamic%20Nizi%20POS%20Supported-Commands.pdf"
      }
    ]
  },
  {
    "slug": "sparrow-sms",
    "title": "Sparrow SMS integration options for ERPNext in Nepal",
    "shortTitle": "Sparrow SMS",
    "category": "Messaging",
    "description": "ERPNext business notifications through Sparrow SMS, including order updates, payment reminders, approved templates, and sending records.",
    "intro": "Send useful order updates, payment reminders, and operational messages through a Sparrow SMS connection to ERPNext. Choose the events and recipients your team needs. Account setup, sender approval, and the integration are arranged separately.",
    "audience": "For customer service, sales, and operations teams that need transactional text messages from ERPNext.",
    "sections": [
      {
        "heading": "Choose the events that need a message",
        "body": "Begin with a small set of useful notifications. Decide what event triggers each message, who receives it, and whether a staff member must approve it before sending.",
        "items": [
          "Order and service status updates.",
          "Invoice or payment reminders with approved wording.",
          "Internal operational notifications to designated staff."
        ]
      },
      {
        "heading": "Prepare recipients and templates",
        "body": "A useful message contains the information the recipient needs without exposing unrelated account details. Agree the language, sender identity, contact data, and communication preferences before enabling a trigger.",
        "items": [
          "Use reviewed message templates and business references.",
          "Check phone numbers and the intended recipient.",
          "Keep sensitive payroll or account details out of routine text messages."
        ]
      },
      {
        "heading": "Review sending outcomes",
        "body": "Keep the ERPNext document reference with each sending outcome so staff can investigate a message. Confirm which delivery status information is available for your Sparrow account and decide how failed requests are handled.",
        "items": [
          "Store the related ERPNext document and sending outcome.",
          "Control repeat sends when an event is retried.",
          "Agree who maintains account access, sender settings, and message usage."
        ]
      }
    ],
    "questions": [
      {
        "question": "Will every message be delivered immediately?",
        "answer": "Do not assume immediate delivery. Confirm the provider’s available status information and decide how staff should handle delayed or failed messages."
      },
      {
        "question": "Can I use this for bulk promotions?",
        "answer": "Promotional messaging needs its own setup for recipient permission, sender approval, provider rules, and campaign management. Agree these requirements separately from routine business notifications."
      }
    ],
    "related": [
      "ecommerce",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Sparrow SMS API documentation",
        "url": "https://docs.sparrowsms.com/"
      },
      {
        "label": "Sparrow SMS outgoing request documentation",
        "url": "https://docs.sparrowsms.com/sms/documentation/"
      }
    ]
  },
  {
    "slug": "npi-government-payments",
    "title": "NPI and government payment integration options for ERPNext",
    "shortTitle": "NPI and government payments",
    "category": "Payments",
    "description": "Government payment workflows for ERPNext with payment references, approval steps, and receipt matching through eligible services.",
    "intro": "Keep government payment references, approvals, and receipts connected to your ERPNext accounting work. The National Payments Interface (NPI) connects services operated by NCHL and participating institutions. Each integration depends on the agency, service, and access available to your organisation.",
    "audience": "For finance teams handling government-related payments or evaluating an authorized institutional payment connection.",
    "sections": [
      {
        "heading": "Identify the payment service",
        "body": "Name the agency, payment purpose, and service used today. A revenue payment, an institutional transfer, and a payroll contribution may follow different processes even when payment infrastructure is shared.",
        "items": [
          "Identify the destination institution and payment category.",
          "Record the voucher, bill, or other required reference.",
          "Confirm whether your organisation can use the proposed channel."
        ]
      },
      {
        "heading": "Prepare and approve the payment",
        "body": "Connect the approved payment obligation to its amount and reference, while keeping the bank or service’s authorization steps in place. Give finance staff a clear record of what is ready for payment.",
        "items": [
          "Map the ERPNext record to the service’s required information.",
          "Assign payment preparation and approval responsibilities.",
          "Validate the reference before requesting payment."
        ]
      },
      {
        "heading": "Record confirmation and receipts",
        "body": "Government payment completion may involve both a payment result and an agency receipt. Define which evidence is required to close the accounting record, and how the team investigates a debit with a delayed or missing receipt.",
        "items": [
          "Match transaction references to the original obligation.",
          "Retain the relevant receipt or confirmation record.",
          "Resolve uncertain results before making another payment."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does an open API mean anyone can use NPI directly?",
        "answer": "Access depends on participation, eligibility, and the services available to your organisation. Confirm the authorized route and onboarding requirements with NCHL or your service provider."
      },
      {
        "question": "Will one integration cover every government payment?",
        "answer": "Each agency and service needs its own compatibility review. Agree the required payment types and receipt process before implementation."
      }
    ],
    "related": [
      "corporatepay",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "NCHL National Payments Interface",
        "url": "https://nchl.com.np/national-payments-interface-npi/"
      },
      {
        "label": "NCHL government revenue payment guidance",
        "url": "https://nchl.com.np/faqs/"
      }
    ]
  },
  {
    "slug": "attendance-devices",
    "title": "Attendance device integration options for Frappe HR",
    "shortTitle": "Attendance devices",
    "category": "Attendance",
    "description": "Attendance device connections for Frappe HR, covering employee check-ins, shift rules, duplicate records, and attendance review.",
    "intro": "Bring device attendance logs into Frappe HR employee check-in records. A separate integration can connect your time clock to the attendance workflow your team uses. Compatibility depends on the exact device model, available connection method, and installation.",
    "audience": "For human resources teams connecting existing time clocks or evaluating new attendance hardware.",
    "sections": [
      {
        "heading": "Match people and device records",
        "body": "Each device identifier must map to the correct employee. Review the device’s available data before committing to a connector, including the employee identifier, time, location, and any check-in or check-out indicator.",
        "items": [
          "Identify the exact device model and firmware.",
          "Map device users to employee records.",
          "Check time settings and log information."
        ]
      },
      {
        "heading": "Turn logs into reviewed attendance",
        "body": "Use check-in records as inputs to Frappe HR attendance processing. Match the connection to your shifts and attendance settings so missed punches and corrections reach the right reviewer.",
        "items": [
          "Test normal shifts and shifts that cross midnight.",
          "Handle duplicate logs and missing check-outs.",
          "Provide a review path for corrections and exceptions."
        ]
      },
      {
        "heading": "Plan interrupted connections",
        "body": "Agree what happens when the device or server is unavailable. Recovery needs to preserve original times and avoid importing the same records repeatedly. Confirm what the hardware can retain rather than assuming offline operation.",
        "items": [
          "Agree import frequency and failure visibility.",
          "Test reconnecting after an interruption.",
          "Assign responsibility for employee mapping and device maintenance."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is biometric support already in Nepal Compliance?",
        "answer": "Biometric compatibility in Nepal Compliance is planned. Device connections to Frappe HR are separate integrations and require a model-specific assessment."
      },
      {
        "question": "Will any fingerprint or face-recognition device work?",
        "answer": "Support depends on the exact model, firmware, and connection method. Confirm these details before buying hardware or arranging an integration."
      }
    ],
    "related": [
      "nizitap-nfc-attendance",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Frappe HR Employee Checkin documentation",
        "url": "https://docs.frappe.io/hr/employee-checkin"
      },
      {
        "label": "Frappe HR automatic attendance",
        "url": "https://docs.frappe.io/hr/using-auto-attendance"
      },
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      }
    ]
  },
  {
    "slug": "nizitap-nfc-attendance",
    "title": "NiziTap NFC attendance integration for Frappe HR",
    "shortTitle": "NiziTap NFC attendance",
    "category": "Attendance",
    "description": "NiziTap NFC attendance options for Frappe HR, with employee card assignment, tap records, and attendance review.",
    "intro": "Use card or tag taps as the starting point for an employee attendance workflow. NiziTap uses near-field communication (NFC) for attendance; its connection to Frappe HR requires a separate assessment. Confirm current device availability and supported connections with the supplier.",
    "audience": "For organisations evaluating NiziTap and card-based attendance alongside Frappe HR.",
    "sections": [
      {
        "heading": "Define the attendance event",
        "body": "Decide what a tap should mean at each reader: arrival, departure, or an event requiring later review. Confirm the actual device output before mapping it to an employee check-in record.",
        "items": [
          "Identify the reader and current device version.",
          "Assign a card or tag to the correct employee.",
          "Define the location and meaning of each recorded tap."
        ]
      },
      {
        "heading": "Manage cards and exceptions",
        "body": "Card-based attendance needs a process for issuing, replacing, and withdrawing credentials. Agree how staff correct mistakes and handle missing cards without losing the link to the employee record.",
        "items": [
          "Record which card is assigned to each employee.",
          "Define the process for lost or replaced cards.",
          "Review repeated taps and disputed attendance events."
        ]
      },
      {
        "heading": "Confirm the connection before rollout",
        "body": "Confirm current hardware specifications, available connection methods, and sample event records with the supplier. Test the selected setup against Frappe HR check-ins and your shift rules before rolling it out.",
        "items": [
          "Confirm the supported method for obtaining events.",
          "Test interruptions and any available recovery behavior.",
          "Agree the pilot location, review process, and operating responsibilities."
        ]
      }
    ],
    "questions": [
      {
        "question": "What should we confirm before choosing NiziTap?",
        "answer": "Confirm current availability, specifications, and supported connections with the supplier. The published product announcement described testing, so it should not be used as a current compatibility specification."
      },
      {
        "question": "Does an NFC tap prove who used the card?",
        "answer": "A tap records use of a credential. Your organisation needs an appropriate card-assignment and attendance-review process; the integration should not treat a card identifier as independent proof of identity."
      }
    ],
    "related": [
      "attendance-devices",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Yarsa NiziTap announcement, July 2024",
        "url": "https://news.yarsalabs.com/get-ready-to-tap-in-yarsa-tech-new-launch-nizi-tap-coming-soon/"
      },
      {
        "label": "Frappe HR Employee Checkin documentation",
        "url": "https://docs.frappe.io/hr/employee-checkin"
      }
    ]
  },
  {
    "slug": "ecommerce",
    "title": "Ecommerce integration options for ERPNext in Nepal",
    "shortTitle": "Ecommerce",
    "category": "Sales channels",
    "description": "Online-store connections for ERPNext orders, customers, products, inventory, payments, and fulfillment.",
    "intro": "Bring online orders into the accounts and inventory workflows your team manages in ERPNext. Ecommerce connectors, including a separate Shopify connector, provide a starting point. The supported workflow depends on your store platform, connector, and software versions.",
    "audience": "For online retailers and businesses managing website sales alongside accounting and inventory.",
    "sections": [
      {
        "heading": "Bring orders into the business workflow",
        "body": "Decide which store event should create a sales order and how customers, products, discounts, shipping, and taxes map to ERPNext. Product codes and customer matching need a consistent rule to avoid duplicate records.",
        "items": [
          "Map store products to ERPNext items.",
          "Define customer matching and address handling.",
          "Agree how discounts, shipping charges, and taxes are represented."
        ]
      },
      {
        "heading": "Choose which system owns each change",
        "body": "Choose where inventory, prices, fulfillment, and payment status are maintained. Define the direction of each update so staff know which system to use when information changes.",
        "items": [
          "Choose the source of available stock and item prices.",
          "Define fulfillment and shipment status updates.",
          "Plan cancellations, returns, refunds, and partial orders."
        ]
      },
      {
        "heading": "Review synchronization exceptions",
        "body": "Online stores and ERP systems will not always receive updates at the same time. Provide a way to find failed imports, retry safely, and compare store totals with ERPNext records during an initial pilot.",
        "items": [
          "Preserve the original store order reference.",
          "Prevent repeated events from creating duplicate orders.",
          "Agree who resolves missing items or mismatched totals."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is ecommerce included in Nepal Compliance?",
        "answer": "Ecommerce connections are separate integrations. Select a connector that supports your store platform and ERPNext version, then configure the order and inventory workflow."
      },
      {
        "question": "Can any online store be connected?",
        "answer": "Compatibility depends on the platform’s permitted connection methods and available connectors. Confirm support for your platform and version before implementation."
      }
    ],
    "related": [
      "fonepay-nepalpay-qr",
      "sparrow-sms",
      "custom-integrations"
    ],
    "sources": [
      {
        "label": "Frappe Shopify integration documentation",
        "url": "https://docs.frappe.io/erpnext/shopify_integration"
      },
      {
        "label": "Frappe ecommerce integrations project",
        "url": "https://github.com/frappe/ecommerce_integrations/blob/develop/README.md"
      }
    ]
  },
  {
    "slug": "custom-integrations",
    "title": "Custom ERPNext integrations for Nepal businesses",
    "shortTitle": "Custom integrations",
    "category": "Business systems",
    "description": "Custom connections between ERPNext and business software, partner services, reporting tools, and operational devices.",
    "intro": "Connect the records your team uses across ERPNext and other business systems. A custom integration can handle a specific task, such as importing an approved order or returning a shipment reference. Access, compatibility, and delivery are agreed for each integration.",
    "audience": "For businesses connecting existing software, partner systems, reporting tools, or operational devices.",
    "sections": [
      {
        "heading": "Describe the record and the outcome",
        "body": "Choose a concrete workflow, such as importing an approved order or returning a shipment reference. Name the source system, destination record, required fields, and the person who will use the result.",
        "items": [
          "Describe one complete business transaction.",
          "Map fields and identify required business references.",
          "Set the conditions that make the result ready for use."
        ]
      },
      {
        "heading": "Agree data ownership and access",
        "body": "Decide where each piece of information is maintained and which system may change it. Review the other system’s available documentation and authorized access before promising a connection or a delivery date.",
        "items": [
          "Name the authoritative source for each shared value.",
          "Use permissions appropriate to the agreed workflow.",
          "Define update frequency and who can request changes."
        ]
      },
      {
        "heading": "Include exceptions and ongoing operation",
        "body": "An integration needs a usable process when records are missing, services are unavailable, or a request is repeated. The delivery scope should include representative tests, visible results, recovery steps, and responsibility for maintenance.",
        "items": [
          "Prevent duplicate records when requests are repeated.",
          "Make failed transfers identifiable and reviewable.",
          "Agree acceptance examples and ownership after launch."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does having an API make an integration automatic?",
        "answer": "An application programming interface provides a way for software to communicate. The business mapping, permissions, validation, and recovery process still need to be designed and verified."
      },
      {
        "question": "How is custom integration work agreed?",
        "answer": "Agree the supported workflow, access requirements, dependencies, licensing, and maintenance responsibilities before development. Inclusion in the public app is a separate decision."
      }
    ],
    "related": [
      "corporatepay",
      "ecommerce",
      "attendance-devices"
    ],
    "sources": [
      {
        "label": "Frappe API and integration documentation",
        "url": "https://frappe.io/framework/api-and-integrations"
      },
      {
        "label": "Frappe developer API reference",
        "url": "https://docs.frappe.io/framework/user/en/api"
      }
    ]
  }
];
