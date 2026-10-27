import { Link } from 'react-router'
import { AppShell } from '../components/AppShell.tsx'
import { primaryActionClass } from '../components/Button.tsx'
import { WorldMap } from '../components/WorldMap.tsx'
import { questions } from '../data/questions.ts'
import { useLocale } from '../hooks/useLocale.ts'
import { t } from '../i18n/index.ts'
import { BANK_VERSION, DAILY_QUESTION_COUNT } from '../lib/constants.ts'
import { formatChallengeDate, getUtcDateString } from '../lib/date.ts'
import { isUsableSavedGame, summarizeProgress } from '../lib/game.ts'
import { totalScore } from '../lib/scoring.ts'
import { loadBestScore, loadDaily, loadPractice } from '../lib/storage.ts'

const knownIds = new Set(questions.map((question) => question.id))

export function HomePage() {
  const { locale } = useLocale()
  const date = getUtcDateString()
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
  const actionLabel =
    progress.phase === 'complete' ? t(locale, 'viewScore') : progress.phase === 'active' ? t(locale, 'continue') : t(locale, 'start')
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
          {progress.phase === 'complete' ? (
            <Link
              className="mt-3 block text-center text-sm text-ice underline decoration-line underline-offset-4 hover:text-accent"
              to={practiceOpen ? '/play?mode=practice' : '/play?mode=practice&fresh=1'}
            >
              {practiceOpen ? t(locale, 'continuePractice') : t(locale, 'practiceAgain')}
            </Link>
          ) : null}
        </div>
      </section>
      <p className="mt-4 max-w-xl text-xs leading-5 text-muted">
        {progress.phase === 'complete' ? `${t(locale, 'practiceNote')} ` : null}
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
