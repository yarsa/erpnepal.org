import { addons } from '../../content/addons.mjs'
import { features } from '../../content/features.mjs'
import { guideDate, guides } from '../../content/guides.mjs'

export { addons, features, guideDate, guides }

export type Feature = (typeof features)[number]
export type Addon = (typeof addons)[number]
export type Guide = (typeof guides)[number]

export const featureWorkflows: Record<string, string[]> = {
  'accounting-and-vat': ['accounting'],
  invoicing: ['billing'],
  cbms: ['billing'],
  payroll: ['people'],
  'hr-and-leave': ['people'],
  'audit-and-reports': ['accounting', 'billing'],
  'nepali-dates': ['accounting', 'billing', 'people'],
}

export const featureNavLabels: Record<string, string> = {
  'accounting-and-vat': 'Accounting and VAT',
  invoicing: 'Invoicing',
  cbms: 'CBMS integration',
  payroll: 'Payroll',
  'hr-and-leave': 'Employee records and leave',
  'audit-and-reports': 'Audit trails and records',
  'nepali-dates': 'Nepali dates',
}
