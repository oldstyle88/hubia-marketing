'use client'

import { Button } from './Button'
import { Logo } from './Logo'

export interface ProofCard {
  title: string
  description: string
  placeholder?: boolean
}

interface HeroProps {
  title: string
  subtitle: string
  ctaDemo: string
  ctaPrices: string
  proofCards: ProofCard[]
}

export function Hero({ title, subtitle, ctaDemo, ctaPrices, proofCards }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-aurora pointer-events-none" aria-hidden />
      <div className="absolute inset-0 grid-veil opacity-30 pointer-events-none" aria-hidden />

      <div className="hero-grid mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 pt-28 pb-16">
        <div className="relative flex flex-col items-center text-center gap-10">
          <div className="hero-core">
            <div className="hero-halo" aria-hidden />
            <svg className="hero-constellation" viewBox="0 0 320 320" aria-hidden>
              <defs>
                <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5CC8FF" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#8B5BFF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#D26BFF" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="70" r="4" fill="url(#constellation)" />
              <circle cx="230" cy="120" r="4" fill="url(#constellation)" />
              <circle cx="210" cy="220" r="4" fill="url(#constellation)" />
              <circle cx="100" cy="240" r="4" fill="url(#constellation)" />
              <circle cx="80" cy="130" r="4" fill="url(#constellation)" />
              <path d="M160 70L230 120L210 220L100 240L80 130Z" stroke="url(#constellation)" strokeWidth="1" fill="none" opacity="0.45" />
            </svg>
            <Logo variant="hero" href="/" />
          </div>

          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-primary leading-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-secondary leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
              {ctaDemo}
            </Button>
            <Button href="/pricing" variant="outline" className="text-lg px-10 py-5">
              {ctaPrices}
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-secondary uppercase tracking-[0.24em]">
            <span>GDPR Ready</span>
            <span>PWA White-label</span>
            <span>Supporto umano</span>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {proofCards.map((card, index) => (
              <div key={index} className="glass-card rounded-2xl border border-white/10 p-6 text-left">
                <p className="text-sm font-semibold text-primary mb-2">{card.title}</p>
                <p className="text-xs text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
