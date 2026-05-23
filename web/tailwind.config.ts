import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        'input-bg': 'var(--bg-input)',
        glass: 'var(--bg-glass)',
        border: 'var(--border-default)',
        'border-light': 'var(--border-light)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        blue: {
          DEFAULT: 'var(--color-blue)',
          light: 'var(--color-blue-light)',
          dark: 'var(--color-blue-dark)',
        },
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          light: 'var(--color-emerald-light)',
        },
        success: {
          DEFAULT: 'var(--success)',
          bg: 'var(--success-bg)',
        },
        error: {
          DEFAULT: 'var(--error)',
          bg: 'var(--error-bg)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          bg: 'var(--warning-bg)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Georgian', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px var(--shadow-color), 0 1px 2px var(--shadow-color)',
        'card-hover': '0 4px 12px var(--shadow-color)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
