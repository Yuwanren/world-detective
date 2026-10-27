import { getGeoLink, type GeoLink } from '../data/locations.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from './constants.ts'

// Daily puzzles are a deterministic shuffle, not Math.random().
// Seed = FNV-1a(`${bankVersion}|${utcDate}|world-detective`), then mulberry32 + Fisher-Yates.
// The shuffled order is the priority list. A question is skipped when it shares a place,
// or when a country question is paired with a city or landmark in that country.
// If that filter cannot fill the day, same-country pairs are allowed, then the raw shuffle.
// The same date and bank version always produce the same ordered set.

export function fnv1a(text: string): number {
  let hash = 0x811c9dc5
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let next = Math.imul(state ^ (state >>> 15), 1 | state)
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

export function selectDailyQuestionIds(
  date: string,
  ids: readonly string[],
  count = DAILY_QUESTION_COUNT,
  version = BANK_VERSION,
): string[] {
  const pool = [...new Set(ids)].sort()
  const random = mulberry32(fnv1a(`${version}|${date}|world-detective`))
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = pool[index]
    const swapped = pool[swapIndex]
    if (current === undefined || swapped === undefined) continue
    pool[index] = swapped
    pool[swapIndex] = current
  }
  const size = Math.max(0, Math.min(count, pool.length))
  const strict = takeCompatible(pool, size, 'full')
  if (strict.length >= size) return strict
  const sameCountryAllowed = takeCompatible(pool, size, 'place')
  if (sameCountryAllowed.length >= size) return sameCountryAllowed
  return pool.slice(0, size)
}

function takeCompatible(order: readonly string[], count: number, mode: 'full' | 'place'): string[] {
  const chosen: string[] = []
  const links: GeoLink[] = []
  for (const id of order) {
    if (chosen.length >= count) break
    const link = getGeoLink(id)
    if (link && links.some((existing) => geoConflict(existing, link, mode))) continue
    chosen.push(id)
    if (link) links.push(link)
  }
  return chosen
}

function geoConflict(left: GeoLink, right: GeoLink, mode: 'full' | 'place'): boolean {
  if (left.placeId === right.placeId) return true
  if (mode === 'place') return false
  return left.countryCode === right.countryCode && (left.countryQuestion || right.countryQuestion)
}
