export interface Brand {
  name:    string
  logo:    string | null   // path in /public/images/brands/; null = text fallback until logos provided
  note?:   string
}

export const BRANDS: Brand[] = [
  { name: 'Cerakote', logo: '/images/Coatresa-Cerakote-logo.png', note: 'Certified Installer' },
  { name: 'P&S Detail Products', logo: '/images/p-and-s.png' },
  { name: 'Koch Chemie', logo: '/images/kochchemie.svg' },
  { name: 'CarPro', logo: '/images/carpro.png' },
]
