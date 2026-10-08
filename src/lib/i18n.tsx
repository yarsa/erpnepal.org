import { createContext, type ReactNode, useContext } from 'react'
import type en from '../content/en.ts'

export type Locale = 'en' | 'ne'
export type Copy = typeof en
export type Strings = Copy['t']
export type Ui = Copy['ui']

export const homePath: Record<Locale, string> = { en: '/', ne: '/ne/' }

export const loadCopy = (locale: Locale): Promise<Copy> =>
  (locale === 'ne' ? import('../content/ne.ts') : import('../content/en.ts')).then((m) => m.default)

const LocaleContext = createContext<{ locale: Locale; copy: Copy } | null>(null)

export function LocaleProvider({ locale, copy, children }: { locale: Locale; copy: Copy; children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, copy }}>{children}</LocaleContext.Provider>
}

export function useStrings() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useStrings needs a LocaleProvider')
  return { locale: value.locale, ...value.copy }
}
