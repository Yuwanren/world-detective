import { scoreForSolvedClue } from './scoring.ts'

export type DistancePlacement = 'verified-point' | 'country-representative'

export interface GeoPoint {
  latitude: number
  longitude: number
}

const EARTH_RADIUS_KM = 6371

export function isValidGeoPoint(point: GeoPoint): boolean {
  return (
    Number.isFinite(point.latitude) &&
    Number.isFinite(point.longitude) &&
    point.latitude >= -90 &&
    point.latitude <= 90 &&
    point.longitude >= -180 &&
    point.longitude <= 180
  )
}

export function haversineKm(from: GeoPoint, to: GeoPoint): number {
  const lat1 = (from.latitude * Math.PI) / 180
  const lat2 = (to.latitude * Math.PI) / 180
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180
  const dLng = ((to.longitude - from.longitude) * Math.PI) / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

const POINT_BANDS = [
  { maxKm: 25, ratio: 1 },
  { maxKm: 100, ratio: 0.8 },
  { maxKm: 300, ratio: 0.6 },
  { maxKm: 800, ratio: 0.4 },
  { maxKm: 2000, ratio: 0.2 },
] as const

// Retired helper bands. Country questions are scored by border containment, not these distances.
const COUNTRY_REPRESENTATIVE_BANDS = [
  { maxKm: 400, ratio: 1 },
  { maxKm: 900, ratio: 0.75 },
  { maxKm: 1800, ratio: 0.5 },
  { maxKm: 3500, ratio: 0.25 },
] as const

export function scoreForDistance(distanceKm: number, cluesRevealed: number, placement: DistancePlacement): number | null {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) return null
  const cap = scoreForSolvedClue(cluesRevealed)
  if (cap <= 0) return null
  const bands = placement === 'country-representative' ? COUNTRY_REPRESENTATIVE_BANDS : POINT_BANDS
  const band = bands.find((item) => distanceKm <= item.maxKm)
  return Math.round(cap * (band?.ratio ?? 0))
}
