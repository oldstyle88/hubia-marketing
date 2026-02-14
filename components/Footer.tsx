import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { Logo } from './Logo'

export async function Footer() {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')

  return (
    <footer className="bg-surface/60 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Logo variant="header" href="/" />
            <p className="text-secondary text-sm mt-4">
              {t('tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-4 uppercase tracking-[0.22em]">{t('product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#benefici" className="text-secondary text-sm hover:text-teal transition-colors">
                  {tNav('product')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-secondary text-sm hover:text-teal transition-colors">
                  {tNav('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/pricing#faq" className="text-secondary text-sm hover:text-teal transition-colors">
                  {tNav('faq')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-4 uppercase tracking-[0.22em]">{t('company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-secondary text-sm hover:text-teal transition-colors">
                  {t('contactLink')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-primary mb-4 uppercase tracking-[0.22em]">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-secondary text-sm hover:text-teal transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary text-sm hover:text-teal transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} HŪBIA. {t('copyright')}
          </p>
          {/* Social icons minimal – placeholder, sostituire href con URL reali */}
          <nav aria-label="Social" className="flex items-center gap-4">
            <a href="#" className="text-secondary hover:text-teal transition-colors p-1" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="text-secondary hover:text-teal transition-colors p-1" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/></svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
