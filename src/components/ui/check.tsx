import { cn } from '../../lib/cn'

// One tick shape for the whole site, drawn on a 24 unit grid so it stays centred at any size.
const tick = 'M5.75 12.6L9.75 16.6L18.25 8.25'

/** A filled circle in the current text colour with a tick cut out in the surface colour. */
export function CheckDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('shrink-0', className)} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d={tick} fill="none" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round" className="stroke-surface" />
    </svg>
  )
}

/** A bare tick in the current text colour. */
export function CheckMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('shrink-0', className)} aria-hidden="true">
      <path d={tick} fill="none" stroke="currentColor" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
