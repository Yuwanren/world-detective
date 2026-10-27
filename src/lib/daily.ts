import { getGeoLink, getPlaceFix, type GeoLink } from '../data/locations.ts'
import type { Category } from '../types/index.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from './constants.ts'

// Daily puzzles are a deterministic shuffle, not Math.random().
// Seed = FNV-1a(`${bankVersion}|${date}|world-detective`), then mulberry32 + Fisher-Yates.
// From MIX_EPOCH, each set is 2 countries, 2 cities, and 1 landmark.
// A question is skipped when it shares a place, or when a country question is paired
// with a city or landmark in that country.
// If that filter cannot fill the day, same-country pairs are allowed, then the raw shuffle.
// The same date and bank version always produce the same ordered set.
// 2026-10-28 is day 1 of this mix. Earlier dates keep the previous draw.

export const MIX_EPOCH = '2026-10-28'

const DAILY_MIX: Record<Category, number> = {
  country: 2,
  city: 2,
  landmark: 1,
}

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
  const order = shuffledIds(date, ids, version)
  if (!usesDailyMix(date, count)) return takeDailySet(order, count)
  return takeMixedOrDaily(order, count)
}

export function selectExtraQuestionIds(
  date: string,
  ids: readonly string[],
  count = DAILY_QUESTION_COUNT,
  version = BANK_VERSION,
): string[] {
  const order = shuffledIds(date, ids, version)
  if (!usesDailyMix(date, count)) {
    const used = new Set(takeDailySet(order, count))
    return takeDailySet(
      order.filter((id) => !used.has(id)),
      count,
    )
  }
  const official = new Set(takeMixedOrDaily(order, count))
  return takeMixedOrDaily(
    order.filter((id) => !official.has(id)),
    count,
  )
}

function usesDailyMix(date: string, count: number): boolean {
  return date >= MIX_EPOCH && count === DAILY_QUESTION_COUNT
}

function takeMixedOrDaily(order: readonly string[], count: number): string[] {
  return takeMixed(order, 'full') ?? takeMixed(order, 'place') ?? takeDailySet(order, count)
}

function takeMixed(order: readonly string[], mode: 'full' | 'place'): string[] | null {
  const items = order.flatMap((id) => {
    const category = getPlaceFix(id)?.locationType
    if (!category) return []
    const link = getGeoLink(id)
    return [{ id, category, link }]
  })
  const need: Record<Category, number> = { ...DAILY_MIX }
  const chosen: { id: string; link: GeoLink | undefined }[] = []
  if (!searchMixed(items, need, chosen, 0, mode)) return null
  return chosen.map((item) => item.id)
}

function searchMixed(
  items: readonly { id: string; category: Category; link: GeoLink | undefined }[],
  need: Record<Category, number>,
  chosen: { id: string; link: GeoLink | undefined }[],
  start: number,
  mode: 'full' | 'place',
): boolean {
  if (need.country + need.city + need.landmark === 0) return true
  for (let index = start; index < items.length; index += 1) {
    const item = items[index]
    if (!item || need[item.category] === 0) continue
    const link = item.link
    if (link && chosen.some((existing) => existing.link && geoConflict(existing.link, link, mode))) continue
    need[item.category] -= 1
    chosen.push(item)
    if (searchMixed(items, need, chosen, index + 1, mode)) return true
    chosen.pop()
    need[item.category] += 1
  }
  return false
}

function shuffledIds(date: string, ids: readonly string[], version: string): string[] {
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
  return pool
}

function takeDailySet(order: readonly string[], count: number): string[] {
  const size = Math.max(0, Math.min(count, order.length))
  const strict = takeCompatible(order, size, 'full')
  if (strict.length >= size) return strict
  const sameCountryAllowed = takeCompatible(order, size, 'place')
  if (sameCountryAllowed.length >= size) return sameCountryAllowed
  return order.slice(0, size)
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
