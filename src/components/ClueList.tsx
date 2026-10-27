import { clueLabel, t } from '../i18n/index.ts'
import type { Locale, LocalizedText } from '../types/index.ts'

export function ClueList({
  clues,
  revealed,
  locale,
  onOpenNext,
  openLabel,
}: {
  clues: readonly LocalizedText[]
  revealed: number
  locale: Locale
  onOpenNext?: () => void
  openLabel?: string
}) {
  return (
    <ol className="flex flex-col gap-3" aria-live="polite">
      {clues.map((clue, index) => {
        const open = index < revealed
        const next = index === revealed
        if (open) {
          return (
            <li key={clue.en} className="clue-open rounded-lg border border-accent/40 bg-card px-4 py-4">
              <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">{clueLabel(locale, index + 1)}</p>
              <p className="mt-2 text-[15px] leading-6 text-ink">{clue[locale]}</p>
            </li>
          )
        }
        if (next && onOpenNext) {
          return (
            <li key={clue.en}>
              <button
                type="button"
                onClick={onOpenNext}
                className="w-full rounded-lg border border-dashed border-ice/50 bg-card/40 px-4 py-3 text-left transition-colors hover:border-accent"
              >
                <p className="text-xs font-medium tracking-[0.14em] text-ice uppercase">{clueLabel(locale, index + 1)}</p>
                <p className="mt-1 text-sm text-ink">{openLabel ?? t(locale, 'clueNext')}</p>
              </button>
            </li>
          )
        }
        return (
          <li key={clue.en} className="rounded-lg border border-line px-4 py-3">
            <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">{clueLabel(locale, index + 1)}</p>
            <p className="mt-1 text-sm text-muted">{t(locale, 'clueSealed')}</p>
          </li>
        )
      })}
    </ol>
  )
}
