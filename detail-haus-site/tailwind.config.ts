import type { Config } from 'tailwindcss'

// Tailwind v4: tokens live in @theme block in app/globals.css.
// This file exists for plugin registration only.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [],
}

export default config
