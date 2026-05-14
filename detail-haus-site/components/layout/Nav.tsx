// components/layout/Nav.tsx
import Link from 'next/link'

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(26,25,23,0.92)] backdrop-blur-2xl border-b border-charcoal">
      <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-px no-underline">
          <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-white text-ink border border-white">DETAIL</span>
          <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-transparent text-white border border-white">HAUS</span>
        </Link>
        <nav className="flex gap-9 items-center">
          <Link href="#services" className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Services</Link>
          <Link href="#pricing"  className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Pricing</Link>
          <Link href="#about"    className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">About</Link>
          <Link href="#reviews"  className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Reviews</Link>
          <Link href="#contact"  className="text-[0.72rem] tracking-[0.12em] uppercase font-semibold px-5 py-2.5 rounded-full bg-white text-ink hover:bg-stone hover:text-white transition-colors">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
