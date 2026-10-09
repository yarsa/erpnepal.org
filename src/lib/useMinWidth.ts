import { useEffect, useState } from 'react'

export function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`)
    const update = () => setMatches(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [px])
  return matches
}
