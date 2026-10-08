import { createContext, type ReactNode, useContext } from 'react'

export interface Stats {
  stars: number | null
  forks: number | null
  pulls: number | null
  contributors: number | null
}

export const emptyStats: Stats = { stars: null, forks: null, pulls: null, contributors: null }

const StatsContext = createContext<Stats>(emptyStats)

export function StatsProvider({ stats, children }: { stats: Stats; children: ReactNode }) {
  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
}

export const useStats = () => useContext(StatsContext)

export const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
