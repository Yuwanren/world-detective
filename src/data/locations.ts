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
  'sydney-opera-house': { latitude: -33.8568, longitude: 151.2153, locationType: 'landmark', countryCode: 'AU', placeId: 'sydney', placement: 'verified-point' },
  peru: { latitude: -12.0464, longitude: -77.0428, locationType: 'country', countryCode: 'PE', isoA3: 'PER', placement: 'country-border' },
  'south-korea': { latitude: 37.5665, longitude: 126.978, locationType: 'country', countryCode: 'KR', isoA3: 'KOR', placement: 'country-border' },
  argentina: { latitude: -34.6037, longitude: -58.3816, locationType: 'country', countryCode: 'AR', isoA3: 'ARG', placement: 'country-border' },
  thailand: { latitude: 13.7563, longitude: 100.5018, locationType: 'country', countryCode: 'TH', isoA3: 'THA', placement: 'country-border' },
  switzerland: { latitude: 46.948, longitude: 7.4474, locationType: 'country', countryCode: 'CH', isoA3: 'CHE', placement: 'country-border' },
  'new-delhi': { latitude: 28.6139, longitude: 77.209, locationType: 'city', countryCode: 'IN', placement: 'verified-point' },
  istanbul: { latitude: 41.0082, longitude: 28.9784, locationType: 'city', countryCode: 'TR', placement: 'verified-point' },
  lisbon: { latitude: 38.7223, longitude: -9.1393, locationType: 'city', countryCode: 'PT', placement: 'verified-point' },
  marrakech: { latitude: 31.6295, longitude: -7.9811, locationType: 'city', countryCode: 'MA', placement: 'verified-point' },
  vancouver: { latitude: 49.2827, longitude: -123.1207, locationType: 'city', countryCode: 'CA', placement: 'verified-point' },
  dubai: { latitude: 25.2048, longitude: 55.2708, locationType: 'city', countryCode: 'AE', placement: 'verified-point' },
  'angkor-wat': { latitude: 13.4125, longitude: 103.867, locationType: 'landmark', countryCode: 'KH', placement: 'verified-point' },
  'christ-the-redeemer': { latitude: -22.9519, longitude: -43.2105, locationType: 'landmark', countryCode: 'BR', placeId: 'rio-de-janeiro', placement: 'verified-point' },
  'mount-fuji': { latitude: 35.3606, longitude: 138.7274, locationType: 'landmark', countryCode: 'JP', placement: 'verified-point' },
  'sagrada-familia': { latitude: 41.4036, longitude: 2.1744, locationType: 'landmark', countryCode: 'ES', placeId: 'barcelona', placement: 'verified-point' },
  'burj-khalifa': { latitude: 25.1972, longitude: 55.2744, locationType: 'landmark', countryCode: 'AE', placeId: 'dubai', placement: 'verified-point' },
  'chichen-itza': { latitude: 20.6843, longitude: -88.5678, locationType: 'landmark', countryCode: 'MX', placement: 'verified-point' },
  'table-mountain': { latitude: -33.9628, longitude: 18.4098, locationType: 'landmark', countryCode: 'ZA', placeId: 'cape-town', placement: 'verified-point' },
  'moai-statues': { latitude: -27.1253, longitude: -109.2768, locationType: 'landmark', countryCode: 'CL', placement: 'verified-point' },
  'neuschwanstein-castle': { latitude: 47.5576, longitude: 10.7498, locationType: 'landmark', countryCode: 'DE', placement: 'verified-point' },
  'iguazu-falls': { latitude: -25.6953, longitude: -54.4367, locationType: 'landmark', countryCode: 'AR', placement: 'verified-point' },
  'potala-palace': { latitude: 29.6578, longitude: 91.1172, locationType: 'landmark', countryCode: 'CN', placement: 'verified-point' },
  indonesia: { latitude: -6.2088, longitude: 106.8456, locationType: 'country', countryCode: 'ID', isoA3: 'IDN', placement: 'country-border' },
  iceland: { latitude: 64.1466, longitude: -21.9426, locationType: 'country', countryCode: 'IS', isoA3: 'ISL', placement: 'country-border' },
  'new-zealand': { latitude: -41.2866, longitude: 174.7756, locationType: 'country', countryCode: 'NZ', isoA3: 'NZL', placement: 'country-border' },
  ethiopia: { latitude: 9.03, longitude: 38.74, locationType: 'country', countryCode: 'ET', isoA3: 'ETH', placement: 'country-border' },
  croatia: { latitude: 45.815, longitude: 15.9819, locationType: 'country', countryCode: 'HR', isoA3: 'HRV', placement: 'country-border' },
  seoul: { latitude: 37.5665, longitude: 126.978, locationType: 'city', countryCode: 'KR', placement: 'verified-point' },
  cairo: { latitude: 30.0444, longitude: 31.2357, locationType: 'city', countryCode: 'EG', placement: 'verified-point' },
  prague: { latitude: 50.0755, longitude: 14.4378, locationType: 'city', countryCode: 'CZ', placement: 'verified-point' },
  cusco: { latitude: -13.5164, longitude: -71.9788, locationType: 'city', countryCode: 'PE', placement: 'verified-point' },
  kyiv: { latitude: 50.4501, longitude: 30.5234, locationType: 'city', countryCode: 'UA', placement: 'verified-point' },
  'golden-gate-bridge': { latitude: 37.8199, longitude: -122.4783, locationType: 'landmark', countryCode: 'US', placement: 'verified-point' },
  'acropolis-of-athens': { latitude: 37.9715, longitude: 23.7267, locationType: 'landmark', countryCode: 'GR', placement: 'verified-point' },
  'pyramids-of-giza': { latitude: 29.9792, longitude: 31.1342, locationType: 'landmark', countryCode: 'EG', placeId: 'cairo', placement: 'verified-point' },
  stonehenge: { latitude: 51.1789, longitude: -1.8262, locationType: 'landmark', countryCode: 'GB', placement: 'verified-point' },
  'burj-al-arab': { latitude: 25.1412, longitude: 55.1853, locationType: 'landmark', countryCode: 'AE', placeId: 'dubai', placement: 'verified-point' },
  'sydney-harbour-bridge': { latitude: -33.8523, longitude: 151.2108, locationType: 'landmark', countryCode: 'AU', placeId: 'sydney', placement: 'verified-point' },
  'petronas-towers': { latitude: 3.1579, longitude: 101.7116, locationType: 'landmark', countryCode: 'MY', placement: 'verified-point' },
  'leaning-tower-of-pisa': { latitude: 43.723, longitude: 10.3966, locationType: 'landmark', countryCode: 'IT', placement: 'verified-point' },
  'mount-kilimanjaro': { latitude: -3.0674, longitude: 37.3556, locationType: 'landmark', countryCode: 'TZ', placement: 'verified-point' },
  'mount-rushmore': { latitude: 43.8791, longitude: -103.4591, locationType: 'landmark', countryCode: 'US', placement: 'verified-point' },
  'forbidden-city': { latitude: 39.9163, longitude: 116.3972, locationType: 'landmark', countryCode: 'CN', placement: 'verified-point' },
  alhambra: { latitude: 37.1761, longitude: -3.5881, locationType: 'landmark', countryCode: 'ES', placement: 'verified-point' },
  'brandenburg-gate': { latitude: 52.5163, longitude: 13.3777, locationType: 'landmark', countryCode: 'DE', placement: 'verified-point' },
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
