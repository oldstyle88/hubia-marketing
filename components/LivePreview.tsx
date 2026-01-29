'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Vertical = 'barber' | 'beauty' | 'pizza'

const verticals: { id: Vertical; key: string }[] = [
  { id: 'barber', key: 'barber' },
  { id: 'beauty', key: 'beauty' },
  { id: 'pizza', key: 'pizza' },
]

const tintMap: Record<Vertical, string> = {
  barber: 'from-accent-blue/20 via-accent-violet/10 to-transparent',
  beauty: 'from-accent-violet/20 via-accent-violet-soft/10 to-transparent',
  pizza: 'from-accent-violet/15 via-accent-violet-soft/15 to-transparent',
}

export function LivePreview() {
  const t = useTranslations('home.livePreview')
  const [vertical, setVertical] = useState<Vertical>('barber')

  const features = t.raw(`${vertical}Features`) as string[]

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-primary mb-3 text-center">
          {t('title')}
        </h2>
        <p className="text-secondary text-center mb-10">
          {t('subtitle')}
        </p>

        <div
          className="inline-flex p-1 rounded-xl border border-border-strong bg-surface/60 backdrop-blur-sm mx-auto mb-10 w-full max-w-sm"
          role="tablist"
          aria-label={t('subtitle')}
        >
          {verticals.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={vertical === v.id}
              onClick={() => setVertical(v.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                vertical === v.id
                  ? 'bg-accent-violet/20 text-accent-violet-soft border border-accent-violet/30 shadow-sm'
                  : 'text-secondary hover:text-primary hover:bg-white/5'
              }`}
            >
              {t(v.key as 'barber' | 'beauty' | 'pizza')}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl border border-border-strong bg-surface/80 backdrop-blur-sm overflow-hidden hover:border-accent-violet/20 hover:shadow-glow-hover transition-all duration-200"
          role="tabpanel"
        >
          <div className="aspect-[4/3] sm:aspect-video relative bg-gradient-accent-soft flex flex-col p-6 sm:p-8">
            <div className={`absolute inset-0 bg-gradient-to-br ${tintMap[vertical]} pointer-events-none`} aria-hidden />
            <div className="grid grid-cols-3 gap-3 flex-1 relative z-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl bg-black/20 border border-white/10 flex items-center justify-center min-h-[80px] sm:min-h-[100px]"
                >
                  <span className="text-secondary/50 text-xs">Preview {i}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 border-t border-border-strong bg-surface/60">
            <ul className="flex flex-wrap gap-3">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-secondary"
                >
                  <span className="text-accent-violet-soft">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-secondary/70 text-xs text-center mt-4">
          {t('demoNote')}
        </p>
      </div>
    </section>
  )
}
