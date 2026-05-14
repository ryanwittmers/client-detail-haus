# Detail Haus — HTML Mockup to Next.js Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the `detail-haus-mockup.html` single-file mockup into a production-ready Next.js + Tailwind site, applying all confirmed changes from the 2026-05-11 client meeting.

**Architecture:** Single-page marketing site built as a Next.js App Router app. All content managed through TypeScript data files under `/data` so pricing, add-ons, service areas, and reviews can be updated without touching JSX. Sections become isolated React components rendered server-side; the only client components are the hero carousel, contact form, and Instagram embed.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS v3, TypeScript, Syne + Manrope via `next/font/google`, Vercel hosting, optional: Elfsight or Behold for Instagram embed.

---

## Confirmed Changes From Meeting Notes (vs. Current Mockup)

Before implementation, note every delta between the mockup and what ships:

| Area | Mockup State | Required Change |
|---|---|---|
| Color theme | White/light background | Dark theme throughout |
| Photo treatment | Grayscale → color on hover | Full-color always, no hover effect |
| Hero layout | Static 2-col with photo | Scrolling/auto-advancing hero; video option |
| Hero headline font | Current heading style | Match "Every surface handled" display style |
| Experience stat | "7+ Years" | "2+ Years" |
| Review count stat | "45+ 5-Star Reviews" | "60 Reviews · 5.0 Rating" |
| Service area pills | Medford, Ashland, Grants Pass, CP, Phoenix, Talent, Eagle Point | Display only: Medford, Jacksonville, Central Point |
| Hero sub-copy | Lists Ashland & Grants Pass | Update to reflect primary service area |
| Footer service area | Ashland, Grants Pass listed | Update to Medford, Jacksonville, Central Point |
| Pet Hair Removal price | $40 | $50–$80 |
| Engine Bay Detail price | $60 | $50 |
| Ceramic Spray Coating price | $120 | $80–$120 |
| Clay Bar Treatment price | $50 | $100–$200 |
| Odor Treatment price | $45 | $50 |
| Leather Reconditioning price | $70 | $50 |
| Package prices | Static "Starting at $X" | Range-based (e.g. "$149–$249") |
| Add-ons missing | — | Add: Spot extraction, Trim restoration, Paint correction (no prices) |
| Sections missing | — | Add: Products/brands, Instagram feed, Service area module w/ map |
| Products list | None | Cerakote, P&S, Koch Chemie, CarPro |
| Maintenance plan | Not mentioned | Add mention ($100/mo starting) |
| Certifications | None | Cerakote installer badge (if logo provided) |
| Accent toggle | Dev-only toggle (keep as-is) | Remove before production |
| Gas fee policy | Not on site | Keep off site — handle by phone |

---

## Open Questions / Blockers

These must be resolved before or during Phase 3:

1. **Accent color** — Burgundy (#8B1E1E) vs amber (#B8731F) vs alternative. Decision gates hero, pricing CTA, and stat highlights.
2. **Package price ranges** — Upper bounds for Refresh, Full Detail, and The Works tiers (lower bounds are $149, $299, $599). Client to confirm.
3. **Photo/video assets** — When will action shots of Reece detailing be available? Background video clip for moving hero?
4. **Logo source file** — Canva export or original font name. Needed to match header/hero typography.
5. **Tier copy** — Exact descriptions and feature lists for each package (in client's words, not copied from Chano's site).
6. **Cerakote badge/logo** — Official installer badge file for Products section.
7. **Instagram handle** — Exact handle for @detailhaus link and embed configuration.
8. **Service area map** — Visual boundary preference (embed a map, custom SVG, or photo of the region)?
9. **Review copy** — May surface 2–3 additional reviews beyond the 3 already in the mockup for the 60-review refresh.

---

## File Structure

```
detail-haus/
├── app/
│   ├── layout.tsx           # Root layout: fonts, metadata, Nav, Footer
│   ├── page.tsx             # Section assembly in order
│   └── globals.css          # CSS variables, base resets, Tailwind directives
├── components/
│   ├── layout/
│   │   ├── Nav.tsx          # Fixed header with logo + nav links
│   │   └── Footer.tsx       # Four-col footer grid
│   ├── sections/
│   │   ├── Hero.tsx         # Scrolling/carousel hero (client component)
│   │   ├── Services.tsx     # 4-service grid with contextual icons
│   │   ├── Pricing.tsx      # Three-tier package cards
│   │   ├── AddOns.tsx       # Add-on cards grid + no-price services
│   │   ├── Process.tsx      # 4-step process row
│   │   ├── About.tsx        # Dark manifesto + stats + service area pills
│   │   ├── Reviews.tsx      # 3-col review cards + Google link
│   │   ├── Products.tsx     # Brand logo grid (NEW)
│   │   ├── ServiceArea.tsx  # Map embed + city list (NEW)
│   │   ├── Instagram.tsx    # Instagram embed (NEW, client component)
│   │   └── Contact.tsx      # Contact info + quote request form (client component)
│   └── ui/
│       ├── SectionHead.tsx  # Reusable numbered section header
│       ├── Button.tsx       # Primary + secondary button variants
│       └── Reveal.tsx       # IntersectionObserver scroll-reveal wrapper
├── data/
│   ├── packages.ts          # Tier names, price ranges, feature lists
│   ├── addons.ts            # Add-on names, prices (range or fixed), descriptions
│   ├── services.ts          # Service names, descriptions, icon references
│   ├── reviews.ts           # Review copy, author names
│   ├── products.ts          # Brand names, logo paths
│   ├── serviceAreas.ts      # City names, map config
│   └── config.ts            # Site-wide: phone, email, social handles, hours
├── public/
│   ├── images/              # Client photos, product logos, cert badges
│   └── video/               # Hero video clip (when provided)
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Phase Overview

| Phase | Goal | Gated By |
|---|---|---|
| 1 | Scaffold Next.js project, port CSS to Tailwind, stub all components | Nothing |
| 2 | Implement confirmed content and data changes from meeting notes | Nothing |
| 3 | Dark theme, image treatment, hero carousel | Accent color decision |
| 4 | New sections: Products, Service Area, Instagram | Assets/embed config |
| 5 | Contact form wiring + booking flow | Form backend decision |
| 6 | QA, polish, Vercel deploy docs | All phases complete |

---

## Task 1: Scaffold Next.js + Tailwind Project

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx` (stub)

- [ ] **Step 1: Initialize Next.js app**

```bash
bunx create-next-app@latest detail-haus-site \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd detail-haus-site
```

- [ ] **Step 2: Install fonts, icon, and upload dependencies**

```bash
bun add @tabler/icons-react uploadthing @uploadthing/react
```

Add `UPLOADTHING_TOKEN` to `.env.local` (get from uploadthing.com dashboard):

```
UPLOADTHING_TOKEN=your_token_here
```

- [ ] **Step 3: Configure Tailwind with design tokens from mockup**

In `tailwind.config.ts`, extend the theme:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white:    '#fdfdfd',
        bone:     '#f2f0ed',
        fog:      '#e5e3df',
        stone:    '#a8a5a0',
        graphite: '#6b6865',
        charcoal: '#2d2b29',
        ink:      '#1a1917',
        black:    '#0c0c0b',
        // accent is a CSS variable — do not hardcode here
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-manrope)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 4: Set up CSS variables and base styles in `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light only;
  --accent:       #8B1E1E;
  --accent-hover: #6F1818;
  --accent-soft:  rgba(139, 30, 30, 0.08);
  --accent-light: #E89090;
}

/* Swap to amber when client selects accent */
/* [data-accent="amber"] { --accent: #B8731F; ... } */

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; overflow-x: hidden; }
body { font-family: var(--font-manrope), sans-serif; -webkit-font-smoothing: antialiased; }
::selection { background: var(--accent); color: #fdfdfd; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-thumb { background: #a8a5a0; }
```

