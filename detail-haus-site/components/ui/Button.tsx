import Link from 'next/link'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  arrow?: boolean
}

export function Button({ href, variant, children, className = '', arrow = false }: ButtonProps) {
  const base = 'inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold transition-all duration-200 no-underline'
  const styles = {
    primary:   `${base} bg-ink text-white hover:bg-[var(--accent)]`,
    secondary: `${base} bg-transparent text-ink border border-ink hover:bg-ink hover:text-white`,
  }
  return (
    <Link href={href} className={`group ${styles[variant]} ${className}`}>
      {children}
      {arrow && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </Link>
  )
}
