// app/page.tsx
import { Hero }     from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Pricing }  from '@/components/sections/Pricing'
import { AddOns }   from '@/components/sections/AddOns'
import { Process }  from '@/components/sections/Process'
import { About }    from '@/components/sections/About'
import { Reviews }   from '@/components/sections/Reviews'
import { Products }     from '@/components/sections/Products'
import { ServiceArea }  from '@/components/sections/ServiceArea'
import { Instagram }    from '@/components/sections/Instagram'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Pricing />
      <AddOns />
      <Process />
      <About />
      <Reviews />
      <Products />
      <ServiceArea />
      <Instagram />
    </main>
  )
}
