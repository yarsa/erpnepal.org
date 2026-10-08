import { IconArrowUpRight, IconBriefcase, IconCopy, IconTerminal2 } from '@tabler/icons-react'
import { lazy, Suspense, useState } from 'react'
import { useStrings } from '../lib/i18n'
import { Button, LinkButton } from './ui/button'

const Toaster = lazy(() => import('./Toaster'))

export function GetStarted() {
  const { t } = useStrings()
  const g = t.getStarted
  const card = 'flex min-w-0 flex-col rounded-2xl border border-line-strong bg-surface p-6 md:p-8'
  const commands = g.technical.commands.join('\n')
  const [note, setNote] = useState<{ id: number; text: string } | null>(null)
  async function copy() {
    let text = g.technical.copied
    try {
      await navigator.clipboard.writeText(commands)
    } catch {
      text = g.technical.copyFailed
    }
    setNote({ id: Date.now(), text })
  }
  return (
    <>
      <section id="get-started" className="border-line border-b bg-subtle" aria-labelledby="start-title">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h2 id="start-title" className="heading text-3xl md:text-4xl">
            {g.title}
          </h2>
          <p className="mt-3 text-fg-3 text-lg">{g.lead}</p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className={card}>
              <IconBriefcase className="size-6 text-fg-2" stroke={1.75} aria-hidden="true" />
              <h3 className="heading mt-4 text-2xl">{g.business.title}</h3>
              <p className="mt-3 text-fg-3 text-lg">{g.business.body}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <LinkButton href={g.business.primary.href} variant="solid" size="lg">
                  {g.business.primary.label}
                  <IconArrowUpRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href={g.business.secondary.href} size="lg">
                  {g.business.secondary.label}
                </LinkButton>
              </div>
            </article>

            <article className={card}>
              <IconTerminal2 className="size-6 text-fg-2" stroke={1.75} aria-hidden="true" />
              <h3 className="heading mt-4 text-2xl">{g.technical.title}</h3>
              <p className="mt-3 text-fg-3 text-lg">{g.technical.body}</p>
              <div className="mt-5 rounded-xl bg-neutral-900 p-4 dark:bg-muted">
                <pre className="overflow-x-auto text-neutral-100 text-sm leading-6 dark:text-fg">
                  <code>{commands}</code>
                </pre>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="subtle" onClick={copy}>
                    <IconCopy className="size-3.5" aria-hidden="true" />
                    {g.technical.copy}
                  </Button>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <LinkButton href={g.technical.primary.href} variant="solid" size="lg">
                  {g.technical.primary.label}
                  <IconArrowUpRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href={g.technical.secondary.href} size="lg">
                  {g.technical.secondary.label}
                </LinkButton>
              </div>
            </article>
          </div>
        </div>
      </section>
      {note && (
        <Suspense fallback={null}>
          <Toaster note={note} />
        </Suspense>
      )}
    </>
  )
}
