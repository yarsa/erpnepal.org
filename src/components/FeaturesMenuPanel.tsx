import { IconArrowRight } from '@tabler/icons-react'
import { features } from '../../content/features.mjs'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { Badge } from './ui/badge'

const icons: Record<string, string> = {
  'accounting-and-vat': 'lucide-calculator',
  invoicing: 'lucide-receipt',
  cbms: 'lucide-plug',
  payroll: 'lucide-briefcase',
  'hr-and-leave': 'lucide-users',
  'audit-and-reports': 'lucide-shield-check',
  'nepali-dates': 'lucide-calendar-days',
}
const fresh = new Set(['cbms'])

const tile = 'group flex gap-3 rounded-xl p-3 transition-colors hover:bg-subtle focus-visible:bg-subtle focus-visible:outline-none'

export default function FeaturesMenuPanel() {
  const { ui } = useStrings()
  const m = ui.featuresMenu
  return (
    <ul className="grid w-[40rem] grid-cols-2 gap-1 p-2">
      {features.map((f) => (
        <li key={f.slug}>
          <a href={`/features/${f.slug}/`} className={tile}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-fg-2 transition-colors group-hover:bg-inverse group-hover:text-on-inverse">
              <ContentIcon name={icons[f.slug] ?? 'lucide-package'} className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 font-medium text-fg text-sm">
                {f.shortTitle}
                {fresh.has(f.slug) && (
                  <Badge tone="inverse" size="sm">
                    {m.new}
                  </Badge>
                )}
              </span>
              <span className="mt-0.5 line-clamp-2 text-fg-3 text-xs">{f.intro}</span>
            </span>
          </a>
        </li>
      ))}
      <li>
        <a href="/features/" className={`${tile} border border-line-strong border-dashed`}>
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong text-fg-2">
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-medium text-fg text-sm">{m.all}</span>
            <span className="mt-0.5 block text-fg-3 text-xs">{m.allBody}</span>
          </span>
        </a>
      </li>
    </ul>
  )
}
