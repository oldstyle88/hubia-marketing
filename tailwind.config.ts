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
        'gradient-accent': 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #F472B6 100%)',
        'gradient-accent-soft': 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(139,92,246,0.08) 50%, rgba(244,114,182,0.05) 100%)',
        'gradient-accent-border': 'linear-gradient(135deg, rgba(96,165,250,0.5) 0%, rgba(139,92,246,0.5) 50%, rgba(244,114,182,0.4) 100%)',
      },
      letterSpacing: {
        logo: '0.02em',
      },
      boxShadow: {
        glow: '0 0 60px rgba(139, 92, 246, 0.25)',
        'glow-sm': '0 0 30px rgba(139, 92, 246, 0.2)',
        'glow-blue': '0 0 40px rgba(96, 165, 250, 0.2)',
        'glow-pink': '0 0 30px rgba(244, 114, 182, 0.15)',
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
