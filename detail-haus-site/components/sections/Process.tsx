// components/sections/Process.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', title: 'Book', body: "Send photos of your vehicle and let us know what you're after. We'll reply with a quote and the next available date." },
  { num: '02', title: 'Assess', body: 'On arrival, we walk the vehicle together to confirm scope and flag anything unexpected before getting started.' },
  { num: '03', title: 'Detail', body: 'Interior, exterior, and any add-ons completed on site. We supply our own water, power, and equipment.' },
  { num: '04', title: 'Walkthrough', body: "A final walkaround together so you can review the work before payment. Anything that needs another pass gets one." },
]

export function Process() {
  return (
    <section className="pb-24 border-b border-ink bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="04 / Process"
            label="How It Works"
            title={<>From booking<br /><em>to walkthrough.</em></>}
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`py-10 border-b border-charcoal md:border-b-0
                  ${i > 0 ? 'md:pl-7 md:border-l md:border-l-charcoal' : ''}
                  ${i < STEPS.length - 1 ? 'md:pr-7' : ''}`}
              >
                <div className="font-display font-extrabold text-[3rem] leading-none text-white mb-5">{step.num}</div>
                <h4 className="font-display font-bold text-[1.2rem] text-white mb-2.5">{step.title}</h4>
                <p className="text-[0.88rem] leading-relaxed text-stone font-light">{step.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
