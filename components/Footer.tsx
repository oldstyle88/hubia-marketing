import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  return (
    <footer className="bg-background border-t border-border-strong">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold tracking-logo text-primary mb-4">HŪBIA</h3>
            <p className="text-secondary text-sm">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">{t('product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#product" className="text-secondary text-sm hover:text-primary transition-colors">
                  {tNav('product')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-secondary text-sm hover:text-primary transition-colors">
                  {tNav('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-secondary text-sm hover:text-primary transition-colors">
                  {tNav('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-secondary text-sm hover:text-primary transition-colors">
                  {t('contactLink')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-secondary text-sm hover:text-primary transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary text-sm hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-strong">
          <p className="text-secondary text-sm text-center">
            © {new Date().getFullYear()} HŪBIA. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
