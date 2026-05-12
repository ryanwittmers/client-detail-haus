export interface Package {
  id:          string
  index:       string
  name:        string
  priceFrom:   number
  priceTo:     number | null   // null = "Starting at" with no upper bound confirmed yet
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
    priceTo:   null,
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
    priceTo:   null,
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
    priceTo:   null,
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
