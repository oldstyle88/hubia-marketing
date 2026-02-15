'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { LeadForm } from '@/components/LeadForm'
import { HubiaLogo } from '@/components/HubiaLogo'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061027]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Main">
            <Link href="/#benefits" className="hubia-nav-link">{t('plans')}</Link>
            <Link href="/#pricing" className="hubia-nav-link">{t('custom')}</Link>
            <Link href="/#cta" className="hubia-nav-link">{t('consulting')}</Link>
          </nav>

          <div className="flex flex-1 items-center justify-center lg:flex-none">
            <HubiaLogo variant="header" />
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="hubia-btn-primary px-4 py-2 text-sm"
            >
              {t('requestDemo')}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 transition-colors hover:bg-white/10"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#07142d]/95 px-4 py-4 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile">
              <Link href="/#benefits" onClick={() => setMobileOpen(false)} className="hubia-mobile-link">{t('plans')}</Link>
              <Link href="/#pricing" onClick={() => setMobileOpen(false)} className="hubia-mobile-link">{t('custom')}</Link>
              <Link href="/#cta" onClick={() => setMobileOpen(false)} className="hubia-mobile-link">{t('consulting')}</Link>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true)
                  setMobileOpen(false)
                }}
                className="hubia-btn-primary mt-2 w-full px-4 py-3 text-sm"
              >
                {t('requestDemo')}
              </button>
            </nav>
          </div>
        )}
      </header>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-full max-w-md overflow-y-auto rounded-2xl border border-white/20 bg-[#08152f] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 id="modal-title" className="text-lg font-semibold text-slate-100">
                {t('requestDemo')}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200"
                aria-label={t('closeMenu')}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <LeadForm onSuccess={() => setModalOpen(false)} />
            </div>
          </div>
          <button type="button" className="absolute inset-0 -z-10" aria-label="Chiudi" onClick={() => setModalOpen(false)} />
        </div>
      )}
    </>
  )
}
