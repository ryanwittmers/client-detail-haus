// components/sections/Hero.tsx
'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

interface HeroSlide {
  tag:   string
  title: React.ReactNode
  sub:   string
  image: string
  label: string
}

const SLIDES: HeroSlide[] = [
  {
    tag:   'Southern Oregon · Mobile Detailing',
    title: <>Studio-grade<br />detailing,<br /><em className="not-italic font-medium text-stone">at your door.</em></>,
    sub:   'Premium mobile auto detailing serving Medford, Jacksonville, and Central Point. Book online, send a few photos, and we bring everything needed to your driveway.',
    image: '/images/hero-1.jpg',
    label: 'Detail Haus · Southern Oregon',
  },
  // Additional slides added when client provides photos
]

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[active]

  return (
    <section className="pt-40 pb-24 border-b border-charcoal relative bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.18em] uppercase text-stone font-semibold">
              <span className="w-6 h-px bg-stone" />
              {slide.tag}
            </div>
            <h1 className="font-display font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[1.4] tracking-[-0.02em] text-white">
              {slide.title}
            </h1>
            <p className="text-lg leading-relaxed text-stone font-light max-w-[480px]">{slide.sub}</p>
            <div className="flex gap-4 flex-wrap">
              <Button href="#contact" variant="primary" arrow>Book Now</Button>
              <Button href="#services" variant="secondary" light>View Services</Button>
            </div>
            {SLIDES.length > 1 && (
              <div className="flex gap-2 mt-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-px transition-all duration-300 ${i === active ? 'w-8 bg-stone' : 'w-4 bg-charcoal'}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal border border-charcoal/50">
            <div className="absolute bottom-4 left-4 bg-black/60 px-3.5 py-2 text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-stone">
              {slide.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
