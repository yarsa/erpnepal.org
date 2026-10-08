import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { LinkButton } from './ui/button'

export function OpenSource() {
  const { t } = useStrings()
  const o = t.openSource
  return (
    <section className="border-line border-b" aria-labelledby="oss-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {/* Inverted panel: dark in light mode, light-on-dark card in dark mode. */}
        <div className="rounded-3xl bg-neutral-900 px-6 py-10 text-white md:px-12 md:py-14 dark:bg-surface dark:text-fg">
          <h2 id="oss-title" className="heading text-3xl md:text-4xl">
            {o.title}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-neutral-300 dark:text-fg-3">{o.lead}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[o.free, o.paid].map((col) => (
              <div key={col.title} className="rounded-2xl border border-neutral-700 p-6 dark:border-line-strong">
                <h3 className="font-semibold text-xl">{col.title}</h3>
                <dl className="mt-4 space-y-4">
                  {col.items.map((item) => (
                    <div key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-x-3">
                      <span
                        className="row-span-2 grid size-9 place-items-center rounded-lg bg-neutral-800 dark:bg-muted"
                        aria-hidden="true"
                      >
                        <ContentIcon name={item.icon} className="size-4 text-neutral-300 dark:text-fg-3" />
                      </span>
                      <dt className="font-medium text-lg">{item.title}</dt>
                      <dd className="text-neutral-400 dark:text-fg-3">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              href={o.primary.href}
              size="xl"
              className="border-0 bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-fg dark:text-page"
            >
              {o.primary.label}
            </LinkButton>
            <LinkButton
              href={o.secondary.href}
              size="xl"
              className="border-neutral-600 bg-transparent text-white hover:bg-neutral-800 dark:border-line-strong dark:text-fg dark:hover:bg-muted"
            >
              {o.secondary.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
