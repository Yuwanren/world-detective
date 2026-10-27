import type { QuestionResult } from '../types/index.ts'

export const CLUE_SCORES = [100, 75, 50, 25] as const
export const CLUE_COUNT = CLUE_SCORES.length
export const MAX_DAILY_SCORE = CLUE_SCORES[0] * 5

export function scoreForSolvedClue(cluesRevealed: number): number {
  return CLUE_SCORES[cluesRevealed - 1] ?? 0
}

export function totalScore(results: readonly QuestionResult[]): number {
  return results.reduce((sum, result) => sum + result.score, 0)
}

export function solvedCount(results: readonly QuestionResult[]): number {
  return results.filter((result) => result.solved).length
}

export function totalCluesUsed(results: readonly QuestionResult[]): number {
  return results.reduce((sum, result) => sum + result.cluesUsed, 0)
}

export function accuracyLabel(solved: number, total: number): string {
  if (total <= 0) return '0/0'
  const percent = Math.round((solved / total) * 100)
  return `${solved}/${total} · ${percent}%`
}

export type RankId = 'master' | 'sharp' | 'explorer' | 'recruit' | 'open'

// Fixed thresholds, never random:
// 500 Master Detective, 375 Sharp Detective, 250 World Explorer, 100 Field Recruit, below that Case Open.
export function rankForScore(score: number): RankId {
  if (score >= 500) return 'master'
  if (score >= 375) return 'sharp'
  if (score >= 250) return 'explorer'
  if (score >= 100) return 'recruit'
  return 'open'
}
