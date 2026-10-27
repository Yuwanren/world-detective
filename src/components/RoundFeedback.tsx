import { Button } from './Button.tsx'
import { pointsLabel } from '../i18n/index.ts'
import type { Locale } from '../types/index.ts'

export function RoundFeedback({
  correct,
  title,
  answerLabel,
  answer,
  explanation,
  score,
  detail,
  nextLabel,
  locale,
  onNext,
}: {
  correct: boolean
  title: string
  answerLabel: string
  answer: string
  explanation: string
  score: number
  detail?: string | null
  nextLabel: string
  locale: Locale
  onNext: () => void
}) {
  return (
    <section
      className={`score-tick rounded-lg border px-5 py-5 ${correct ? 'border-accent/50 bg-correct-soft' : 'border-wrong/40 bg-wrong-soft'}`}
      aria-live="polite"
    >
      <p className={`text-xs font-semibold tracking-[0.16em] uppercase ${correct ? 'text-accent' : 'text-wrong'}`}>{title}</p>
      <p className="mt-4 text-xs tracking-[0.14em] text-muted uppercase">{answerLabel}</p>
      <h2 className="mt-1 font-serif text-4xl text-ink">{answer}</h2>
      {detail ? <p className="mt-3 text-sm text-ice">{detail}</p> : null}
      <p className="mt-3 text-sm leading-6 text-ink">{explanation}</p>
      <p className="mt-4 font-serif text-3xl text-accent tabular-nums">{pointsLabel(locale, score)}</p>
      <div className="mt-5">
        <Button onClick={onNext}>{nextLabel}</Button>
      </div>
    </section>
  )
}
