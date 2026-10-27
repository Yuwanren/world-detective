import { useState } from 'react'
import { Link } from 'react-router'
import { Button, secondaryActionClass } from './Button.tsx'
import { downloadScoreCard } from '../lib/scoreCard.ts'
import { buildChallengeLink, buildShareText, copyText, deliverShareText } from '../lib/share.ts'
import { isExtraUnlocked, loadPractice, unlockExtra } from '../lib/storage.ts'
import { accuracyLabel, MAX_DAILY_SCORE, rankForScore, solvedCount, totalCluesUsed, totalScore } from '../lib/scoring.ts'
import { rankTitle, scoreOutOf, t } from '../i18n/index.ts'
import { displayAnswer } from '../lib/answers.ts'
import { getQuestion } from '../data/questions.ts'
import { formatChallengeDate } from '../lib/date.ts'
import type { GameState, Locale } from '../types/index.ts'

export function CompletionSummary({ state, locale }: { state: GameState; locale: Locale }) {
  const total = totalScore(state.results)
  const solved = solvedCount(state.results)
  const clues = totalCluesUsed(state.results)
  const rank = rankForScore(total)
  const dateLabel = formatChallengeDate(state.date, locale)
  const link = buildChallengeLink(window.location.origin)
  const shareText = buildShareText({
    locale,
    dateLabel,
    total,
    maxScore: MAX_DAILY_SCORE,
    scores: state.results.map((result) => result.score),
    link,
    practice: state.mode === 'practice',
  })
  const shareReady = state.results.length === state.questionIds.length && state.questionIds.length === 5
  const savedExtra = state.mode === 'daily' ? loadPractice() : null
  const extraForToday = savedExtra?.date === state.date && savedExtra.bankVersion === state.bankVersion ? savedExtra : null
  const extraInProgress = extraForToday !== null && extraForToday.status !== 'complete'
  const [copied, setCopied] = useState<'share' | 'link' | null>(null)
  const [manualCopy, setManualCopy] = useState<string | null>(null)
  const [cardFailed, setCardFailed] = useState(false)
  const [unlocked, setUnlocked] = useState(() => state.mode === 'daily' && isExtraUnlocked(state.date, state.bankVersion))

  function grantExtra() {
    unlockExtra(state.date, state.bankVersion)
    setUnlocked(true)
    setManualCopy(null)
    setCopied('share')
  }

  async function copy(kind: 'share' | 'link', text: string) {
    if (kind === 'share' && state.mode === 'daily') {
      const result = await deliverShareText(text)
      if (result === 'cancelled') return
      if (result === 'shared') {
        grantExtra()
        return
      }
      setCopied(null)
      setManualCopy(text)
      return
    }
    const ok = await copyText(text)
    if (ok) {
      setCopied(kind)
      setManualCopy(null)
      return
    }
    setCopied(null)
    setManualCopy(text)
  }

  return (
    <div className="flex flex-col gap-6">
      {state.mode === 'practice' ? (
        <p className="rounded-lg border border-line bg-card px-4 py-3 text-sm leading-6 text-muted">{t(locale, 'practiceBanner')}</p>
      ) : null}
      <div>
        <p className="text-xs tracking-[0.16em] text-accent uppercase">
          {state.mode === 'practice' ? t(locale, 'practiceBadge') : t(locale, 'dailyBadge')}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink">{state.mode === 'practice' ? t(locale, 'practiceComplete') : t(locale, 'dailyComplete')}</h1>
      </div>

      <article id="result-card" className="rounded-lg border border-accent/40 bg-card px-6 py-7">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">
            {t(locale, 'brand')} · {state.mode === 'practice' ? t(locale, 'practiceBadge') : t(locale, 'dailyBadge')}
          </p>
          <p className="text-right text-xs leading-5 text-muted">{dateLabel}</p>
        </div>
        <p className="mt-8 flex items-baseline gap-3">
          <span className="font-serif text-7xl leading-none text-ink tabular-nums">{total}</span>
          <span className="font-serif text-3xl text-muted tabular-nums">/ {MAX_DAILY_SCORE}</span>
        </p>
        <p className="mt-2 text-sm text-muted">{scoreOutOf(locale, MAX_DAILY_SCORE)}</p>
        <p className="mt-6 text-xs tracking-[0.16em] text-muted uppercase">{t(locale, 'rankLabel')}</p>
        <p className="mt-1 font-serif text-3xl text-accent">{rankTitle(locale, rank)}</p>
        <ol className="mt-8 grid grid-cols-5 gap-2">
          {state.results.map((result, index) => (
            <li key={result.questionId} className="rounded-md border border-line bg-[#0e1724] px-1 py-3 text-center">
              <p className="text-[11px] text-muted">{index + 1}</p>
              <p className="mt-1 font-serif text-lg text-accent tabular-nums">{result.score}</p>
            </li>
          ))}
        </ol>
      </article>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-line bg-card px-4 py-4">
          <dt className="text-xs tracking-[0.14em] text-muted uppercase">{t(locale, 'accuracy')}</dt>
          <dd className="mt-2 font-serif text-2xl tabular-nums">{accuracyLabel(solved, state.results.length)}</dd>
        </div>
        <div className="rounded-lg border border-line bg-card px-4 py-4">
          <dt className="text-xs tracking-[0.14em] text-muted uppercase">{t(locale, 'cluesUsed')}</dt>
          <dd className="mt-2 font-serif text-2xl tabular-nums">{clues}</dd>
        </div>
      </dl>

      <section>
        <h2 className="font-serif text-2xl">{t(locale, 'breakdown')}</h2>
        <ol className="mt-3 flex flex-col gap-2">
          {state.results.map((result, index) => {
            const question = getQuestion(result.questionId)
            const name = question ? displayAnswer(question, locale) : result.questionId
            return (
              <li key={result.questionId} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-line bg-card px-4 py-3">
                <span className="text-xs text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block truncate text-sm text-ink">{name}</span>
                  <span className="block text-xs text-muted">
                    {result.solved ? t(locale, 'solved') : t(locale, 'missed')} · {result.cluesUsed}
                    {result.borderHit === true ? ` · ${t(locale, 'borderHit')}` : ''}
                    {result.borderHit === false ? ` · ${t(locale, 'borderMiss')}` : ''}
                    {result.borderHit == null && result.distanceKm != null ? ` · ${formatDistance(locale === 'zh', result.distanceKm)}` : ''}
                  </span>
                </span>
                <span className="font-serif text-xl text-accent tabular-nums">{result.score}</span>
              </li>
            )
          })}
        </ol>
      </section>

      {shareReady ? (
      <section className="flex flex-col gap-3">
        <h2 className="font-serif text-2xl">{t(locale, 'share')}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={() => void copy('share', shareText)}>{copied === 'share' ? t(locale, 'copied') : t(locale, 'copyShare')}</Button>
          <Button variant="secondary" onClick={() => void copy('link', link)}>
            {copied === 'link' ? t(locale, 'copied') : t(locale, 'challengeFriend')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              void downloadScoreCard(`world-detective-${state.date}.png`, {
                title: state.mode === 'practice' ? t(locale, 'practiceBadge') : t(locale, 'dailyBadge'),
                dateLabel,
                total,
                maxScore: MAX_DAILY_SCORE,
                scores: state.results.map((result) => result.score),
                rank: rankTitle(locale, rank),
              }).then((ok) => {
                setCardFailed(!ok)
              })
            }}
          >
            {t(locale, 'saveCard')}
          </Button>
        </div>
        {cardFailed ? <p className="text-sm text-wrong">{t(locale, 'copyFailed')}</p> : null}
        {manualCopy ? (
          <div>
            <p className="text-sm text-wrong">{t(locale, 'copyFailed')}</p>
            <textarea readOnly className="mt-2 h-36 w-full rounded-md border border-line bg-card p-3 text-sm" value={manualCopy} />
            {state.mode === 'daily' && !unlocked ? (
              <Button className="mt-3" variant="secondary" onClick={grantExtra}>
                {t(locale, 'extraConfirm')}
              </Button>
            ) : null}
          </div>
        ) : null}
      </section>
      ) : null}

      <div className="grid gap-3">
        {state.mode === 'daily' && unlocked && extraForToday === null ? (
          <Link className={secondaryActionClass} to="/play?mode=practice&fresh=1">
            {t(locale, 'practiceAgain')}
          </Link>
        ) : null}
        {state.mode === 'daily' && unlocked && extraInProgress ? (
          <Link className={secondaryActionClass} to="/play?mode=practice">
            {t(locale, 'continuePractice')}
          </Link>
        ) : null}
        {state.mode === 'daily' && extraForToday?.status === 'complete' ? <p className="text-center text-sm text-ice">{t(locale, 'extraDone')}</p> : null}
        <Link className={secondaryActionClass} to="/">
          {t(locale, 'backHome')}
        </Link>
      </div>
    </div>
  )
}

function formatDistance(chinese: boolean, km: number): string {
  const rounded = Math.round(km)
  return chinese ? `${rounded} 公里` : `${rounded} km`
}
