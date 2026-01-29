import { Section } from './Section'

export interface ReliabilityBullet {
  title: string
  desc: string
}

interface ReliabilitySectionProps {
  title: string
  subtitle: string
  bullets: ReliabilityBullet[]
}

export function ReliabilitySection({ title, subtitle, bullets }: ReliabilitySectionProps) {
  return (
    <Section id="reliability" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">
          {title}
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bullets.map((item, index) => (
          <div
            key={index}
            className="border border-border-strong rounded-xl p-6 bg-surface/60 backdrop-blur-sm hover:border-accent-violet/15 hover:shadow-glow-hover transition-all duration-200"
          >
            <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
