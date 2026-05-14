// components/sections/AddOns.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ADDONS, SERVICES_NO_PRICE } from '@/data/addons'
import type { AddOn } from '@/data/addons'

function formatAddonPrice(addon: AddOn) {
  if (addon.priceFrom === null) return 'On request'
  if (addon.priceTo) return `$${addon.priceFrom}–$${addon.priceTo}`
  return `+$${addon.priceFrom}`
}

export function AddOns() {
  return (
    <section id="addons" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="03 / Add-Ons"
            label="Extras"
            title={<>Optional<br /><em>upgrades.</em></>}
            description="Add any of these to a package, or book one on its own. Pricing varies slightly by vehicle size."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {ADDONS.map(addon => (
              <div key={addon.name} className="p-7 border border-charcoal bg-ink hover:border-stone transition-colors">
                <div className="flex justify-between items-baseline mb-3.5 gap-4">
                  <h4 className="font-display font-bold text-[1.05rem] tracking-[-0.005em] text-white">{addon.name}</h4>
                  <span className="font-display font-semibold text-[0.95rem] text-stone whitespace-nowrap">
                    {formatAddonPrice(addon)}
                  </span>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-stone font-light">{addon.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
        {SERVICES_NO_PRICE.length > 0 && (
          <Reveal>
            <div className="border-t border-charcoal pt-8">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-stone font-semibold mb-6">Also available — pricing on request</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES_NO_PRICE.map(s => (
                  <div key={s.name} className="p-7 border border-charcoal bg-ink">
                    <h4 className="font-display font-bold text-[1.05rem] text-white mb-3">{s.name}</h4>
                    <p className="text-[0.85rem] leading-relaxed text-stone font-light">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
