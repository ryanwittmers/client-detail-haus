// components/sections/Pricing.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { PACKAGES } from '@/data/packages'
import type { Package } from '@/data/packages'
import { SITE_CONFIG } from '@/data/config'

function formatPrice(pkg: Package) {
  if (pkg.priceFrom === null) return 'Contact us'
  if (pkg.priceTo) return `$${pkg.priceFrom}–$${pkg.priceTo}`
  return `$${pkg.priceFrom}`
}

function formatPriceLabel(pkg: Package) {
  if (pkg.priceFrom === null) return 'Price on request'
  return pkg.priceTo ? 'Price range' : 'Starting at'
}

export function Pricing() {
  return (
    <section id="pricing" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="02 / Pricing"
            label="Packages"
            title={<>Three packages.<br /><em>Clear pricing.</em></>}
            description="Prices reflect a standard sedan in average condition. Larger vehicles, heavy soiling, or unique conditions may adjust the final quote. Send photos for an exact number."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal border border-charcoal">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                className={`flex flex-col gap-7 p-12 ${pkg.featured ? 'bg-charcoal' : 'bg-ink'}`}
              >
                <div>
                  <div className={`font-display font-medium text-[0.7rem] tracking-[0.18em] uppercase mb-3 ${pkg.featured ? 'text-stone' : 'text-stone'}`}>
                    {pkg.index} / {pkg.name}
                    {pkg.featured && <span className="text-stone font-normal"> · Most Popular</span>}
                  </div>
                  <h3 className="font-display font-bold text-[1.8rem] leading-none text-white">{pkg.name}</h3>
                </div>
                <div>
                  <span className={`font-body font-normal text-[0.75rem] tracking-[0.12em] uppercase block mb-1.5 ${pkg.featured ? 'text-stone' : 'text-graphite'}`}>
                    {formatPriceLabel(pkg)}
                  </span>
                  <div className="font-display font-extrabold text-[2.4rem] leading-none tracking-[-0.02em] text-white">
                    {formatPrice(pkg)}
                  </div>
                </div>
                <div className={`h-px ${pkg.featured ? 'bg-graphite' : 'bg-charcoal'}`} />
                <ul className="flex flex-col gap-3">
                  {pkg.features.map(f => (
                    <li key={f} className={`text-[0.9rem] leading-snug font-light flex gap-3 items-start ${pkg.featured ? 'text-white' : 'text-stone'}`}>
                      <span className={`mt-[0.2em] shrink-0 font-bold ${pkg.featured ? 'text-stone' : 'text-white'}`}>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    href="#contact"
                    variant={pkg.featured ? 'primary' : 'secondary'}
                    light={!pkg.featured}
                    className="w-full justify-center"
                    arrow
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-8 pt-8 border-t border-charcoal flex items-baseline gap-3">
            <span className="text-[0.7rem] tracking-[0.18em] uppercase text-stone font-semibold">Maintenance Plan</span>
            <span className="text-stone text-sm font-light">Starting at ${SITE_CONFIG.maintenancePriceFrom}/mo — regular upkeep packages available. Ask for details.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
