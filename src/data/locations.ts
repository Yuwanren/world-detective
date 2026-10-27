import type { Category } from '../types/index.ts'

export type Placement = 'verified-point' | 'country-border'

export interface PlaceFix {
  latitude: number
  longitude: number
  locationType: Category
  countryCode?: string
  isoA3?: string
  /** Shared by questions that are the same place, such as Paris and the Eiffel Tower. */
  placeId?: string
  placement: Placement
}

export interface GeoLink {
  countryCode: string
  placeId: string
  countryQuestion: boolean
}

/**
 * Checked coordinates for every playable question.
 * Cities and landmarks are the place itself. Country rows are capitals, used as the
 * revealed reference point. Country scores use the Natural Earth 1:110m border, not
 * the distance to that capital. The Great Wall is not a single point and stays out
 * of the daily pool.
 * Source: published capital, city-center, and landmark positions. Status: verified.
 */
export const placeFixes: Record<string, PlaceFix> = {
  japan: { latitude: 35.6762, longitude: 139.6503, locationType: 'country', countryCode: 'JP', isoA3: 'JPN', placement: 'country-border' },
  france: { latitude: 48.8566, longitude: 2.3522, locationType: 'country', countryCode: 'FR', isoA3: 'FRA', placement: 'country-border' },
  egypt: { latitude: 30.0444, longitude: 31.2357, locationType: 'country', countryCode: 'EG', isoA3: 'EGY', placement: 'country-border' },
  brazil: { latitude: -15.7939, longitude: -47.8828, locationType: 'country', countryCode: 'BR', isoA3: 'BRA', placement: 'country-border' },
  canada: { latitude: 45.4215, longitude: -75.6972, locationType: 'country', countryCode: 'CA', isoA3: 'CAN', placement: 'country-border' },
  kenya: { latitude: -1.2921, longitude: 36.8219, locationType: 'country', countryCode: 'KE', isoA3: 'KEN', placement: 'country-border' },
  norway: { latitude: 59.9139, longitude: 10.7522, locationType: 'country', countryCode: 'NO', isoA3: 'NOR', placement: 'country-border' },
  australia: { latitude: -35.2809, longitude: 149.13, locationType: 'country', countryCode: 'AU', isoA3: 'AUS', placement: 'country-border' },
  india: { latitude: 28.6139, longitude: 77.209, locationType: 'country', countryCode: 'IN', isoA3: 'IND', placement: 'country-border' },
  mexico: { latitude: 19.4326, longitude: -99.1332, locationType: 'country', countryCode: 'MX', isoA3: 'MEX', placement: 'country-border' },
  morocco: { latitude: 34.0209, longitude: -6.8416, locationType: 'country', countryCode: 'MA', isoA3: 'MAR', placement: 'country-border' },
  greece: { latitude: 37.9838, longitude: 23.7275, locationType: 'country', countryCode: 'GR', isoA3: 'GRC', placement: 'country-border' },
  paris: { latitude: 48.8566, longitude: 2.3522, locationType: 'city', countryCode: 'FR', placement: 'verified-point' },
  kyoto: { latitude: 35.0116, longitude: 135.7681, locationType: 'city', countryCode: 'JP', placement: 'verified-point' },
  'new-york': { latitude: 40.7128, longitude: -74.006, locationType: 'city', countryCode: 'US', placement: 'verified-point' },
  venice: { latitude: 45.4408, longitude: 12.3155, locationType: 'city', countryCode: 'IT', placement: 'verified-point' },
  reykjavik: { latitude: 64.1466, longitude: -21.9426, locationType: 'city', countryCode: 'IS', placement: 'verified-point' },
  'cape-town': { latitude: -33.9249, longitude: 18.4241, locationType: 'city', countryCode: 'ZA', placement: 'verified-point' },
  london: { latitude: 51.5074, longitude: -0.1278, locationType: 'city', countryCode: 'GB', placement: 'verified-point' },
  'eiffel-tower': { latitude: 48.8584, longitude: 2.2945, locationType: 'landmark', countryCode: 'FR', placeId: 'paris', placement: 'verified-point' },
  'machu-picchu': { latitude: -13.1631, longitude: -72.545, locationType: 'landmark', countryCode: 'PE', placement: 'verified-point' },
  colosseum: { latitude: 41.8902, longitude: 12.4922, locationType: 'landmark', countryCode: 'IT', placement: 'verified-point' },
  petra: { latitude: 30.3285, longitude: 35.4444, locationType: 'landmark', countryCode: 'JO', placement: 'verified-point' },
  'statue-of-liberty': { latitude: 40.6892, longitude: -74.0445, locationType: 'landmark', countryCode: 'US', placeId: 'new-york', placement: 'verified-point' },
  'sydney-opera-house': { latitude: -33.8568, longitude: 151.2153, locationType: 'landmark', countryCode: 'AU', placement: 'verified-point' },
}

export const pendingLocationIds = ['great-wall'] as const

export function getPlaceFix(id: string): PlaceFix | undefined {
  return placeFixes[id]
}

export function getGeoLink(id: string): GeoLink | undefined {
  const place = placeFixes[id]
  if (!place?.countryCode) return undefined
  return {
    countryCode: place.countryCode,
    placeId: place.placeId ?? id,
    countryQuestion: place.placement === 'country-border',
  }
}

export function playableQuestionIds(ids: readonly string[]): string[] {
  return ids.filter((id) => placeFixes[id] !== undefined)
}
