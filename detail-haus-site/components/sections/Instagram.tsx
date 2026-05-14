// components/sections/Instagram.tsx
'use client'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/config'

// When client provides Elfsight/Behold widget ID, set it here
const WIDGET_ID: string | null = null

export function Instagram() {
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
        {WIDGET_ID ? (
          <div data-elfsight-app-id={WIDGET_ID} className="elfsight-app" />
        ) : (
          <Reveal>
            <div className="border border-charcoal p-16 flex flex-col items-center gap-6 text-center bg-ink">
              <p className="text-stone font-light text-lg">Photos and videos posted regularly.</p>
              <Button href={SITE_CONFIG.instagramUrl} variant="secondary" light arrow>
                Follow {SITE_CONFIG.instagram} on Instagram
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
