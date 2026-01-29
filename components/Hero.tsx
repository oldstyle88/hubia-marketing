'use client'

import { Button } from './Button'
import { HubiaLogoConnection } from './HubiaLogoConnection'

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
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-background hero-noise">
      {/* Gradient soft (logo-aligned) */}
      <div className="absolute inset-0 bg-gradient-accent-soft opacity-60 pointer-events-none" aria-hidden="true" />
      {/* Orbit rings — accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true" />
      </div>
      <div className="hero-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Logo hero: micro-interaction on hover (scale once) */}
        <div className="flex justify-center mb-10 transition-transform duration-300 hover:scale-[1.03] cursor-default">
          <HubiaLogoConnection variant="dark" />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary mb-6 leading-tight tracking-tight max-w-3xl mx-auto">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button href="/contact" variant="primary" className="text-lg px-10 py-5">
            {ctaDemo}
          </Button>
          <Button href="/pricing" variant="outline" className="text-lg px-10 py-5">
            {ctaPrices}
          </Button>
        </div>

        {/* Product mock — device frame, no constant glow */}
        <div className="max-w-2xl mx-auto mb-16 rounded-2xl overflow-hidden border border-border-strong bg-surface/80 backdrop-blur-sm hover:shadow-glow-hover hover:border-accent-violet/20 transition-all duration-200">
          <div className="aspect-[4/3] bg-gradient-accent-soft flex items-center justify-center">
            <div className="text-secondary/60 text-sm">App preview</div>
          </div>
        </div>

        {/* Proof cards — glass, glow on hover only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {proofCards.map((card, index) => (
            <div
              key={index}
              className="bg-surface/80 border border-border-strong rounded-xl p-6 text-left backdrop-blur-sm hover:border-accent-violet/20 hover:shadow-glow-hover transition-all duration-200"
            >
              <div className="aspect-video bg-gradient-accent-soft rounded-lg mb-4 flex items-center justify-center text-secondary/50 text-sm">
                Screenshot
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  )
}
