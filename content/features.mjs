export const features = [
  {
    "slug": "accounting-and-vat",
    "title": "Nepal accounting and VAT reports for ERPNext",
    "description": "Sales, purchase, return, and VAT reports for Nepal businesses using ERPNext, with customer and supplier registers and balance confirmation.",
    "intro": "Review sales, purchases, returns, and customer or supplier balances from the transactions your team records in ERPNext. Nepal Compliance adds value-added tax (VAT) registers and reporting tools for your accounting work in Nepal.",
    "audience": "For accountants, finance teams, and implementation partners evaluating ERPNext for a business in Nepal.",
    "sections": [
      {
        "heading": "VAT registers and returns",
        "body": "Separate registers for sales, purchases, and returns help your accounts team review a reporting period. Use the VAT Return Report alongside those registers when preparing figures for your accountant.",
        "items": [
          "Sales VAT Register and Sales Return VAT Register.",
          "Purchase VAT Register and Purchase Return VAT Register.",
          "VAT return reporting based on the accounting records in the system."
        ]
      },
      {
        "heading": "Review transactions by period and business partner",
        "body": "Find transactions for a particular customer, supplier, or month. ERPNext calls customers and suppliers “parties”; the party-wise registers help you review a business relationship without searching through every transaction.",
        "items": [
          "Party-wise sales and purchase registers.",
          "Monthly sales and purchase registers.",
          "Balance confirmation and purchase landing cost reports."
        ]
      },
      {
        "heading": "Prepare your accounting setup",
        "body": "Select the company and reporting period, then compare report totals with your invoices and returns. Your accounts, taxes, and transaction records determine the results. Confirm the reports and settings available in your installed version before live use.",
        "items": [
          "Select the company and fiscal period to review.",
          "Check sample invoices, returns, and report totals with your accountant.",
          "Confirm report settings during installation."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does the app replace ERPNext accounting?",
        "answer": "No. It extends ERPNext with Nepal-specific reports and workflows. ERPNext remains the underlying system for accounts and transactions."
      },
      {
        "question": "Does generating a VAT report complete tax filing?",
        "answer": "Use the report to prepare and review your figures. Your accountant still needs to confirm the contents and complete the applicable filing process."
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
    "title": "Nepal invoicing and billing controls for ERPNext",
    "description": "Sequential invoice numbering, cancellation records, printed copy counts, and Nepali invoice formats for ERPNext billing.",
    "intro": "Keep invoice numbers, cancelled transactions, and printed copies traceable in ERPNext. Nepal Compliance adds sequential numbering, cancellation records, and reprint copy counts to help billing staff and accounts managers review the same transaction history.",
    "audience": "For billing staff, accounts managers, and teams configuring invoice workflows in ERPNext.",
    "sections": [
      {
        "heading": "Invoice numbers and printed copies",
        "body": "Issue invoices with automatically increasing numbers and identify later printed copies. Configure the numbering and print format together so the customer document matches the record your accounts team reviews.",
        "items": [
          "Sequential invoice numbering.",
          "Copy identification on subsequent invoice prints.",
          "Invoice print formats with Nepal-specific fields and Nepali dates."
        ]
      },
      {
        "heading": "Cancellation and return records",
        "body": "Keep a record when an invoice is cancelled. Cancellation requires the Accounts Manager role; other users are directed toward a return or credit note. Agree who approves corrections and how billing staff should request them.",
        "items": [
          "Reports for viewing or printing cancelled invoices.",
          "A Sales Cancellation Register for reviewing cancelled sales.",
          "Activity audit trails alongside invoice records."
        ]
      },
      {
        "heading": "Check the complete billing workflow",
        "body": "Check creation, submission, printing, reprinting, returns, and cancellation with sample transactions before your team starts billing. Configure the CBMS connection separately and assign someone to review its responses alongside invoice records.",
        "items": [
          "Confirm which staff roles can create and cancel invoices.",
          "Check your original and repeat invoice prints.",
          "Review invoice records alongside VAT reports and any CBMS responses."
        ]
      }
    ],
    "questions": [
      {
        "question": "Can every user cancel a sales invoice?",
        "answer": "Cancellation requires the Accounts Manager role. Review your staff permissions and correction process during setup."
      },
      {
        "question": "Does printing an invoice send it to CBMS?",
        "answer": "Printing and CBMS submission are different functions. Configure and test the billing integration separately, and check its recorded response rather than assuming a printed invoice was accepted."
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
    "title": "IRD CBMS integration for ERPNext in Nepal",
    "description": "Connect ERPNext billing to IRD CBMS with configured credentials, sales and return submissions, and recorded responses for your accounts team to review.",
    "intro": "Connect sales invoices and returns to the Inland Revenue Department’s Central Billing Monitoring System (CBMS). Nepal Compliance prepares the billing data and records responses on the invoice, giving your accounts team a place to review the result. Setup and verification are required for your business.",
    "audience": "For accounts managers and administrators assessing an ERPNext connection to Nepal’s billing service.",
    "sections": [
      {
        "heading": "Configure the connection",
        "body": "Your administrator configures the CBMS username, password, business PAN/VAT number, and service addresses for sales and credit notes. Enable the connection after these details and the applicable onboarding requirements have been confirmed.",
        "items": [
          "Enable CBMS configuration in the application settings.",
          "Provide the relevant account credentials and business identifier.",
          "Review the sales and credit note service configuration with your administrator."
        ]
      },
      {
        "heading": "Invoices, returns, and responses",
        "body": "Review the submission status beside the invoice. Sales and returns have separate submission paths, with fiscal year and Nepali invoice dates included in the billing data. Recorded responses help your team identify transactions that need attention.",
        "items": [
          "Sales invoice and credit note submissions.",
          "CBMS status and response information on invoices.",
          "Retry processing for invoices without a successful status."
        ]
      },
      {
        "heading": "Verify before live use",
        "body": "Test both an invoice and a return through the permitted process before relying on the connection. A queued request still needs a confirmed result. Assign an owner to check unsuccessful or unexpected responses and decide when another attempt is appropriate.",
        "items": [
          "Test the intended invoice and return workflow before relying on it.",
          "Assign responsibility for reviewing failed or unexpected responses.",
          "Confirm current operational requirements with your accountant and the relevant authority."
        ]
      }
    ],
    "questions": [
      {
        "question": "Is CBMS enabled automatically?",
        "answer": "CBMS starts disabled. Configure the required account details and complete the connection checks before enabling it."
      },
      {
        "question": "Does setting up CBMS complete regulatory approval?",
        "answer": "Configuration and regulatory approval are separate. Confirm the current requirements for your business with your accountant and IRD; a configured connection alone does not establish certification."
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
    "title": "Nepal payroll configuration for ERPNext and Frappe HR",
    "description": "Nepal payroll contributions, salary components, tax slab configuration, gratuity, and employee grades for ERPNext and Frappe HR.",
    "intro": "Configure earnings, deductions, and payroll contributions for employees in Nepal. Nepal Compliance extends Frappe HR with provident fund and social security support, optional contributions, tax slabs, gratuity, employee grades, and basic salary settings.",
    "audience": "For payroll teams, accountants, and implementation partners configuring employee pay in Nepal.",
    "sections": [
      {
        "heading": "Payroll contributions",
        "body": "Select the contributions that apply to each employee and salary structure. Review the resulting amounts against your approved payroll calculations before the first pay run.",
        "items": [
          "Employees Provident Fund (EPF) support.",
          "Social Security Fund (SSF) support.",
          "Citizen Investment Trust (CIT), insurance, and other optional contributions."
        ]
      },
      {
        "heading": "Salary components and tax slabs",
        "body": "Build salary calculations from earnings and deduction components, including basic salary, gratuity, contributions, and employee grades. Tax slab configuration uses employee marital status and company fiscal year information.",
        "items": [
          "Minimum basic salary configuration.",
          "Gratuity and employee grade components.",
          "Income tax slab setup by company and fiscal year."
        ]
      },
      {
        "heading": "Review payroll configuration for your period",
        "body": "Review the effective period, salary structures, filing status, and contribution choices before processing pay. Keep formulas and tax values aligned with the requirements for that period; software installation alone does not keep those choices current.",
        "items": [
          "Test representative employee salary slips before a live pay run.",
          "Review changes to tax rules and contribution arrangements separately from software installation.",
          "Keep ERPNext, Frappe HR, and Nepal Compliance versions compatible with your chosen setup."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does Nepal Compliance provide a separate payroll application?",
        "answer": "No. It extends Frappe HR within an ERPNext installation. The installation guide requires ERPNext and Frappe HR to be installed before Nepal Compliance."
      },
      {
        "question": "What should we review before each payroll period?",
        "answer": "Check tax slabs, contribution arrangements, employee changes, and the effective payroll period. Your payroll professional should confirm any changes to the applicable requirements."
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
    "title": "Nepal employee records and leave for Frappe HR",
    "description": "Employee records, sick and home leave allocation, and Nepali attendance and holiday dates for ERPNext and Frappe HR.",
    "intro": "Manage employee information, leave allocation, attendance dates, and holidays in Frappe HR. Nepal Compliance adds local employee fields and sick and home leave workflows, including configurable monthly allocation using Nepal’s Bikram Sambat calendar.",
    "audience": "For human resources staff and administrators responsible for employee records, leave policies, and attendance.",
    "sections": [
      {
        "heading": "Employee records and dates",
        "body": "Keep the employee details used by leave administration and payroll in the same system. Required fields and Nepali date support help your team maintain the records needed for each employee.",
        "items": [
          "Required employee fields.",
          "Nepali dates for attendance, leave, and holiday records.",
          "Fiscal year allocation based on Nepali dates."
        ]
      },
      {
        "heading": "Leave allocation",
        "body": "Allocate sick and home leave based on working days. For leave types using monthly allocation, set the amount and maximum allowance; eligible active allocations receive the configured monthly amount.",
        "items": [
          "Sick and home leave allocation.",
          "Monthly allocation using the Bikram Sambat calendar.",
          "Maximum allowance checks for monthly allocation."
        ]
      },
      {
        "heading": "Prepare policies and attendance inputs",
        "body": "Agree leave types, allocation amounts, policy assignments, and employee start dates before enabling the workflow. Review an employee’s balance across the period you intend to use. Biometric attendance support is planned, and device integrations need a separate compatibility check.",
        "items": [
          "Confirm leave policies and amounts with your human resources team.",
          "Check both initial allocations and subsequent monthly changes.",
          "Verify attendance device compatibility before buying or connecting equipment."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does the app set every company’s leave policy?",
        "answer": "The app provides configuration and allocation workflows. Your organisation still needs to review its policies, employee records, and applicable requirements before using them."
      },
      {
        "question": "Can I connect a fingerprint attendance device?",
        "answer": "Biometric attendance support is planned. A device connection needs a separate assessment of the exact model, connection method, and your Frappe HR installation."
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
    "title": "ERPNext audit trails and document history for Nepal",
    "description": "Audit trails, document changes, cancellation records, and reports to help accounts teams review ERPNext transaction history.",
    "intro": "Review changes to business documents, invoice cancellations, and recorded user activity in ERPNext. Nepal Compliance provides audit reports that help accounts managers investigate a transaction and understand the changes recorded against it.",
    "audience": "For finance reviewers, accounts managers, and administrators investigating records in an ERPNext installation.",
    "sections": [
      {
        "heading": "Activity and cancellation records",
        "body": "Use the Audit Trail and Audit Log reports to review recorded activity around business documents. The Sales Cancellation Register gives your accounts team a separate view of cancelled invoices.",
        "items": [
          "Recorded user activity and document changes.",
          "Audit Trail reports and SQL query audit logs.",
          "Sales cancellation records for review or printing."
        ]
      },
      {
        "heading": "Investigate a document change",
        "body": "Find a document or filter by the user who changed it. The Audit Log shows the document reference, operation, modification time, and recorded old and new field values for supported records, including invoices, journal entries, payments, and stock documents.",
        "items": [
          "Find records by document reference or modifying user.",
          "Review recorded field changes and modification times.",
          "Examine submission and cancellation operations identified from version records."
        ]
      },
      {
        "heading": "Review sales and purchase records",
        "body": "Use the Materialized Report to review sales and purchase records by document, company, and business partner. Select the relevant filters and compare a sample transaction with its history. The records available depend on your configuration and the activity captured.",
        "items": [
          "Review report filters and reporting dates before comparing totals.",
          "Compare a sample document with its related reports and history.",
          "Agree access and review responsibilities with the system administrator."
        ]
      }
    ],
    "questions": [
      {
        "question": "Are these reports a substitute for an audit?",
        "answer": "No. They provide records that can support review. The scope and conclusions of an audit depend on the reviewer, the business records, and the procedures used."
      },
      {
        "question": "How do we start investigating a transaction?",
        "answer": "Find its document reference, check the reporting dates and filters, and review the recorded changes. Confirm the available history and report permissions with your administrator."
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
    "title": "Bikram Sambat dates for ERPNext in Nepal",
    "description": "Bikram Sambat dates for ERPNext forms, fiscal years, lists, reports, and printed business documents.",
    "intro": "Use Bikram Sambat dates when entering transactions, reviewing reports, and printing documents in ERPNext. Nepal Compliance adds Nepal’s calendar to supported forms, fiscal years, lists, and related accounting and human resources workflows.",
    "audience": "For accounting, billing, and human resources teams that work with Nepal’s calendar.",
    "sections": [
      {
        "heading": "Dates in forms and fiscal years",
        "body": "Enter Nepali dates in supported forms and use them when setting up a fiscal year, the period your business uses for its accounts. Check the company’s fiscal period before entering transactions in a new installation.",
        "items": [
          "Nepali date support for fiscal years.",
          "Nepali date input fields in supported forms.",
          "Date handling used by related accounting and human resources workflows."
        ]
      },
      {
        "heading": "Find and review records",
        "body": "Find and review records using Nepali dates in supported lists, views, filters, sorting, and search. Your team can use the same calendar when moving from a transaction to a report.",
        "items": [
          "Nepali dates in lists and views.",
          "Filtering, sorting, and search by date.",
          "Nepali dates in supported reports."
        ]
      },
      {
        "heading": "Printed documents and related workflows",
        "body": "Include Nepali dates on printed documents and in related attendance, holiday, and leave workflows. Check the forms and print formats your team uses during setup. Custom fields and third-party extensions need their own compatibility review.",
        "items": [
          "Nepali dates in print templates.",
          "Attendance and holiday records using local dates.",
          "Bikram Sambat monthly leave allocation for configured leave types."
        ]
      }
    ],
    "questions": [
      {
        "question": "Does Nepali date support cover custom forms automatically?",
        "answer": "Custom forms need a compatibility check. Test any custom fields, document types, or extensions during setup to confirm how dates appear and behave."
      },
      {
        "question": "What should I check before using the date features?",
        "answer": "Check a sample transaction from entry through reports and printed output, including the fiscal period. Confirm the behavior in your installed version before changing live records."
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
