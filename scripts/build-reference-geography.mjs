// Builds src/data/referenceGeography.json from Natural Earth v5.1.2.
// License: public domain. https://www.naturalearthdata.com/about/terms-of-use/
//
// Download these files into tmp/, then run:
// node scripts/build-reference-geography.mjs
//
// tmp/ne_50m_coastline.geojson
//   https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_50m_coastline.geojson
// tmp/ne_110m_rivers_lake_centerlines.geojson
//   https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_rivers_lake_centerlines.geojson
// tmp/ne_110m_populated_places_simple.geojson
//   https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_populated_places_simple.geojson
//
// Names are intentionally omitted. The globe draws unlabeled reference dots.

import fs from 'node:fs'

const tmp = new URL('../tmp/', import.meta.url)
const coast = JSON.parse(fs.readFileSync(new URL('ne_50m_coastline.geojson', tmp), 'utf8'))
const rivers = JSON.parse(fs.readFileSync(new URL('ne_110m_rivers_lake_centerlines.geojson', tmp), 'utf8'))
const places = JSON.parse(fs.readFileSync(new URL('ne_110m_populated_places_simple.geojson', tmp), 'utf8'))

function linesOf(geometry) {
  if (!geometry) return []
  if (geometry.type === 'LineString') return [geometry.coordinates]
  if (geometry.type === 'MultiLineString') return geometry.coordinates
  return []
}

function splitAntimeridian(line) {
  const parts = []
  let current = []
  for (const point of line) {
    const previous = current.at(-1)
    if (previous && Math.abs(point[0] - previous[0]) > 180) {
      if (current.length >= 2) parts.push(current)
      current = [point]
    } else {
      current.push(point)
    }
  }
  if (current.length >= 2) parts.push(current)
  return parts
}

function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const lengthSquared = dx * dx + dy * dy
  if (lengthSquared === 0) return Math.hypot(point[0] - start[0], point[1] - start[1])
  const ratio = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / lengthSquared))
  return Math.hypot(point[0] - (start[0] + ratio * dx), point[1] - (start[1] + ratio * dy))
}

function simplify(points, epsilon) {
  if (points.length < 3) return points
  let farthest = 0
  let index = 0
  const end = points.length - 1
  for (let cursor = 1; cursor < end; cursor += 1) {
    const distance = distanceToSegment(points[cursor], points[0], points[end])
    if (distance > farthest) {
      farthest = distance
      index = cursor
    }
  }
  if (farthest <= epsilon) return [points[0], points[end]]
  const left = simplify(points.slice(0, index + 1), epsilon)
  const right = simplify(points.slice(index), epsilon)
  return left.slice(0, -1).concat(right)
}

function compactLine(line, epsilon) {
  return splitAntimeridian(line).flatMap((part) => {
    const simplified = simplify(part, epsilon)
      .map(([lng, lat]) => [Math.round(lng * 100) / 100, Math.round(lat * 100) / 100])
      .filter((point, index, list) => {
        const previous = list[index - 1]
        return !previous || previous[0] !== point[0] || previous[1] !== point[1]
      })
    return simplified.length >= 2 ? [simplified] : []
  })
}

const coastLines = coast.features.flatMap((feature) => linesOf(feature.geometry).flatMap((line) => compactLine(line, 0.035)))
const riverLines = rivers.features.flatMap((feature) => linesOf(feature.geometry).flatMap((line) => compactLine(line, 0.08)))
const cities = places.features.flatMap((feature) => {
  const population = Number(feature.properties.pop_max) || 0
  const capital = feature.properties.adm0cap === 1 || feature.properties.worldcity === 1
  if (population < 200000 && !capital) return []
  const [lng, lat] = feature.geometry?.coordinates ?? [feature.properties.longitude, feature.properties.latitude]
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return []
  return [[Math.round(lat * 100) / 100, Math.round(lng * 100) / 100]]
})

const payload = {
  source: 'Natural Earth v5.1.2: 1:50m coastline, 1:110m rivers and lake centerlines, 1:110m populated places',
  license: 'public domain',
  licenseUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
  coast: coastLines,
  rivers: riverLines,
  cities,
}

const target = new URL('../src/data/referenceGeography.json', import.meta.url)
fs.writeFileSync(target, JSON.stringify(payload))
const bytes = fs.statSync(target).size
const coastPoints = coastLines.reduce((sum, line) => sum + line.length, 0)
const riverPoints = riverLines.reduce((sum, line) => sum + line.length, 0)
console.log(JSON.stringify({ bytes, coastLines: coastLines.length, coastPoints, riverLines: riverLines.length, riverPoints, cities: cities.length }))
