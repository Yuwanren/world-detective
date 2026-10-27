import { useLocale } from '../hooks/useLocale.ts'

export function LanguageSwitch() {
  const { locale, setLocale } = useLocale()
  const optionClass = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium ${active ? 'bg-accent text-[#1c1408]' : 'text-muted hover:text-ink'}`

  return (
    <div className="flex rounded-md border border-line bg-card p-1" role="group" aria-label={locale === 'zh' ? '语言' : 'Language'}>
      <button type="button" className={optionClass(locale === 'en')} aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>
        EN
      </button>
      <button type="button" className={optionClass(locale === 'zh')} aria-pressed={locale === 'zh'} onClick={() => setLocale('zh')}>
        中文
      </button>
    </div>
  )
}
