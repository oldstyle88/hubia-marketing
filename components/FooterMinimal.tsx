import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function FooterMinimal() {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-white/12 bg-[#071429]/60 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-300">{t('tagline')}</p>
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <Link href="/privacy" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
            {t('terms')}
          </Link>
          <Link href="/contact" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
            {t('contactLink')}
          </Link>
        </nav>
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} HŪBIA. {t('copyright')}</p>
    </footer>
  )
}