- [ ] **Step 5: Set up root layout with fonts**

```typescript
// app/layout.tsx
import { Syne, Manrope } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
})

export const metadata = {
  title: 'Detail Haus | Premium Mobile Auto Detailing',
  description: 'Premium mobile auto detailing serving Medford, Jacksonville, and Central Point.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Create stub `app/page.tsx` that imports sections in order**

```typescript
// app/page.tsx
export default function Home() {
  return (
    <main>
      {/* Sections imported here in Task 3+ */}
    </main>
  )
}
```

- [ ] **Step 7: Verify dev server starts cleanly**

```bash
bun dev
```

Expected: Server running at http://localhost:3000 with blank page and no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind project"
```

---

## Task 2: Build Shared UI Primitives

**Files:**
- Create: `components/ui/SectionHead.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Reveal.tsx`

- [ ] **Step 1: Write SectionHead component**

```typescript
// components/ui/SectionHead.tsx
interface SectionHeadProps {
  index: string       // e.g. "01 / Services"
  label: string       // e.g. "What We Do"
  title: React.ReactNode  // allows <em> spans
  description?: string
  light?: boolean     // true = white text (for dark sections)
}

export function SectionHead({ index, label, title, description, light }: SectionHeadProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-10 mb-14 pt-16 md:pt-24">
      <div className={`font-display font-medium text-sm tracking-[0.15em] pt-2.5 ${light ? 'text-[var(--accent-light)]' : 'text-[var(--accent)]'}`}>
        {index}
      </div>
      <div className="flex flex-col gap-4">
        <div className={`font-body text-[0.7rem] tracking-[0.2em] uppercase font-semibold ${light ? 'text-stone' : 'text-graphite'}`}>
          {label}
        </div>
        <h2 className={`font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.4] tracking-[-0.01em] [&_em]:not-italic [&_em]:font-medium [&_em]:text-[var(--accent)] ${light ? 'text-white [&_em]:text-[var(--accent-light)]' : 'text-ink'}`}>
          {title}
        </h2>
        {description && (
          <p className={`text-base leading-[1.65] font-light max-w-[560px] ${light ? 'text-white' : 'text-graphite'}`}>
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write Button component**

```typescript
// components/ui/Button.tsx
import Link from 'next/link'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
  arrow?: boolean
}

export function Button({ href, variant, children, className = '', arrow = false }: ButtonProps) {
  const base = 'inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold transition-all duration-200 no-underline'
  const styles = {
    primary:   `${base} bg-ink text-white hover:bg-[var(--accent)]`,
    secondary: `${base} bg-transparent text-ink border border-ink hover:bg-ink hover:text-white`,
  }
  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {children}
      {arrow && <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>}
    </Link>
  )
}
```

- [ ] **Step 3: Write Reveal scroll-animation wrapper (client component)**

```typescript
// components/ui/Reveal.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/
git commit -m "feat: add SectionHead, Button, and Reveal primitives"
```

---

## Task 3: Port Content Data Files

**Files:**
- Create: `data/config.ts`
- Create: `data/packages.ts`
- Create: `data/addons.ts`
- Create: `data/services.ts`
- Create: `data/reviews.ts`
- Create: `data/products.ts`
- Create: `data/serviceAreas.ts`

- [ ] **Step 1: Create site config**

```typescript
// data/config.ts
export const SITE_CONFIG = {
  phone:       '(541) 218-3083',
  phoneHref:   'tel:+15412183083',
  email:       'DetailHaus.or@gmail.com',
  emailHref:   'mailto:DetailHaus.or@gmail.com',
  instagram:   '@detailhaus',            // confirm exact handle
  instagramUrl: 'https://instagram.com/detailhaus', // confirm URL
  googleReviewUrl: '#',                  // replace with actual Google Maps review link
  experience:  '2+',
  reviewCount: '60',
  reviewRating: '5.0',
  location:    'Southern Oregon',
  maintenancePriceFrom: 100,
}
```

- [ ] **Step 2: Create packages data**

Package price ranges — lower bounds confirmed, upper bounds need client sign-off. Use placeholder upper bounds until confirmed.

```typescript
// data/packages.ts
export interface Package {
  id:          string
  index:       string
  name:        string
  priceFrom:   number
  priceTo:     number | null   // null = "Starting at" with no upper bound yet
  featured:    boolean
  duration:    string
  features:    string[]
  cta:         string
}

export const PACKAGES: Package[] = [
  {
    id:        'refresh',
    index:     '01',
    name:      'The Refresh',
    priceFrom: 149,
    priceTo:   null,           // TODO: confirm upper bound with client
    featured:  false,
    duration:  '2–3 hour service window',
    features: [
      'Full interior vacuum & wipe-down',
      'Hand wash exterior',
      'Window & glass cleaning',
      'Tire dressing',
    ],
    cta: 'Book Refresh',
  },
  {
    id:        'full-detail',
    index:     '02',
    name:      'The Full Detail',
    priceFrom: 299,
    priceTo:   null,           // TODO: confirm upper bound with client
    featured:  true,
    duration:  '4–6 hour service window',
    features: [
      'Everything in The Refresh',
      'Steam extraction on seats & carpets',
      'Leather cleaning & conditioning',
      'Clay bar treatment + sealant',
      'Engine bay wipe-down',
    ],
    cta: 'Book Detail',
  },
  {
    id:        'the-works',
    index:     '03',
    name:      'The Works',
    priceFrom: 599,
    priceTo:   null,           // TODO: confirm upper bound with client
    featured:  false,
    duration:  'Full-day service',
    features: [
      'Everything in The Full Detail',
      'Single-stage paint correction',
      'Headlight restoration included',
      'Premium ceramic spray sealant',
      'Trim restoration',
    ],
    cta: 'Book Works',
  },
]
```

- [ ] **Step 3: Create add-ons data with corrected prices**

```typescript
// data/addons.ts
export interface AddOn {
  name:        string
  priceFrom:   number | null   // null = price not published
  priceTo:     number | null
  description: string
}

