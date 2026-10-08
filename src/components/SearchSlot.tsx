import { IconSearch } from '@tabler/icons-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'

// The trigger is all a page loads. Hover or focus prefetches the dialog; the
// first click, ⌘K / Ctrl+K, or "/" mounts it with the search index.
const loadSearch = () => import('./SearchDialog')
const SearchDialog = lazy(loadSearch)

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

export function SearchSlot({ className }: { className?: string }) {
  const { ui } = useStrings()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  // Server HTML shows ⌘K; non-Apple devices switch to Ctrl K after hydration.
  const [apple, setApple] = useState(true)

  useEffect(() => {
    setApple(/Mac|iPhone|iPad/.test(navigator.userAgent))
    const onKey = (e: KeyboardEvent) => {
      const shortcut = e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)
      if (shortcut || (e.key === '/' && !isTyping(e.target))) {
        e.preventDefault()
        setMounted(true)
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label={ui.search.label}
        aria-keyshortcuts="Meta+K Control+K /"
        onPointerEnter={loadSearch}
        onFocus={loadSearch}
        onClick={() => {
          setMounted(true)
          setOpen(true)
        }}
        className={cn(
          'inline-flex size-8 items-center justify-center gap-2 rounded-lg text-fg-2 text-sm transition-colors hover:bg-muted hover:text-fg lg:w-64 lg:justify-start xl:w-48 lg:border lg:border-line-strong lg:bg-surface lg:px-2.5 lg:hover:border-fg/30 lg:hover:bg-surface',
          className,
        )}
      >
        <IconSearch className="size-4" aria-hidden="true" />
        <span className="hidden text-fg-3 lg:inline">{ui.search.label}</span>
        <kbd className="ml-auto hidden rounded border border-line-strong px-1 font-sans text-fg-3 text-xs leading-4 lg:inline">
          {apple ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>
      {mounted && (
        <Suspense fallback={null}>
          <SearchDialog open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  )
}
