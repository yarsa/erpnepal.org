import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { LinkButton } from './ui/button'

export function OpenSource() {
  const { t } = useStrings()
  const o = t.openSource
  return (
    <section aria-labelledby="oss-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {/* Inverse panel: dark tokens in both themes (see .inverse in styles.css). */}
        <div className="inverse rounded-2xl bg-surface px-6 py-10 text-fg shadow-lg md:px-12 md:py-14">
          <h2 id="oss-title" className="heading text-3xl md:text-4xl">
            {o.title}
          </h2>
          <p className="mt-3 max-w-2xl text-fg-3 text-lg">{o.lead}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[o.free, o.paid].map((col) => (
              <div key={col.title} className="rounded-2xl border border-line-strong p-6">
                <h3 className="font-semibold text-xl">{col.title}</h3>
                <dl className="mt-4 space-y-4">
                  {col.items.map((item) => (
                    <div key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
                      <span className="row-span-2 grid size-9 place-items-center rounded-lg bg-muted" aria-hidden="true">
                        <ContentIcon name={item.icon} className="size-4 text-fg-3" />
                      </span>
                      <dt className="font-medium text-lg">{item.title}</dt>
                      <dd className="text-fg-3">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={o.primary.href} variant="solid" size="xl">
              {o.primary.label}
            </LinkButton>
            <LinkButton href={o.secondary.href} size="xl" className="bg-transparent">
              {o.secondary.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
