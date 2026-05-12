// app/page.tsx
import { Hero }     from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Pricing }  from '@/components/sections/Pricing'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Pricing />
    </main>
  )
}
