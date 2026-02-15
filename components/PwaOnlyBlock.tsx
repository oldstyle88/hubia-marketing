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

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 ${
        isDark ? 'border-white/20 bg-white/10' : 'border-white/12 bg-white/5'
      } ${className}`}
      style={{ boxShadow: '0 16px 40px rgba(2, 10, 26, 0.42)' }}
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.26em] text-cyan-200">{title}</p>
      <p className="text-base leading-relaxed text-slate-100 sm:text-lg">{body}</p>
    </div>
  )
}
