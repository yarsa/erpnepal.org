import { IconArrowRight, IconArrowUpRight, IconBriefcase, IconCopy, IconTerminal2 } from '@tabler/icons-react'
import { lazy, Suspense, useState } from 'react'
import { useStrings } from '../lib/i18n'
import { Button, LinkButton } from './ui/button'

const Toaster = lazy(() => import('./Toaster'))

export function GetStarted() {
  const { t } = useStrings()
  const g = t.getStarted
  const card = 'flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm md:p-8'
  const tile = 'grid size-11 place-items-center rounded-lg bg-muted text-fg'
  const [note, setNote] = useState<{ id: number; text: string } | null>(null)
  async function copy(command: string) {
    let text = g.technical.copied
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      text = g.technical.copyFailed
    }
    setNote({ id: Date.now(), text })
  }
  return (
    <>
      <section id="get-started" className="bg-subtle" aria-labelledby="start-title">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h2 id="start-title" className="heading text-3xl md:text-4xl">
            {g.title}
          </h2>
          <p className="mt-3 max-w-2xl text-fg-3 text-lg">{g.lead}</p>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className={card}>
              <span className={tile} aria-hidden="true">
                <IconBriefcase className="size-5" stroke={1.75} />
              </span>
              <h3 className="heading mt-5 text-2xl">{g.business.title}</h3>
              <p className="mt-3 text-fg-3 text-lg">{g.business.body}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <LinkButton href={g.business.primary.href} variant="solid" size="lg">
                  {g.business.primary.label}
                  <IconArrowUpRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href={g.business.secondary.href} size="lg">
                  {g.business.secondary.label}
                  <IconArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
              </div>
            </article>

            <article className={card}>
              <span className={tile} aria-hidden="true">
                <IconTerminal2 className="size-5" stroke={1.75} />
              </span>
              <h3 className="heading mt-5 text-2xl">{g.technical.title}</h3>
              <p className="mt-3 text-fg-3 text-lg">{g.technical.body}</p>
              <div className="inverse mt-6 overflow-hidden rounded-lg border border-line bg-surface">
                <div className="flex gap-1.5 border-line border-b px-3 py-3" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-line-strong" />
                  <span className="size-2.5 rounded-full bg-line-strong" />
                  <span className="size-2.5 rounded-full bg-line-strong" />
                </div>
                <div className="divide-y divide-line">
                  {g.technical.commands.map((command) => (
                    <div key={command} className="flex items-center gap-2 py-1.5 pr-1.5 pl-4">
                      <pre className="min-w-0 flex-1 overflow-x-auto py-1.5 font-mono text-fg text-sm leading-6 [scrollbar-width:none]">
                        <code>
                          <span className="select-none text-fg-3" aria-hidden="true">
                            ${' '}
                          </span>
                          {command}
                        </code>
                      </pre>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0"
                        aria-label={`${g.technical.copy}: ${command}`}
                        title={g.technical.copy}
                        onClick={() => copy(command)}
                      >
                        <IconCopy className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <LinkButton href={g.technical.primary.href} variant="solid" size="lg">
                  {g.technical.primary.label}
                  <IconArrowUpRight className="size-4" aria-hidden="true" />
                </LinkButton>
                <LinkButton href={g.technical.secondary.href} size="lg">
                  {g.technical.secondary.label}
                  <IconArrowUpRight className="size-4" aria-hidden="true" />
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
