export const addons = [
  {
    "slug": "corporatepay",
    "title": "CORPORATEPAY integration options for ERPNext",
    "shortTitle": "CORPORATEPAY",
    "category": "Payments",
    "description": "Business payment preparation and reconciliation for ERPNext with CORPORATEPAY, bank approval workflows, and transaction references.",
    "intro": "Prepare supplier and salary payments in ERPNext around your bank's CORPORATEPAY process, run by Nepal Clearing House (NCHL).",
    "audience": "For finance teams making business transfers.",
    "sections": [
      {
        "heading": "Prepare payments",
        "body": "ERPNext records supply the beneficiary, amount, and reference; bank approvals stay in place.",
        "items": [
          "Beneficiary details in the bank's format.",
          "Batches reviewed before release.",
          "Each payment linked to its source record."
        ]
      },
      {
        "heading": "Match results",
        "body": "Match bank results to ERPNext records by payment reference.",
        "items": [
          "Prepared, approved, and completed states.",
          "Rejected payments reviewed before resubmitting.",
          "Bank enrollment confirmed first."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can any bank account connect?",
        "answer": "Your bank must confirm enrollment and access for that account."
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
    "intro": "Show a dynamic QR for each bill and match the payment to the ERPNext invoice.",
    "audience": "For shops and service businesses.",
    "sections": [
      {
        "heading": "Request payment for the bill",
        "body": "A dynamic QR carries the amount and reference of one bill.",
        "items": [
          "Merchant account per outlet or company.",
          "QR amount linked to the invoice.",
          "Expired requests handled."
        ]
      },
      {
        "heading": "Confirm before closing the sale",
        "body": "Mark a bill paid only after the provider confirms, never from a customer screenshot.",
        "items": [
          "Provider reference matched to the bill.",
          "No duplicate payments on delayed confirmations.",
          "Refunds and overpayments defined."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does a static QR mean my invoices are integrated?",
        "answer": "No. Matching each payment to a bill needs an agreed workflow."
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
    "intro": "Show the current bill's QR on a customer-facing NiziPOS display from Yarsa Tech while the cashier works in ERPNext.",
    "audience": "For retail counters and service desks.",
    "sections": [
      {
        "heading": "Display the active bill",
        "body": "The workstation sends the amount and QR to the display.",
        "items": [
          "Device model and workstation identified.",
          "QR for the active sale.",
          "Cleared when the sale ends."
        ]
      },
      {
        "heading": "Show the real payment result",
        "body": "Success messages come from a confirmed payment, not the display.",
        "items": [
          "Payment provider connected separately.",
          "Pending, success, and failure messages.",
          "Recovery steps for the cashier."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does the display connect ERPNext to a payment network?",
        "answer": "No. Merchant enrollment and the payment connection are separate."
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
    "intro": "Send order updates and payment reminders from ERPNext through Sparrow SMS.",
    "audience": "For customer service and operations teams.",
    "sections": [
      {
        "heading": "Choose the messages",
        "body": "Start with a few events, each with a clear recipient.",
        "items": [
          "Order and service status updates.",
          "Invoice and payment reminders.",
          "Internal staff notifications."
        ]
      },
      {
        "heading": "Templates and records",
        "body": "Use reviewed templates and keep the document reference with each send.",
        "items": [
          "No payroll or account details in texts.",
          "Sending outcome stored per document.",
          "No repeat sends on retries."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can I use this for bulk promotions?",
        "answer": "Promotions need their own consent and sender setup."
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
    "intro": "Keep government payment references, approvals, and receipts linked to ERPNext through the National Payments Interface (NPI).",
    "audience": "For finance teams making government payments.",
    "sections": [
      {
        "heading": "Prepare the payment",
        "body": "Link each payment to its obligation, amount, and required reference.",
        "items": [
          "Agency and payment type identified.",
          "Voucher or bill reference recorded.",
          "Approvals kept in place."
        ]
      },
      {
        "heading": "Close with a receipt",
        "body": "Close the record only with the payment result and the agency receipt.",
        "items": [
          "References matched to the obligation.",
          "Receipts retained.",
          "Unclear results resolved before paying again."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can anyone use NPI directly?",
        "answer": "No. Access depends on eligibility; confirm the route with NCHL or your provider."
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
    "intro": "Bring time-clock logs into Frappe HR check-ins. Support depends on the exact device model.",
    "audience": "For HR teams with time clocks.",
    "sections": [
      {
        "heading": "Map people to devices",
        "body": "Each device user must map to the right employee.",
        "items": [
          "Exact model and firmware.",
          "Device users mapped to employees.",
          "Clock and time zone checked."
        ]
      },
      {
        "heading": "From logs to attendance",
        "body": "Check-ins feed Frappe HR attendance, with a path for corrections.",
        "items": [
          "Night shifts tested.",
          "Duplicate and missing punches handled.",
          "Recovery after a connection outage."
        ]
      }
    ],
    "questions": [
      {
        "question": "Will any fingerprint or face device work?",
        "answer": "Only if the model, firmware, and connection method are supported. Check before buying."
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
    "intro": "Use NFC card taps from NiziTap as attendance events in Frappe HR. Confirm current availability with the supplier.",
    "audience": "For organisations considering card-based attendance.",
    "sections": [
      {
        "heading": "Define each tap",
        "body": "Decide whether a tap means arrival, departure, or something to review.",
        "items": [
          "Reader and device version identified.",
          "Each card assigned to one employee.",
          "Location of each reader recorded."
        ]
      },
      {
        "heading": "Manage cards",
        "body": "Have a process for issuing, replacing, and withdrawing cards.",
        "items": [
          "Card-to-employee register.",
          "Lost-card process.",
          "Disputed taps reviewed."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does a tap prove who used the card?",
        "answer": "No. It records the card, not the person."
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
    "intro": "Bring online orders into ERPNext accounts and stock, using a connector such as Frappe's Shopify integration.",
    "audience": "For online retailers.",
    "sections": [
      {
        "heading": "Map orders",
        "body": "Decide how store orders, products, and customers become ERPNext records.",
        "items": [
          "Store products mapped to items.",
          "Customers matched without duplicates.",
          "Discounts, shipping, and taxes mapped."
        ]
      },
      {
        "heading": "Decide which system owns what",
        "body": "Pick one source for stock, prices, and order status.",
        "items": [
          "Stock and price source chosen.",
          "Returns and refunds planned.",
          "Failed imports retried safely."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can any online store be connected?",
        "answer": "Only if a connector supports your platform and version."
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
    "intro": "Connect ERPNext to your other business systems, one workflow at a time.",
    "audience": "For businesses linking existing software.",
    "sections": [
      {
        "heading": "Start with one workflow",
        "body": "Name the source, the destination record, and who uses the result.",
        "items": [
          "One complete transaction described.",
          "Fields and references mapped.",
          "One owner for each shared value."
        ]
      },
      {
        "heading": "Plan for failures",
        "body": "Missing records, outages, and repeats need a clear process.",
        "items": [
          "No duplicates on repeated requests.",
          "Failed transfers visible.",
          "Maintenance owner agreed."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does an API make an integration automatic?",
        "answer": "No. Mapping, permissions, and recovery still need design and testing."
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
