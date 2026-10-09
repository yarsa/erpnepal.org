import { IconArrowUpRight, IconBrandGithub, IconCircleCheckFilled, IconCircleDashed } from '@tabler/icons-react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { LinkButton } from './ui/button'

export function OpenSource() {
  const { t } = useStrings()
  const o = t.openSource
  const columns = [
    { ...o.free, Icon: IconCircleCheckFilled, card: 'border-line-strong bg-muted/40' },
    { ...o.paid, Icon: IconCircleDashed, card: 'border-line-strong border-dashed' },
  ]
  return (
    <section aria-labelledby="oss-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {/* Inverse panel: dark tokens in both themes (see .inverse in styles.css). */}
        <div className="inverse relative isolate overflow-hidden rounded-2xl bg-surface px-6 py-10 text-fg shadow-lg md:px-12 md:py-14">
          <div
            className="-z-10 pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_100%_0%,rgb(255_255_255/0.08),transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="-z-10 pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(70%_60%_at_100%_0%,black,transparent)]"
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 id="oss-title" className="heading text-3xl md:text-4xl">
                {o.title}
              </h2>
              <p className="mt-3 text-fg-3 text-lg">{o.lead}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={o.primary.href} variant="solid" size="lg">
                <IconBrandGithub className="size-4" aria-hidden="true" />
                {o.primary.label}
              </LinkButton>
              <LinkButton href={o.secondary.href} size="lg" className="bg-transparent">
                {o.secondary.label}
                <IconArrowUpRight className="size-4" aria-hidden="true" />
              </LinkButton>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {columns.map(({ Icon, card, ...col }) => (
              <div key={col.title} className={cn('rounded-2xl border p-6', card)}>
                <h3 className="flex items-center gap-2 font-semibold text-xl">
                  <Icon className="size-5 text-fg-2" aria-hidden="true" />
                  {col.title}
                </h3>
                <dl className="mt-4 divide-y divide-line">
                  {col.items.map((item) => (
                    <div key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-3.5 first:pt-1 last:pb-0">
                      <span className="row-span-2 grid size-9 place-items-center rounded-lg bg-muted" aria-hidden="true">
                        <ContentIcon name={item.icon} className="size-4 text-fg-2" />
                      </span>
                      <dt className="font-medium text-lg">{item.title}</dt>
                      <dd className="text-fg-3">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
