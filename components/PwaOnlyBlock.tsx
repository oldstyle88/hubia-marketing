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
  const borderClass = isDark ? 'border-white/10' : 'border-border-strong'
  const textClass = isDark ? 'text-primary' : 'text-primary'
  const subClass = isDark ? 'text-secondary' : 'text-secondary'

  return (
    <div className={`rounded-xl border ${borderClass} p-6 sm:p-8 bg-surface ${className}`}>
      <p className={`text-sm font-medium uppercase tracking-wider ${subClass} mb-2`}>
        {title}
      </p>
      <p className={`text-base sm:text-lg ${textClass} leading-relaxed`}>
        {body}
      </p>
    </div>
  )
}