export const ADDONS: AddOn[] = [
  {
    name:        'Engine Detail',
    priceFrom:   50,
    priceTo:     null,
    description: 'Degreased and dressed with a non-greasy protectant. Helps preserve plastics, hoses, and rubber components.',
  },
  {
    name:        'Odor Treatment',
    priceFrom:   50,
    priceTo:     null,
    description: 'Ozone or enzyme treatment that neutralizes smoke, pet, and food odors at the molecular level rather than masking them.',
  },
  {
    name:        'Hair Removal',
    priceFrom:   50,
    priceTo:     80,
    description: 'Specialized rubber tools and extended vacuuming to lift embedded pet or human hair from carpets, mats, and upholstery.',
  },
  {
    name:        'Clay Bar Treatment',
    priceFrom:   100,
    priceTo:     200,
    description: 'Removes bonded contaminants like overspray, rail dust, and tree sap that washing alone cannot lift. Required prep before sealant or coating.',
  },
  {
    name:        'Ceramic Spray Coating',
    priceFrom:   80,
    priceTo:     120,
    description: 'Up to 6 months of hydrophobic protection. Adds gloss, sheds water, and makes future washes faster.',
  },
  {
    name:        'Leather Reconditioning',
    priceFrom:   50,
    priceTo:     null,
    description: 'Cleaning, conditioning, and protectant for leather seats. Helps prevent cracking, fading, and dye transfer.',
  },
]

// Services listed without pricing — display name and description only
export const SERVICES_NO_PRICE: { name: string; description: string }[] = [
  {
    name:        'Spot Extraction',
    description: 'Targeted stain removal on upholstery and carpet. Quoted based on severity and area.',
  },
  {
    name:        'Trim Restoration',
    description: 'Plastic and rubber trim brought back from faded grey to deep black.',
  },
  {
    name:        'Paint Correction',
    description: 'Multi-stage machine polishing to remove swirl marks, light scratches, and oxidation. Quoted per vehicle.',
  },
]
```

- [ ] **Step 4: Create services data**

```typescript
// data/services.ts
export interface Service {
  index:       string
  name:        string
  description: string
  icon:        string   // icon name from @tabler/icons-react
}

export const SERVICES: Service[] = [
  {
    index:       '01',
    name:        'Interior Detail',
    description: 'Full vacuum, steam extraction on carpets and upholstery, leather conditioning, all hard surfaces wiped down, vents and door jambs cleaned.',
    icon:        'IconArmchair',
  },
  {
    index:       '02',
    name:        'Exterior Detail',
    description: 'Two-bucket hand wash, clay bar decontamination, wheels and tires cleaned, glass polished, and a hand-applied sealant for protection that holds up against Oregon weather.',
    icon:        'IconCar',
  },
  {
    index:       '03',
    name:        'Paint Correction',
    description: 'Multi-stage machine polishing to remove swirl marks, light scratches, and oxidation. Restores depth and clarity to the clear coat before any sealant or coating is applied.',
    icon:        'IconSparkles',  // represents polisher
  },
  {
    index:       '04',
    name:        'Headlight Restoration',
    description: 'Sanding, polishing, and UV-resistant sealing to restore yellowed or hazed lenses. Improves nighttime visibility and saves hundreds compared to replacing assemblies.',
    icon:        'IconBulb',
  },
]
```

- [ ] **Step 5: Create reviews data**

```typescript
// data/reviews.ts
export interface Review {
  quote:  string
  name:   string
  source: string
}

export const REVIEWS: Review[] = [
  {
    quote:  '"Made my car look like it just got driven off the lot. Stains left in the seats were completely extracted and look brand new. Trash that was tucked in crevices I couldn\'t reach was completely cleaned out. Recommending Detail Haus to everyone I know."',
    name:   'Tyler Covolo',
    source: 'Verified Google Review',
  },
  {
    quote:  '"Reece did a fantastic job on our RV. It looked better than when we first took delivery of the rig from the dealership. He brought his own supplies, including water, and did a thorough cleaning on the exterior. We\'re going to have him detail our other vehicle soon."',
    name:   'Byron Webb',
    source: 'Verified Google Review',
  },
  {
    quote:  '"Incredible job. The detail was done at my place of work, so when I was off, I left with basically a brand new car. Customer service matters a lot and they killed it. So shiny, smelled fresh, and the interior looked just as clean as when I bought it."',
    name:   'Alyssa T.',
    source: 'Verified Google Review',
  },
]
```

- [ ] **Step 6: Create products data**

```typescript
// data/products.ts
export interface Brand {
  name:    string
  logo:    string | null   // path in /public/images/brands/; null = text fallback
  note?:   string
}

export const BRANDS: Brand[] = [
  { name: 'Cerakote', logo: null, note: 'Certified Installer' },
  { name: 'P&S Detail Products', logo: null },
  { name: 'Koch Chemie', logo: null },
  { name: 'CarPro', logo: null },
]
```

- [ ] **Step 7: Create service areas data**

```typescript
// data/serviceAreas.ts
export const PRIMARY_SERVICE_AREAS = [
  'Medford',
  'Jacksonville',
  'Central Point',
]

// Do NOT render gas-fee policy or extended area list publicly
export const MAP_EMBED_URL: string | null = null  // TODO: add Google Maps embed URL
```

- [ ] **Step 8: Commit**

```bash
git add data/
git commit -m "feat: add typed content data files with corrected pricing"
```

---

## Task 4: Nav and Footer

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Write Nav component**

```typescript
// components/layout/Nav.tsx
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(26,25,23,0.92)] backdrop-blur-2xl border-b border-charcoal">
      <div className="max-w-[1320px] mx-auto px-10 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-px no-underline">
          <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-white text-ink border border-white">DETAIL</span>
          <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-transparent text-white border border-white">HAUS</span>
        </Link>
        <nav className="flex gap-9 items-center">
          <Link href="#services" className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Services</Link>
          <Link href="#pricing"  className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Pricing</Link>
          <Link href="#about"    className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">About</Link>
          <Link href="#reviews"  className="hidden md:block text-stone text-[0.78rem] tracking-[0.1em] uppercase font-medium hover:text-white transition-colors">Reviews</Link>
          <Link href="#contact"  className="text-[0.72rem] tracking-[0.12em] uppercase font-semibold px-5 py-2.5 rounded-full bg-white text-ink hover:bg-[var(--accent)] hover:text-white transition-colors">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Write Footer component**

