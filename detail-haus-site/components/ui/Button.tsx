import Link from 'next/link'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  arrow?: boolean
  light?: boolean  // true = secondary uses white text/border (for dark backgrounds)
}

export function Button({ href, variant, children, className = '', arrow = false, light = false }: ButtonProps) {
  const base = 'group inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold transition-all duration-200 no-underline'
  const styles = {
    primary: `${base} bg-white text-ink hover:bg-stone hover:text-white`,
    secondary: light
      ? `${base} bg-transparent text-white border border-white/40 hover:bg-white hover:text-ink`
      : `${base} bg-transparent text-ink border border-ink hover:bg-ink hover:text-white`,
  }
  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {children}
      {arrow && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </Link>
  )
}
