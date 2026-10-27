import type { Locale, Question } from '../types/index.ts'

export function normalizeAnswer(raw: string): string {
  const cleaned = raw
    .normalize('NFKC')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned.replace(/^the\s+/, '')
}

export function matchesAnswer(question: Question, input: string): boolean {
  const normalized = normalizeAnswer(input)
  if (!normalized) return false
  const aliases = [...question.answers.en, ...question.answers.zh]
  return aliases.some((alias) => normalizeAnswer(alias) === normalized)
}

export function displayAnswer(question: Question, locale: Locale): string {
  return question.answers[locale][0] ?? question.answers.en[0] ?? question.id
}
