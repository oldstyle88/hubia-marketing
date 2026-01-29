import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark luxury — aligned with logo (navy / charcoal)
        background: '#0B0F1A',
        'background-alt': '#0E1324',
        surface: '#111827',
        'surface-elevated': '#141A2E',
        border: 'rgba(255,255,255,0.06)',
        'border-strong': 'rgba(255,255,255,0.1)',
        primary: '#F5F7FA',
        secondary: '#9CA3AF',
        // Accent — logo gradient (blue → violet → pink)
        accent: {
          blue: '#60A5FA',
          violet: '#8B5CF6',
          'violet-soft': '#A78BFA',
          pink: '#F472B6',
        },
        // Optional: champagne (cold premium), not warm gold
        champagne: '#D4C5A9',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #A78BFA 100%)',
        'gradient-accent-soft': 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(167,139,250,0.05) 100%)',
        'gradient-accent-border': 'linear-gradient(135deg, rgba(96,165,250,0.5) 0%, rgba(139,92,246,0.5) 50%, rgba(167,139,250,0.4) 100%)',
        'gradient-aurora': 'linear-gradient(ellipse 90% 55% at 50% -10%, rgba(96,165,250,0.06) 0%, transparent 55%), linear-gradient(ellipse 70% 45% at 85% 15%, rgba(139,92,246,0.04) 0%, transparent 45%), linear-gradient(ellipse 60% 35% at 15% 85%, rgba(139,92,246,0.03) 0%, transparent 40%)',
      },
      letterSpacing: {
        logo: '0.02em',
      },
      boxShadow: {
        glow: '0 0 50px rgba(139, 92, 246, 0.2)',
        'glow-sm': '0 0 28px rgba(139, 92, 246, 0.15)',
        'glow-hover': '0 0 32px rgba(139, 92, 246, 0.18)',
        'glow-blue': '0 0 36px rgba(96, 165, 250, 0.15)',
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
        orbit: 'orbit 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
