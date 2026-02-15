'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'

export function Hero() {
  const t = useTranslations('home.hero')
  const boxRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!boxRef.current) return
      const rect = boxRef.current.getBoundingClientRect()
      const center = window.innerHeight / 2
      const dist = center - (rect.top + rect.height / 2)
      setOffset(Math.max(-20, Math.min(20, dist * 0.03)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges) ? badges : ['GDPR Ready', 'PWA', 'White-label', 'Supporto umano']

  return (
    <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(44, 27, 90, 0.08) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10 flex-1 max-w-xl md:max-w-2xl">
        <h1
          className="text-4xl sm:text-5xl md:text-[56px] font-bold text-[var(--primary)] leading-tight tracking-[0.02em] mb-6"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg text-[var(--gray)] leading-relaxed mb-8 max-w-lg">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap gap-2 mb-10">
          {badgeList.map((label) => (
            <span
              key={label}
              className="px-4 py-2 rounded-full text-sm font-medium text-[var(--primary)] bg-[var(--secondary)]/20 border border-[var(--secondary)]/40"
            >
              {label}
            </span>
          ))}
        </div>
        <Link
          href="/#cta"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-[var(--primary)] bg-[var(--secondary)] hover:opacity-95 transition-opacity shadow-lg"
        >
          {t('ctaPrimary')}
        </Link>
      </div>
      <div
        ref={boxRef}
        className="relative z-10 flex-shrink-0 w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-2xl border-2 border-[var(--secondary)]/50 bg-[var(--bg-alt)] flex items-center justify-center transition-transform duration-100"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <span className="text-[var(--gray)] text-sm font-medium">[MOCKUP PWA]</span>
      </div>
    </section>
  )
}
