import { countryAt } from '../data/countries.ts'
import { placeFixes } from '../data/locations.ts'
import type { GeoPoint } from '../lib/geo.ts'
import { registerCountryLookup } from '../lib/locationScore.ts'

registerCountryLookup((latitude, longitude) => countryAt(latitude, longitude)?.code ?? null)

export function pin(id: string): GeoPoint {
  const place = placeFixes[id]
  if (!place) throw new Error(`missing place ${id}`)
  return { latitude: place.latitude, longitude: place.longitude }
}

export const ocean: GeoPoint = { latitude: 0, longitude: -30 }
