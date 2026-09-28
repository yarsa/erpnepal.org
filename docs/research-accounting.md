# Accounting guide research

Reviewed 28 September 2026. This is an editorial research record, not evidence of professional accounting or legal review.

## Articles and reader questions

- `choosing-erp-software-nepal`: What should a Nepal business test before choosing ERP/accounting software? Written around an example transaction pack, an implementation scope, migration, and operating responsibility.
- `vat-invoices-nepal`: Why can a tax template or printed invoice appear correct while the accounting/reporting result needs attention? Written as a setup and verification procedure, without rates or an asserted legal invoice checklist.
- `cbms-integration-nepal`: What should a business prepare before enabling a connection, and what evidence helps investigate unsuccessful submissions? Written around onboarding questions, configuration, test cases, and failure stages.

## Search cues

Queries executed included:

- `ERPNext Nepal accounting software choose VAT CBMS`
- `Nepal ERPNext VAT invoice setup IRD CBMS integration failed`
- `site.ird.gov.np CBMS API billing`
- `site.docs.frappe.io erpnext sales invoice tax template accounting implementation`
- `site.ird.gov.np "Central Billing Monitoring" "100"`

The results exposed actual questions rather than measured traffic:

- [A Nepal business asks for cost-effective ERP supporting VAT and Nepali fiscal needs](https://www.reddit.com/r/Nepal/comments/1nq3xbm/need_an_erp_software_to_integrate_into_my_business/). Search result inspected. Used only to identify the selection question; no accounting or legal claims drawn from replies.
- [Frappe discussion about sales tax not being selected automatically](https://discuss.frappe.io/t/sales-tax-on-sales-invoice-do-not-apply-automatically/120145). Search result inspected. Used only as a troubleshooting cue; the article uses official tax documentation for product behavior.
- Root supplied additional question leads: [IRD software verification process](https://www.reddit.com/r/technepal/comments/1wmanjp/need_help_with_ird_software_verification_process/) and [digital PAN/VAT bills](https://www.reddit.com/r/NepaliBusinessCommuni/comments/1u4ue9r/can_panvat_bill_be_digital/). These were not independently opened by this authoring agent and were not treated as factual sources.

No search volume, ranking opportunity, demand estimate, or popularity claim was inferred from search results. Titles describe the reader problem directly.

## Primary sources checked

### Frappe documentation

- [Setting Up](https://docs.frappe.io/erpnext/setting-up): the requested implementation-strategy URL redirects here. Used for the scope of setup and the need to select business workflows; no implementation outcome promised.
- [Sales Invoice](https://docs.frappe.io/erpnext/sales-invoice): reviewed the actual documentation body, including draft/submission, item/tax review, and original invoice references for returns. Product facts are brief; demonstration scenarios are original recommendations.
- [Setting Up Taxes](https://docs.frappe.io/erpnext/setting-up-taxes): confirms accounts, templates, categories, rules, item-specific treatment, and representative checks. Does not supply Nepal legal rates.
- [Taxes](https://docs.frappe.io/erpnext/taxes): distinguishes configuration from deciding legal tax treatment. Used for a concise conceptual explanation.
- [Item Tax Template](https://docs.frappe.io/erpnext/item-tax-template): used for item-specific configuration and the need to examine selected treatment. Article avoids detailed selection rules that may vary by ERPNext version.
- [Data Import](https://docs.frappe.io/erpnext/data-import): reviewed CSV/Excel import and template workflow. The article's data-cleaning and reconciliation recommendations are original editorial guidance.

### Nepal Compliance

- [Public repository](https://github.com/yarsa/nepal-compliance): public feature list and its caveat that checklist and repository may diverge.
- [CBMS implementation](https://raw.githubusercontent.com/yarsa/nepal-compliance/master/nepal_compliance/cbms_api.py): fetched successfully. Code distinguishes settings checks, payload preparation, queued jobs, HTTP result, business response, and recorded invoice status. Descriptions are source-level observations, not live integration verification.
- [CBMS Settings](https://github.com/yarsa/nepal-compliance/blob/master/nepal_compliance/nepal_compliance/doctype/cbms_settings/cbms_settings.json): local reference checkout inspected in full. Remote raw request returned cache miss during this run. The module contains the enable flag, username, password, PAN/VAT identifier, and sales/credit-note URLs.

### Inland Revenue Department

- [CBMS technical documentation notice](https://ird.gov.np/content/9052/cbmsapitechnicaldocumentfor/): opened successfully; identifies the developer document. It does not establish this site's or this project's approval status.
- [Central Billing Monitoring System API PDF](https://www.ird.gov.np/public/pdf/976029276.pdf): official-domain search index returned the title, payload examples, and response descriptions. Direct opening timed out on the non-www host and returned 404 on the www host. Treat PDF details as partially accessible, not a fully retrieved current specification. Published timestamps in different search results were inconsistent and are not used in the articles.
- An older electronic-billing procedure was found at `https://www.ird.gov.np/public/pdf/1958456687.pdf` but not relied on for current legal requirements.

## Uncertainties and editorial limits

- No claim about compulsory CBMS thresholds, registration eligibility, current tax rates, filing deadlines, or a legally complete invoice format. These were outside the verified evidence.
- No reproduction of example credentials or API endpoints as a live setup recipe. Current permitted test and production arrangements must be confirmed.
- Use **Central Billing Monitoring System**, matching IRD's official document title. Earlier site copy used “Management”; root was alerted.
- No assertion that public code is independently tested, certified, secure, or ready for every installed version. No implication that a successful submission certifies an entire installation.
- A source-file review is not an end-to-end execution test. The reference code includes potential implementation issues; the guides deliberately focus on collecting evidence rather than presenting a one-command setup.
- The articles' fictional transaction examples, comparison criteria, and review checklists are original operational recommendations. Source-linked claims are kept concise rather than rewriting a provider manual. Sections with no external factual claim use an empty `sources` array.
- Nepal HRMS is not discussed in these articles. User clarification remains: it is a planned part of Nepal Compliance, currently a separate beta app pending incorporation. Do not imply current public-release inclusion or link the inaccessible private remote.

## Validation

- `content/guides-accounting.mjs` exports `guidesAccounting`, containing the three agreed slugs.
- Each section's source IDs resolve to its article's source list.
- Related article links use only the three assigned slugs.
- Main text plus headings, tables, checklists, and questions: 720, 731, and 721 words respectively at authoring time.
- Feature links target existing feature slugs; root owns final routing and build validation.
