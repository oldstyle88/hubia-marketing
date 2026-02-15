'use client'

import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

const benefits = [
  { titleKey: 'b1Title', descKey: 'b1Desc' },
  { titleKey: 'b2Title', descKey: 'b2Desc' },
  { titleKey: 'b3Title', descKey: 'b3Desc' },
  { titleKey: 'b4Title', descKey: 'b4Desc' },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function BenefitsSection() {
  const t = useTranslations('home.benefits')
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<number[]>([])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll('[data-benefit-index]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.benefitIndex)
          if (entry.isIntersecting && !visible.includes(idx)) {
            setVisible((v) => [...v, idx].sort((a, b) => a - b))
          }
        })
      },
      { rootMargin: '-40px 0px -40px 0px', threshold: 0.1 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [visible])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="benefits">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <h2
          className="text-3xl sm:text-4xl font-bold text-[var(--primary)] text-center mb-4"
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {t('title')}
        </h2>
        <p className="text-[var(--secondary)] font-medium text-center mb-14">
          {t('subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map(({ titleKey, descKey }, index) => (
            <div
              key={titleKey}
              data-benefit-index={index}
              className="card rounded-[20px] p-8 bg-[var(--bg)] border border-[var(--gray)]/10 transition-all duration-300 hover:scale-[1.02]"
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(-30px)',
                transition: `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`,
              }}
            >
              <div className="flex gap-3 mb-3">
                <CheckIcon />
                <h3 className="text-lg font-semibold text-[var(--secondary)]" style={{ fontFamily: 'var(--font-title)' }}>
                  {t(titleKey)}
                </h3>
              </div>
              <p className="text-[var(--gray)] text-sm leading-relaxed pl-8">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
