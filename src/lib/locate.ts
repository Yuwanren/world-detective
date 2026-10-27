import type { PlaceFix } from '../data/locations.ts'
import { haversineKm, isValidGeoPoint, type GeoPoint } from './geo.ts'
import { scoreLocationGuess } from './locationScore.ts'
import { CLUE_COUNT } from './scoring.ts'

export type LocateStatus = 'aiming' | 'revealed'

export interface LocateState {
  cluesRevealed: number
  attemptUsed: boolean
  guess: GeoPoint | null
  status: LocateStatus
  score: number | null
  distanceKm: number | null
  borderHit: boolean | null
}

export type LocateAction =
  | { type: 'set-guess'; point: GeoPoint }
  | { type: 'clear-guess' }
  | { type: 'reveal-clue' }
  | { type: 'submit' }
  | { type: 'give-up' }

export function createLocateState(): LocateState {
  return {
    cluesRevealed: 1,
    attemptUsed: false,
    guess: null,
    status: 'aiming',
    score: null,
    distanceKm: null,
    borderHit: null,
  }
}

export function reduceLocate(state: LocateState, action: LocateAction, place: PlaceFix): LocateState {
  if (state.status === 'revealed') return state

  if (action.type === 'set-guess') {
    if (state.attemptUsed || !isValidGeoPoint(action.point)) return state
    return { ...state, guess: action.point }
  }

  if (action.type === 'clear-guess') {
    if (state.attemptUsed) return state
    return { ...state, guess: null }
  }

  if (action.type === 'reveal-clue') {
    if (state.cluesRevealed >= CLUE_COUNT) return state
    return {
      ...state,
      cluesRevealed: state.cluesRevealed + 1,
      attemptUsed: false,
      guess: state.attemptUsed ? null : state.guess,
    }
  }

  if (action.type === 'give-up') {
    if (state.cluesRevealed < CLUE_COUNT) return state
    return reveal(state, 0, state.guess ? haversineKm(state.guess, place) : null, null)
  }

  if (state.attemptUsed || !state.guess || !isValidGeoPoint(state.guess)) return state
  const scored = scoreLocationGuess(state.guess, place, state.cluesRevealed)
  if (!scored) return state
  if (scored.score > 0 || state.cluesRevealed >= CLUE_COUNT) return reveal(state, scored.score, scored.distanceKm, scored.borderHit)
  return { ...state, attemptUsed: true }
}

function reveal(state: LocateState, score: number, distanceKm: number | null, borderHit: boolean | null): LocateState {
  return {
    ...state,
    status: 'revealed',
    score,
    distanceKm,
    borderHit,
    attemptUsed: true,
  }
}