```typescript
// components/layout/Footer.tsx
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { PRIMARY_SERVICE_AREAS } from '@/data/serviceAreas'

export function Footer() {
  return (
    <footer className="bg-black border-t border-charcoal">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-px no-underline w-fit">
              <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-white text-ink border border-white">DETAIL</span>
              <span className="font-display font-bold text-[0.85rem] tracking-[0.18em] px-3.5 py-1.5 leading-none bg-transparent text-white border border-white">HAUS</span>
            </Link>
            <p className="text-stone text-sm leading-relaxed font-light max-w-[280px]">
              Mobile auto detailing serving {PRIMARY_SERVICE_AREAS.join(', ')} and the surrounding area. Owner-operated.
            </p>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Navigate</h5>
            <ul className="flex flex-col gap-3">
              {['Services', 'Pricing', 'Add-Ons', 'About', 'Reviews'].map(item => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace('-', '')}`} className="text-stone text-sm hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Contact</h5>
            <ul className="flex flex-col gap-3 text-stone text-sm">
              <li><Link href={SITE_CONFIG.phoneHref}   className="hover:text-white transition-colors">{SITE_CONFIG.phone}</Link></li>
              <li><Link href={SITE_CONFIG.emailHref}   className="hover:text-white transition-colors">{SITE_CONFIG.email}</Link></li>
              <li><Link href={SITE_CONFIG.instagramUrl} className="hover:text-white transition-colors">{SITE_CONFIG.instagram}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-display font-semibold text-sm mb-5 tracking-wide">Service Area</h5>
            <ul className="flex flex-col gap-3 text-stone text-sm">
              {PRIMARY_SERVICE_AREAS.map(area => <li key={area}>{area}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-charcoal flex flex-col md:flex-row justify-between gap-4 text-stone text-xs">
          <p>© {new Date().getFullYear()} Detail Haus. All rights reserved.</p>
          <p>Site by <Link href="https://fathom.services" target="_blank" className="hover:text-white transition-colors">Fathom</Link></p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Wire layout into `app/layout.tsx`**

```typescript
// app/layout.tsx  (update the body)
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

// ...inside RootLayout:
<body className="bg-ink text-white">
  <Nav />
  <main>{children}</main>
  <Footer />
</body>
```

- [ ] **Step 4: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Nav and Footer with dark theme"
```

---

## Task 5: Hero Section (Scrolling Carousel)

**Files:**
- Create: `components/sections/Hero.tsx` (client component)

The hero carousel auto-advances every 5 seconds. On mobile it stacks vertically. When video is provided, the first slide becomes a full-bleed video background instead of a photo. Until video is provided, use photo placeholders.

- [ ] **Step 1: Write Hero component with auto-advancing carousel**

```typescript
// components/sections/Hero.tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
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
    title: <>Studio-grade<br />detailing,<br /><em className="font-medium not-italic text-[var(--accent-light)]">at your door.</em></>,
    sub:   'Premium mobile auto detailing serving Medford, Jacksonville, and Central Point. Book online, send a few photos, and we bring everything needed to your driveway.',
    image: '/images/hero-1.jpg',    // placeholder until client assets arrive
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
              <span className="w-6 h-px bg-[var(--accent)]" />
              {slide.tag}
            </div>
            <h1 className="font-display font-extrabold text-[clamp(3rem,7vw,6rem)] leading-[1.4] tracking-[-0.02em] text-white">
              {slide.title}
            </h1>
            <p className="text-lg leading-relaxed text-stone font-light max-w-[480px]">{slide.sub}</p>
            <div className="flex gap-4 flex-wrap">
              <Button href="#contact" variant="primary" arrow>Book Now</Button>
              <Button href="#services" variant="secondary">View Services</Button>
            </div>
            {SLIDES.length > 1 && (
              <div className="flex gap-2 mt-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-px transition-all duration-300 ${i === active ? 'w-8 bg-[var(--accent)]' : 'w-4 bg-charcoal'}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            {/* Replace with <video> when client provides clip */}
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-ink/90 px-3.5 py-2 text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-white">
              {slide.label}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add placeholder image to `/public/images/hero-1.jpg`**

Use any 800×1000 dark placeholder. This gets replaced by client photos.

- [ ] **Step 3: Register Hero in `app/page.tsx`**

```typescript
import { Hero } from '@/components/sections/Hero'
export default function Home() {
  return <main><Hero /></main>
}
```

- [ ] **Step 4: Verify in browser — auto-advance fires, dark theme renders correctly**

Run: `bun dev` and open http://localhost:3000

Expected: Dark hero section with auto-advancing indicator dots, correct typography, color photo (no grayscale).

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx public/images/
git commit -m "feat: add scrolling hero carousel with dark theme"
```

---

## Task 6: Services Section

**Files:**
- Create: `components/sections/Services.tsx`

- [ ] **Step 1: Write Services component**

```typescript
// components/sections/Services.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SERVICES } from '@/data/services'

export function Services() {
  return (
    <section id="services" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="01 / Services"
            label="What We Do"
            title={<>Every surface,<br /><em>handled.</em></>}
            description="Four core services, available individually or bundled into a package. Every job is done by the same person, start to finish."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-charcoal">
            {SERVICES.map((service, i) => (
              <div
                key={service.index}
                className={`py-10 grid grid-cols-[60px_1fr] gap-8 border-b border-charcoal
                  ${i % 2 === 0 ? 'md:pr-10 md:border-r md:border-r-charcoal' : 'md:pl-10'}`}
              >
                <div className="font-display font-semibold text-[0.85rem] text-stone tracking-[0.12em]">
                  {service.index}
                </div>
                <div>
                  <h3 className="font-display font-bold text-[1.4rem] mb-3 text-white tracking-[-0.005em]">
                    <span className="inline-block w-1.5 h-1.5 bg-[var(--accent)] mr-2 align-middle" />
                    {service.name}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-stone font-light">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Services to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat: add services section"
```

---

## Task 7: Pricing Section

**Files:**
- Create: `components/sections/Pricing.tsx`

Price display logic: if `priceTo` is set, show "$X–$Y". If null, show "From $X".

- [ ] **Step 1: Write Pricing component**

```typescript
// components/sections/Pricing.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { PACKAGES } from '@/data/packages'

function formatPrice(pkg: typeof PACKAGES[0]) {
  if (pkg.priceTo) return `$${pkg.priceFrom}–$${pkg.priceTo}`
  return `$${pkg.priceFrom}`
}

function formatPriceLabel(pkg: typeof PACKAGES[0]) {
  return pkg.priceTo ? 'Price range' : 'Starting at'
}

export function Pricing() {
  return (
    <section id="pricing" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="02 / Pricing"
            label="Packages"
            title={<>Three packages.<br /><em>Clear pricing.</em></>}
            description="Prices reflect a standard sedan in average condition. Larger vehicles, heavy soiling, or unique conditions may adjust the final quote. Send photos for an exact number."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal border border-charcoal">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                className={`flex flex-col gap-7 p-12 ${pkg.featured ? 'bg-charcoal' : 'bg-ink'}`}
              >
                <div>
                  <div className={`font-display font-medium text-[0.7rem] tracking-[0.18em] uppercase mb-3 ${pkg.featured ? 'text-[var(--accent-light)]' : 'text-stone'}`}>
                    {pkg.index} / {pkg.name}
                    {pkg.featured && <span className="text-stone font-normal"> · Most Popular</span>}
                  </div>
                  <h3 className="font-display font-bold text-[1.8rem] leading-none text-white">{pkg.name}</h3>
                </div>
                <div>
                  <span className={`font-body font-normal text-[0.75rem] tracking-[0.12em] uppercase block mb-1.5 ${pkg.featured ? 'text-stone' : 'text-graphite'}`}>
                    {formatPriceLabel(pkg)}
                  </span>
                  <div className="font-display font-extrabold text-[2.4rem] leading-none tracking-[-0.02em] text-white">
                    {formatPrice(pkg)}
                  </div>
                </div>
                <div className={`h-px ${pkg.featured ? 'bg-graphite' : 'bg-charcoal'}`} />
                <ul className="flex flex-col gap-3">
                  {pkg.features.map(f => (
                    <li key={f} className={`text-[0.9rem] leading-snug font-light flex gap-3 items-start ${pkg.featured ? 'text-white' : 'text-stone'}`}>
                      <span className={`mt-[0.2em] shrink-0 font-bold ${pkg.featured ? 'text-[var(--accent-light)]' : 'text-[var(--accent)]'}`}>+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    href="#contact"
                    variant={pkg.featured ? 'primary' : 'secondary'}
                    className="w-full justify-center"
                    arrow
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Pricing to `app/page.tsx`**

- [ ] **Step 3: Verify price display renders correctly for both "range" and "from" states**

- [ ] **Step 4: Commit**

```bash
git add components/sections/Pricing.tsx
git commit -m "feat: add pricing section with range-based display"
```

---

## Task 8: Add-Ons Section

**Files:**
- Create: `components/sections/AddOns.tsx`

Show confirmed add-ons with prices, then a second row of no-price services labeled "Also available — pricing on request."

- [ ] **Step 1: Write AddOns component**

```typescript
// components/sections/AddOns.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ADDONS, SERVICES_NO_PRICE } from '@/data/addons'

function formatAddonPrice(addon: typeof ADDONS[0]) {
  if (addon.priceFrom === null) return 'On request'
  if (addon.priceTo) return `$${addon.priceFrom}–$${addon.priceTo}`
  return `+$${addon.priceFrom}`
}

export function AddOns() {
  return (
    <section id="addons" className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="03 / Add-Ons"
            label="Extras"
            title={<>Optional<br /><em>upgrades.</em></>}
            description="Add any of these to a package, or book one on its own. Pricing varies slightly by vehicle size."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {ADDONS.map(addon => (
              <div key={addon.name} className="p-7 border border-charcoal bg-ink hover:border-[var(--accent)] transition-colors">
                <div className="flex justify-between items-baseline mb-3.5 gap-4">
                  <h4 className="font-display font-bold text-[1.05rem] tracking-[-0.005em] text-white">{addon.name}</h4>
                  <span className="font-display font-semibold text-[0.95rem] text-[var(--accent-light)] whitespace-nowrap">
                    {formatAddonPrice(addon)}
                  </span>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-stone font-light">{addon.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
        {SERVICES_NO_PRICE.length > 0 && (
          <Reveal>
            <div className="border-t border-charcoal pt-8">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-stone font-semibold mb-6">Also available — pricing on request</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES_NO_PRICE.map(s => (
                  <div key={s.name} className="p-7 border border-charcoal bg-ink">
                    <h4 className="font-display font-bold text-[1.05rem] text-white mb-3">{s.name}</h4>
                    <p className="text-[0.85rem] leading-relaxed text-stone font-light">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add AddOns to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/AddOns.tsx
git commit -m "feat: add add-ons section with corrected pricing and no-price services"
```

---

## Task 9: Process Section

**Files:**
- Create: `components/sections/Process.tsx`

No content changes needed from the mockup. Port as-is.

- [ ] **Step 1: Write Process component**

```typescript
// components/sections/Process.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'

const STEPS = [
  { num: '01', title: 'Book', body: 'Send photos of your vehicle and let us know what you\'re after. We\'ll reply with a quote and the next available date.' },
  { num: '02', title: 'Assess', body: 'On arrival, we walk the vehicle together to confirm scope and flag anything unexpected before getting started.' },
  { num: '03', title: 'Detail', body: 'Interior, exterior, and any add-ons completed on site. We supply our own water, power, and equipment.' },
  { num: '04', title: 'Walkthrough', body: 'A final walkaround together so you can review the work before payment. Anything that needs another pass gets one.' },
]

export function Process() {
  return (
    <section className="pb-24 border-b border-charcoal bg-charcoal">
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
              <div key={step.num} className={`py-10 ${i > 0 ? 'md:pl-7 md:border-l md:border-charcoal' : ''} ${i < STEPS.length - 1 ? 'md:pr-7' : ''} border-b border-charcoal md:border-b-0`}>
                <div className="font-display font-extrabold text-[3rem] leading-none text-[var(--accent)] mb-5">{step.num}</div>
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
```

- [ ] **Step 2: Add Process to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/Process.tsx
git commit -m "feat: add process section"
```

---

## Task 10: About Section (Dark Manifesto + Stats)

**Files:**
- Create: `components/sections/About.tsx`

Key corrections: experience = "2+" years, review count = "60", stats row updated accordingly. Service area pills show only Medford, Jacksonville, Central Point.

- [ ] **Step 1: Write About component**

```typescript
// components/sections/About.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SITE_CONFIG } from '@/data/config'
import { PRIMARY_SERVICE_AREAS } from '@/data/serviceAreas'

const STATS = [
  { num: SITE_CONFIG.reviewRating, label: 'Google Rating' },
  { num: `${SITE_CONFIG.reviewCount}+`, label: 'Verified Reviews' },
  { num: '100%', label: 'Owner-Operated' },
  { num: `${SITE_CONFIG.experience} yrs`, label: 'Experience' },
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
              Same hands on every vehicle, <em className="not-italic font-semibold text-[var(--accent-light)]">start to finish.</em>
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
              <div key={stat.label} className={`pt-8 ${i > 0 ? 'pl-6' : ''} ${i < STATS.length - 1 ? 'pr-6 border-r border-charcoal' : ''}`}>
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
```

- [ ] **Step 2: Add About to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add about section with corrected stats and service area"
```

---

## Task 11: Reviews Section

**Files:**
- Create: `components/sections/Reviews.tsx`

Update section desc to reflect 60 reviews. Link to actual Google review URL from `config.ts`.

- [ ] **Step 1: Write Reviews component**

```typescript
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
                <div className="text-[var(--accent-light)] text-[0.85rem] tracking-[0.25em]">★★★★★</div>
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
            <Button href={SITE_CONFIG.googleReviewUrl} variant="secondary" arrow>
              Read all {SITE_CONFIG.reviewCount} reviews on Google
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Reviews to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/Reviews.tsx
git commit -m "feat: add reviews section with updated review count"
```

---

## Task 12: Products / Brands Section (NEW)

**Files:**
- Create: `components/sections/Products.tsx`

Display the four brands the client actually uses. Use text fallback until logo files are provided. Cerakote gets a "Certified Installer" badge label.

- [ ] **Step 1: Write Products component**

```typescript
// components/sections/Products.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import Image from 'next/image'
import { BRANDS } from '@/data/products'

export function Products() {
  return (
    <section className="pb-24 border-b border-charcoal bg-charcoal">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="07 / Products"
            label="What We Use"
            title={<>Professional-grade<br /><em>chemistry.</em></>}
            description="Only products used on enthusiast and show vehicles. No shortcuts on materials."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink">
            {BRANDS.map(brand => (
              <div key={brand.name} className="bg-charcoal flex flex-col items-center justify-center py-12 px-8 gap-4 border border-ink">
                {brand.logo ? (
                  <Image src={brand.logo} alt={brand.name} width={120} height={40} className="object-contain filter invert opacity-80" />
                ) : (
                  <span className="font-display font-bold text-xl text-white text-center">{brand.name}</span>
                )}
                {brand.note && (
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--accent-light)] font-semibold">{brand.note}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Products to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/Products.tsx
git commit -m "feat: add products/brands section"
```

---

## Task 13: Service Area Section (NEW)

**Files:**
- Create: `components/sections/ServiceArea.tsx`

Display primary service cities and embed a map. If no embed URL is configured, render a city list only. Do not mention Ashland, Grants Pass, Eagle Point, or gas fees.

- [ ] **Step 1: Write ServiceArea component**

```typescript
// components/sections/ServiceArea.tsx
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { PRIMARY_SERVICE_AREAS, MAP_EMBED_URL } from '@/data/serviceAreas'

export function ServiceArea() {
  return (
    <section className="pb-24 border-b border-charcoal bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="08 / Service Area"
            label="Where We Work"
            title={<>Southern Oregon,<br /><em>brought to you.</em></>}
            description="We come to your driveway, office, or wherever the vehicle lives. No drop-off required."
            light
          />
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-stone font-semibold">Primary Service Cities</p>
              <ul className="flex flex-col divide-y divide-charcoal">
                {PRIMARY_SERVICE_AREAS.map(area => (
                  <li key={area} className="py-4 font-display font-semibold text-xl text-white">{area}</li>
                ))}
              </ul>
              <p className="text-stone text-sm font-light leading-relaxed">
                Serving the broader Southern Oregon region. Contact us to confirm availability for your location.
              </p>
            </div>
            <div className="aspect-[4/3] bg-charcoal border border-charcoal overflow-hidden">
              {MAP_EMBED_URL ? (
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Detail Haus Service Area Map"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone text-sm">
                  Map coming soon
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add ServiceArea to `app/page.tsx`**

- [ ] **Step 3: Commit**

```bash
git add components/sections/ServiceArea.tsx
git commit -m "feat: add service area section (no gas fee policy)"
```

---

## Task 14: Instagram Section (NEW)

**Files:**
- Create: `components/sections/Instagram.tsx`

Use a third-party embed widget (Elfsight or Behold). Render the embed as a client component. Until the widget is configured, render a placeholder CTA linking to the Instagram profile.

- [ ] **Step 1: Write Instagram component with graceful fallback**

```typescript
// components/sections/Instagram.tsx
'use client'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/config'

// When client provides Elfsight/Behold widget ID, replace WIDGET_ID
const WIDGET_ID: string | null = null  // e.g. 'elfsight-app-XXXXXXXX'

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
          <div className={WIDGET_ID} />
        ) : (
          <Reveal>
            <div className="border border-charcoal p-16 flex flex-col items-center gap-6 text-center">
              <p className="text-stone font-light text-lg">Photos and videos posted regularly.</p>
              <Button href={SITE_CONFIG.instagramUrl} variant="secondary" arrow>
                Follow {SITE_CONFIG.instagram} on Instagram
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Instagram to `app/page.tsx`**

- [ ] **Step 3: If Elfsight is the chosen provider, add their script to `app/layout.tsx`**

```typescript
// In <head> or via next/script:
<Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/Instagram.tsx
git commit -m "feat: add instagram section with embed placeholder"
```

---

## Task 15: UploadThing Setup

**Files:**
- Create: `app/api/uploadthing/core.ts`
- Create: `app/api/uploadthing/route.ts`
- Create: `lib/uploadthing.ts`
- Modify: `app/layout.tsx`

UploadThing handles the vehicle photo uploads. The file router allows up to 10 images, max 8 MB each. The uploaded URLs are collected in form state and submitted alongside the quote request.

- [ ] **Step 1: Create the UploadThing file router**

```typescript
// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  vehiclePhotos: f({ image: { maxFileSize: '8MB', maxFileCount: 10 } })
    .onUploadComplete(async ({ file }) => {
      // No auth needed — public quote form
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
```

- [ ] **Step 2: Create the API route handler**

```typescript
// app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

export const { GET, POST } = createRouteHandler({ router: ourFileRouter })
```

- [ ] **Step 3: Generate typed client helpers**

```typescript
// lib/uploadthing.ts
import { generateUploadDropzone } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
```

- [ ] **Step 4: Add NextSSRPlugin to root layout**

```typescript
// app/layout.tsx — add inside <body>, before {children}
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'

// In RootLayout body:
<body className="bg-ink text-white">
  <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
  <Nav />
  <main>{children}</main>
  <Footer />
</body>
```

- [ ] **Step 5: Verify API route works**

Start dev server and visit `http://localhost:3000/api/uploadthing`.

Expected: JSON response (not 404). If 404, confirm `UPLOADTHING_TOKEN` is set in `.env.local`.

- [ ] **Step 6: Commit**

```bash
git add app/api/uploadthing/ lib/uploadthing.ts app/layout.tsx
git commit -m "feat: add UploadThing file router for vehicle photo uploads"
```

---

## Task 16: Contact / Booking Form

**Files:**
- Create: `components/sections/Contact.tsx` (client component)

The form collects quote info and vehicle photos via UploadThing. Uploaded file URLs are stored in state and included in the submission payload. The form submission itself is UI-only initially — backend wired in Phase 5.

- [ ] **Step 1: Write Contact component with UploadThing integration**

```typescript
// components/sections/Contact.tsx
'use client'
import { useState } from 'react'
import { SectionHead } from '@/components/ui/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { SITE_CONFIG } from '@/data/config'
import { PACKAGES } from '@/data/packages'
import { ADDONS } from '@/data/addons'
import { UploadDropzone } from '@/lib/uploadthing'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // uploadedUrls available here for Phase 5 form backend
    console.log('Uploaded photo URLs:', uploadedUrls)
    // TODO Phase 5: POST { ...formFields, photoUrls: uploadedUrls } to form backend
    setSubmitted(true)
  }

  return (
    <section id="contact" className="pb-24 bg-ink">
      <div className="max-w-[1320px] mx-auto px-10">
        <Reveal>
          <SectionHead
            index="10 / Contact"
            label="Contact"
            title={<>Request a<br /><em>quote.</em></>}
            description="Share a few photos of the vehicle and tell us what you're interested in. Most quotes go out the same day."
            light
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-20">
          <Reveal>
            <div className="flex flex-col gap-8 text-stone">
              {[
                { label: 'Call or Text', value: SITE_CONFIG.phone, href: SITE_CONFIG.phoneHref },
                { label: 'Email', value: SITE_CONFIG.email, href: SITE_CONFIG.emailHref },
                { label: 'Hours', value: 'By appointment' },
                { label: 'Service Area', value: 'Southern Oregon' },
              ].map(m => (
                <div key={m.label}>
                  <div className="text-[0.7rem] tracking-[0.2em] uppercase font-semibold mb-1.5">{m.label}</div>
                  {m.href
                    ? <a href={m.href} className="text-white text-lg hover:text-[var(--accent-light)] transition-colors">{m.value}</a>
                    : <span className="text-white text-lg">{m.value}</span>
                  }
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            {submitted ? (
              <div className="border border-charcoal p-12 text-center">
                <p className="font-display font-bold text-2xl text-white mb-3">Request sent.</p>
                <p className="text-stone font-light">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Name</span>
                    <input type="text" required placeholder="Your full name" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Phone</span>
                    <input type="tel" required placeholder="(541) 555-0123" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors placeholder:text-graphite" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Email</span>
                  <input type="email" required placeholder="you@example.com" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors placeholder:text-graphite" />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Vehicle</span>
                    <input type="text" required placeholder="2021 Toyota Tacoma" className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors placeholder:text-graphite" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Package</span>
                    <select className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors">
                      <option value="">Not sure yet — recommend one</option>
                      {PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      <option value="addon">Add-ons only</option>
                    </select>
                  </label>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold mb-3">Add-Ons (optional)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ADDONS.map(addon => (
                      <label key={addon.name} className="flex items-center gap-2.5 cursor-pointer group">
                        <input type="checkbox" className="accent-[var(--accent)] w-4 h-4" />
                        <span className="text-sm text-stone group-hover:text-white transition-colors">{addon.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">Anything we should know?</span>
                  <textarea rows={4} placeholder="Vehicle condition, specific concerns, preferred dates, location, or anything else relevant." className="bg-charcoal border border-charcoal text-white px-4 py-3 text-sm focus:border-[var(--accent)] outline-none transition-colors placeholder:text-graphite resize-none" />
                </label>

                {/* ── Vehicle Photos via UploadThing ── */}
                <div className="flex flex-col gap-3">
                  <span className="text-[0.7rem] tracking-[0.15em] uppercase text-stone font-semibold">
                    Vehicle Photos <span className="normal-case tracking-normal font-normal opacity-60">(optional — up to 10, helps us quote accurately)</span>
                  </span>
                  <UploadDropzone
                    endpoint="vehiclePhotos"
                    onClientUploadComplete={(res) => {
                      setUploadedUrls(res.map(f => f.url))
                      setUploadError(null)
                    }}
                    onUploadError={(err) => {
                      setUploadError(`Upload failed: ${err.message}`)
                    }}
                    appearance={{
                      container: 'border border-charcoal bg-charcoal hover:border-[var(--accent)] transition-colors rounded-none p-8',
                      uploadIcon: 'text-stone',
                      label: 'text-stone text-sm',
                      allowedContent: 'text-graphite text-xs',
                      button: 'bg-white text-ink text-xs tracking-[0.1em] uppercase font-semibold rounded-full px-5 py-2.5 hover:bg-[var(--accent)] hover:text-white transition-colors ut-uploading:bg-[var(--accent)]',
                    }}
                  />
                  {uploadError && (
                    <p className="text-red-400 text-xs">{uploadError}</p>
                  )}
                  {uploadedUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedUrls.map(url => (
                        <img key={url} src={url} alt="Uploaded vehicle" className="w-16 h-16 object-cover border border-charcoal" />
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-[0.78rem] tracking-[0.12em] uppercase font-semibold bg-white text-ink hover:bg-[var(--accent)] hover:text-white transition-all duration-200 w-fit">
                  Send Request →
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Contact to `app/page.tsx`**

- [ ] **Step 3: Verify in browser**

- Upload 1–2 test images via the dropzone
- Confirm thumbnails appear below the dropzone after upload completes
- Confirm `uploadedUrls` logs to console on form submit
- Confirm submitted state renders correctly

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: add contact form with UploadThing vehicle photo uploads"
```

---

## Task 17: Final Page Assembly and Dark Theme Audit

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css` (if any base overrides needed)

- [ ] **Step 1: Assemble all sections in correct order in `app/page.tsx`**

```typescript
// app/page.tsx
import { Hero }        from '@/components/sections/Hero'
import { Services }    from '@/components/sections/Services'
import { Pricing }     from '@/components/sections/Pricing'
import { AddOns }      from '@/components/sections/AddOns'
import { Process }     from '@/components/sections/Process'
import { About }       from '@/components/sections/About'
import { Reviews }     from '@/components/sections/Reviews'
import { Products }    from '@/components/sections/Products'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { Instagram }   from '@/components/sections/Instagram'
import { Contact }     from '@/components/sections/Contact'

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
      <Contact />
    </main>
  )
}
```

- [ ] **Step 2: Dark theme audit — open in browser and verify**

Check each section:
- No white/light background sections (all should use `bg-ink`, `bg-charcoal`, or `bg-black`)
- No grayscale filter on any images
- No hover-to-color effects on photos
- Text is white or stone on dark backgrounds
- Accent color reads correctly against dark backgrounds

- [ ] **Step 3: Mobile audit at 375px viewport**

Check:
- Nav collapses correctly (only Book Now visible on mobile)
- Hero stacks vertically
- Services, Pricing, Add-Ons, Reviews all go to single column
- Process goes to single column
- Contact form stacks vertically

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble full page and verify dark theme"
```

---

## Task 18: Accent Color Placeholder System

**Files:**
- Modify: `app/globals.css`

The client has not finalized accent color. Build a one-line swap system so the decision can be applied instantly.

- [ ] **Step 1: Add both accent color sets as CSS variables with comments**

```css
/* app/globals.css — accent color options (client to confirm one) */
:root {
  /* OPTION A: Burgundy/Dark Red (current default) */
  --accent:       #8B1E1E;
  --accent-hover: #6F1818;
  --accent-soft:  rgba(139, 30, 30, 0.08);
  --accent-light: #E89090;

  /* OPTION B: Amber/Gold — uncomment below and comment out Option A to preview
  --accent:       #B8731F;
  --accent-hover: #95591A;
  --accent-soft:  rgba(184, 115, 31, 0.10);
  --accent-light: #E8B273;
  */
}
```

- [ ] **Step 2: Verify switching to Option B in globals.css updates accent throughout the site without other changes**

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "chore: document accent color swap options for client review"
```

---

## Task 19: Content Corrections Verification Pass

Before calling the build complete, run through every confirmed change from the meeting notes:

- [ ] Experience stat reads "2+" not "7+"
- [ ] Review stat reads "60" not "45+"
- [ ] Service area pills: Medford, Jacksonville, Central Point only (no Ashland, Grants Pass, Eagle Point)
- [ ] Hero sub-copy does not mention Ashland or Grants Pass
- [ ] Footer service area column: Medford, Jacksonville, Central Point
- [ ] Pet Hair Removal: $50–$80 (was $40)
- [ ] Engine Detail: $50 (was $60)
- [ ] Ceramic Spray Coating: $80–$120 (was $120 fixed)
- [ ] Clay Bar Treatment: $100–$200 (was $50 — critical fix)
- [ ] Odor Treatment: $50 (was $45)
- [ ] Leather Reconditioning: $50 (was $70)
- [ ] Add-ons added: Spot Extraction, Trim Restoration, Paint Correction (no prices)
- [ ] Products section present: Cerakote (Certified Installer), P&S, Koch Chemie, CarPro
- [ ] Service Area section present with no gas fee mention
- [ ] Instagram section present
- [ ] No accent color toggle widget in production build
- [ ] No internal pricing notes, gas fee policy, or extended service area on the site

- [ ] **Commit after any corrections found**

```bash
git add -A
git commit -m "fix: content corrections pass — pricing, stats, service areas"
```

---

## Task 20: Vercel Deploy Setup

**Files:**
- Create: `vercel.json` (if any config needed)

- [ ] **Step 1: Confirm repo is pushed to GitHub**

```bash
git remote -v
# if no remote: gh repo create detail-haus-site --private
git push -u origin main
```

- [ ] **Step 2: Connect repo to Vercel via Vercel dashboard**

1. Go to vercel.com → New Project
2. Import the GitHub repo
3. Framework: Next.js (auto-detected)
4. Build command: `bun run build` (or `next build`)
5. Deploy

- [ ] **Step 3: Confirm production URL resolves and all sections render**

- [ ] **Step 4: Document DNS steps for client's domain in a `docs/hosting.md` file**

Include:
- Add CNAME or A record pointing to Vercel
- Expected propagation time (24–48 hrs)
- How to trigger a redeploy (push to main)

---

## Phase 5 / Post-Launch: Form Backend (Separate Task)

Once the site is live and the client confirms the form service preference, wire the contact form submission. The `uploadedUrls` array is already captured in Contact form state — it just needs to be included in the POST body.

**Option A — Resend + API route:** `POST /api/quote` → send email to `DetailHaus.or@gmail.com` with fields + photo URLs
**Option B — Formspree:** Replace `onSubmit` with Formspree action URL; append photo URLs as a hidden field
**Option C — Netlify Forms:** Add `netlify` attribute to `<form>` if hosting moves to Netlify

Decision deferred — not required for initial launch. UploadThing photos will upload successfully regardless of which backend is chosen.

---

## Final QA Checklist

- [ ] Every pricing change from meeting notes applied and verified
- [ ] No gas fee policy or extended service area list visible anywhere
- [ ] Package prices show as ranges once upper bounds confirmed (or "Starting at $X" until then)
- [ ] Add-ons with corrected prices
- [ ] Three no-price services listed under "Also available"
- [ ] About section: "2+ years", "60 reviews"
- [ ] Service area: Medford, Jacksonville, Central Point only
- [ ] All photos display full-color (no grayscale, no hover-to-color)
- [ ] Dark theme throughout — no white/light backgrounds
- [ ] Accent color toggle removed from production
- [ ] Instagram section links to correct handle
- [ ] Google Reviews link goes to actual Google Maps listing
- [ ] Mobile layout verified at 375px
- [ ] Nav Book Now CTA works on mobile
- [ ] Contact form renders, checkboxes functional, confirmation state works
- [ ] No placeholder text ("TODO", "TBD", "Coming soon") visible to users
- [ ] Maintenance plan ($100/mo) mentioned somewhere (About or Pricing section footer copy)

---

## Open Questions Tracker

| # | Question | Blocks |
|---|---|---|
| 1 | Final accent color (burgundy vs amber vs other) | Task 17 finalization |
| 2 | Package price range upper bounds | Pricing section |
| 3 | Photo assets from client | Hero, Services contextual imagery |
| 4 | Background video clip | Hero video variant |
| 5 | Logo source file (Canva) | Typography match in Nav/Hero |
| 6 | Tier copy — what's included in each package (client's words) | Pricing feature lists |
| 7 | Cerakote installer badge file | Products section |
| 8 | Instagram exact handle confirmation | Instagram section + Footer |
| 9 | Google Maps review link (actual URL) | Reviews section CTA |
| 10 | Service area map embed preference (Google Maps iframe vs custom) | ServiceArea section |
| 11 | Form backend preference (Resend / Formspree / other) | Phase 5 |
| 12 | UploadThing token — create account at uploadthing.com and add `UPLOADTHING_TOKEN` to `.env.local` and Vercel env vars | Task 15 |
