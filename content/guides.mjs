import { guidesAccounting } from './guides-accounting.mjs';
import { guidesOperations } from './guides-operations.mjs';
import { guidesPayroll } from './guides-payroll.mjs';
export const guideDate = '2026-09-28';
export const guides = [...guidesAccounting, ...guidesPayroll, ...guidesOperations];
