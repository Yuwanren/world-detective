import { describe, expect, it } from 'vitest'
import { accuracyLabel, CLUE_SCORES, MAX_DAILY_SCORE, rankForScore, scoreForSolvedClue, totalScore } from '../lib/scoring.ts'

describe('scoring', () => {
  it('awards 100, 75, 50, 25, then 0', () => {
    expect(scoreForSolvedClue(1)).toBe(100)
    expect(scoreForSolvedClue(2)).toBe(75)
    expect(scoreForSolvedClue(3)).toBe(50)
    expect(scoreForSolvedClue(4)).toBe(25)
    expect(CLUE_SCORES).toEqual([100, 75, 50, 25])
    expect(MAX_DAILY_SCORE).toBe(500)
  })

  it('sums a finished day without exceeding 500', () => {
    expect(totalScore([
      { questionId: 'a', score: 100, cluesUsed: 1, solved: true },
      { questionId: 'b', score: 75, cluesUsed: 2, solved: true },
      { questionId: 'c', score: 50, cluesUsed: 3, solved: true },
      { questionId: 'd', score: 25, cluesUsed: 4, solved: true },
      { questionId: 'e', score: 0, cluesUsed: 4, solved: false },
    ])).toBe(250)
    expect(totalScore(Array.from({ length: 5 }, (_, index) => ({
      questionId: String(index),
      score: 100,
      cluesUsed: 1,
      solved: true,
    })))).toBe(500)
    expect(accuracyLabel(3, 5)).toBe('3/5 · 60%')
  })

  it('assigns a fixed rank from the score', () => {
    expect(rankForScore(500)).toBe('master')
    expect(rankForScore(499)).toBe('sharp')
    expect(rankForScore(375)).toBe('sharp')
    expect(rankForScore(374)).toBe('explorer')
    expect(rankForScore(250)).toBe('explorer')
    expect(rankForScore(249)).toBe('recruit')
    expect(rankForScore(100)).toBe('recruit')
    expect(rankForScore(99)).toBe('open')
    expect(rankForScore(0)).toBe('open')
  })
})
