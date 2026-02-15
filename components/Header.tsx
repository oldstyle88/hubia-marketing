'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { HubiaLogo } from '@/components/HubiaLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { LeadForm } from '@/components/LeadForm'

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
  const [modalOpen, setModalOpen] = useState(false)

  const navLinks = (
    <>
      <Link
        href="/#pricing"
        className="text-[var(--text)] hover:text-[var(--primary)] transition-colors text-sm font-medium uppercase tracking-wider"
        onClick={() => setMobileOpen(false)}
      >
        {t('plans')}
      </Link>
      <Link
        href="/#pricing"
        className="text-[var(--text)] hover:text-[var(--primary)] transition-colors text-sm font-medium uppercase tracking-wider"
        onClick={() => setMobileOpen(false)}
      >
        {t('custom')}
      </Link>
      <Link
        href="/#cta"
        className="text-[var(--text)] hover:text-[var(--primary)] transition-colors text-sm font-medium uppercase tracking-wider"
        onClick={() => setMobileOpen(false)}
      >
        {t('consulting')}
      </Link>
    </>
  )

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--gray)]/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            <div className="flex items-center gap-8">
              <HubiaLogo />
              <nav className="hidden md:flex items-center gap-8" aria-label="Main">
                {navLinks}
              </nav>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 rounded-xl font-medium text-[var(--primary)] bg-[var(--secondary)] hover:opacity-95 transition-opacity shadow-md"
              >
                {t('requestDemo')}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
              >
                <MenuIcon open={mobileOpen} />
              </button>
            </div>
          </div>
          {mobileOpen && (
            <nav className="md:hidden py-4 border-t border-[var(--gray)]/20 flex flex-col gap-4">
              {navLinks}
              <button
                type="button"
                onClick={() => { setModalOpen(true); setMobileOpen(false); }}
                className="w-full py-3 rounded-xl font-medium text-[var(--primary)] bg-[var(--secondary)]"
              >
                {t('requestDemo')}
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Modal: Richiedi */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-[var(--bg)] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b border-[var(--gray)]/20">
              <h2 id="modal-title" className="text-xl font-semibold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                {t('requestDemo')}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-[var(--gray)] hover:text-[var(--text)] hover:bg-[var(--bg-alt)]"
                aria-label={t('closeMenu')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <LeadForm onSuccess={() => setModalOpen(false)} />
            </div>
          </div>
          <button
            type="button"
            className="absolute inset-0 -z-10"
            aria-label="Chiudi"
            onClick={() => setModalOpen(false)}
          />
        </div>
      )}
    </>
  )
}
