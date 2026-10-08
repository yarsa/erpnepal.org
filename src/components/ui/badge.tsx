import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

// Colour means status only: green supported, amber beta, gray everything else.
export const badgeVariants = cva('inline-flex items-center gap-1 whitespace-nowrap rounded-full font-medium leading-none', {
  variants: {
    tone: {
      gray: 'bg-muted text-fg-2',
      green: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      inverse: 'bg-inverse text-on-inverse',
    },
    size: {
      sm: 'h-5 px-2 text-[11px]',
      md: 'h-6 px-2.5 text-xs',
    },
  },
  defaultVariants: { tone: 'gray', size: 'md' },
})

export function Badge({ className, tone, size, ...props }: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, size }), className)} {...props} />
}
