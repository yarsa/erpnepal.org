import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

// Which "What it does" tab is open. The hero chips set it, so a chip opens its
// tab and scrolls there. Links use #feature-<tab>, which also works on load.
const FeatureTabContext = createContext<{ active: string; select: (tab: string) => void; open: (tab: string) => void }>({
  active: '',
  select: () => {},
  open: () => {},
})

export function FeatureTabProvider({ initial, tabs, children }: { initial: string; tabs: string[]; children: ReactNode }) {
  const [active, setActive] = useState(initial)
  const open = useCallback(
    (tab: string) => {
      if (!tabs.includes(tab)) return
      setActive(tab)
      history.replaceState(null, '', `#feature-${tab}`)
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      document.getElementById('features')?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    },
    [tabs],
  )
  useEffect(() => {
    const fromHash = () => {
      const tab = window.location.hash.match(/^#feature-(.+)$/)?.[1]
      if (tab) open(tab)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [open])
  return <FeatureTabContext.Provider value={{ active, select: setActive, open }}>{children}</FeatureTabContext.Provider>
}

export const useFeatureTab = () => useContext(FeatureTabContext)
