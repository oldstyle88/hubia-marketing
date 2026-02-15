import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  const linkClass = 'inline-flex min-h-10 items-center rounded-lg px-3 text-sm text-[var(--text)] transition-colors hover:text-[var(--primary)]'

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <p className="text-base font-semibold tracking-[0.14em] text-[var(--primary)]">HŪBIA</p>
          <p className="mt-3 text-sm text-[var(--gray)]">{t('tagline')}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gray)]">{t('product')}</p>
          <div className="flex flex-col">
            <Link href="/#benefits" className={linkClass}>{tNav('product')}</Link>
            <Link href="/pricing" className={linkClass}>{tNav('pricing')}</Link>
            <Link href="/pricing#faq" className={linkClass}>{tNav('faq')}</Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gray)]">{t('company')}</p>
          <div className="flex flex-col">
            <Link href="/contact" className={linkClass}>{t('contactLink')}</Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gray)]">{t('legal')}</p>
          <div className="flex flex-col">
            <Link href="/privacy" className={linkClass}>{t('privacy')}</Link>
            <Link href="/terms" className={linkClass}>{t('terms')}</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-[var(--line)] pt-6">
        <p className="text-center text-xs text-[var(--gray)]">© {new Date().getFullYear()} HŪBIA. {t('copyright')}</p>
      </div>
    </footer>
  )
}
