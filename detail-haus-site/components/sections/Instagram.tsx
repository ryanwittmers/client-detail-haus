// components/sections/Instagram.tsx
'use client'
import { useEffect, type FC, type HTMLAttributes } from 'react'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'

// Behold feed for the Detail Haus Instagram — manage at behold.so
const BEHOLD_FEED_ID = 'baiCq9sVl7mWDbAWvX8S'
const BEHOLD_SCRIPT = 'https://w.behold.so/widget.js'

// Behold's <behold-widget> is a custom element; type it so JSX/TS accept it.
const BeholdWidget = 'behold-widget' as unknown as FC<
  HTMLAttributes<HTMLElement> & { 'feed-id': string }
>

export function Instagram() {
  useEffect(() => {
    // Load Behold's widget script once (it upgrades all <behold-widget> elements).
    if (document.querySelector(`script[src="${BEHOLD_SCRIPT}"]`)) return
    const s = document.createElement('script')
    s.type = 'module'
    s.src = BEHOLD_SCRIPT
    document.head.append(s)
  }, [])

  return (
    <section className="pb-24 border-b border-charcoal bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="09 / Follow Along"
            label="Latest Work"
            title={<>See the results<br /><em>in real time.</em></>}
            description="Follow Detail Haus on Instagram for finished vehicles, before/afters, and availability updates."
            light
          />
        </Reveal>
        <Reveal>
          <BeholdWidget feed-id={BEHOLD_FEED_ID} />
        </Reveal>
      </div>
    </section>
  )
}
