import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function FooterMinimal() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-[var(--gray)] sm:text-left">{t('tagline')}</p>
        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Footer">
          <Link
            href="/#pricing"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]"
          >
            {t('plans')}
          </Link>
          <Link
            href="/#soluzioni-dedicate"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]"
          >
            {t('soluzioniDedicate')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]"
          >
            {t('contactLink')}
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]"
          >
            {t('privacy')}
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]"
          >
            {t('terms')}
          </Link>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-[var(--gray)]">
        © 2026 HŪBIA. {t('copyright')}
      </p>
    </footer>
  )
}
