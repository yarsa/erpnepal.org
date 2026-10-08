import { IconCheck } from '@tabler/icons-react'
import { useCalendar } from '../lib/calendar'
import { useStrings } from '../lib/i18n'
import { Badge } from './ui/badge'

/** Demo tax invoice (demo data only). */
export function InvoiceCard() {
  const { t } = useStrings()
  const { calendar } = useCalendar()
  const inv = t.demo.invoice
  return (
    <div className="p-6">
      <p className="text-fg-4 text-sm">{inv.heading}</p>
      <p className="mt-1 font-medium text-fg text-lg tabular-nums">{inv.number}</p>
      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-fg-4">{inv.dateLabel}</dt>
          <dd className="mt-0.5 text-fg">{t.dates.invoice[calendar]}</dd>
        </div>
        <div>
          <dt className="text-fg-4">{inv.customerLabel}</dt>
          <dd className="mt-0.5 text-fg">{inv.customer}</dd>
        </div>
      </dl>
      <table className="mt-5 w-full text-sm">
        <tbody>
          {inv.lines.map((line) => (
            <tr key={line.label} className="border-line border-t">
              <td className="py-2.5 text-fg-2">{line.label}</td>
              <td className="py-2.5 text-right text-fg tabular-nums">{line.amount}</td>
            </tr>
          ))}
          <tr className="border-line-strong border-t">
            <th scope="row" className="py-3 text-left font-semibold text-fg">
              {inv.total.label}
            </th>
            <td className="py-3 text-right font-semibold text-fg tabular-nums">{inv.total.amount}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="green" size="sm">
          <IconCheck className="size-3" aria-hidden="true" />
          {inv.status}
        </Badge>
        <Badge size="sm">{inv.copy}</Badge>
      </div>
    </div>
  )
}
