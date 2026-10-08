import { IconArrowRight } from '@tabler/icons-react'
import { CardGrid } from '../components/page/LinkCard'
import { PageShell, prose } from '../components/page/PageShell'
import { LinkButton } from '../components/ui/button'

export default function WorkflowsPage() {
  return (
    <PageShell
      crumb="Workflows"
      eyebrow="For small and growing businesses"
      heading="Find the workflows that fit your business"
      lead="Start with billing, accounts, or payroll."
    >
      <CardGrid
        cards={[
          {
            eyebrow: 'Shops and trading',
            title: 'Invoices and VAT',
            body: 'Invoice controls and VAT registers alongside your stock.',
            href: '/features/invoicing/',
            link: 'Explore billing',
          },
          {
            eyebrow: 'Service businesses',
            title: 'Billing and corrections',
            body: 'Reprints, cancellations, and payment status in one place.',
            href: '/guides/qr-payment-reconciliation/',
            link: 'Payment reconciliation',
          },
          {
            eyebrow: 'Teams with employees',
            title: 'Payroll',
            body: 'Salary components, contributions, and leave.',
            href: '/features/payroll/',
            link: 'Explore payroll',
          },
        ]}
      />
      <div className={prose}>
        <h2>What you need</h2>
        <ul>
          <li>
            <strong>Your records:</strong> customers, suppliers, opening balances, employees.
          </li>
          <li>
            <strong>A working setup:</strong> ERPNext, Frappe HR, hosting, and backups.
          </li>
          <li>
            <strong>An owner:</strong> someone to run the rollout and train staff.
          </li>
        </ul>
        <p>There is no licence fee. Hosting, setup, and support cost extra.</p>
      </div>
      <LinkButton href="/guides/choosing-erp-software-nepal/" variant="solid" size="lg" className="mt-8">
        Use the evaluation checklist <IconArrowRight className="size-4" aria-hidden="true" />
      </LinkButton>
    </PageShell>
  )
}
