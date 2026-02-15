'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HubiaLogo } from '@/components/HubiaLogo'
import { DeferredLeadForm } from '@/components/DeferredLeadForm'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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

  const navLinkClass =
    'inline-flex min-h-11 items-center rounded-lg px-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--text)] transition-colors hover:text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50'

  const navLinks = (
    <>
      <Link href="/#pricing" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        {t('plans')}
      </Link>
      <Link href="/#pricing" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        {t('custom')}
      </Link>
      <Link href="/#cta" className={navLinkClass} onClick={() => setMobileOpen(false)}>
        {t('consulting')}
      </Link>
    </>
  )

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(248,245,239,0.86)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <HubiaLogo variant="header" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex min-h-11 items-center rounded-xl bg-[var(--secondary)] px-4 text-sm font-semibold text-[var(--primary)] shadow-md transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/60"
            >
              {t('requestDemo')}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text)] transition-colors hover:bg-[var(--bg-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]/50 md:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-[var(--line)] px-4 py-4 md:hidden" aria-label="Main mobile">
            <div className="flex flex-col gap-2">
              {navLinks}
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true)
                  setMobileOpen(false)
                }}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--secondary)] px-4 text-sm font-semibold text-[var(--primary)]"
              >
                {t('requestDemo')}
              </button>
            </div>
          </nav>
        )}
      </header>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Chiudi"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--bg)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--line)] p-6">
              <h2 id="modal-title" className="text-xl font-semibold text-[var(--primary)]" style={{ fontFamily: 'var(--font-title)' }}>
                {t('requestDemo')}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--gray)] transition-colors hover:bg-[var(--bg-alt)] hover:text-[var(--text)]"
                aria-label={t('closeMenu')}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <DeferredLeadForm onSuccess={() => setModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
