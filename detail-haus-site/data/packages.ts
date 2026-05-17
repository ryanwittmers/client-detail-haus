export interface Package {
  id:          string
  index:       string
  name:        string
  priceFrom:   number | null   // null = price on request
  priceTo:     number | null
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
    priceFrom: 100,
    priceTo:   250,
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
    priceFrom: 400,
    priceTo:   600,
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
    priceFrom: 800,
    priceTo:   1200,
    featured:  false,
    duration:  'Full-day service',
    features: [
      'Everything in The Full Detail',
      'Single-stage paint correction',
      'Headlight restoration included',
      'Professional ceramic coating',
      'Trim restoration',
    ],
    cta: 'Book Works',
  },
]
