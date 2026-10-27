// Camera altitude is height above the surface in globe radii.
// Globe radius in three-globe is 100, so camera distance = 100 * (1 + altitude).

export const MIN_ALTITUDE = 0.06
export const MAX_ALTITUDE = 3.2
export const INITIAL_ALTITUDE = 2.5
export const ALTITUDE_STEP = 0.28
export const COAST_ALTITUDE = 1.15
export const CITY_ALTITUDE = 0.62
const GLOBE_RADIUS = 100

export function clampAltitude(altitude: number): number {
  if (!Number.isFinite(altitude)) return INITIAL_ALTITUDE
  return Math.min(MAX_ALTITUDE, Math.max(MIN_ALTITUDE, altitude))
}

export function cameraDistance(altitude: number): number {
  return GLOBE_RADIUS * (1 + clampAltitude(altitude))
}

export function showCoast(altitude: number): boolean {
  return altitude <= COAST_ALTITUDE
}

export function showCities(altitude: number): boolean {
  return altitude <= CITY_ALTITUDE
}

// Marker radius is degrees of longitude. It scales with the camera so the
// disk stays a few pixels wide. It is not a scoring radius.
export function pinRadiusDegrees(altitude: number): number {
  return Math.min(0.42, Math.max(0.035, clampAltitude(altitude) * 0.5))
}

export function cityRadiusDegrees(altitude: number): number {
  return Math.min(0.22, Math.max(0.018, clampAltitude(altitude) * 0.38))
}
