// Country outlines for the globe prototype.
// Source: Natural Earth 1:110m Cultural Vectors, Admin 0 — Countries, v5.1.2.
// License: public domain. https://www.naturalearthdata.com/about/terms-of-use/
// Codes come from the file's ISO_A3 field. France and Norway are stored there as
// "-99"; their ISO 3166-1 alpha-3 codes are taken from the same record's ISO_A3_EH
// field (FRA, NOR). Features with neither field set are drawn, but not given a code.

import borders from './countryBorders.json' with { type: 'json' }

export interface CountryHit {
  code: string | null
  name: string
}

export interface CountryLabel {
  lat: number
  lng: number
  text: string
  rank: number
  area: number
  x: number
  y: number
  front: boolean
}

interface CountryRecord {
  code: string | null
  name: string
  rank: number
  area: number
  label: [number, number] | null
  geometry: { type: 'Polygon' | 'MultiPolygon'; coordinates: number[][][] | number[][][][] }
}

interface IndexedPart {
  bbox: [number, number, number, number]
  rings: number[][][]
  area: number
  code: string | null
  name: string
}

const records = borders.countries as CountryRecord[]

export const countryBorders: CountryRecord[] = records

export const countryLabels: CountryLabel[] = records.flatMap((country) => {
  if (!country.code || !country.label) return []
  return [
    {
      lat: country.label[1],
      lng: country.label[0],
      text: country.code,
      rank: country.rank,
      area: country.area,
      x: 0,
      y: 0,
      front: false,
    },
  ]
})

const parts: IndexedPart[] = records
  .flatMap((country) => {
    const polygons = country.geometry.type === 'Polygon' ? [country.geometry.coordinates as number[][][]] : (country.geometry.coordinates as number[][][][])
    return polygons.map((rings) => ({
      bbox: bboxOf(rings[0]),
      rings,
      area: country.area,
      code: country.code,
      name: country.name,
    }))
  })
  .sort((a, b) => a.area - b.area)

export function countryAt(latitude: number, longitude: number): CountryHit | null {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90) return null
  const lng = wrapLongitude(longitude)
  for (const part of parts) {
    const [minLng, minLat, maxLng, maxLat] = part.bbox
    if (latitude < minLat || latitude > maxLat || lng < minLng || lng > maxLng) continue
    if (polygonContains(part.rings, lng, latitude)) return { code: part.code, name: part.name }
  }
  return null
}

function bboxOf(ring: number[][]): [number, number, number, number] {
  let minLng = 180
  let minLat = 90
  let maxLng = -180
  let maxLat = -90
  for (const [lng, lat] of ring) {
    minLng = Math.min(minLng, lng)
    maxLng = Math.max(maxLng, lng)
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
  }
  return [minLng, minLat, maxLng, maxLat]
}

function polygonContains(rings: number[][][], lng: number, lat: number): boolean {
  if (!ringContains(rings[0], lng, lat)) return false
  for (let hole = 1; hole < rings.length; hole += 1) {
    if (ringContains(rings[hole], lng, lat)) return false
  }
  return true
}

function ringContains(ring: number[][], lng: number, lat: number): boolean {
  let inside = false
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const yi = ring[index][1]
    const yj = ring[previous][1]
    let xi = ring[index][0]
    let xj = ring[previous][0]
    const span = xi - xj
    if (span > 180) xi -= 360
    else if (span < -180) xi += 360
    let x = lng
    while (x - xj > 180) x -= 360
    while (xj - x > 180) x += 360
    if (yi > lat === yj > lat) continue
    const xAtLat = ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (x < xAtLat) inside = !inside
  }
  return inside
}

function wrapLongitude(longitude: number): number {
  let lng = longitude
  while (lng > 180) lng -= 360
  while (lng < -180) lng += 360
  return lng
}
