import { useCalendar } from '../lib/calendar'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'

/** Demo salary slip (demo data only). */
export function SlipCard() {
  const { t } = useStrings()
  const { calendar } = useCalendar()
  const slip = t.demo.slip
  return (
    <div className="p-6">
      <p className="text-fg-4 text-sm">{slip.heading}</p>
      <p className="mt-1 font-medium text-fg text-lg">{t.dates.slipPeriod[calendar]}</p>
      <table className="mt-5 w-full text-sm">
        <tbody>
          {slip.lines.map((line) => {
            const strong = 'strong' in line && line.strong
            return (
              <tr key={line.label} className="border-line border-t">
                <td className={cn('py-2.5', strong ? 'font-semibold text-fg' : 'text-fg-2')}>{line.label}</td>
                <td className={cn('py-2.5 text-right tabular-nums', strong ? 'font-semibold text-fg' : 'text-fg')}>{line.amount}</td>
              </tr>
            )
          })}
          <tr className="border-line-strong border-t">
            <th scope="row" className="py-3 text-left font-semibold text-fg">
              {slip.total.label}
            </th>
            <td className="py-3 text-right font-semibold text-fg tabular-nums">{slip.total.amount}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-fg-4 text-sm">{slip.note}</p>
    </div>
  )
}
