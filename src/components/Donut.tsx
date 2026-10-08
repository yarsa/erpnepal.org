import { cn } from '../lib/cn'

export interface Slice {
  label: string
  value: number
  /** Tailwind stroke + background classes for the slice and its legend dot. */
  color: { stroke: string; dot: string }
}

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Share-of-total ring drawn as plain SVG: renders on the server, needs no
 * chart library. The legend carries the numbers, so the ring is decorative.
 */
export function Donut({
  slices,
  center,
  format = (n) => n.toLocaleString('en-IN'),
  className,
}: {
  slices: Slice[]
  center: string
  format?: (n: number) => string
  className?: string
}) {
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  const gap = slices.length > 1 ? 1.5 : 0
  let offset = 0
  return (
    <figure className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative size-40">
        <svg viewBox="0 0 100 100" className="-rotate-90 size-full" aria-hidden="true">
          {slices.map((s) => {
            const length = (s.value / total) * CIRCUMFERENCE
            const dash = Math.max(length - gap, 0)
            const circle = (
              <circle
                key={s.label}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                strokeWidth="12"
                className={s.color.stroke}
                strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += length
            return circle
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-semibold text-fg text-xl tabular-nums">{format(total)}</span>
          <span className="text-fg-4 text-xs">{center}</span>
        </div>
      </div>
      <figcaption>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-fg-3 text-xs">
          {slices.map((s) => (
            <li key={s.label} className="flex items-center gap-1.5">
              <span className={cn('size-2 rounded-full', s.color.dot)} aria-hidden="true" />
              {s.label}
              <span className="text-fg tabular-nums">{format(s.value)}</span>
              <span className="text-fg-4 tabular-nums">{Math.round((s.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}

/** Grays for neutral data (black-and-white palette). */
export const grays = [
  { stroke: 'stroke-fg', dot: 'bg-fg' },
  { stroke: 'stroke-fg-4', dot: 'bg-fg-4' },
  { stroke: 'stroke-line-strong', dot: 'bg-line-strong' },
]
