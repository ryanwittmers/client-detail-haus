// app/page.tsx
import { Hero }     from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Pricing }  from '@/components/sections/Pricing'
import { AddOns }   from '@/components/sections/AddOns'
import { Process }  from '@/components/sections/Process'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Pricing />
      <AddOns />
      <Process />
    </main>
  )
}
