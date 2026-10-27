import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppShell } from '../components/AppShell.tsx'
import { Button, primaryActionClass } from '../components/Button.tsx'
import { ClueList } from '../components/ClueList.tsx'
import { CompletionSummary } from '../components/CompletionSummary.tsx'
import { RoundFeedback } from '../components/RoundFeedback.tsx'
import { StatusMessage } from '../components/StatusMessage.tsx'
import { getPlaceFix } from '../data/locations.ts'
import { getQuestion } from '../data/questions.ts'
import { useCountryBorders } from '../hooks/useCountryBorders.ts'
import { useGameSession } from '../hooks/useGameSession.ts'
import { useLocale } from '../hooks/useLocale.ts'
import { caseLabel, categoryLabel, clueLabel, pointsLabel, potentialLabel, spentClueLabel, t } from '../i18n/index.ts'
import { displayAnswer } from '../lib/answers.ts'
import type { CountryHit } from '../data/countries.ts'
import type { GeoPoint } from '../lib/geo.ts'
import { BANK_VERSION } from '../lib/constants.ts'
import { getLocalDateString } from '../lib/date.ts'
import { CLUE_SCORES, scoreForSolvedClue, totalScore } from '../lib/scoring.ts'
import { isExtraUnlocked } from '../lib/storage.ts'
import type { GameMode, Question, QuestionResult } from '../types/index.ts'

const LocateGlobe = lazy(() => import('../components/LocateGlobe.tsx').then((module) => ({ default: module.LocateGlobe })))

export function GamePage() {
  const [params, setParams] = useSearchParams()
  const mode: GameMode = params.get('mode') === 'practice' ? 'practice' : 'daily'
  const fresh = mode === 'practice' && params.get('fresh') === '1'
  const consumeFresh = useCallback(() => {
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('fresh')
      return next
    }, { replace: true })
  }, [setParams])

  if (mode === 'practice' && !isExtraUnlocked(getLocalDateString(), BANK_VERSION)) {
    return <ExtraLocked />
  }

  return <GameSession key={`${mode}:${fresh ? 'fresh' : 'saved'}`} mode={mode} fresh={fresh} onConsumeFresh={consumeFresh} />
}

function ExtraLocked() {
  const { locale } = useLocale()
  return (
    <AppShell size="wide">
      <StatusMessage
        title={t(locale, 'extraLockedTitle')}
        body={t(locale, 'extraLockedBody')}
        action={<Link className={primaryActionClass} to="/">{t(locale, 'backHome')}</Link>}
      />
    </AppShell>
  )
}

