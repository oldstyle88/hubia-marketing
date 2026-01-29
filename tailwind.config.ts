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
        background: '#0B1020',
        'background-alt': '#0F1428',
        surface: '#11172C',
        'surface-elevated': '#151C33',
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.16)',
        primary: '#F5F7FF',
        secondary: '#A7B0C8',
        accent: '#5CC8FF',
        'accent-blue': '#5CC8FF',
        'accent-violet': '#8B5BFF',
        'accent-pink': '#D26BFF',
        'accent-cyan': '#42E6FF',
        'accent-deep': '#3A7CFF',
        ink: '#0A0F1F',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #5CC8FF 0%, #8B5BFF 52%, #D26BFF 100%)',
        'gradient-accent-soft': 'linear-gradient(135deg, rgba(92,200,255,0.12) 0%, rgba(139,91,255,0.12) 52%, rgba(210,107,255,0.08) 100%)',
        'gradient-aurora': 'radial-gradient(1200px 600px at 85% -10%, rgba(92, 200, 255, 0.16), transparent 60%), radial-gradient(900px 500px at -10% 15%, rgba(139, 91, 255, 0.12), transparent 55%)',
      },
      letterSpacing: {
        logo: '0.14em',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(8, 12, 24, 0.65)',
        glow: '0 18px 60px rgba(92, 200, 255, 0.22)',
        'glow-strong': '0 0 60px rgba(139, 91, 255, 0.4)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        spinSlow: 'spin 22s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
        sweep: 'sweep 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        sweep: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
