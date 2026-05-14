// components/sections/Services.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
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
                className={`py-10 grid grid-cols-[60px_1fr] gap-8 border-b border-charcoal
                  ${i % 2 === 0 ? 'md:pr-10 md:border-r md:border-r-charcoal' : 'md:pl-10'}`}
              >
                <div className="font-display font-semibold text-[0.85rem] text-stone tracking-[0.12em]">
                  {service.index}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[1.4rem] mb-3 text-white tracking-[-0.005em]">
                    <span className="inline-block w-1.5 h-1.5 bg-stone mr-2 align-middle" />
                    {service.name}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-stone font-light">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
