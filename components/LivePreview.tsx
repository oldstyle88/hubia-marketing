'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Vertical = 'barber' | 'pizza'

const verticals: { id: Vertical; key: string }[] = [
  { id: 'barber', key: 'barber' },
  { id: 'pizza', key: 'pizza' },
]

const tintMap: Record<Vertical, string> = {
  barber: 'from-accent-blue/25 via-accent-violet/10 to-transparent',
  pizza: 'from-accent-cyan/20 via-accent-violet/10 to-transparent',
}

export function LivePreview() {
  const t = useTranslations('home.livePreview')
  const [vertical, setVertical] = useState<Vertical>('barber')

  const features = t.raw(`${vertical}Features`) as string[]

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-primary mb-3">
            {t('title')}
          </h2>
          <p className="text-secondary">
            {t('subtitle')}
          </p>
        </div>

        <div
          className="inline-flex p-1 rounded-2xl border border-white/15 bg-surface/70 backdrop-blur-sm mx-auto mb-10 w-full max-w-md"
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
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs uppercase tracking-[0.2em] transition-all duration-200 ${
                vertical === v.id
                  ? 'bg-white/10 text-primary border border-white/20 shadow-glow'
                  : 'text-secondary hover:text-primary hover:bg-white/5'
              }`}
            >
              {t(v.key as 'barber' | 'pizza')}
            </button>
          ))}
        </div>

        <div
          className="rounded-[28px] border border-white/10 bg-surface/70 backdrop-blur-sm overflow-hidden shadow-soft"
          role="tabpanel"
        >
          <div className="aspect-[4/3] sm:aspect-video relative flex flex-col p-6 sm:p-8">
            <div className={`absolute inset-0 bg-gradient-to-br ${tintMap[vertical]} pointer-events-none`} aria-hidden />
            <div className="absolute inset-0 grid-veil opacity-30" aria-hidden />
            <div className="grid grid-cols-3 gap-4 flex-1 relative z-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center min-h-[80px] sm:min-h-[110px]"
                >
                  <span className="text-secondary text-xs">Preview {i}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 sm:p-8 border-t border-white/10 bg-surface/80">
            <ul className="flex flex-wrap gap-3">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-secondary"
                >
                  <span className="text-accent-blue">✓</span>
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
