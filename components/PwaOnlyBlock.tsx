interface PwaOnlyBlockProps {
  className?: string
  variant?: 'default' | 'dark'
  title?: string
  body?: string
}

export function PwaOnlyBlock({
  className = '',
  title = 'PWA-only (for now)',
  body = 'Runs as an installable PWA on iOS and Android. No App Store required. Native app: not part of current offering.',
}: PwaOnlyBlockProps) {
  return (
    <div className={`rounded-2xl border border-[var(--line)] bg-white/85 p-6 sm:p-8 ${className}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gray)]">{title}</p>
      <p className="text-base leading-relaxed text-[var(--text)] sm:text-lg">{body}</p>
    </div>
  )
}
