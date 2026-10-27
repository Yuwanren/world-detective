import type { Locale } from '../types/index.ts'

export function buildChallengeLink(origin: string): string {
  return `${origin.replace(/\/+$/, '')}/`
}

export function buildShareText(input: {
  locale: Locale
  dateLabel: string
  total: number
  maxScore: number
  scores: readonly number[]
  link: string
  practice: boolean
}): string {
  const scoreLine = input.scores.join(' · ')
  const finishedFive = input.scores.length === 5
  if (input.locale === 'zh') {
    const closing = input.practice
      ? '这是加赛分数，不会替换今天的正式成绩。'
      : finishedFive
        ? '五个地点已经打完。你能超过这个分数吗？'
        : '这不是一套完成的五题成绩。'
    return [
      input.practice ? 'World Detective · 加赛' : 'World Detective · 每日挑战',
      input.dateLabel,
      `得分 ${input.total}/${input.maxScore}`,
      scoreLine,
      '',
      closing,
      input.link,
    ].join('\n')
  }

  const closing = input.practice
    ? 'Extra-round score. It does not replace today’s challenge.'
    : finishedFive
      ? 'Five places, finished. Can you beat this score?'
      : 'This is not a finished five-question score.'
  return [
    input.practice ? 'World Detective · Extra round' : 'World Detective · Daily challenge',
    input.dateLabel,
    `Score ${input.total}/${input.maxScore}`,
    scoreLine,
    '',
    closing,
    input.link,
  ].join('\n')
}

export async function deliverShareText(text: string): Promise<'shared' | 'manual' | 'cancelled'> {
  const share = navigator.share
  if (typeof share === 'function') {
    try {
      await share({ text })
      return 'shared'
    } catch (error) {
      if (isAbortError(error)) return 'cancelled'
    }
  }
  return (await copyText(text)) ? 'shared' : 'manual'
}

function isAbortError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError'
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard?.writeText) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
