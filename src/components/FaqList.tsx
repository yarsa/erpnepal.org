import { Accordion } from '@base-ui/react/accordion'
import { IconArrowUpRight, IconPlus } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'
import { LinkButton } from './ui/button'

export function FaqList() {
  const { t } = useStrings()
  const discussions = t.community.links[0]
  return (
    <section aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-16 md:grid-cols-[1fr_2fr] md:px-8 md:py-24">
        <div className="md:sticky md:top-24">
          <h2 id="faq-title" className="heading text-3xl md:text-4xl">
            {t.faq.title}
          </h2>
          <LinkButton href={discussions.href} size="lg" className="mt-6">
            {discussions.label}
            <IconArrowUpRight className="size-4" aria-hidden="true" />
          </LinkButton>
        </div>
        {/* hiddenUntilFound keeps answers in the HTML and findable with Ctrl+F. */}
        <Accordion.Root hiddenUntilFound className="space-y-3">
          {t.faq.items.map((item, i) => (
            <Accordion.Item
              key={item.q}
              className="rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] data-open:border-line-strong data-open:shadow-sm"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left font-medium text-fg text-lg transition-colors hover:bg-subtle data-panel-open:hover:bg-transparent md:px-6">
                  <span className="w-6 shrink-0 font-mono text-fg-3 text-sm" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">{item.q}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-fg-3 transition group-data-panel-open:rotate-45 group-data-panel-open:border-inverse group-data-panel-open:bg-inverse group-data-panel-open:text-on-inverse">
                    <IconPlus className="size-4" aria-hidden="true" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <p className="pr-5 pb-5 pl-15 text-fg-3 text-lg md:pr-6 md:pl-16">{item.a}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
