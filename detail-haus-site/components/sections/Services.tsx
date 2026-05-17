// components/sections/Services.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import Image from 'next/image'
import { SERVICES } from '@/data/services'

export function Services() {
  return (
    <section id="services" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="01 / Services"
            label="What We Do"
            title={<>Every surface,<br /><em>handled.</em></>}
            description="Four core services, available individually or bundled into a package. Every job is done by the same person, start to finish."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-charcoal">
            {SERVICES.map((service, i) => (
              <div
                key={service.index}
                className={`relative overflow-hidden min-h-[400px] group border-b border-charcoal
                  ${i % 2 === 0 ? 'md:border-r md:border-r-charcoal' : ''}`}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${service.imagePosition ?? 'object-center'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[400px] p-10">
                  <span className="font-display font-semibold text-[0.85rem] text-stone tracking-[0.12em]">
                    {service.index}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-[1.4rem] mb-3 text-white tracking-[-0.005em]">
                      {service.name}
                    </h3>
                    <p className="text-[0.92rem] leading-relaxed text-stone font-light max-w-[340px]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
