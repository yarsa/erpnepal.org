import { Autocomplete } from '@base-ui/react/autocomplete'
import { Dialog } from '@base-ui/react/dialog'
import { IconSearch } from '@tabler/icons-react'
import { useId, useMemo } from 'react'
import { useStrings } from '../lib/i18n'
import { addons, features, guides } from '../lib/site'

// Loaded on first use (see SearchSlot), so the index and the dialog code stay
// out of every page's first download.

interface Item {
  value: string
  label: string
  description: string
  /** Extra words that match but are not shown, e.g. a guide's category. */
  keywords: string
}
interface Group {
  value: string
  items: Item[]
}

const normalize = (s: string) => s.toLowerCase().normalize('NFKD')

// Every word of the query must appear in the title, description or keywords.
function matches(item: Item, query: string) {
  const haystack = normalize(`${item.label} ${item.description} ${item.keywords}`)
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export default function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { t, ui } = useStrings()
  const hintId = useId()
  const s = ui.search

  const groups = useMemo<Group[]>(
    () => [
      { value: s.groups.pages, items: t.footer.site.map((n) => ({ value: n.href, label: n.label, description: '', keywords: '' })) },
      {
        value: s.groups.features,
        items: features.map((f) => ({ value: `/features/${f.slug}/`, label: f.shortTitle, description: f.description, keywords: f.title })),
      },
      {
        value: s.groups.guides,
        items: guides.map((g) => ({ value: `/guides/${g.slug}/`, label: g.title, description: g.description, keywords: g.category })),
      },
      {
        value: s.groups.addons,
        items: addons.map((a) => ({ value: `/addons/${a.slug}/`, label: a.shortTitle, description: a.description, keywords: a.category })),
      },
    ],
    [s, t.footer.site],
  )

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0 dark:bg-black/60" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] pb-4">
          <Dialog.Popup
            aria-label={s.label}
            className="flex max-h-[min(36rem,80dvh)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-surface text-fg shadow-lg transition-[opacity,scale,translate] data-ending-style:-translate-y-2 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:scale-98 data-starting-style:opacity-0"
          >
            <Autocomplete.Root
              open
              inline
              items={groups}
              filter={matches}
              itemToStringValue={(item: Item) => item.label}
              autoHighlight="always"
              keepHighlight
            >
              <Autocomplete.InputGroup className="flex items-center gap-3 border-line border-b px-4">
                <IconSearch className="size-4 shrink-0 text-fg-3" aria-hidden="true" />
                <Autocomplete.Input
                  aria-label={s.placeholder}
                  aria-describedby={hintId}
                  placeholder={s.placeholder}
                  className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-fg-3"
                />
                <Dialog.Close className="shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 text-fg-3 text-xs hover:text-fg">
                  Esc
                </Dialog.Close>
              </Autocomplete.InputGroup>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                <Autocomplete.Empty>
                  <p className="px-3 py-8 text-center text-fg-3 text-sm">{s.empty}</p>
                </Autocomplete.Empty>
                <Autocomplete.List>
                  {(group: Group) => (
                    <Autocomplete.Group key={group.value} items={group.items} className="not-last:mb-2">
                      <Autocomplete.GroupLabel className="px-3 pt-2 pb-1 font-medium text-fg-3 text-xs">
                        {group.value}
                      </Autocomplete.GroupLabel>
                      <Autocomplete.Collection>
                        {(item: Item) => (
                          <Autocomplete.Item
                            key={item.value}
                            value={item}
                            onClick={() => window.location.assign(item.value)}
                            className="flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2 outline-none [scroll-margin-block:0.5rem] data-highlighted:bg-muted"
                          >
                            <span className="truncate font-medium text-fg text-sm">{item.label}</span>
                            {item.description && <span className="truncate text-fg-3 text-xs">{item.description}</span>}
                          </Autocomplete.Item>
                        )}
                      </Autocomplete.Collection>
                    </Autocomplete.Group>
                  )}
                </Autocomplete.List>
              </div>

              <p id={hintId} className="border-line border-t px-4 py-2.5 text-fg-3 text-xs">
                {s.hint}
              </p>
            </Autocomplete.Root>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
