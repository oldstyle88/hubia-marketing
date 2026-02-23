import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

export async function Header() {
  const t = await getTranslations('nav')
  const locale = (await getLocale()).toUpperCase()

  const navLinkClass =
    'inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--text)] transition-colors hover:text-[var(--primary)] hover:bg-white/55 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(232,242,251,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <HubiaLogo variant="header" />

        <nav className="flex flex-wrap items-center justify-center gap-1" aria-label="Main">
          <Link href="/#hub-app" className={navLinkClass}>
            {t('app')}
          </Link>
          <Link href="/#pricing" className={navLinkClass}>
            {t('plans')}
          </Link>
          <Link href="/#coach-ai" className={navLinkClass}>
            {t('coachAi')}
          </Link>
          <Link href="/#soluzioni-dedicate" className={navLinkClass}>
            {t('soluzioni')}
          </Link>
          <Link href="/contact" className={navLinkClass}>
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="inline-flex min-h-11 items-center rounded-xl border border-[var(--line)] bg-white px-3 text-sm font-semibold text-[var(--text)]">
            {locale}
          </span>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-md bg-[#d4af37] px-4 text-sm font-semibold text-[#0a0a0a] shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/60"
          >
            {t('startNow')}
          </Link>
        </div>
      </div>
    </header>
  )
}
