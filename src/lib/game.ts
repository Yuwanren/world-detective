import { getPlaceFix } from '../data/locations.ts'
import { DAILY_QUESTION_COUNT } from './constants.ts'
import { isValidGeoPoint, type GeoPoint } from './geo.ts'
import { scoreLocationGuess, type LocationScore } from './locationScore.ts'
import { CLUE_COUNT } from './scoring.ts'
import type { DailyProgress, GameAction, GameMode, GameState, Question, QuestionResult } from '../types/index.ts'

export function createGameState(input: {
  mode: GameMode
  date: string
  bankVersion: string
  questionIds: readonly string[]
}): GameState {
  return {
    mode: input.mode,
    date: input.date,
    bankVersion: input.bankVersion,
    questionIds: [...input.questionIds],
    currentIndex: 0,
    cluesRevealed: 1,
    status: 'guessing',
    attemptUsed: false,
    lastAnswerCorrect: null,
    guess: null,
    results: [],
  }
}

export function isGameState(value: unknown): value is GameState {
  if (!value || typeof value !== 'object') return false
  const state = value as Partial<GameState>
  if (state.mode !== 'daily' && state.mode !== 'practice') return false
  if (typeof state.date !== 'string' || typeof state.bankVersion !== 'string') return false
  const cluesRevealed = state.cluesRevealed
  const currentIndex = state.currentIndex
  if (!Array.isArray(state.questionIds) || state.questionIds.some((id) => typeof id !== 'string')) return false
  if (typeof cluesRevealed !== 'number' || typeof currentIndex !== 'number') return false
  if (!Number.isInteger(cluesRevealed) || !Number.isInteger(currentIndex)) return false
  if (cluesRevealed < 1 || cluesRevealed > CLUE_COUNT) return false
  if (state.status !== 'guessing' && state.status !== 'feedback' && state.status !== 'complete') return false
  if (typeof state.attemptUsed !== 'boolean') return false
  if (state.lastAnswerCorrect !== null && typeof state.lastAnswerCorrect !== 'boolean') return false
  if (state.guess != null && !isGeoPoint(state.guess)) return false
  if (!Array.isArray(state.results) || state.results.some((result) => !isQuestionResult(result))) return false
  return true
}

function isGeoPoint(value: unknown): value is GeoPoint {
  if (!value || typeof value !== 'object') return false
  const point = value as Partial<GeoPoint>
  return typeof point.latitude === 'number' && typeof point.longitude === 'number' && isValidGeoPoint({ latitude: point.latitude, longitude: point.longitude })
}

function isQuestionResult(value: unknown): value is QuestionResult {
  if (!value || typeof value !== 'object') return false
  const result = value as Partial<QuestionResult>
  return (
    typeof result.questionId === 'string' &&
    typeof result.score === 'number' &&
    typeof result.cluesUsed === 'number' &&
    typeof result.solved === 'boolean' &&
    (result.distanceKm == null || (typeof result.distanceKm === 'number' && Number.isFinite(result.distanceKm))) &&
    (result.borderHit == null || typeof result.borderHit === 'boolean')
  )
}

export function isUsableSavedGame(
  saved: GameState | null,
  options: {
    mode: GameMode
    date: string
    bankVersion: string
    knownIds: ReadonlySet<string>
  },
): saved is GameState {
  if (!saved) return false
  if (saved.mode !== options.mode || saved.date !== options.date || saved.bankVersion !== options.bankVersion) {
    return false
  }
  if (saved.questionIds.length !== DAILY_QUESTION_COUNT) return false
  if (!saved.questionIds.every((id) => options.knownIds.has(id))) return false
  if (saved.currentIndex < 0 || saved.currentIndex >= saved.questionIds.length) return false
  return resultsMatchProgress(saved)
}

function resultsMatchProgress(state: GameState): boolean {
  const expectedCount =
    state.status === 'guessing'
      ? state.currentIndex
      : state.status === 'feedback'
        ? state.currentIndex + 1
        : state.questionIds.length
  if (state.results.length !== expectedCount) return false
  return state.results.every((result, index) => result.questionId === state.questionIds[index])
}

