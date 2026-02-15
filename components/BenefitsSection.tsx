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
    <svg className="h-5 w-5 shrink-0 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <section className="px-4 py-20 sm:px-6 lg:px-8" id="benefits">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <h2 className="mb-4 text-center text-3xl font-semibold text-slate-50 sm:text-4xl">{t('title')}</h2>
        <p className="mb-14 text-center font-medium text-cyan-200">{t('subtitle')}</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {benefits.map(({ titleKey, descKey }, index) => (
            <article
              key={titleKey}
              data-benefit-index={index}
              className="rounded-2xl border border-white/12 bg-white/5 p-7 shadow-[0_18px_44px_rgba(2,10,26,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
              }}
            >
              <div className="mb-3 flex items-start gap-3">
                <CheckIcon />
                <h3 className="text-lg font-semibold text-slate-50">{t(titleKey)}</h3>
              </div>
              <p className="pl-8 text-sm leading-relaxed text-slate-300">{t(descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
