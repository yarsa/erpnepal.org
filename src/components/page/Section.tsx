import type { ReactNode } from 'react'

/** A numbered content section: heading, body text and an optional bullet list. */
export function Section({
  id,
  heading,
  children,
  items,
}: {
  id?: string
  heading: string
  children?: ReactNode
  items?: readonly string[]
}) {
  return (
    <section id={id} className="pt-10">
      <h2 className="heading text-2xl md:text-3xl">{heading}</h2>
      {children}
      {items && items.length > 0 && <BulletList items={items} />}
    </section>
  )
}

export const bodyText = 'mt-3 text-fg-2 text-lg'

export function BulletList({ items, className = 'mt-4 text-lg' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`list-disc space-y-2 pl-5 text-fg-2 marker:text-fg-4 ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function QaList({ title, items, id }: { title: string; items: readonly { question: string; answer: string }[]; id?: string }) {
  return (
    <section id={id} className="pt-10">
      <h2 className="heading text-2xl md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-6">
        {items.map((item) => (
          <section key={item.question}>
            <h3 className="font-semibold text-fg text-xl">{item.question}</h3>
            <p className="mt-2 text-fg-2 text-lg">{item.answer}</p>
          </section>
        ))}
      </div>
    </section>
  )
}

export function SourceList({
  id,
  title,
  note,
  sources,
}: {
  id?: string
  title: string
  note: string
  sources: readonly { label: string; url: string }[]
}) {
  return (
    <section id={id} className="pt-10">
      <h2 className="heading text-xl md:text-2xl">{title}</h2>
      <p className="mt-2 text-fg-3">{note}</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-fg-4">
        {sources.map((src) => (
          <li key={src.url}>
            <a
              href={src.url}
              rel="noopener"
              className="break-words text-fg-2 underline decoration-line-strong underline-offset-4 hover:text-fg"
            >
              {src.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
