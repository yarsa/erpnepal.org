import { IconMenu2 } from '@tabler/icons-react'
import { lazy, Suspense, useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { useStrings } from '../lib/i18n'
import { buttonVariants } from './ui/button'

// Base UI Menu and its positioning code are ~33 KB gzip, so they stay out of
// the page's first download. Hover, focus or touch prefetches the code; the
// first click swaps this placeholder for the real menu, already open. The swap
// waits for the click so a press never lands on a button that is being replaced.
const loadMenu = () => import('./MobileMenu')
const MobileMenu = lazy(loadMenu)
const trigger = cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'xl:hidden')

export function MobileMenuSlot({ toggleTheme, showLanguage }: { toggleTheme: () => void; showLanguage: boolean }) {
  const { ui } = useStrings()
  const [active, setActive] = useState(false)
  const viaKeyboard = useRef(false)

  const placeholder = (
    <button
      type="button"
      aria-label={ui.a11y.menu}
      aria-haspopup="menu"
      aria-expanded="false"
      className={trigger}
      onPointerEnter={loadMenu}
      onTouchStart={loadMenu}
      onFocus={loadMenu}
      onClick={(e) => {
        // detail is 0 for keyboard-activated clicks: keep focus on the real trigger then.
        viaKeyboard.current = e.detail === 0
        setActive(true)
      }}
    >
      <IconMenu2 className="size-4" aria-hidden="true" />
    </button>
  )

  if (!active) return placeholder
  return (
    <Suspense fallback={placeholder}>
      <MobileMenu className={trigger} focusTrigger={viaKeyboard.current} toggleTheme={toggleTheme} showLanguage={showLanguage} />
    </Suspense>
  )
}
