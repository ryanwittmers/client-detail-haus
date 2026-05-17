// components/layout/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG } from '@/data/config'
import { PRIMARY_SERVICE_AREAS } from '@/data/serviceAreas'

export function Footer() {
  return (
    <footer className="bg-black border-t border-charcoal">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="no-underline w-fit">
              <Image src="/images/logo.jpg" alt="Detail Haus" width={32} height={32} className="h-8 w-auto opacity-80" />
            </Link>
            <p className="text-stone text-sm leading-relaxed font-light max-w-[280px]">
              Mobile auto detailing serving {PRIMARY_SERVICE_AREAS.join(', ')} and the surrounding area. Owner-operated.
            </p>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Navigate</h5>
            <ul className="flex flex-col gap-3">
              {['Services', 'Pricing', 'Add-Ons', 'About', 'Reviews'].map(item => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace('-', '')}`} className="text-stone text-sm hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Contact</h5>
            <ul className="flex flex-col gap-3 text-stone text-sm">
              <li><Link href={SITE_CONFIG.phoneHref}    className="hover:text-white transition-colors">{SITE_CONFIG.phone}</Link></li>
              <li><Link href={SITE_CONFIG.emailHref}    className="hover:text-white transition-colors">{SITE_CONFIG.email}</Link></li>
              <li><Link href={SITE_CONFIG.instagramUrl} className="hover:text-white transition-colors">{SITE_CONFIG.instagram}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Service Area</h5>
            <ul className="flex flex-col gap-3 text-stone text-sm">
              {PRIMARY_SERVICE_AREAS.map(area => <li key={area}>{area}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-charcoal flex flex-col md:flex-row justify-between gap-4 text-stone text-xs">
          <p>© {new Date().getFullYear()} Detail Haus. All rights reserved.</p>
          <p>Site by <Link href="https://fathom.services" target="_blank" className="hover:text-white transition-colors">Fathom</Link></p>
        </div>
      </div>
    </footer>
  )
}
