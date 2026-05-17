// components/sections/Products.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import Image from 'next/image'
import { BRANDS } from '@/data/products'

export function Products() {
  return (
    <section className="pb-24 border-b border-ink bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="07 / Products"
            label="What We Use"
            title={<>Professional-grade<br /><em>chemistry.</em></>}
            description="Only products used on enthusiast and show vehicles. No shortcuts on materials."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink">
            {BRANDS.map(brand => (
              <div key={brand.name} className="bg-charcoal flex flex-col items-center justify-center py-12 px-8 gap-4">
                {brand.logo ? (
                  <div className="relative w-32 h-10">
                    <Image src={brand.logo} alt={brand.name} fill className="object-contain grayscale invert opacity-80" />
                  </div>
                ) : (
                  <span className="font-display font-bold text-xl text-white text-center">{brand.name}</span>
                )}
                {brand.note && (
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-stone font-semibold">{brand.note}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
