import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function FooterMinimal() {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-[var(--gray)]">{t('tagline')}</p>
        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Footer">
          <Link href="/privacy" className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]">
            {t('terms')}
          </Link>
          <Link href="/contact" className="inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]">
            {t('contactLink')}
          </Link>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-[var(--gray)]">
        © {new Date().getFullYear()} HŪBIA. {t('copyright')}
      </p>
    </footer>
  )
}
