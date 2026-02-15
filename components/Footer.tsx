import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { HubiaInvestorLogo } from '@/components/brand/HubiaInvestorLogo'

export async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  return (
    <footer className="border-t border-white/12 bg-[#071429]/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <HubiaInvestorLogo variant="header" showWordmark={true} link={true} />
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{t('tagline')}</p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{t('product')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#benefits" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {tNav('product')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {tNav('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/pricing#faq" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {tNav('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{t('company')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {t('contactLink')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{t('legal')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-300 transition-colors hover:text-cyan-200">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} HŪBIA. {t('copyright')}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">PWA Infrastructure for Local Growth</p>
        </div>
      </div>
    </footer>
  )
}
