import { Syne, Manrope } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
})

export const metadata = {
  title: 'Detail Haus | Premium Mobile Auto Detailing',
  description: 'Premium mobile auto detailing serving Medford, Jacksonville, and Central Point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
