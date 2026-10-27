import { describe, expect, it } from 'vitest'
import { questions } from '../data/questions.ts'
import { createGameState, isGameState, isUsableSavedGame, reduceGame, resumeOrCreate } from '../lib/game.ts'
import { totalScore } from '../lib/scoring.ts'
import type { GameState } from '../types/index.ts'
import { ocean, pin } from './pins.ts'

const ids = ['japan', 'france', 'egypt', 'brazil', 'canada'] as const
const knownIds = new Set(questions.map((question) => question.id))

function start(date = '2026-10-22'): GameState {
  return createGameState({
    mode: 'daily',
    date,
    bankVersion: '1',
    questionIds: ids,
  })
}

function revealUntil(state: GameState, clues: number): GameState {
  let next = state
  while (next.cluesRevealed < clues) {
    next = reduceGame(next, { type: 'reveal-clue' }, questions)
  }
  return next
}

function submitPin(state: GameState, id: string): GameState {
  return reduceGame(reduceGame(state, { type: 'set-guess', point: pin(id) }, questions), { type: 'submit-pin' }, questions)
}

describe('game rules', () => {
  it('scores each clue tier and ignores a second submit', () => {
    let state = start()
    state = submitPin(state, 'japan')
    expect(state.results[0]).toMatchObject({ score: 100, solved: true, cluesUsed: 1, borderHit: true })
    expect(reduceGame(state, { type: 'submit-pin' }, questions)).toBe(state)

    state = reduceGame(state, { type: 'next' }, questions)
    state = revealUntil(state, 2)
    state = submitPin(state, 'france')
    expect(state.results[1]?.score).toBe(75)

    state = reduceGame(state, { type: 'next' }, questions)
    state = revealUntil(state, 3)
    state = submitPin(state, 'egypt')
    expect(state.results[2]?.score).toBe(50)

    state = reduceGame(state, { type: 'next' }, questions)
    state = revealUntil(state, 4)
    state = submitPin(state, 'brazil')
    expect(state.results[3]?.score).toBe(25)

    state = reduceGame(state, { type: 'next' }, questions)
    state = revealUntil(state, 4)
    state = reduceGame(reduceGame(state, { type: 'set-guess', point: ocean }, questions), { type: 'submit-pin' }, questions)
    expect(state.results[4]).toMatchObject({ score: 0, solved: false, cluesUsed: 4, borderHit: false })
    const duplicated = submitPin(state, 'canada')
    expect(duplicated).toBe(state)
    expect(duplicated.results).toHaveLength(5)
  })

  it('does not let a later correct guess replace a wrong one on the same clue', () => {
    let state = start()
    state = reduceGame(reduceGame(state, { type: 'set-guess', point: pin('france') }, questions), { type: 'submit-pin' }, questions)
    expect(state.attemptUsed).toBe(true)
    expect(state.results).toHaveLength(0)
    expect(state.guess).toEqual(pin('france'))
    expect(reduceGame(state, { type: 'set-guess', point: pin('japan') }, questions)).toBe(state)
    const empty = start()
    expect(reduceGame(empty, { type: 'submit-pin' }, questions)).toBe(empty)
    const opened = reduceGame(state, { type: 'reveal-clue' }, questions)
    expect(opened.cluesRevealed).toBe(2)
    expect(opened.attemptUsed).toBe(false)
    expect(opened.guess).toBeNull()
  })

  it('scores zero when the last clue is given up, once', () => {
    const early = start()
    expect(reduceGame(early, { type: 'give-up' }, questions)).toBe(early)
    let state = revealUntil(early, 4)
    state = reduceGame(state, { type: 'give-up' }, questions)
    expect(state.status).toBe('feedback')
    expect(state.results[0]?.score).toBe(0)
    expect(reduceGame(state, { type: 'give-up' }, questions)).toBe(state)
  })

  it('totals 500 after five first-clue solves and then stops scoring', () => {
    let state = start()
    for (const id of ids) {
      state = submitPin(state, id)
      state = reduceGame(state, { type: 'next' }, questions)
    }
    expect(state.status).toBe('complete')
    expect(state.results).toHaveLength(5)
    expect(totalScore(state.results)).toBe(500)
    expect(reduceGame(state, { type: 'submit-pin' }, questions)).toBe(state)
  })

  it('resumes a saved round and replaces one from another day', () => {
    const saved = submitPin(start(), 'japan')
    expect(isUsableSavedGame(saved, { mode: 'daily', date: saved.date, bankVersion: '1', knownIds })).toBe(true)
    expect(resumeOrCreate({
      mode: 'daily',
      date: saved.date,
      bankVersion: '1',
      questionIds: ['paris', 'kyoto', 'london', 'venice', 'petra'],
      saved,
      fresh: false,
      knownIds,
    })).toBe(saved)

    const nextDay = resumeOrCreate({
      mode: 'daily',
      date: '2026-10-23',
      bankVersion: '1',
      questionIds: ['paris', 'kyoto', 'london', 'venice', 'petra'],
      saved,
      fresh: false,
      knownIds,
    })
    expect(nextDay.date).toBe('2026-10-23')
    expect(nextDay.results).toHaveLength(0)
    expect(nextDay.questionIds).toEqual(['paris', 'kyoto', 'london', 'venice', 'petra'])
  })

  it('still accepts a finished round that was saved before pins existed', () => {
    const saved = start()
    const legacy = { ...saved, status: 'complete' as const, results: ids.map((questionId) => ({ questionId, score: 100, cluesUsed: 1, solved: true })) }
    delete (legacy as { guess?: unknown }).guess
    expect(isGameState(legacy)).toBe(true)
  })
})
