import type { PlaceFix } from '../data/locations.ts'
import { haversineKm, isValidGeoPoint, scoreForDistance, type GeoPoint } from './geo.ts'
import { scoreForSolvedClue } from './scoring.ts'

export interface LocationScore {
  score: number
  distanceKm: number
  borderHit: boolean | null
}

type CountryLookup = (latitude: number, longitude: number) => string | null

let countryLookup: CountryLookup | null = null

export function registerCountryLookup(lookup: CountryLookup): void {
  countryLookup = lookup
}

export function scoreLocationGuess(point: GeoPoint, place: PlaceFix, cluesRevealed: number): LocationScore | null {
  if (!isValidGeoPoint(point) || !isValidGeoPoint(place)) return null
  const cap = scoreForSolvedClue(cluesRevealed)
  if (cap <= 0) return null
  const distanceKm = haversineKm(point, place)
  if (place.placement === 'country-border') {
    if (!countryLookup || !place.isoA3) return null
    const inside = countryLookup(point.latitude, point.longitude) === place.isoA3
    return { score: inside ? cap : 0, distanceKm, borderHit: inside }
  }
  const score = scoreForDistance(distanceKm, cluesRevealed, 'verified-point')
  if (score === null) return null
  return { score, distanceKm, borderHit: null }
}