function GameSession({
  mode,
  fresh,
  onConsumeFresh,
}: {
  mode: GameMode
  fresh: boolean
  onConsumeFresh: () => void
}) {
  const { locale } = useLocale()
  const bordersReady = useCountryBorders()
  const { state, dispatch, reset } = useGameSession(mode, fresh)
  const [region, setRegion] = useState<CountryHit | null>(null)
  const [regionReady, setRegionReady] = useState(false)
  const onRegion = useCallback((hit: CountryHit | null) => {
    setRegion(hit)
    setRegionReady(true)
  }, [])
  const questionIndex = useRef(state.currentIndex)
  useEffect(() => {
    if (questionIndex.current === state.currentIndex) return
    questionIndex.current = state.currentIndex
    setRegion(null)
    setRegionReady(false)
  }, [state.currentIndex])

  useEffect(() => {
    if (fresh) onConsumeFresh()
  }, [fresh, onConsumeFresh])

  if (state.status === 'complete') {
    return (
      <AppShell size="wide">
        <CompletionSummary state={state} locale={locale} />
      </AppShell>
    )
  }

  if (state.questionIds.length === 0) {
    return (
      <AppShell size="wide">
        <StatusMessage
          title={t(locale, 'emptyTitle')}
          body={t(locale, 'emptyBody')}
          action={<Link className={primaryActionClass} to="/">{t(locale, 'backHome')}</Link>}
        />
      </AppShell>
    )
  }

  const question = getQuestion(state.questionIds[state.currentIndex] ?? '')
  const place = question ? getPlaceFix(question.id) : undefined
  if (!question || !place) {
    return (
      <AppShell size="wide">
        <StatusMessage
          title={t(locale, 'errorTitle')}
          body={question ? t(locale, 'pendingLocation') : t(locale, 'errorBody')}
          action={<Button onClick={reset}>{t(locale, 'retry')}</Button>}
        />
      </AppShell>
    )
  }

  const current = state.currentIndex + 1
  const total = state.questionIds.length
  const isLast = state.currentIndex >= total - 1
  const potential = scoreForSolvedClue(state.cluesRevealed)
  const clueSpent = state.status === 'guessing' && state.attemptUsed
  const nextPotential = clueSpent ? scoreForSolvedClue(state.cluesRevealed + 1) : 0
  const running = totalScore(state.results)
  const scoreName = state.mode === 'practice' ? t(locale, 'practiceScore') : t(locale, 'yourScore')
  const country = place.placement === 'country-border'
  const guessing = state.status === 'guessing'
  const aiming = guessing && !state.attemptUsed
  const canConfirm = aiming && (!country || bordersReady)
  const guess = state.guess ?? null
  const latest = state.results[state.results.length - 1]
  const controls = {
    left: t(locale, 'rotateLeft'),
    right: t(locale, 'rotateRight'),
    zoomIn: t(locale, 'zoomIn'),
    zoomOut: t(locale, 'zoomOut'),
  }

  return (
    <AppShell size="wide">
      <div className="flex flex-1 flex-col gap-4 lg:gap-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.18em] text-accent uppercase">{caseLabel(locale, current, total)}</p>
            <h1 className="mt-1 font-serif text-3xl text-ink lg:text-4xl">{guessing ? t(locale, 'locationUnknown') : displayAnswer(question, locale)}</h1>
            <p className="mt-2 text-sm text-muted">
              {scoreName} <span className="font-serif text-2xl text-accent tabular-nums">{running}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-sm border border-line px-3 py-1 text-xs tracking-[0.14em] text-ice uppercase">
              {state.mode === 'practice' ? t(locale, 'practiceBadge') : t(locale, 'dailyBadge')}
            </span>
            <span className="rounded-sm border border-line px-3 py-1 text-xs tracking-[0.14em] text-ink uppercase">
              {categoryLabel(locale, question.category)}
            </span>
          </div>
        </div>

        {state.mode === 'practice' ? (
          <p className="rounded-lg border border-line bg-card px-4 py-2 text-xs leading-5 text-muted lg:py-3 lg:text-sm lg:leading-6">{t(locale, 'practiceBanner')}</p>
        ) : null}

        <MobileClueCard
          question={question}
          revealed={state.cluesRevealed}
          locale={locale}
          guessing={guessing}
          cap={clueSpent ? nextPotential : potential}
          capLabel={clueSpent ? spentClueLabel(locale, nextPotential) : potentialLabel(locale, potential)}
          openLabel={t(locale, 'nextClueShort')}
          earlierLabel={t(locale, 'earlierClues')}
          onOpenNext={guessing && state.cluesRevealed < question.clues.length ? () => dispatch({ type: 'reveal-clue' }) : undefined}
          giveUpLabel={guessing && state.cluesRevealed >= question.clues.length ? t(locale, 'showAnswer') : undefined}
          onGiveUp={guessing && state.cluesRevealed >= question.clues.length ? () => dispatch({ type: 'give-up' }) : undefined}
        />

        <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_22rem] lg:gap-6">
          <div className="min-w-0">
            <p className="mb-3 hidden text-sm leading-6 text-muted lg:block">{t(locale, 'locateHint')}</p>
            <GlobeBoundary message={t(locale, 'globeFailed')}>
              <Suspense fallback={<div className="grid h-72 place-items-center rounded-lg bg-[#071018] text-sm text-muted">{t(locale, 'globeLoading')}</div>}>
                <LocateGlobe
                  guess={guess}
                  target={guessing ? null : place}
                  guessLabel={t(locale, 'yourPinLabel')}
                  targetLabel={t(locale, 'targetRevealed')}
                  controls={controls}
                  interactive={aiming}
                  onRegion={onRegion}
                  onPick={(point) => dispatch({ type: 'set-guess', point })}
                />
              </Suspense>
            </GlobeBoundary>
            {country ? <p className="mt-2 text-xs leading-5 text-ice lg:mt-4 lg:text-sm lg:leading-6">{t(locale, 'countryRule')}</p> : null}
            <p className="mt-2 text-sm text-ink">
              <span className="text-muted">{t(locale, 'guessLabel')}: </span>
              {guess ? formatPoint(guess) : t(locale, 'noGuess')}
            </p>
            {guess && regionReady ? (
              <p className="mt-1 text-sm text-ice">
                {region ? `${t(locale, 'guessArea')}${region.code ? `${region.code} / ${region.name}` : region.name}` : t(locale, 'oceanGuess')}
              </p>
            ) : null}
            {guessing ? (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  disabled={!canConfirm || !guess}
                  onClick={() => {
                    dispatch({ type: 'clear-guess' })
                    setRegion(null)
                    setRegionReady(false)
                  }}
                >
                  {t(locale, 'clearGuess')}
                </Button>
                <Button disabled={!canConfirm || !guess} onClick={() => dispatch({ type: 'submit-pin' })}>
                  {t(locale, 'confirmGuess')}
                </Button>
              </div>
            ) : null}
            {state.attemptUsed && guessing ? (
              <div className="mt-3" role="status">
                <p className="text-sm leading-6 text-ice">{country ? t(locale, 'countryMiss') : t(locale, 'tooFar')}</p>
                <Button className="mt-3" onClick={() => dispatch({ type: 'reveal-clue' })}>
                  {t(locale, 'nextClue')}
                </Button>
              </div>
            ) : null}
            {guessing ? null : (
              <div className="mt-4">
                <RoundFeedback
                  correct={state.lastAnswerCorrect === true}
                  title={state.lastAnswerCorrect ? t(locale, 'solved') : t(locale, 'missed')}
                  answerLabel={t(locale, 'answerWas')}
                  answer={displayAnswer(question, locale)}
                  explanation={question.explanation[locale]}
                  score={latest?.score ?? 0}
                  detail={resultDetail(locale === 'zh', latest, t(locale, 'borderHit'), t(locale, 'borderMiss'), t(locale, 'distanceLabel'))}
                  nextLabel={isLast ? t(locale, 'seeResults') : t(locale, 'nextQuestion')}
                  locale={locale}
                  onNext={() => dispatch({ type: 'next' })}
                />
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <section className="hidden rounded-lg border border-line bg-card px-4 py-4 lg:block" aria-live="polite">
              <p className="text-xs tracking-[0.14em] text-muted uppercase">{t(locale, 'stakeLabel')}</p>
              <p key={clueSpent ? nextPotential : potential} className="score-tick mt-1 font-serif text-5xl text-accent tabular-nums">
                {guessing ? (clueSpent ? nextPotential : potential) : (latest?.score ?? 0)}
              </p>
              {clueSpent ? <p className="mt-1 text-sm text-ice">{spentClueLabel(locale, nextPotential)}</p> : null}
              {guessing && !clueSpent ? <p className="mt-1 text-sm text-ice">{potentialLabel(locale, potential)}</p> : null}
              {!guessing ? <p className="mt-1 text-sm text-ice">{pointsLabel(locale, latest?.score ?? 0)}</p> : null}
              <ol className="mt-4 flex gap-2">
                {CLUE_SCORES.map((points, index) => {
                  const active = guessing && !clueSpent && index + 1 === state.cluesRevealed
                  const upcoming = clueSpent && index === state.cluesRevealed
                  const passed = index + 1 < state.cluesRevealed || (clueSpent && index + 1 === state.cluesRevealed)
                  return (
                    <li
                      key={points}
                      className={`flex-1 rounded-sm border px-1 py-2 text-center text-sm tabular-nums ${active || upcoming ? 'border-accent text-accent' : 'border-line text-muted'} ${passed ? 'opacity-50' : ''}`}
                    >
                      {points}
                    </li>
                  )
                })}
              </ol>
              <p className="mt-3 text-xs text-muted">
                {scoreName} {running}
              </p>
            </section>

            <section className="hidden lg:block">
              <h2 className="text-xs tracking-[0.16em] text-muted uppercase">{t(locale, 'cluesHeading')}</h2>
              <div className="mt-3">
                <ClueList
                  clues={question.clues}
                  revealed={state.cluesRevealed}
                  locale={locale}
                  openLabel={t(locale, 'nextClue')}
                  onOpenNext={guessing && state.cluesRevealed < question.clues.length ? () => dispatch({ type: 'reveal-clue' }) : undefined}
                />
              </div>
              {guessing && state.cluesRevealed >= question.clues.length ? (
                <div className="mt-3">
                  <Button variant="secondary" onClick={() => dispatch({ type: 'give-up' })}>
                    {t(locale, 'showAnswer')}
                  </Button>
                </div>
              ) : null}
            </section>

            <Link to="/" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
              {t(locale, 'exitCase')}
            </Link>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}

function MobileClueCard({
  question,
  revealed,
  locale,
  guessing,
  cap,
  capLabel,
  openLabel,
  earlierLabel,
  onOpenNext,
  giveUpLabel,
  onGiveUp,
}: {
  question: Question
  revealed: number
  locale: 'en' | 'zh'
  guessing: boolean
  cap: number
  capLabel: string
  openLabel: string
  earlierLabel: string
  onOpenNext?: () => void
  giveUpLabel?: string
  onGiveUp?: () => void
}) {
  const currentClue = question.clues[revealed - 1]
  const earlier = question.clues.slice(0, Math.max(0, revealed - 1))
  return (
    <section className="rounded-lg border border-line bg-card px-4 py-3 lg:hidden" aria-live="polite">
      <div className="flex items-center gap-3">
        <p className="text-xs tracking-[0.14em] text-accent uppercase">{clueLabel(locale, revealed)}</p>
        {onOpenNext ? (
          <button
            type="button"
            onClick={onOpenNext}
            className="inline-flex h-11 shrink-0 items-center rounded-md border border-line px-3 text-sm text-ink"
          >
            {openLabel}
          </button>
        ) : null}
        <p className="ml-auto font-serif text-3xl text-accent tabular-nums">{guessing ? cap : null}</p>
      </div>
      {currentClue ? <p className="mt-2 text-[15px] leading-6 text-ink">{currentClue[locale]}</p> : null}
      {guessing ? <p className="mt-2 text-xs leading-5 text-ice">{capLabel}</p> : null}
      {earlier.length > 0 ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-ice">{earlierLabel}</summary>
          <ol className="mt-2 flex flex-col gap-2">
            {earlier.map((clue, index) => (
              <li key={clue.en} className="text-sm leading-6 text-muted">
                <span className="text-accent">{clueLabel(locale, index + 1)}. </span>
                {clue[locale]}
              </li>
            ))}
          </ol>
        </details>
      ) : null}
      {onGiveUp ? (
        <Button className="mt-3" variant="secondary" onClick={onGiveUp}>
          {giveUpLabel}
        </Button>
      ) : null}
    </section>
  )
}

function resultDetail(
  chinese: boolean,
  result: QuestionResult | undefined,
  hitLabel: string,
  missLabel: string,
  distanceLabel: string,
): string | null {
  if (!result) return null
  if (result.borderHit === true) return hitLabel
  if (result.borderHit === false) return missLabel
  if (result.distanceKm == null) return null
  return `${distanceLabel}: ${formatDistance(chinese, result.distanceKm)}`
}

function formatPoint(point: GeoPoint): string {
  const lat = `${Math.abs(point.latitude).toFixed(1)}°${point.latitude >= 0 ? 'N' : 'S'}`
  const lng = `${Math.abs(point.longitude).toFixed(1)}°${point.longitude >= 0 ? 'E' : 'W'}`
  return `${lat} ${lng}`
}

function formatDistance(chinese: boolean, km: number): string {
  const rounded = Math.round(km)
  return chinese ? `${rounded} 公里` : `${rounded} km`
}

class GlobeBoundary extends Component<{ children: ReactNode; message: string }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return <p className="rounded-lg bg-[#071018] px-4 py-8 text-sm text-muted">{this.props.message}</p>
    return this.props.children
  }
}
