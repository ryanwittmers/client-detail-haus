// components/sections/Reviews.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { REVIEWS } from '@/data/reviews'
import { SITE_CONFIG } from '@/data/config'

export function Reviews() {
  return (
    <section id="reviews" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="06 / Reviews"
            label="Word of Mouth"
            title={<>From recent<br /><em>clients.</em></>}
            description={`${SITE_CONFIG.reviewCount} verified Google reviews. ${SITE_CONFIG.reviewRating} average. Below are a few highlights.`}
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(review => (
              <div key={review.name} className="bg-charcoal p-9 flex flex-col gap-5 hover:bg-[#2d2b29] transition-colors">
                <div className="text-stone text-[0.85rem] tracking-[0.25em]">★★★★★</div>
                <p className="text-[0.95rem] leading-[1.65] text-white font-light flex-1">{review.quote}</p>
                <div className="flex flex-col gap-1 pt-4 border-t border-black/30 mt-auto">
                  <div className="font-display font-semibold text-[0.95rem] text-white">{review.name}</div>
                  <div className="text-[0.72rem] tracking-[0.1em] uppercase text-stone font-medium">{review.source}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <Button href={SITE_CONFIG.googleReviewUrl} variant="secondary" light arrow>
              Read all {SITE_CONFIG.reviewCount} reviews on Google
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
