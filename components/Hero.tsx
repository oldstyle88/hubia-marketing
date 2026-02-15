'use client'

import { useTranslations } from 'next-intl'
import Script from 'next/script'
import { useRef, useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import { HubiaLogo } from '@/components/HubiaLogo'

interface HeroProps {
  variant?: 'A' | 'B'
}

export function Hero({ variant = 'A' }: HeroProps) {
  const t = useTranslations('home.hero')
  const boxRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [offset, setOffset] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)

  const title = t('title')
  const words = title.split(/\s+/).filter(Boolean)

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

  useEffect(() => {
    if (!titleRef.current) return
    const words = titleRef.current.querySelectorAll('.hero-word')
    if (!words.length) return

    const gsap = (window as unknown as { gsap?: { fromTo: (target: unknown, from: object, to: object) => void } }).gsap
    if (gsapReady && gsap?.fromTo) {
      gsap.fromTo(words, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' })
    } else {
      const fallback = setTimeout(() => {
        words.forEach((el, i) => {
          ;(el as HTMLElement).style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`
          ;(el as HTMLElement).style.opacity = '1'
          ;(el as HTMLElement).style.transform = 'translateY(0)'
        })
      }, 100)
      return () => clearTimeout(fallback)
    }
  }, [gsapReady, title])

  const badges = t.raw('badges') as string[] | undefined
  const badgeList = Array.isArray(badges) ? badges : ['GDPR Ready', 'PWA', 'White-label', 'Supporto umano']

  const ctaText = variant === 'B' ? 'Inizia gratis trial' : t('ctaPrimary')
  const ctaClass = variant === 'B'
    ? 'inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg'
    : 'inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-[var(--primary)] bg-[var(--secondary)] hover:opacity-95 transition-opacity shadow-lg'

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="lazyOnload"
        onLoad={() => setGsapReady(true)}
      />
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-100"
          style={{
            background: 'linear-gradient(135deg, rgba(44, 27, 90, 0.08) 0%, transparent 50%)',
            transform: `translateY(${offset * 0.5}px)`,
          }}
        />
        <div className="relative z-10 flex-1 max-w-xl md:max-w-2xl flex flex-col items-center md:items-start text-center md:text-left">
          <HubiaLogo variant="hero" />
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-[56px] max-[480px]:text-[26px] max-[480px]:leading-tight font-bold text-[var(--primary)] leading-tight tracking-[0.02em] mb-6"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            {words.map((word: string, i: number) => (
              <span key={i} className="hero-word inline-block mr-[0.25em]">
                {word}
              </span>
            ))}
          </h1>
          <p className="text-base sm:text-lg max-[480px]:text-[13px] text-[var(--gray)] leading-relaxed mb-8 max-w-lg">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-2 mb-10 justify-center md:justify-start">
            {badgeList.map((label) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full text-sm max-[480px]:text-xs font-medium text-[var(--primary)] bg-[var(--secondary)]/20 border border-[var(--secondary)]/40"
              >
                {label}
              </span>
            ))}
          </div>
          <Link href="/#cta" className={ctaClass}>
            {ctaText}
          </Link>
        </div>
        <div
          ref={boxRef}
          className="relative z-10 flex-shrink-0 w-full max-w-[280px] md:max-w-[320px] aspect-[9/16] rounded-2xl border-2 border-[var(--secondary)]/50 bg-[var(--bg-alt)] overflow-hidden flex items-center justify-center transition-transform duration-100"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {!videoError ? (
            <video
              src="/demo-pwa.mp4"
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
              poster=""
            />
          ) : null}
          {videoError && (
            <span className="text-[var(--gray)] text-sm font-medium">[MOCKUP PWA]</span>
          )}
        </div>
      </section>
    </>
  )
}
