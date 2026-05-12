export interface Brand {
  name:    string
  logo:    string | null   // path in /public/images/brands/; null = text fallback until logos provided
  note?:   string
}

export const BRANDS: Brand[] = [
  { name: 'Cerakote', logo: null, note: 'Certified Installer' },
  { name: 'P&S Detail Products', logo: null },
  { name: 'Koch Chemie', logo: null },
  { name: 'CarPro', logo: null },
]
