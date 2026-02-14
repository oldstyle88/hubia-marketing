'use client'

/* Icone SVG minimal per benefit cards */
const IconCalendar = () => (
  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)
const IconUsers = () => (
  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)
const IconRefresh = () => (
  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)
const IconChart = () => (
  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

type IconKey = 'calendar' | 'users' | 'refresh' | 'chart'

interface Benefit {
  iconKey: IconKey
  title: string
  description: string
}

const iconMap: Record<IconKey, React.ReactNode> = {
  calendar: <IconCalendar />,
  users: <IconUsers />,
  refresh: <IconRefresh />,
  chart: <IconChart />,
}

interface BenefitsSectionProps {
  title: string
  subtitle: string
  benefits: Benefit[]
}

/**
 * Sezione benefici: 4–6 card con icona + titolo + descrizione.
 * Hover scale, fade-in leggero.
 */
export function BenefitsSection({ title, subtitle, benefits }: BenefitsSectionProps) {
  return (
    <section id="benefici" className="py-20 sm:py-24 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-modern p-6 flex flex-col gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex-shrink-0">{iconMap[benefit.iconKey]}</div>
              <h3 className="text-lg font-semibold text-primary">
                {benefit.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { IconCalendar, IconUsers, IconRefresh, IconChart }
