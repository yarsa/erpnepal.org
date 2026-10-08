import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-inverse text-on-inverse hover:opacity-85',
        outline: 'border border-line-strong bg-surface text-fg hover:bg-muted',
        subtle: 'bg-muted text-fg hover:bg-line-strong',
        ghost: 'text-fg-2 hover:bg-muted hover:text-fg',
      },
      size: {
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
        xl: 'h-12 px-5 text-base',
        icon: 'size-8',
      },
    },
    defaultVariants: { variant: 'outline', size: 'md' },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, type = 'button', ...props }: ComponentProps<'button'> & ButtonVariants) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/** A link styled as a button. External links get rel noopener; all open in the same tab. */
export function LinkButton({ className, variant, size, href, ...props }: ComponentProps<'a'> & ButtonVariants) {
  const external = href?.startsWith('http')
  return <a href={href} rel={external ? 'noopener' : undefined} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
