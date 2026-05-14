// components/sections/ServiceArea.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { PRIMARY_SERVICE_AREAS, MAP_EMBED_URL } from '@/data/serviceAreas'

export function ServiceArea() {
  return (
    <section className="pb-24 border-b border-charcoal bg-ink">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-stone font-semibold">Primary Service Cities</p>
              <ul className="flex flex-col divide-y divide-charcoal">
                {PRIMARY_SERVICE_AREAS.map(area => (
                  <li key={area} className="py-4 font-display font-semibold text-xl text-white">{area}</li>
                ))}
              </ul>
              <p className="text-stone text-sm font-light leading-relaxed">
                Serving the broader Southern Oregon region. Contact us to confirm availability for your location.
              </p>
            </div>
            <div className="aspect-[4/3] bg-charcoal border border-charcoal overflow-hidden">
              {MAP_EMBED_URL ? (
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Detail Haus Service Area Map"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone text-sm">
                  Map coming soon
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
