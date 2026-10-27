import { describe, expect, it } from 'vitest'
import { getGeoLink, getPlaceFix, pendingLocationIds, playableQuestionIds } from '../data/locations.ts'
import { questions } from '../data/questions.ts'
import { BANK_VERSION } from '../lib/constants.ts'
import { MIX_EPOCH, selectDailyQuestionIds, selectExtraQuestionIds } from '../lib/daily.ts'
import { formatChallengeDate, getLocalDateString } from '../lib/date.ts'
import { createGameState, resumeOrCreate } from '../lib/game.ts'

const sampleIds = ['japan', 'france', 'egypt', 'brazil', 'canada', 'kenya', 'norway']

describe('daily selection', () => {
  it('returns the same ordered set for the same date and bank version', () => {
    const first = selectDailyQuestionIds('2026-10-22', sampleIds, 5, '1')
    const second = selectDailyQuestionIds('2026-10-22', [...sampleIds].reverse(), 5, '1')
    expect(second).toEqual(first)
    expect(new Set(first).size).toBe(5)
    expect(first.every((id) => sampleIds.includes(id))).toBe(true)
  })

  it('changes the set when the date or bank version changes', () => {
    const today = selectDailyQuestionIds('2026-10-22', sampleIds, 5, '1')
    expect(selectDailyQuestionIds('2026-10-23', sampleIds, 5, '1')).not.toEqual(today)
    expect(selectDailyQuestionIds('2026-10-22', sampleIds, 5, '2')).not.toEqual(today)
  })

  it('selects a stable daily set from the real question bank', () => {
    const ids = playableQuestionIds(questions.map((question) => question.id))
    expect(ids).toHaveLength(questions.length - pendingLocationIds.length)
    expect(ids).not.toContain('great-wall')
    const first = selectDailyQuestionIds('2026-10-22', ids, 5, BANK_VERSION)
    const second = selectDailyQuestionIds('2026-10-22', [...ids].reverse(), 5, BANK_VERSION)
    expect(second).toEqual(first)
    expect(first).toHaveLength(5)
    expect(first.every((id) => ids.includes(id))).toBe(true)
    expect(selectDailyQuestionIds('2027-01-01', ids, 5, BANK_VERSION)).not.toEqual(first)
  })

  it('keeps five valid questions and avoids a country beside its own city or landmark', () => {
    const ids = playableQuestionIds(questions.map((question) => question.id))
    for (let day = 1; day <= 366; day += 1) {
      const date = utcDay(2026, day)
      const picked = selectDailyQuestionIds(date, ids, 5, BANK_VERSION)
      expect(picked, date).toHaveLength(5)
      expect(new Set(picked).size, date).toBe(5)
      expect(picked.every((id) => ids.includes(id)), date).toBe(true)
      expect(countryPlaceOverlap(picked), `${date} ${picked.join(',')}`).toBe(false)
      if (date >= MIX_EPOCH) expect(categoryCounts(picked), date).toEqual({ country: 2, city: 2, landmark: 1 })
      expect(selectDailyQuestionIds(date, [...ids].reverse(), 5, BANK_VERSION)).toEqual(picked)
    }
  })

  it('still separates different places in the same country', () => {
    const ids = ['venice', 'colosseum', 'japan', 'egypt', 'brazil']
    const picked = selectDailyQuestionIds('2026-04-04', ids, 5, BANK_VERSION)
    expect(new Set(picked)).toEqual(new Set(ids))
  })

  it('does not crash when geographic links are missing', () => {
    const ids = ['no-link-a', 'no-link-b', 'no-link-c', 'no-link-d', 'no-link-e', 'no-link-f']
    const first = selectDailyQuestionIds('2026-10-22', ids, 5, BANK_VERSION)
    const second = selectDailyQuestionIds('2026-10-22', [...ids].reverse(), 5, BANK_VERSION)
    expect(first).toEqual(second)
    expect(first).toHaveLength(5)
    expect(new Set(first).size).toBe(5)
    expect(ids.every((id) => getGeoLink(id) === undefined)).toBe(true)
  })

  it('falls back deterministically when the pool cannot fill five unrelated questions', () => {
    const ids = ['france', 'paris', 'eiffel-tower']
    const first = selectDailyQuestionIds('2026-10-22', ids, 5, BANK_VERSION)
    const second = selectDailyQuestionIds('2026-10-22', [...ids].reverse(), 5, BANK_VERSION)
    expect(first).toEqual(second)
    expect(first).toHaveLength(3)
    expect(new Set(first)).toEqual(new Set(ids))
  })

  it('keeps a saved official round even when a fresh draw would differ', () => {
    const ids = playableQuestionIds(questions.map((question) => question.id))
    const savedIds = ['france', 'paris', 'japan', 'egypt', 'brazil']
    const saved = createGameState({
      mode: 'daily',
      date: '2026-10-26',
      bankVersion: BANK_VERSION,
      questionIds: savedIds,
    })
    const resumed = resumeOrCreate({
      mode: 'daily',
      date: '2026-10-26',
      bankVersion: BANK_VERSION,
      questionIds: selectDailyQuestionIds('2026-10-26', ids, 5, BANK_VERSION),
      saved,
      fresh: false,
      knownIds: new Set(ids),
    })
    expect(resumed).toBe(saved)
    expect(resumed.questionIds).toEqual(savedIds)
  })

  it('draws a second set that skips the official five', () => {
    const ids = playableQuestionIds(questions.map((question) => question.id))
    const official = selectDailyQuestionIds('2026-10-28', ids, 5, BANK_VERSION)
    const extra = selectExtraQuestionIds('2026-10-28', ids, 5, BANK_VERSION)
    expect(categoryCounts(official)).toEqual({ country: 2, city: 2, landmark: 1 })
    expect(categoryCounts(extra)).toEqual({ country: 2, city: 2, landmark: 1 })
    expect(official).toHaveLength(5)
    expect(extra).toHaveLength(5)
    expect(extra.every((id) => !official.includes(id))).toBe(true)
    expect(new Set(extra).size).toBe(5)
    expect(countryPlaceOverlap(official)).toBe(false)
    expect(countryPlaceOverlap(extra)).toBe(false)
    expect(selectDailyQuestionIds('2026-10-29', ids, 5, BANK_VERSION)).not.toEqual(official)
    expect(selectExtraQuestionIds('2026-10-28', [...ids].reverse(), 5, BANK_VERSION)).toEqual(extra)
  })

  it('uses the calendar date where the page is opened', () => {
    const justAfterBeijingMidnight = new Date('2026-10-23T00:30:00+08:00')
    expect(getLocalDateString(justAfterBeijingMidnight, 'Asia/Shanghai')).toBe('2026-10-23')
    expect(getLocalDateString(justAfterBeijingMidnight, 'UTC')).toBe('2026-10-22')
    expect(getLocalDateString(new Date('2026-10-23T02:30:00Z'), 'America/New_York')).toBe('2026-10-22')
    expect(getLocalDateString(new Date('2026-10-23T02:30:00Z'), 'Asia/Shanghai')).toBe('2026-10-23')
    const now = new Date('2026-10-23T00:30:00Z')
    const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    expect(getLocalDateString(now)).toBe(getLocalDateString(now, browserZone))
    expect(formatChallengeDate('2026-10-22', 'en')).toContain('Thursday')
    expect(formatChallengeDate('2026-10-22', 'en')).toContain('October')
    expect(formatChallengeDate('2026-10-22', 'zh')).toContain('2026')
  })
})

function categoryCounts(ids: readonly string[]): Record<string, number> {
  const counts: Record<string, number> = { country: 0, city: 0, landmark: 0 }
  for (const id of ids) {
    const category = getPlaceFix(id)?.locationType
    if (category) counts[category] = (counts[category] ?? 0) + 1
  }
  return counts
}

function countryPlaceOverlap(ids: readonly string[]): boolean {
  const links = ids.map((id) => getGeoLink(id))
  for (let left = 0; left < links.length; left += 1) {
    for (let right = left + 1; right < links.length; right += 1) {
      const a = links[left]
      const b = links[right]
      if (!a || !b) continue
      if (a.placeId === b.placeId) return true
      if (a.countryCode === b.countryCode && (a.countryQuestion || b.countryQuestion)) return true
    }
  }
  return false
}

function utcDay(year: number, dayOfYear: number): string {
  const date = new Date(Date.UTC(year, 0, dayOfYear))
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${date.getUTCFullYear()}-${month}-${day}`
}
