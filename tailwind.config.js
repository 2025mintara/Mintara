/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        mintara: {
          background: 'var(--color-mintara-background)',
          surface: 'var(--color-mintara-surface)',
          primary: 'var(--color-mintara-primary)',
          'primary-glow': 'var(--color-mintara-primary-glow)',
          accent: 'var(--color-mintara-accent)',
          border: 'var(--color-mintara-border)',
          'text-primary': 'var(--color-mintara-text-primary)',
          'text-secondary': 'var(--color-mintara-text-secondary)',
          warning: 'var(--color-mintara-warning)',
          error: 'var(--color-mintara-error)',
          'soft-lime-glow': 'var(--color-mintara-soft-lime-glow)',
          'deep-emerald': 'var(--color-mintara-deep-emerald)',
          'turquoise-shadow': 'var(--color-mintara-turquoise-shadow)',
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)'
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        chart: {
          '1': 'var(--color-chart-1)',
          '2': 'var(--color-chart-2)',
          '3': 'var(--color-chart-3)',
          '4': 'var(--color-chart-4)',
          '5': 'var(--color-chart-5)'
        }
      }
    }
  },
  plugins: [],
}
