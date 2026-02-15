import { Link } from '@/i18n/navigation'
import { getLocale, getTranslations } from 'next-intl/server'
import { HubiaLogo } from '@/components/HubiaLogo'

export async function Header() {
  const t = await getTranslations('nav')
  const locale = (await getLocale()).toUpperCase()

  const navLinkClass =
    'inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--text)] transition-colors hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(248,245,239,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <HubiaLogo variant="header" />

        <nav className="flex flex-wrap items-center justify-center gap-1" aria-label="Main">
          <Link href="/#pricing" className={navLinkClass}>
            {t('plans')}
          </Link>
          <Link href="/#setup" className={navLinkClass}>
            Metodo
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
            className="inline-flex min-h-11 items-center rounded-xl bg-[var(--secondary)] px-4 text-sm font-semibold text-[var(--primary)] shadow-md transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60"
          >
            {t('requestDemo')}
          </Link>
        </div>
      </div>
    </header>
  )
}
