// Builds src/data/countryBorders.json from Natural Earth.
// Source: ne_110m_admin_0_countries.geojson, v5.1.2
// https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_admin_0_countries.geojson
// License: public domain. https://www.naturalearthdata.com/about/terms-of-use/
//
// Download the GeoJSON to tmp/ne_110m_admin_0_countries.geojson, then run:
// node scripts/build-country-borders.mjs

import fs from 'node:fs'

const raw = JSON.parse(fs.readFileSync(new URL('../tmp/ne_110m_admin_0_countries.geojson', import.meta.url), 'utf8'))

function isoCode(properties) {
  if (/^[A-Z]{3}$/.test(properties.ISO_A3)) return properties.ISO_A3
  if (/^[A-Z]{3}$/.test(properties.ISO_A3_EH)) return properties.ISO_A3_EH
  return null
}

function roundRing(ring) {
  const points = []
  for (const [lng, lat] of ring) {
    const point = [Math.round(lng * 100) / 100, Math.round(lat * 100) / 100]
    const previous = points.at(-1)
    if (previous && previous[0] === point[0] && previous[1] === point[1]) continue
    points.push(point)
  }
  const first = points[0]
  const last = points.at(-1)
  if (first && last && (first[0] !== last[0] || first[1] !== last[1])) points.push([first[0], first[1]])
  return points.length >= 4 ? points : null
}

function ringWeight(ring) {
  let sum = 0
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index]
    const [x2, y2] = ring[index + 1]
    sum += (x2 - x1) * (y1 + y2)
  }
  const latitude = ring.reduce((total, point) => total + point[1], 0) / ring.length
  return Math.abs(sum) * Math.max(0.2, Math.cos((latitude * Math.PI) / 180))
}

const countries = []
for (const feature of raw.features) {
  const properties = feature.properties
  const code = isoCode(properties)
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates
  const coordinates = []
  let area = 0
  for (const polygon of polygons) {
    const rings = []
    polygon.forEach((ring, ringIndex) => {
      const rounded = roundRing(ring)
      if (!rounded) return
      rings.push(rounded)
      const weight = ringWeight(rounded)
      area += ringIndex === 0 ? weight : -weight
    })
    if (rings.length > 0) coordinates.push(rings)
  }
  if (coordinates.length === 0) continue
  const labelX = Number(properties.LABEL_X)
  const labelY = Number(properties.LABEL_Y)
  const label = code && Number.isFinite(labelX) && Number.isFinite(labelY) ? [Math.round(labelX * 1000) / 1000, Math.round(labelY * 1000) / 1000] : null
  countries.push({
    code,
    name: properties.NAME,
    rank: Number(properties.LABELRANK) || 6,
    area: Math.round(Math.max(area, 0) * 100) / 100,
    label,
    geometry: coordinates.length === 1 ? { type: 'Polygon', coordinates: coordinates[0] } : { type: 'MultiPolygon', coordinates },
  })
}

countries.sort((a, b) => a.area - b.area)
const payload = {
  source: 'Natural Earth 1:110m Cultural Vectors, Admin 0 - Countries, v5.1.2',
  license: 'public domain',
  licenseUrl: 'https://www.naturalearthdata.com/about/terms-of-use/',
  countries,
}
const json = JSON.stringify(payload)
fs.writeFileSync(new URL('../src/data/countryBorders.json', import.meta.url), json)
const labeled = countries.filter((country) => country.code && country.label).length
console.log(`countries ${countries.length}, labeled ${labeled}, bytes ${json.length}`)
