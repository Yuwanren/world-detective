import { describe, expect, it } from 'vitest'
import geography from '../data/referenceGeography.json' with { type: 'json' }
import { referenceCities, regionalPaths } from '../data/referenceGeography.ts'
import { scoreForDistance } from '../lib/geo.ts'
import {
  ALTITUDE_STEP,
  cameraDistance,
  CITY_ALTITUDE,
  cityRadiusDegrees,
  clampAltitude,
  COAST_ALTITUDE,
  INITIAL_ALTITUDE,
  MAX_ALTITUDE,
  MIN_ALTITUDE,
  pinRadiusDegrees,
  showCities,
  showCoast,
} from '../lib/globeView.ts'

const EARTH_RADIUS_KM = 6371

function radiusKm(degrees: number): number {
  return (degrees * Math.PI * EARTH_RADIUS_KM) / 180
}

describe('globe zoom', () => {
  it('keeps the wheel and the buttons inside the same camera range', () => {
    expect(clampAltitude(0)).toBe(MIN_ALTITUDE)
    expect(clampAltitude(99)).toBe(MAX_ALTITUDE)
    expect(clampAltitude(INITIAL_ALTITUDE)).toBe(INITIAL_ALTITUDE)
    expect(clampAltitude(INITIAL_ALTITUDE - ALTITUDE_STEP * 20)).toBe(MIN_ALTITUDE)
    expect(cameraDistance(MIN_ALTITUDE)).toBeGreaterThan(100)
    expect(cameraDistance(MIN_ALTITUDE)).toBeLessThan(110)
    expect(cameraDistance(MAX_ALTITUDE)).toBe(420)
  })

  it('shows coast and cities only after the player zooms in', () => {
    expect(showCoast(INITIAL_ALTITUDE)).toBe(false)
    expect(showCities(INITIAL_ALTITUDE)).toBe(false)
    expect(showCoast(COAST_ALTITUDE)).toBe(true)
    expect(showCities(COAST_ALTITUDE)).toBe(false)
    expect(showCities(CITY_ALTITUDE)).toBe(true)
    expect(showCoast(CITY_ALTITUDE)).toBe(true)
  })

  it('shrinks the guess marker without turning it into the 25 km score band', () => {
    expect(radiusKm(pinRadiusDegrees(MIN_ALTITUDE))).toBeLessThan(8)
    expect(radiusKm(cityRadiusDegrees(MIN_ALTITUDE))).toBeLessThan(radiusKm(pinRadiusDegrees(MIN_ALTITUDE)))
    expect(radiusKm(pinRadiusDegrees(INITIAL_ALTITUDE))).toBeLessThan(50)
    expect(pinRadiusDegrees(0.55)).not.toBe(0.55)
    expect(scoreForDistance(25, 1, 'verified-point')).toBe(100)
    expect(scoreForDistance(25.01, 1, 'verified-point')).toBe(80)
    expect(scoreForDistance(100, 1, 'verified-point')).toBe(80)
    expect(scoreForDistance(300, 1, 'verified-point')).toBe(60)
    expect(scoreForDistance(800, 1, 'verified-point')).toBe(40)
    expect(scoreForDistance(2000, 1, 'verified-point')).toBe(20)
    expect(scoreForDistance(2000.01, 1, 'verified-point')).toBe(0)
  })
})

describe('reference geography', () => {
  it('ships coordinates only and stays small enough to bundle', () => {
    const text = JSON.stringify(geography)
    expect(new TextEncoder().encode(text).length).toBeLessThan(500_000)
    expect(text).not.toMatch(/Paris|Sydney|Cairo|Egypt|Liberty|歌剧院|自由女神|巴黎|悉尼|开罗|埃及/)
    expect(referenceCities.length).toBeGreaterThan(180)
    expect(referenceCities.length).toBeLessThan(280)
    expect(regionalPaths.length).toBeGreaterThan(1000)
    expect(regionalPaths.every((path) => path.kind === 'coast' || path.kind === 'river')).toBe(true)
    expect(referenceCities.every((city) => Number.isFinite(city.lat) && Number.isFinite(city.lng))).toBe(true)
  })
})
