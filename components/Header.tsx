'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from './Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border-strong">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18">
          <Logo variant="header" href="/" />

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#product"
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              {t('product')}
            </Link>
            <Link
              href="/pricing"
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/#faq"
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              {t('faq')}
            </Link>
            <Link
              href="/contact"
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              {t('contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              href="/contact"
              variant="primary"
              className="text-sm px-6 py-3"
            >
              {t('requestDemo')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
