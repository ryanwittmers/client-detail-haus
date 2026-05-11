import type { Config } from 'tailwindcss'

// NOTE: This project uses Tailwind v4. Theme tokens (colors, fonts) are defined
// via @theme blocks in app/globals.css. This file exists for plugin registration
// and future v4 compatibility shims.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white:    '#fdfdfd',
        bone:     '#f2f0ed',
        fog:      '#e5e3df',
        stone:    '#a8a5a0',
        graphite: '#6b6865',
        charcoal: '#2d2b29',
        ink:      '#1a1917',
        black:    '#0c0c0b',
        // accent is a CSS variable — do not hardcode here
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
