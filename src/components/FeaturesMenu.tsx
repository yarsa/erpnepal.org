import { IconChevronDown } from '@tabler/icons-react'
import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react'
import { cn } from '../lib/cn'

// A disclosure menu kept free of positioning libraries so the header stays small.
// The panel and its feature list load on first hover or focus.
const loadPanel = () => import('./FeaturesMenuPanel')
const FeaturesMenuPanel = lazy(loadPanel)

export function FeaturesMenu({ label, className }: { label: string; className: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<number>(undefined)
  const id = useId()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const show = () => {
      window.clearTimeout(timer.current)
      setMounted(true)
      setOpen(true)
    }
    const hide = () => {
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setOpen(false), 150)
    }
    const enter = (e: PointerEvent) => e.pointerType === 'mouse' && show()
    const leave = (e: PointerEvent) => e.pointerType === 'mouse' && hide()
    const out = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) setOpen(false)
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    el.addEventListener('focusout', out)
    return () => {
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      el.removeEventListener('focusout', out)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        root.current?.querySelector('button')?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div ref={root} className="relative flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onFocus={loadPanel}
        onClick={() => {
          setMounted(true)
          setOpen(!open)
        }}
        className={cn(className, 'gap-1', open && 'text-fg')}
      >
        {label}
        <IconChevronDown className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')} aria-hidden="true" />
      </button>
      {mounted && (
        <div id={id} hidden={!open} className="-left-4 absolute top-full z-40 pt-1">
          <div className="panel-in rounded-2xl border border-line bg-surface shadow-lg">
            <Suspense fallback={<div className="h-80 w-[40rem]" />}>
              <FeaturesMenuPanel />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
