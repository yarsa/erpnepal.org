import { Accordion } from '@base-ui/react/accordion'
import { IconPlus } from '@tabler/icons-react'
import { useStrings } from '../lib/i18n'

export function FaqList() {
  const { t } = useStrings()
  return (
    <section className="border-line border-b" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1fr_2fr] md:px-8 md:py-24">
        <h2 id="faq-title" className="heading text-3xl md:text-4xl">
          {t.faq.title}
        </h2>
        {/* hiddenUntilFound keeps answers in the HTML and findable with Ctrl+F. */}
        <Accordion.Root hiddenUntilFound className="border-line border-t">
          {t.faq.items.map((item) => (
            <Accordion.Item key={item.q} className="border-line border-b">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-fg text-lg">
                  {item.q}
                  <IconPlus className="size-5 shrink-0 text-fg-4 transition-transform group-data-panel-open:rotate-45" aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <p className="pb-5 text-fg-3 text-lg">{item.a}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
