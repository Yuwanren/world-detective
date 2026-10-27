import { useState } from 'react'
import { Link } from 'react-router'
import { AppShell } from '../components/AppShell.tsx'
import { Button, primaryActionClass } from '../components/Button.tsx'
import { WorldMap } from '../components/WorldMap.tsx'
import { questions } from '../data/questions.ts'
import { useLocale } from '../hooks/useLocale.ts'
import { t } from '../i18n/index.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from '../lib/constants.ts'
import { formatChallengeDate, getLocalDateString } from '../lib/date.ts'
import { isUsableSavedGame, summarizeProgress } from '../lib/game.ts'
import { MAX_DAILY_SCORE, totalScore } from '../lib/scoring.ts'
import { buildChallengeLink, buildShareText, deliverShareText } from '../lib/share.ts'
import { isExtraUnlocked, loadBestScore, loadDaily, loadPractice, unlockExtra } from '../lib/storage.ts'

const knownIds = new Set(questions.map((question) => question.id))

export function HomePage() {
  const { locale } = useLocale()
  const date = getLocalDateString()
  const savedDaily = loadDaily(date, BANK_VERSION)
  const daily = isUsableSavedGame(savedDaily, {
    mode: 'daily',
    date,
    bankVersion: BANK_VERSION,
    knownIds,
  })
    ? savedDaily
    : null
  const progress = summarizeProgress(daily)
  const score = daily ? totalScore(daily.results) : 0
  const best = loadBestScore()
  const savedPractice = loadPractice()
  const practice = isUsableSavedGame(savedPractice, {
    mode: 'practice',
    date,
    bankVersion: BANK_VERSION,
    knownIds,
  })
    ? savedPractice
    : null
  const practiceOpen = practice !== null && practice.status !== 'complete'
  const extraDone = practice?.status === 'complete'
  const [extraUnlocked, setExtraUnlocked] = useState(() => isExtraUnlocked(date, BANK_VERSION))
  const [manualShare, setManualShare] = useState<string | null>(null)
  const actionLabel =
    progress.phase === 'complete' ? t(locale, 'viewScore') : progress.phase === 'active' ? t(locale, 'continue') : t(locale, 'start')
  function grantExtra() {
    unlockExtra(date, BANK_VERSION)
    setExtraUnlocked(true)
    setManualShare(null)
  }

  async function shareOfficial() {
    if (!daily || daily.status !== 'complete' || extraUnlocked) return
    const text = buildShareText({
      locale,
      dateLabel: formatChallengeDate(date, locale),
      total: totalScore(daily.results),
      maxScore: MAX_DAILY_SCORE,
      scores: daily.results.map((result) => result.score),
      link: buildChallengeLink(window.location.origin),
      practice: false,
    })
    const result = await deliverShareText(text)
    if (result === 'shared') grantExtra()
    if (result === 'manual') setManualShare(text)
  }

  const rules = [t(locale, 'rule1'), t(locale, 'rule2'), t(locale, 'rule3'), t(locale, 'rule4')]
  const stats = [
    { label: t(locale, 'progressLabel'), value: `${progress.solved}/${progress.total || DAILY_QUESTION_COUNT}`, gold: false },
    { label: t(locale, 'scoreLabel'), value: String(score), gold: true },
    { label: t(locale, 'bestLabel'), value: best === null ? t(locale, 'bestEmpty') : String(best), gold: false },
  ]

  return (
    <AppShell size="wide">
      <div className="max-w-3xl">
        <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">{t(locale, 'eyebrow')}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {t(locale, 'headline')}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{t(locale, 'tagline')}</p>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ice">{t(locale, 'playLine')}</p>
      </div>

      <div className="mt-8">
        <WorldMap label={t(locale, 'mapLabel')} />
      </div>

      <section className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" aria-labelledby="today-mission">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 id="today-mission" className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
              {t(locale, 'missionKicker')}
            </h2>
            <p className="text-sm text-ice">{formatChallengeDate(date, locale)}</p>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[11px] tracking-[0.14em] text-muted uppercase">{stat.label}</dt>
                <dd className={`mt-1 font-serif text-2xl tabular-nums ${stat.gold ? 'text-accent' : 'text-ink'}`}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="w-full lg:w-80">
          <Link className={primaryActionClass} to="/play">
            {actionLabel}
          </Link>
          {progress.phase === 'complete' && extraDone ? <p className="mt-3 text-center text-sm text-ice">{t(locale, 'extraDone')}</p> : null}
          {progress.phase === 'complete' && !extraDone && extraUnlocked ? (
            <Link
              className="mt-3 block text-center text-sm text-ice underline decoration-line underline-offset-4 hover:text-accent"
              to={practiceOpen ? '/play?mode=practice' : '/play?mode=practice&fresh=1'}
            >
              {practiceOpen ? t(locale, 'continuePractice') : t(locale, 'practiceAgain')}
            </Link>
          ) : null}
          {progress.phase === 'complete' && !extraDone && !extraUnlocked ? (
            <div className="mt-3">
              <Button onClick={() => void shareOfficial()}>{t(locale, 'extraShare')}</Button>
              {manualShare ? (
                <div className="mt-3">
                  <textarea readOnly className="h-36 w-full rounded-md border border-line bg-card p-3 text-sm" value={manualShare} />
                  <Button className="mt-3" variant="secondary" onClick={grantExtra}>
                    {t(locale, 'extraConfirm')}
                  </Button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      <p className="mt-4 max-w-xl text-xs leading-5 text-muted">
        {progress.phase === 'complete' && !extraDone ? `${t(locale, 'practiceNote')} ` : null}
        {t(locale, 'localNote')}
      </p>

      <p className="mt-10 text-sm text-muted">
        <Link className="text-ice underline decoration-line underline-offset-4 hover:text-accent" to="/locate">
          {t(locale, 'globePrototype')}
        </Link>
      </p>
      <section className="mt-14">
        <h2 className="text-xs font-medium tracking-[0.18em] text-muted uppercase">{t(locale, 'rulesTitle')}</h2>
        <ol className="mt-4 grid gap-x-12 gap-y-4 sm:grid-cols-2">
          {rules.map((rule, index) => (
            <li key={rule} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="font-serif text-base text-accent tabular-nums">{index + 1}</span>
              <p>{rule}</p>
            </li>
          ))}
        </ol>
      </section>
    </AppShell>
  )
}
