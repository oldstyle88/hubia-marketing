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
        navy: '#0F172A',
        background: '#0F172A',
        'background-alt': '#1E293B',
        surface: '#1E293B',
        'surface-elevated': '#334155',
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.16)',
        primary: '#F8FAFC',
        secondary: '#94A3B8',
        teal: '#00D4FF',
        accent: '#00D4FF',
        gold: '#EAB308',
        'accent-teal': '#00D4FF',
        'accent-gold': '#EAB308',
        ink: '#020617',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #00D4FF 0%, #0EA5E9 100%)',
        'gradient-gold': 'linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(0,212,255,0.06) 0%, transparent 60%)',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.3)',
        card: '0 4px 24px rgba(0,0,0,0.2), 0 0 1px rgba(255,255,255,0.1)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.35), 0 0 1px rgba(255,255,255,0.15)',
        glow: '0 0 30px rgba(0,212,255,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        logo: '0.14em',
      },
    },
  },
  plugins: [],
}
export default config
