import { createContext, type ReactNode, useContext, useState } from 'react'

export type Calendar = 'bs' | 'ad'

// The BS / AD switch in the feature section flips
const CalendarContext = createContext<{ calendar: Calendar; setCalendar: (c: Calendar) => void }>({
  calendar: 'bs',
  setCalendar: () => {},
})

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [calendar, setCalendar] = useState<Calendar>('bs')
  return <CalendarContext.Provider value={{ calendar, setCalendar }}>{children}</CalendarContext.Provider>
}

export const useCalendar = () => useContext(CalendarContext)
