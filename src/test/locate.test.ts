import { describe, expect, it } from 'vitest'
import { pendingLocationIds, placeFixes } from '../data/locations.ts'
import { questions } from '../data/questions.ts'
import { countryAt } from '../data/countries.ts'
import { haversineKm, isValidGeoPoint, scoreForDistance } from '../lib/geo.ts'
import { createLocateState, reduceLocate } from '../lib/locate.ts'
import { scoreLocationGuess } from '../lib/locationScore.ts'
import { ocean, pin } from './pins.ts'

describe('place fixes', () => {
  it('covers every puzzle with a checked point or an explicit pending id', () => {
    const pending = new Set<string>(pendingLocationIds)
    expect(pending).toEqual(new Set(['great-wall']))
    for (const question of questions) {
      const fix = placeFixes[question.id]
      if (!fix) {
        expect(pending.has(question.id)).toBe(true)
        continue
      }
      expect(pending.has(question.id)).toBe(false)
      expect(fix.locationType).toBe(question.category)
      expect(isValidGeoPoint(fix)).toBe(true)
      expect(fix.placement).toBe(question.category === 'country' ? 'country-border' : 'verified-point')
      if (question.category === 'country') expect(fix.isoA3).toMatch(/^[A-Z]{3}$/)
    }
  })
})

describe('distance scoring', () => {
  it('measures a known city pair and scores inside the clue cap', () => {
    const paris = placeFixes.paris
    const london = placeFixes.london
    expect(paris && london).toBeTruthy()
    if (!paris || !london) return
    const distance = haversineKm(paris, london)
    expect(distance).toBeGreaterThan(330)
    expect(distance).toBeLessThan(360)
    expect(haversineKm(paris, paris)).toBe(0)
    expect(scoreForDistance(0, 1, 'verified-point')).toBe(100)
    expect(scoreForDistance(25, 1, 'verified-point')).toBe(100)
    expect(scoreForDistance(25.01, 1, 'verified-point')).toBe(80)
    expect(scoreForDistance(100, 1, 'verified-point')).toBe(80)
    expect(scoreForDistance(300, 1, 'verified-point')).toBe(60)
    expect(scoreForDistance(800, 1, 'verified-point')).toBe(40)
    expect(scoreForDistance(2000, 1, 'verified-point')).toBe(20)
    expect(scoreForDistance(2000.01, 1, 'verified-point')).toBe(0)
    expect(scoreForDistance(0, 2, 'verified-point')).toBe(75)
    expect(scoreForDistance(0, 4, 'verified-point')).toBe(25)
    expect(scoreForDistance(distance, 1, 'verified-point')).toBe(40)
  })

  it('uses wider representative-point bands for countries and rejects bad input', () => {
    expect(scoreForDistance(400, 1, 'country-representative')).toBe(100)
    expect(scoreForDistance(400.01, 1, 'country-representative')).toBe(75)
    expect(scoreForDistance(900, 1, 'country-representative')).toBe(75)
    expect(scoreForDistance(1800, 1, 'country-representative')).toBe(50)
    expect(scoreForDistance(3500, 1, 'country-representative')).toBe(25)
    expect(scoreForDistance(3500.01, 1, 'country-representative')).toBe(0)
    expect(scoreForDistance(Number.NaN, 1, 'verified-point')).toBeNull()
    expect(isValidGeoPoint({ latitude: 91, longitude: 0 })).toBe(false)
  })
})

describe('border scoring', () => {
  it('scores a country only inside its border and keeps city distance bands', () => {
    const japan = placeFixes.japan
    const paris = placeFixes.paris
    expect(japan && paris).toBeTruthy()
    if (!japan || !paris) return
    expect(scoreLocationGuess(pin('japan'), japan, 1)).toMatchObject({ score: 100, borderHit: true })
    expect(scoreLocationGuess(pin('france'), japan, 1)).toMatchObject({ score: 0, borderHit: false })
    expect(scoreLocationGuess(ocean, japan, 2)).toMatchObject({ score: 0, borderHit: false })
    expect(scoreLocationGuess(pin('paris'), paris, 1)?.score).toBe(100)
    expect(scoreLocationGuess(pin('london'), paris, 1)).toMatchObject({ score: 40, borderHit: null })
    for (const place of Object.values(placeFixes)) {
      if (place.placement !== 'country-border') continue
      expect(countryAt(place.latitude, place.longitude)?.code).toBe(place.isoA3)
    }
  })
})

describe('locate round', () => {
  const paris = placeFixes.paris
  if (!paris) throw new Error('missing paris fix')

  it('scores once, hides a miss until the last clue, and ignores a second submit', () => {
    let state = createLocateState()
    state = reduceLocate(state, { type: 'set-guess', point: { latitude: 48.86, longitude: 2.35 } }, paris)
    state = reduceLocate(state, { type: 'submit' }, paris)
    expect(state.status).toBe('revealed')
    expect(state.score).toBe(100)
    const again = reduceLocate(state, { type: 'submit' }, paris)
    expect(again).toBe(state)

    let miss = createLocateState()
    miss = reduceLocate(miss, { type: 'set-guess', point: { latitude: 35.0116, longitude: 135.7681 } }, paris)
    miss = reduceLocate(miss, { type: 'submit' }, paris)
    expect(miss.status).toBe('aiming')
    expect(miss.score).toBeNull()
    expect(miss.attemptUsed).toBe(true)
    expect(reduceLocate(miss, { type: 'set-guess', point: paris }, paris)).toBe(miss)

    miss = reduceLocate(miss, { type: 'reveal-clue' }, paris)
    expect(miss.cluesRevealed).toBe(2)
    expect(miss.attemptUsed).toBe(false)
    expect(miss.guess).toBeNull()
    miss = reduceLocate(miss, { type: 'set-guess', point: paris }, paris)
    miss = reduceLocate(miss, { type: 'submit' }, paris)
    expect(miss.status).toBe('revealed')
    expect(miss.score).toBe(75)
  })

  it('reveals a last-clue miss and a give-up without adding a second score', () => {
    let state = createLocateState()
    state = { ...state, cluesRevealed: 4 }
    state = reduceLocate(state, { type: 'set-guess', point: { latitude: 0, longitude: 0 } }, paris)
    state = reduceLocate(state, { type: 'submit' }, paris)
    expect(state.status).toBe('revealed')
    expect(state.score).toBe(0)
    expect(state.distanceKm).toBeGreaterThan(2000)

    let giveUp = createLocateState()
    expect(reduceLocate(giveUp, { type: 'give-up' }, paris)).toBe(giveUp)
    giveUp = { ...giveUp, cluesRevealed: 4 }
    giveUp = reduceLocate(giveUp, { type: 'give-up' }, paris)
    expect(giveUp.status).toBe('revealed')
    expect(giveUp.score).toBe(0)
  })
})
