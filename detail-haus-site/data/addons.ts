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
    priceTo:     100,
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
    name:        'Professional Ceramic Coating',
    priceFrom:   800,
    priceTo:     1200,
    description: 'Multi-year paint protection with a permanent-bond ceramic layer. Dramatically easier maintenance, deep gloss, and resistance to UV, chemicals, and light scratches. Included in The Works — available as a standalone add-on to any package.',
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
