import type { Locale } from '../types/index.ts'

export function getLocalDateString(now = new Date(), timeZone = browserTimeZone()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const year = datePart(parts, 'year')
  const month = datePart(parts, 'month')
  const day = datePart(parts, 'day')
  return `${year}-${month}-${day}`
}

export function formatChallengeDate(isoDate: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
  if (!match) return isoDate
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function browserTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

function datePart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  const value = parts.find((part) => part.type === type)?.value
  if (!value) throw new Error(`Missing date part: ${type}`)
  return value
}
