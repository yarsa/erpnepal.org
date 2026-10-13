import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { IconArrowRight, IconCircleCheckFilled, IconCirclePlus, IconLayoutList, IconPlus, IconTable } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { useStrings } from '../lib/i18n'
import { ContentIcon } from '../lib/icons'
import { useMinWidth } from '../lib/useMinWidth'
import { DemoPanel, DemoTable } from './FeatureExplorer'
import { LinkButton } from './ui/button'

export function HomeHero() {
  const { t } = useStrings()
  const tabs = t.features.tabs
  const [selected, setSelected] = useState(['payroll', 'billing'])
  const [view, setView] = useState('document')
  const wide = useMinWidth(640)
  const panel = useRef<HTMLDivElement>(null)

  // Newest selection first, so each added feature's demo appears at the top of the window.
  function choose(next: string[]) {
    if (next.length === 0) return
    const added = next.filter((value) => !selected.includes(value))
    setSelected([...added, ...selected.filter((value) => next.includes(value))])
    if (added.length) panel.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const hero = t.hero as typeof t.hero & { titleTail?: string }
  const [before, after] = hero.eyebrow.split(hero.eyebrowStrong)
  return (
    <section className="-mt-16 bg-subtle pt-16 dark:bg-black" aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-5 pt-10 text-center md:px-8 md:pt-16">
        <div>
          <a
            href={hero.eyebrowHref}
            className="group mx-auto inline-flex max-w-full items-center gap-1 whitespace-nowrap rounded-full border border-line-strong bg-surface px-2.5 py-1 text-fg text-xs shadow-sm outline-sweep sm:gap-1.5 dark:text-white sm:px-3 sm:text-sm"
          >
            {/* One line on phones: 12 px text there; on very narrow screens it truncates. */}
            <span className="truncate">
              {before}
              {after !== undefined && <strong className="font-semibold">{hero.eyebrowStrong}</strong>}
              {after}
            </span>
            <IconArrowRight className="size-3 shrink-0 transition-transform sm:size-3.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <h1
          id="hero-title"
          className="heading mx-auto mt-4 max-w-4xl font-bold text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl dark:text-white"
        >
          {hero.title}
          {hero.titleTail && <span className="text-fg-4"> {hero.titleTail}</span>}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-fg-3 text-xl dark:text-white">{hero.lead}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton
            href={hero.primary.href}
            variant="solid"
            size="xl"
            className="dark:bg-orange-700 dark:font-semibold dark:text-white dark:hover:bg-orange-800 dark:hover:opacity-100"
          >
            {hero.primary.label}
            <IconArrowRight className="size-4" aria-hidden="true" />
          </LinkButton>
          <LinkButton
            href={hero.secondary.href}
            variant="outline"
            size="xl"
            className="dark:border-orange-700 dark:bg-transparent dark:font-semibold dark:text-white dark:hover:bg-orange-700/30"
          >
            {hero.secondary.label}
          </LinkButton>
        </div>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-fg-3 text-sm dark:text-white">
          {hero.assurance.map((item, i) => (
            <li key={item} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-line-strong" aria-hidden="true">
                  ·
                </span>
              )}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-5xl px-5 pb-14 md:px-8 md:pb-20">
        <div className="overflow-hidden rounded-2xl bg-surface text-left shadow-lg">
          <div className="flex h-11 items-center gap-3 border-line border-b px-4">
            <TrafficLights />
            <p className="min-w-0 flex-1 truncate text-fg-3 text-xs" aria-hidden="true">
              Nepal Compliance <span className="px-1 text-fg-4">/</span>
              <span className="text-fg-2">{tabs.find((tab) => tab.value === selected[0])?.label}</span>
            </p>
            <ToggleGroup
              value={[view]}
              onValueChange={(next) => next[0] && setView(next[0])}
              aria-label={t.demo.views.label}
              className="flex shrink-0 rounded-lg bg-muted p-0.5"
            >
              {(
                [
                  ['document', IconLayoutList],
                  ['table', IconTable],
                ] as const
              ).map(([value, Icon]) => (
                <Toggle
                  key={value}
                  value={value}
                  className="flex h-7 items-center gap-1.5 rounded-md px-2.5 text-fg-3 text-xs transition-colors hover:text-fg data-pressed:bg-surface data-pressed:font-medium data-pressed:text-fg data-pressed:shadow-sm"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {t.demo.views[value]}
                </Toggle>
              ))}
            </ToggleGroup>
          </div>
          <div className="sm:flex">
            <div className="flex items-center gap-2 overflow-x-auto border-line border-b p-3 [scrollbar-width:none] sm:w-60 sm:shrink-0 sm:flex-col sm:items-stretch sm:overflow-visible sm:border-r sm:border-b-0">
              <ToggleGroup
                multiple
                value={selected}
                onValueChange={choose}
                orientation={wide ? 'vertical' : 'horizontal'}
                aria-label={t.demo.previewLabel}
                className="flex gap-1.5 sm:flex-col sm:gap-0.5"
              >
                {tabs.map((tab) => (
                  <Toggle
                    key={tab.value}
                    value={tab.value}
                    className="group/item flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line-strong py-1 pr-3 pl-1.5 font-medium text-fg-2 text-sm transition-colors hover:border-fg/40 hover:text-fg data-pressed:border-transparent data-pressed:bg-muted data-pressed:text-fg sm:h-11 sm:gap-2.5 sm:rounded-lg sm:border-transparent sm:px-1.5 sm:hover:border-transparent sm:hover:bg-muted/60 sm:data-pressed:bg-muted"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-fg-3 transition-colors group-data-pressed/item:bg-surface group-data-pressed/item:text-fg group-data-pressed/item:shadow-sm sm:size-8">
                      <ContentIcon name={tab.icon} className="size-4" />
                    </span>
                    <span className="group-data-pressed/item:font-semibold sm:flex-1 sm:text-left">{tab.label}</span>
                    <IconCirclePlus
                      className="size-[18px] shrink-0 text-fg-3 group-data-pressed/item:hidden"
                      stroke={1.5}
                      aria-hidden="true"
                    />
                    <IconCircleCheckFilled
                      className="hidden size-[18px] shrink-0 text-fg group-data-pressed/item:block"
                      aria-hidden="true"
                    />
                  </Toggle>
                ))}
              </ToggleGroup>
              <a
                href={t.demo.moreApps.href}
                className="flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line-strong border-dashed py-1 pr-3 pl-1.5 font-medium text-fg-3 text-sm transition-colors hover:border-fg/40 hover:text-fg sm:mt-0.5 sm:h-11 sm:gap-2.5 sm:rounded-lg sm:px-1.5"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-md border border-line-strong border-dashed sm:size-8">
                  <IconPlus className="size-4" aria-hidden="true" />
                </span>
                <span className="sm:flex-1">{t.demo.moreApps.label}</span>
                <IconArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <LinkButton
                href={hero.secondary.href}
                variant="solid"
                className="outline-sweep shrink-0 rounded-full font-semibold [--sweep-gap:2px] sm:mt-auto sm:rounded-lg sm:before:rounded-[calc(var(--radius-lg)+3px)]"
              >
                <IconPlus className="size-4" aria-hidden="true" />
                {t.demo.addFeatures}
              </LinkButton>
            </div>
            <div ref={panel} className="h-[26rem] min-w-0 flex-1 space-y-4 overflow-y-auto bg-subtle p-4 sm:h-[32rem] md:p-5">
              {view === 'table' ? (
                <div className="panel-in overflow-hidden rounded-2xl border border-line bg-surface">
                  <DemoTable values={selected} />
                </div>
              ) : (
                selected.map((value) => (
                  <div key={value} className="panel-in overflow-hidden rounded-2xl border border-line bg-surface">
                    <DemoPanel value={value} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const lights = [
  { color: 'bg-[#ff5f57] border-[#e0443e]', glyph: <path d="M2 2l4 4M6 2L2 6" /> },
  { color: 'bg-[#febc2e] border-[#dea123]', glyph: <path d="M1.5 4h5" /> },
  { color: 'bg-[#28c840] border-[#1aab29]', glyph: <path d="M4 1.5v5M1.5 4h5" /> },
]

function TrafficLights() {
  return (
    <div className="group/lights flex gap-2" aria-hidden="true">
      {lights.map((light) => (
        <span key={light.color} className={`grid size-3 place-items-center rounded-full border ${light.color}`}>
          <svg
            aria-hidden="true"
            viewBox="0 0 8 8"
            className="size-2 stroke-black/60 opacity-0 transition-opacity group-hover/lights:opacity-100"
            strokeWidth="1.2"
            fill="none"
          >
            {light.glyph}
          </svg>
        </span>
      ))}
    </div>
  )
}
