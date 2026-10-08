import { Menu } from '@base-ui/react/menu'
import { Separator } from '@base-ui/react/separator'
import { IconLanguage, IconMenu2, IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect, useRef } from 'react'
import { homePath, useStrings } from '../lib/i18n'

const item = 'flex items-center gap-2 rounded-lg px-3 py-2.5 outline-none data-highlighted:bg-muted'

export default function MobileMenu({
  className,
  focusTrigger,
  toggleTheme,
  showLanguage,
}: {
  className: string
  focusTrigger: boolean
  toggleTheme: () => void
  showLanguage: boolean
}) {
  const { locale, t, ui } = useStrings()
  const other = locale === 'en' ? 'ne' : 'en'
  // A keyboard user keeps focus on the trigger that replaces the placeholder.
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (focusTrigger) triggerRef.current?.focus()
  }, [focusTrigger])

  // Mounted by the first click on the placeholder, so it opens straight away.
  return (
    <Menu.Root defaultOpen>
      <Menu.Trigger ref={triggerRef} aria-label={ui.a11y.menu} className={className}>
        <IconMenu2 className="size-4" aria-hidden="true" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={6} className="z-50">
          <Menu.Popup className="min-w-52 origin-(--transform-origin) rounded-2xl bg-surface p-1 text-fg text-sm shadow-lg outline-none transition-[opacity,scale] data-ending-style:scale-97 data-ending-style:opacity-0 data-starting-style:scale-97 data-starting-style:opacity-0">
            {ui.nav.map((link) => (
              <Menu.LinkItem key={link.href} href={link.href} className={item}>
                {link.label}
              </Menu.LinkItem>
            ))}
            <Separator className="my-1 h-px bg-line" />
            {showLanguage && (
              <Menu.LinkItem href={homePath[other]} lang={other} className={item}>
                <IconLanguage className="size-4 text-fg-3" aria-hidden="true" />
                {other === 'ne' ? t.language.ne : 'English'}
              </Menu.LinkItem>
            )}
            <Menu.Item onClick={toggleTheme} className={item}>
              <IconMoon className="size-4 text-fg-3 dark:hidden" aria-hidden="true" />
              <IconSun className="hidden size-4 text-fg-3 dark:block" aria-hidden="true" />
              {ui.a11y.theme}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
