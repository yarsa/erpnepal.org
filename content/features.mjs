export const features = [
  {
    "slug": "accounting-and-vat",
    "shortTitle": "Accounting and VAT",
    "title": "Nepal accounting and VAT reports for ERPNext",
    "description": "Sales, purchase, return, and VAT reports for Nepal businesses using ERPNext, with customer and supplier registers and balance confirmation.",
    "intro": "VAT registers and reports built from the transactions your team records in ERPNext.",
    "audience": "For accountants and finance teams.",
    "sections": [
      {
        "heading": "VAT registers and returns",
        "body": "Review a reporting period before you prepare figures for your accountant.",
        "items": [
          "Sales and sales return VAT registers.",
          "Purchase and purchase return VAT registers.",
          "VAT return report."
        ]
      },
      {
        "heading": "Review by period or business partner",
        "body": "Find transactions for one customer, supplier, or month.",
        "items": [
          "Party-wise sales and purchase registers.",
          "Monthly sales and purchase registers.",
          "Balance confirmation and landing cost reports."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does the app replace ERPNext accounting?",
        "answer": "No. It adds Nepal-specific reports on top of ERPNext."
      }
    ],
    "related": [
      "invoicing",
      "audit-and-reports",
      "cbms"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "VAT Return Report technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/report/vat_return_report/vat_return_report.py"
      },
      {
        "label": "Sales VAT Register technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/report/sales_vat_register/sales_vat_register.py"
      }
    ]
  },
  {
    "slug": "invoicing",
    "shortTitle": "Invoicing and billing",
    "title": "Nepal invoicing and billing controls for ERPNext",
    "description": "Sequential invoice numbering, cancellation records, printed copy counts, and Nepali invoice formats for ERPNext billing.",
    "intro": "Traceable invoice numbers, cancellations, and printed copies in ERPNext.",
    "audience": "For billing staff and accounts managers.",
    "sections": [
      {
        "heading": "Numbers and printed copies",
        "body": "Invoices are numbered in order, and reprints are marked as copies.",
        "items": [
          "Sequential invoice numbering.",
          "Copy marking on reprints.",
          "Print format with Nepali dates."
        ]
      },
      {
        "heading": "Cancellations",
        "body": "Only the Accounts Manager role can cancel; others use a return or credit note.",
        "items": [
          "Cancelled-invoice reports.",
          "Sales Cancellation Register.",
          "Audit trail on invoice records."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can every user cancel a sales invoice?",
        "answer": "No. Cancelling needs the Accounts Manager role."
      },
      {
        "question": "Does printing an invoice send it to CBMS?",
        "answer": "No. CBMS submission is separate; check its recorded response."
      }
    ],
    "related": [
      "accounting-and-vat",
      "cbms",
      "audit-and-reports"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "Sales invoice cancellation technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/overrides/custom_sales_invoice.py"
      },
      {
        "label": "Invoice print format",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/print_format/invoice_nepal_compliance/invoice_nepal_compliance.json"
      }
    ]
  },
  {
    "slug": "cbms",
    "shortTitle": "IRD CBMS integration",
    "title": "IRD CBMS integration for ERPNext in Nepal",
    "description": "Connect ERPNext billing to IRD CBMS with configured credentials, sales and return submissions, and recorded responses for your accounts team to review.",
    "intro": "Send sales invoices and returns to the IRD Central Billing Monitoring System (CBMS) and see each response on the invoice.",
    "audience": "For accounts managers and administrators.",
    "sections": [
      {
        "heading": "Set up the connection",
        "body": "An administrator enters the CBMS credentials, PAN/VAT number, and service addresses, then enables it.",
        "items": [
          "Off by default.",
          "Credentials and business PAN/VAT number.",
          "Separate sales and credit note settings."
        ]
      },
      {
        "heading": "Submissions and responses",
        "body": "Each invoice shows its CBMS status, so failures are easy to find.",
        "items": [
          "Sales invoice and credit note submissions.",
          "Status and response on each invoice.",
          "Retry for unsuccessful submissions."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is CBMS enabled automatically?",
        "answer": "No. It starts disabled until you configure it."
      }
    ],
    "related": [
      "invoicing",
      "accounting-and-vat",
      "audit-and-reports"
    ],
    "sources": [
      {
        "label": "CBMS integration technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/cbms_api.py"
      },
      {
        "label": "CBMS Settings fields",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/doctype/cbms_settings/cbms_settings.json"
      },
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      }
    ]
  },
  {
    "slug": "payroll",
    "shortTitle": "Payroll and contributions",
    "title": "Nepal payroll configuration for ERPNext and Frappe HR",
    "description": "Nepal payroll contributions, salary components, tax slab configuration, gratuity, and employee grades for ERPNext and Frappe HR.",
    "intro": "Nepal contributions, tax slabs, and salary components for Frappe HR.",
    "audience": "For payroll teams and accountants.",
    "sections": [
      {
        "heading": "Contributions",
        "body": "Choose the contributions that apply to each employee.",
        "items": [
          "Employees Provident Fund (EPF).",
          "Social Security Fund (SSF).",
          "CIT, insurance, and other optional contributions."
        ]
      },
      {
        "heading": "Salary components and tax slabs",
        "body": "Tax slabs use the employee's marital status and the company fiscal year.",
        "items": [
          "Minimum basic salary.",
          "Gratuity and employee grades.",
          "Income tax slabs by fiscal year."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is it a separate payroll app?",
        "answer": "No. It extends Frappe HR inside ERPNext."
      },
      {
        "question": "What should we check before each pay period?",
        "answer": "Tax slabs, contributions, and employee changes, confirmed by your payroll professional."
      }
    ],
    "related": [
      "hr-and-leave",
      "accounting-and-vat",
      "nepali-dates"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "Salary component definitions",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/custom_code/payroll/salary_component.py"
      },
      {
        "label": "Income tax slab setup",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/custom_code/payroll/income_tax_slab.py"
      }
    ]
  },
  {
    "slug": "hr-and-leave",
    "shortTitle": "Employee records and leave",
    "title": "Nepal employee records and leave for Frappe HR",
    "description": "Employee records, sick and home leave allocation, and Nepali attendance and holiday dates for ERPNext and Frappe HR.",
    "intro": "Employee fields, sick and home leave, and Nepali dates in Frappe HR.",
    "audience": "For HR staff and administrators.",
    "sections": [
      {
        "heading": "Employee records",
        "body": "Keep the details leave and payroll need in one place.",
        "items": [
          "Required employee fields.",
          "Nepali dates for attendance, leave, and holidays.",
          "Fiscal year allocation on Nepali dates."
        ]
      },
      {
        "heading": "Leave allocation",
        "body": "Sick and home leave are allocated from days worked.",
        "items": [
          "Sick and home leave.",
          "Monthly allocation on the Bikram Sambat calendar.",
          "Maximum allowance checks."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does the app set our leave policy?",
        "answer": "No. It runs the policy you configure."
      },
      {
        "question": "Can I connect a fingerprint device?",
        "answer": "Biometric support is planned; each device model needs its own check."
      }
    ],
    "related": [
      "payroll",
      "nepali-dates",
      "audit-and-reports"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "Monthly Nepali-calendar leave allocation",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/custom_code/leave_allocation/monthly_leave_bs.py"
      },
      {
        "label": "Leave type configuration",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/custom_code/leave_type/leave_type.py"
      }
    ]
  },
  {
    "slug": "audit-and-reports",
    "shortTitle": "Audit trails and records",
    "title": "ERPNext audit trails and document history for Nepal",
    "description": "Audit trails, document changes, cancellation records, and reports to help accounts teams review ERPNext transaction history.",
    "intro": "See who changed a document, when, and what changed.",
    "audience": "For finance reviewers and administrators.",
    "sections": [
      {
        "heading": "Activity and cancellations",
        "body": "Audit reports and a separate register of cancelled invoices.",
        "items": [
          "User activity and document changes.",
          "Audit Trail report and SQL query audit logs.",
          "Sales Cancellation Register."
        ]
      },
      {
        "heading": "Investigate a change",
        "body": "Search by document or user to see old and new values for invoices, journals, payments, and stock.",
        "items": [
          "Search by document or user.",
          "Old and new field values with times.",
          "Materialized Report for sales and purchases."
        ]
      }
    ],
    "questions": [
      {
        "question": "Do these reports replace an audit?",
        "answer": "No. They give reviewers records to work from."
      },
      {
        "question": "Where do I start with one transaction?",
        "answer": "Find its document reference, then review the recorded changes."
      }
    ],
    "related": [
      "accounting-and-vat",
      "invoicing",
      "cbms"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "Audit Trail report",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/report/audit_trail/audit_trail.py"
      },
      {
        "label": "Audit Log technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/report/audit_log/audit_log.py"
      },
      {
        "label": "Materialized Report technical reference",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/report/materialized_report/materialized_report.py"
      }
    ]
  },
  {
    "slug": "nepali-dates",
    "shortTitle": "Nepali dates and fiscal years",
    "title": "Bikram Sambat dates for ERPNext in Nepal",
    "description": "Bikram Sambat dates for ERPNext forms, fiscal years, lists, reports, and printed business documents.",
    "intro": "Bikram Sambat dates in forms, lists, reports, and printed documents.",
    "audience": "For accounting, billing, and HR teams.",
    "sections": [
      {
        "heading": "Entering and finding records",
        "body": "Use Nepali dates from data entry through to reports.",
        "items": [
          "Nepali date input fields and fiscal years.",
          "Filter, sort, and search by Nepali date.",
          "Nepali dates in reports."
        ]
      },
      {
        "heading": "Printing and HR",
        "body": "The same dates appear on printed documents and in HR records.",
        "items": [
          "Nepali dates in print templates.",
          "Attendance and holidays on local dates.",
          "Monthly leave allocation on Bikram Sambat."
        ]
      }
    ],
    "questions": [
      {
        "question": "Do custom forms get Nepali dates automatically?",
        "answer": "Not always. Test custom fields and extensions during setup."
      },
      {
        "question": "What should I test first?",
        "answer": "One transaction from entry to report to printout."
      }
    ],
    "related": [
      "accounting-and-vat",
      "invoicing",
      "hr-and-leave"
    ],
    "sources": [
      {
        "label": "Nepal Compliance technical documentation",
        "url": "https://github.com/yarsa/nepal-compliance#key-features"
      },
      {
        "label": "Nepali date form technical references",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/public/js/nepali_date_override.js"
      },
      {
        "label": "Report filter integration",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/public/js/report_filter.js"
      },
      {
        "label": "Fiscal year date integration",
        "url": "https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/public/js/wizard_fiscal_year_date.js"
      }
    ]
  }
];
