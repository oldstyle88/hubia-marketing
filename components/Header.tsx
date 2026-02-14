'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Button } from './Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  )
}

export function Header() {
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = (
    <>
      <Link href="/#benefici" className="text-secondary hover:text-teal transition-colors text-xs uppercase tracking-[0.26em]" onClick={() => setMobileOpen(false)}>
        {t('product')}
      </Link>
      <Link href="/pricing" className="text-secondary hover:text-teal transition-colors text-xs uppercase tracking-[0.26em]" onClick={() => setMobileOpen(false)}>
        {t('pricing')}
      </Link>
      <Link href="/pricing#faq" className="text-secondary hover:text-teal transition-colors text-xs uppercase tracking-[0.26em]" onClick={() => setMobileOpen(false)}>
        {t('faq')}
      </Link>
      <Link href="/contact" className="text-secondary hover:text-teal transition-colors text-xs uppercase tracking-[0.26em]" onClick={() => setMobileOpen(false)}>
        {t('contact')}
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:grid md:grid-cols-[1fr_auto_1fr]">
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {navLinks}
          </nav>

          <div className="md:justify-self-center flex items-center min-h-[2.5rem]">
            <Logo variant="header" href="/" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:justify-self-end">
            <LanguageSwitcher />
            <Button href="/contact" variant="primary" className="text-sm px-4 sm:px-6 py-3 hidden sm:inline-flex">
              {t('requestDemo')}
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-secondary hover:text-primary hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-teal/50"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="md:hidden py-4 border-t border-white/10 flex flex-col gap-4"
            aria-label="Mobile"
          >
            {navLinks}
            <div className="pt-2">
              <Button href="/contact" variant="primary" className="w-full text-sm py-3" onClick={() => setMobileOpen(false)}>
                {t('requestDemo')}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
