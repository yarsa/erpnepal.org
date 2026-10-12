import { IconArrowRight } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'
import { LinkButton } from './ui/button'

// Phones only. Hidden while the hero, Get started or the footer is on screen,
// so it never doubles up with another Install button or covers the footer links.
const watched = ['#hero-title', '#get-started', 'footer']

export function StickyInstall() {
  const { ui } = useStrings()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const targets = watched.flatMap((selector) => {
      const el = document.querySelector(selector)
      return el ? [selector === '#hero-title' ? (el.closest('section') ?? el) : el] : []
    })
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)
      setShow(visible.size === 0)
    })
    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-line border-t bg-surface/90 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-[translate,opacity] duration-300 sm:hidden',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0',
      )}
      inert={!show}
    >
      <LinkButton href="#get-started" variant="solid" size="lg" className="w-full justify-center">
        {ui.install.label}
        <IconArrowRight className="size-4" aria-hidden="true" />
      </LinkButton>
    </div>
  )
}
