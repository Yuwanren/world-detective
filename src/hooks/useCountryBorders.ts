import { useEffect, useState } from 'react'
import { registerCountryLookup } from '../lib/locationScore.ts'

export function useCountryBorders(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let live = true
    void import('../data/countries.ts').then((module) => {
      registerCountryLookup((latitude, longitude) => module.countryAt(latitude, longitude)?.code ?? null)
      if (live) setReady(true)
    })
    return () => {
      live = false
    }
  }, [])

  return ready
}
