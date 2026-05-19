// components/sections/About.tsx
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { SITE_CONFIG } from '@/data/config'
import { PRIMARY_SERVICE_AREAS } from '@/data/serviceAreas'

const STATS = [
  { num: SITE_CONFIG.reviewRating,          label: 'Google Rating' },
  { num: `${SITE_CONFIG.reviewCount}+`,     label: 'Verified Reviews' },
  { num: '100%',                            label: 'Owner-Operated' },
  { num: `${SITE_CONFIG.experience} yrs`,   label: 'Experience' },
]

export function About() {
  return (
    <section id="about" className="bg-ink border-b border-charcoal pt-16 md:pt-24">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left — photo, full bleed, fills row height */}
            <div className="relative min-h-[480px] md:min-h-0 overflow-hidden bg-charcoal">
              <Image
                src="/images/about.jpeg"
                alt="Reece — Detail Haus owner"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Right — all content, determines row height */}
            <div className="flex flex-col justify-between gap-12 py-16 md:py-24 px-0 md:pl-20">
              <div>
                <div className="font-body text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-stone mb-4">
                  05 / About · The Operator
                </div>
                <h2 className="font-display font-bold text-[clamp(2rem,3.5vw,3rem)] leading-[1.3] tracking-[-0.02em] text-white mb-8">
                  Owner-operated.<br />Built on <em className="not-italic text-stone font-normal">repeat clients.</em>
                </h2>
                <div className="flex flex-col gap-5 text-stone text-[0.95rem] leading-[1.7] font-light max-w-[460px]">
                  <p>Detail Haus is a one-person mobile detailing business based in Southern Oregon. Reece runs every job personally — the same eyes that quote your vehicle are the ones doing the work.</p>
                  <p>The mobile setup carries everything needed for a full detail: water, power, professional polishers, extractors, and the same products used on enthusiast and show vehicles.</p>
                  <p>Most of the business comes from referrals and repeat clients. The goal is straightforward: deliver work people will actually recommend.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-charcoal pt-10">
                {STATS.map(stat => (
                  <div key={stat.label}>
                    <div className="font-display font-bold text-[2.2rem] leading-none tracking-[-0.02em] text-white">{stat.num}</div>
                    <span className="text-[0.7rem] tracking-[0.18em] uppercase text-stone font-semibold mt-2 block">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="py-8 border-t border-charcoal flex gap-6 flex-wrap items-center">
            <span className="text-[0.72rem] tracking-[0.18em] uppercase text-stone font-semibold">Service Area:</span>
            {PRIMARY_SERVICE_AREAS.map(area => (
              <span key={area} className="px-4 py-2 border border-charcoal rounded-full text-[0.82rem] text-white font-light">
                {area}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="py-10 border-t border-charcoal flex justify-center md:justify-start">
            <div className="inline-flex items-center gap-5 border border-charcoal px-6 py-4">
              <div className="relative w-24 h-7">
                <Image
                  src="/images/Coatresa-Cerakote-logo.png"
                  alt="Cerakote"
                  fill
                  className="object-contain grayscale invert opacity-90"
                />
              </div>
              <span className="h-7 w-px bg-charcoal" aria-hidden />
              <span className="text-[0.72rem] tracking-[0.2em] uppercase text-white font-semibold">
                ProTeam Installer
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
