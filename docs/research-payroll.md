# Payroll and hosting guide research

Reviewed: 2026-09-28, Asia/Kathmandu.

Deliverable: `content/guides-payroll.mjs`, exported as `guidesPayroll`. Three original guides; visible text counts including answers, headings, tables, and FAQs are 664, 720, and 702 words respectively. Sources are linked by section IDs. Worked amounts and operations checklists are editorial examples and recommendations, not copied provider instructions or statutory rules.

## Demand evidence

These are qualitative questions and search-result observations. No keyword volumes, rankings, audience sizes, or conversion estimates were obtained or invented. Forum posts inform the question selection only; they do not support technical or financial claims.

| Query / cue | Evidence | Editorial response |
| --- | --- | --- |
| `ERPNext Nepal payroll SSF CIT setup` | Search surfaced the official [Nepal Compliance feature list](https://github.com/yarsa/nepal-compliance#key-features), alongside questions about payroll deductions. A directly opened [small-business Nepal HR software request](https://www.reddit.com/r/technepal/comments/1wirxpn/looking_for_an_affordable_hr_software_for_a_small/) asks about payroll, payslips, attendance, and cost for a roughly 20-person team. | A first-payroll checklist with a deliberately simple arithmetic test before tax configuration. |
| SSF/CIT confusion, provided by coordinating agent | [SSF/CIT thread](https://www.reddit.com/r/technepal/comments/1uh3wox/ssfcit/) was provided as a demand cue. This agent's direct fetch failed; its content is not quoted or used as evidence of scheme rules. | Explain employee deductions, employer costs, fund liabilities, and payment as different questions. Avoid universal enrollment or rate claims. |
| `ERPNext self hosting backup restore cost forum` | Search surfaced [Best practice for backup a self-hosted ERPNext](https://discuss.frappe.io/t/best-practice-for-backup-a-self-hosted-erpnext/9641), [What does running ERPNext cost?](https://discuss.frappe.io/t/what-does-running-erpnext-cost/40464), and a [small nonprofit hosting/maintenance question](https://www.reddit.com/r/selfhosted/comments/1qnvq1u/erpnext_for_small_nonprofit_with_limited_it_staff/). Older forum posts are persistent question cues, not current price or deployment references. | A total-cost worksheet and actual restore acceptance checklist instead of a cheap-hosting price claim. |

## Primary-source findings used

### Payroll workflow

- [Payroll Setup](https://docs.frappe.io/hr/payroll-setup): component → structure → assignment → slip workflow; payroll period matters for tax-slab calculation. The page includes India-specific examples, so none of its tax numbers or regional benefit rules were reused.
- [Payroll Settings](https://docs.frappe.io/hr/payroll-settings): opening taxable earnings and tax-deducted fields for payroll migration, subject to settings/version.
- [Salary Structure](https://docs.frappe.io/hr/salary-structure): earnings/deductions, company, frequency, and amount/formula configuration.
- [Salary Structure Assignment Tool](https://docs.frappe.io/hr/salary-structure-assignment-tool): effective date, base amount, and income tax slab selection.
- [Salary Component](https://docs.frappe.io/hr/salary-component): earnings/deductions, account settings, statistical components, and exclusion from salary totals. Descriptions remain short across both payroll articles; illustrative numbers and reconciliation scenarios are original.
- [Income Tax Slab](https://docs.frappe.io/hr/income-tax-slab): assignment linkage and effective-date configuration, not Nepal-specific rates.
- [Setting Up Income Tax Deduction](https://docs.frappe.io/hr/setting-up-income-tax-deduction): taxable-salary setting and documented precedence caveat when a condition/formula is supplied. The article tells the implementer to demonstrate the actual path in their installed version.
- [How to process Payroll](https://docs.frappe.io/hr/how-to-process-payroll-in-frappehr): draft payroll review, accrual, bank entry, and the distinction between recording payment and transferring money through a bank.

### Nepal institutions and app scope

- [Social Security Fund](https://ssf.gov.np/): official employer/contributor resources. Institution identity and resource location only; no current rates, deadlines, exemptions, or eligibility conclusions taken from the homepage.
- [Citizen Investment Trust](https://www.nlk.org.np/): official scheme directory and notices establish multiple schemes. No universal CIT rate or tax-deduction claim made.
- [Nepal Compliance repository](https://github.com/yarsa/nepal-compliance): EPF/SSF/CIT feature-list scope only. Support in a checklist does not verify any real employee's configuration or fund remittance.
- EPF homepage and an attempted provident-fund service page failed to fetch. Historical EPF publications appeared in search, but they were not used to establish present contribution rates. The published article calls PF a provident fund arrangement and asks readers to identify the actual fund/account; it makes no numeric EPF rule claim.

### Hosting and recovery

- [Setup Production](https://docs.frappe.io/framework/user/en/bench/guides/setup-production): current guide recommends Docker images. Other indexed Frappe production pages still contain older bare-metal installation material; no obsolete installation commands were copied.
- [Nepal Compliance Docker guide](https://github.com/yarsa/nepal-compliance/blob/master/docs/docker-install.md): project-specific deployment reference, not a hosting price guarantee.
- [Setup Two Factor Authentication](https://docs.frappe.io/erpnext/user/manual/en/setup-two-factor-authentication): role-based setup, including documented Web User/API limitations. Readers are told to inventory those paths separately.
- [Role and Role Profile](https://docs.frappe.io/erpnext/role-and-role-profile): role-based access configuration.
- [bench backup](https://docs.frappe.io/framework/user/en/bench/reference/backup): default database dump; `--with-files` covers public and private file archives. One short command is reproduced, not an installation recipe.
- [Site configuration](https://docs.frappe.io/framework/user/en/basics/site_config): encryption key is necessary after restore to use existing encrypted passwords; backup encryption key is a separate configuration key.
- [bench restore](https://docs.frappe.io/framework/user/en/bench/reference/restore): database/public/private archive arguments and unsupported downgrade warning.
- [Static assets](https://docs.frappe.io/framework/user/en/basics/static-assets): distinction between public and authorized private files and backup storage.

## Limits and editorial decisions

- No current Nepal tax slabs, statutory salary bases, fund percentages, remittance deadlines, tax-relief limits, or eligibility decisions are asserted. Those require effective-period and employee-specific professional review.
- NPR 40,000/5,000/2,000 and NPR 50,000/3,000/4,000 are conspicuously fictional test inputs. They demonstrate arithmetic/accounting separation, not lawful payroll amounts.
- Four maintenance hours is a sample budget variable, not measured implementation effort. No current cloud/vendor prices are asserted.
- Site recovery recommendations such as isolated restores, disabling outbound effects, keeping off-server protected copies, and checking business records are editorial implementation guidance. They are not presented as tested behavior of this specific deployment.
- Source paraphrases are distributed across primary references and kept below each page's 200-word tool attribution budget across these deliverables. No lengthy quotes, copied article structures, or reused screenshots were included.
- Frappe documentation changes by version. Guides consistently require checking the installed application versions; the content does not promise that every referenced setting exists in all versions.
- Nepal HRMS beta capabilities are not used as evidence of currently released Nepal Compliance behavior.

## Validation

- Module passes `node --check`.
- All section source IDs resolve to a source in their guide.
- Worked arithmetic checked: 40,000 + 5,000 − 2,000 = 43,000; 50,000 − 3,000 = 47,000; fund total 3,000 + 4,000 = 7,000; simplified employer cost 50,000 + 4,000 = 54,000.
- Rendering/build integration belongs to the coordinating agent. No template, styles, build scripts, or other agents' guide modules were edited.
