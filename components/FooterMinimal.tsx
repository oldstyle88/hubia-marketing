import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function FooterMinimal() {
  const t = await getTranslations('footer')

  return (
    <footer className="py-10 px-4 sm:px-6 border-t border-[var(--gray)]/20 bg-[var(--bg)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--gray)]">
          {t('tagline')}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <Link href="/privacy" className="text-sm text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="text-sm text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            {t('terms')}
          </Link>
          <Link href="/contact" className="text-sm text-[var(--text)] hover:text-[var(--primary)] transition-colors">
            {t('contactLink')}
          </Link>
        </nav>
      </div>
      <p className="text-center text-xs text-[var(--gray)] mt-6">
        © {new Date().getFullYear()} HŪBIA. {t('copyright')}
      </p>
    </footer>
  )
}
