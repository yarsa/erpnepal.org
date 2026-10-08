import type { ReactNode } from 'react'

export function PageIntro({
  eyebrow,
  title,
  lead,
  audience,
  forLabel,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  audience?: string
  forLabel?: string
  children?: ReactNode
}) {
  return (
    <header className="border-line-strong border-b pb-8">
      <p className="text-fg-4 text-sm">{eyebrow}</p>
      <h1 className="heading mt-3 text-4xl md:text-5xl">{title}</h1>
      <p className="mt-5 text-pretty text-fg-2 text-xl md:text-2xl">{lead}</p>
      {audience && (
        <p className="mt-4 text-fg-3">
          <strong className="font-medium text-fg">{forLabel}</strong> {audience.replace(/^For /, '')}
        </p>
      )}
      {children}
    </header>
  )
}
