// components/sections/ServiceArea.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { PRIMARY_SERVICE_AREAS } from '@/data/serviceAreas'

export function ServiceArea() {
  return (
    <section id="service-area" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="08 / Service Area"
            label="Where We Work"
            title={<>Southern Oregon,<br /><em>brought to you.</em></>}
            description="We come to your driveway, office, or wherever the vehicle lives. No drop-off required."
            light
          />
        </Reveal>

        <Reveal>
          <div className="border-t border-charcoal">
            {PRIMARY_SERVICE_AREAS.map((area, i) => (
              <div
                key={area}
                className="group flex items-center justify-between border-b border-charcoal py-6 md:py-8 transition-colors duration-300 hover:bg-charcoal/30 -mx-10 px-10"
              >
                <div className="flex items-center gap-8 md:gap-14">
                  <span className="font-body text-[0.68rem] tracking-[0.2em] uppercase text-graphite font-semibold w-5 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-display font-bold text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-[-0.02em] text-white">
                    {area}
                  </span>
                </div>
                <span className="hidden md:block text-[0.68rem] tracking-[0.2em] uppercase text-graphite font-semibold group-hover:text-stone transition-colors duration-300">
                  Southern Oregon
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p className="text-stone text-sm font-light leading-relaxed max-w-[420px]">
              Outside these cities? Contact us — we serve the broader Southern Oregon region and can confirm availability for your location.
            </p>
            <Button href="#contact" variant="secondary" light>Check Availability</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
