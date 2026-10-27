import { Component, lazy, Suspense, type ReactNode, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { AppShell } from '../components/AppShell.tsx'
import { Button } from '../components/Button.tsx'
import { ClueList } from '../components/ClueList.tsx'
import { getPlaceFix } from '../data/locations.ts'
import { getQuestion } from '../data/questions.ts'
import { useLocale } from '../hooks/useLocale.ts'
import { clueLabel, pointsLabel, potentialLabel, t } from '../i18n/index.ts'
import { displayAnswer } from '../lib/answers.ts'
import type { CountryHit } from '../data/countries.ts'
import type { GeoPoint } from '../lib/geo.ts'
import { useCountryBorders } from '../hooks/useCountryBorders.ts'
import { createLocateState, reduceLocate, type LocateState } from '../lib/locate.ts'
import { scoreForSolvedClue } from '../lib/scoring.ts'

const LocateGlobe = lazy(() => import('../components/LocateGlobe.tsx').then((module) => ({ default: module.LocateGlobe })))

const samples = {
  city: 'paris',
  country: 'japan',
} as const

export function LocatePage() {
  const [params] = useSearchParams()
  const sample = params.get('sample') === 'country' ? 'country' : 'city'
  return <LocateCase key={sample} questionId={samples[sample]} sample={sample} />
}

function LocateCase({ questionId, sample }: { questionId: string; sample: 'city' | 'country' }) {
  const { locale } = useLocale()
  const bordersReady = useCountryBorders()
  const question = getQuestion(questionId)
  const place = getPlaceFix(questionId)
  const [state, setState] = useState<LocateState>(createLocateState)
  const [region, setRegion] = useState<CountryHit | null>(null)
  if (!question || !place) {
    return (
      <AppShell size="wide">
        <p className="text-muted">{t(locale, 'pendingLocation')}</p>
      </AppShell>
    )
  }

  const revealed = state.status === 'revealed'
  const cap = scoreForSolvedClue(state.cluesRevealed)
  const country = place.placement === 'country-border'
  const aiming = state.status === 'aiming' && !state.attemptUsed
  const canConfirm = aiming && (!country || bordersReady)

  function dispatch(action: Parameters<typeof reduceLocate>[1]) {
    setState((current) => reduceLocate(current, action, place!))
  }

  return (
    <AppShell size="wide">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">{t(locale, 'locateKicker')}</p>
          <h1 className="mt-2 font-serif text-4xl text-ink">{t(locale, 'locationUnknown')}</h1>
        </div>
        <p className="font-serif text-3xl text-accent tabular-nums">{revealed ? (state.score ?? 0) : cap}</p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{t(locale, 'locateScope')}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <Link className={sample === 'city' ? 'text-accent' : 'text-ice underline underline-offset-4'} to="/locate">
          {t(locale, 'sampleCity')}
        </Link>
        <Link className={sample === 'country' ? 'text-accent' : 'text-ice underline underline-offset-4'} to="/locate?sample=country">
          {t(locale, 'sampleCountry')}
        </Link>
      </div>
      {country ? <p className="mt-3 max-w-2xl text-sm leading-6 text-ice">{t(locale, 'countryRule')}</p> : null}

      <div className="mt-6 grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_22rem]">
        <div className="min-w-0">
          <GlobeBoundary message={t(locale, 'globeFailed')}>
            <Suspense fallback={<div className="grid h-72 place-items-center rounded-lg bg-[#071018] text-sm text-muted">{t(locale, 'globeLoading')}</div>}>
              <LocateGlobe
                guess={state.guess}
                target={revealed ? place : null}
                guessLabel={t(locale, 'yourPinLabel')}
                targetLabel={t(locale, 'targetRevealed')}
                controls={{
                  left: t(locale, 'rotateLeft'),
                  right: t(locale, 'rotateRight'),
                  zoomIn: t(locale, 'zoomIn'),
                  zoomOut: t(locale, 'zoomOut'),
                }}
                interactive={aiming}
                onPick={(point, hit) => {
                  dispatch({ type: 'set-guess', point })
                  setRegion(hit)
                }}
              />
            </Suspense>
          </GlobeBoundary>
          <p className="mt-4 text-sm leading-6 text-muted">{t(locale, 'locateHint')}</p>
          <p className="mt-3 text-sm text-ink">
            <span className="text-muted">{t(locale, 'guessLabel')}: </span>
            {state.guess ? formatPoint(state.guess) : t(locale, 'noGuess')}
          </p>
          {state.guess ? (
            <p className="mt-1 text-sm text-ice">{region ? `${t(locale, 'guessArea')}${region.code ? `${region.code} / ${region.name}` : region.name}` : t(locale, 'oceanGuess')}</p>
          ) : null}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              disabled={!canConfirm || !state.guess}
              onClick={() => {
                dispatch({ type: 'clear-guess' })
                setRegion(null)
              }}
            >
              {t(locale, 'clearGuess')}
            </Button>
            <Button disabled={!canConfirm || !state.guess} onClick={() => dispatch({ type: 'submit' })}>
              {t(locale, 'confirmGuess')}
            </Button>
          </div>
          {state.attemptUsed && !revealed ? (
            <p className="mt-3 text-sm leading-6 text-ice">{country ? t(locale, 'countryMiss') : t(locale, 'tooFar')}</p>
          ) : null}
          {revealed ? (
            <section className="score-tick mt-4 rounded-lg border border-accent/40 bg-card px-4 py-4" aria-live="polite">
              <p className="text-xs tracking-[0.14em] text-accent uppercase">{state.score ? t(locale, 'locateSolved') : t(locale, 'missed')}</p>
              <h2 className="mt-2 font-serif text-3xl">{displayAnswer(question, locale)}</h2>
              <p className="mt-3 text-sm text-ice">
                {country
                  ? state.borderHit
                    ? t(locale, 'borderHit')
                    : t(locale, 'borderMiss')
                  : `${t(locale, 'distanceLabel')}: ${state.distanceKm === null ? '—' : formatDistance(locale === 'zh', state.distanceKm)}`}
              </p>
              <p className="mt-1 text-sm text-muted">
                {t(locale, 'targetRevealed')}: {formatPoint(place)}
              </p>
              {state.guess ? (
                <p className="mt-1 text-sm text-muted">
                  {t(locale, 'yourPinLabel')}: {formatPoint(state.guess)}
                </p>
              ) : null}
              <p className="mt-3 font-serif text-2xl text-accent">{pointsLabel(locale, state.score ?? 0)}</p>
              <p className="mt-3 text-sm leading-6 text-ink">{question.explanation[locale]}</p>
              <Link className="mt-4 inline-block text-sm text-ice underline underline-offset-4" to="/">
                {t(locale, 'backHome')}
              </Link>
            </section>
          ) : null}
        </div>
        <aside>
          {revealed ? null : <p className="text-sm text-ice">{potentialLabel(locale, cap)}</p>}
          <p className={revealed ? 'text-xs tracking-[0.14em] text-muted uppercase' : 'mt-1 text-xs tracking-[0.14em] text-muted uppercase'}>
            {clueLabel(locale, state.cluesRevealed)}
          </p>
          <div className="mt-4">
            <ClueList
              clues={question.clues}
              revealed={state.cluesRevealed}
              locale={locale}
              onOpenNext={!revealed && state.cluesRevealed < question.clues.length ? () => dispatch({ type: 'reveal-clue' }) : undefined}
            />
          </div>
          {!revealed && state.cluesRevealed >= question.clues.length ? (
            <Button className="mt-4" variant="secondary" onClick={() => dispatch({ type: 'give-up' })}>
              {t(locale, 'showAnswer')}
            </Button>
          ) : null}
        </aside>
      </div>
    </AppShell>
  )
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
