interface PwaOnlyBlockProps {
  className?: string
  variant?: 'default' | 'dark'
  title?: string
  body?: string
}

export function PwaOnlyBlock({
  className = '',
  variant = 'default',
  title = 'PWA-only (for now)',
  body = 'Runs as an installable PWA on iOS and Android. No App Store required. Native app: not part of current offering.',
}: PwaOnlyBlockProps) {
  const isDark = variant === 'dark'
  const borderClass = isDark ? 'border-border-strong' : 'border-border'
  const textClass = isDark ? 'text-primary' : 'text-primary'
  const subClass = isDark ? 'text-secondary' : 'text-secondary'

  return (
    <div className={`glass-card rounded-2xl border ${borderClass} p-6 sm:p-8 ${className}`}>
      <p className={`text-xs font-medium uppercase tracking-[0.24em] ${subClass} mb-3`}>
        {title}
      </p>
      <p className={`text-base sm:text-lg ${textClass} leading-relaxed`}>
        {body}
      </p>
    </div>
  )
}
