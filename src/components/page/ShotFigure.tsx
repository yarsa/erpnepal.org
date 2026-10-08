import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Screenshot linked to its full-size file. Width and height prevent layout shift. */
export function ShotFigure({
  src,
  alt,
  width,
  height,
  eager,
  className,
  children,
}: {
  src: string
  alt: string
  width: number
  height: number
  eager?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={cn('my-10', className)}>
      <a href={src} className="block overflow-hidden rounded-2xl border border-line-strong" aria-label={`Open full-size image: ${alt}`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-auto w-full"
        />
      </a>
      <figcaption className="mt-3 text-fg-3">{children}</figcaption>
    </figure>
  )
}
