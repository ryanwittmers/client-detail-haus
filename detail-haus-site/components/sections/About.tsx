// components/sections/About.tsx
import { SectionHead } from '@/components/ui/SectionHead'
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
    <section id="about" className="bg-ink py-28 border-b border-charcoal">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="05 / About"
            label="The Operator"
            title={<>Owner-operated.<br />Built on <em>repeat clients.</em></>}
            light
          />
        </Reveal>
        <Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-20 items-start">
            <div className="font-display font-medium text-[2rem] leading-[1.3] tracking-[-0.01em] text-white">
              Same hands on every vehicle,{' '}
              <em className="not-italic font-semibold text-[var(--accent-light)]">start to finish.</em>
            </div>
            <div className="flex flex-col gap-6 text-stone text-base leading-[1.7] font-light">
              <p>Detail Haus is a one-person mobile detailing business based in Southern Oregon. Reece runs every job personally, which means the same eyes that quote your vehicle are the ones doing the work.</p>
              <p>The mobile setup carries everything needed for a full detail: water, power, professional polishers, extractors, and the same products used on enthusiast and show vehicles. Service happens in your driveway, your office parking lot, or wherever the vehicle lives.</p>
              <p>Most of the business comes from referrals and repeat clients. The goal is straightforward: deliver work people will actually recommend.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-charcoal">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`pt-8 ${i > 0 ? 'pl-6' : ''} ${i < STATS.length - 1 ? 'pr-6 border-r border-charcoal' : ''}`}
              >
                <div className="font-display font-extrabold text-[2.6rem] leading-none tracking-[-0.02em] text-white">{stat.num}</div>
                <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[var(--accent-light)] font-semibold mt-2.5 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-14 flex gap-6 flex-wrap items-center">
            <span className="text-[0.72rem] tracking-[0.18em] uppercase text-stone font-semibold">Service Area:</span>
            {PRIMARY_SERVICE_AREAS.map(area => (
              <span key={area} className="px-4 py-2 border border-charcoal rounded-full text-[0.82rem] text-white font-light">
                {area}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
