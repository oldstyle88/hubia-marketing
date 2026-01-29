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
        background: '#F6F1E8',
        'background-alt': '#F2ECE1',
        surface: '#FFFFFF',
        'surface-elevated': '#FAF6EF',
        border: '#E7E1D7',
        'border-strong': '#D9D1C4',
        primary: '#14120F',
        secondary: '#5C564F',
        accent: '#C8A65A',
        'accent-deep': '#8E6A2C',
        champagne: '#F1E8D6',
        ink: '#1C1A18',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'ui-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #C8A65A 0%, #8E6A2C 100%)',
        'gradient-accent-soft': 'linear-gradient(135deg, rgba(200,166,90,0.12) 0%, rgba(142,106,44,0.08) 100%)',
        'gradient-aurora': 'radial-gradient(1200px 600px at 85% -10%, rgba(200, 166, 90, 0.18), transparent 60%), radial-gradient(900px 500px at -10% 15%, rgba(20, 18, 15, 0.08), transparent 55%)',
      },
      letterSpacing: {
        logo: '0.08em',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(20, 18, 15, 0.08)',
        glow: '0 18px 60px rgba(200, 166, 90, 0.18)',
      },
    },
  },
  plugins: [],
}
export default config