export function resumeOrCreate(input: {
  mode: GameMode
  date: string
  bankVersion: string
  questionIds: readonly string[]
  saved: GameState | null
  fresh: boolean
  knownIds: ReadonlySet<string>
}): GameState {
  if (!input.fresh && isUsableSavedGame(input.saved, input)) return input.saved
  return createGameState({
    mode: input.mode,
    date: input.date,
    bankVersion: input.bankVersion,
    questionIds: input.questionIds,
  })
}

export function summarizeProgress(state: GameState | null): DailyProgress {
  if (!state) {
    return { solved: 0, total: DAILY_QUESTION_COUNT, phase: 'new' }
  }
  if (state.status === 'complete') {
    return { solved: state.results.length, total: state.questionIds.length, phase: 'complete' }
  }
  return { solved: state.results.length, total: state.questionIds.length, phase: 'active' }
}

export function reduceGame(state: GameState, action: GameAction, bank: readonly Question[]): GameState {
  if (state.status === 'complete') return state

  switch (action.type) {
    case 'reveal-clue':
      if (state.status !== 'guessing' || state.cluesRevealed >= CLUE_COUNT) return state
      return {
        ...state,
        cluesRevealed: state.cluesRevealed + 1,
        attemptUsed: false,
        lastAnswerCorrect: null,
        guess: state.attemptUsed ? null : (state.guess ?? null),
      }
    case 'set-guess':
      if (state.status !== 'guessing' || state.attemptUsed || !isValidGeoPoint(action.point)) return state
      return { ...state, guess: action.point }
    case 'clear-guess':
      if (state.status !== 'guessing' || state.attemptUsed) return state
      return { ...state, guess: null }
    case 'give-up':
      return giveUp(state)
    case 'next':
      return advance(state)
    case 'submit-pin':
      return submitPin(state, bank)
    default:
      return state
  }
}

function giveUp(state: GameState): GameState {
  if (state.status !== 'guessing' || state.cluesRevealed < CLUE_COUNT) return state
  const questionId = state.questionIds[state.currentIndex]
  if (!questionId || alreadyRecorded(state, questionId)) return state
  return recordMiss(state, questionId)
}

function advance(state: GameState): GameState {
  if (state.status !== 'feedback') return state
  if (state.currentIndex >= state.questionIds.length - 1) {
    return { ...state, status: 'complete' }
  }
  return {
    ...state,
    currentIndex: state.currentIndex + 1,
    cluesRevealed: 1,
    status: 'guessing',
    attemptUsed: false,
    lastAnswerCorrect: null,
    guess: null,
  }
}

function submitPin(state: GameState, bank: readonly Question[]): GameState {
  if (state.status !== 'guessing' || state.attemptUsed || !state.guess || !isValidGeoPoint(state.guess)) return state
  const questionId = state.questionIds[state.currentIndex]
  const question = bank.find((entry) => entry.id === questionId)
  const place = questionId ? getPlaceFix(questionId) : undefined
  if (!questionId || !question || !place || alreadyRecorded(state, questionId)) return state
  const scored = scoreLocationGuess(state.guess, place, state.cluesRevealed)
  if (!scored) return state
  if (scored.score > 0 || state.cluesRevealed >= CLUE_COUNT) return recordScore(state, questionId, scored)
  return {
    ...state,
    attemptUsed: true,
    lastAnswerCorrect: false,
  }
}

function alreadyRecorded(state: GameState, questionId: string): boolean {
  return state.results.some((result) => result.questionId === questionId)
}

function recordScore(state: GameState, questionId: string, scored: LocationScore): GameState {
  return {
    ...state,
    status: 'feedback',
    attemptUsed: true,
    lastAnswerCorrect: scored.score > 0,
    results: [
      ...state.results,
      {
        questionId,
        score: scored.score,
        cluesUsed: state.cluesRevealed,
        solved: scored.score > 0,
        distanceKm: scored.distanceKm,
        borderHit: scored.borderHit,
      },
    ],
  }
}

function recordMiss(state: GameState, questionId: string): GameState {
  return {
    ...state,
    status: 'feedback',
    attemptUsed: true,
    lastAnswerCorrect: false,
    results: [
      ...state.results,
      {
        questionId,
        score: 0,
        cluesUsed: state.cluesRevealed,
        solved: false,
        distanceKm: null,
        borderHit: null,
      },
    ],
  }
}
