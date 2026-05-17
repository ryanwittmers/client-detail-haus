export interface Service {
  index:         string
  name:          string
  description:   string
  icon:          string
  image:         string
  imagePosition?: string  // Tailwind object-position class, defaults to object-center
}

export const SERVICES: Service[] = [
  {
    index:       '01',
    name:        'Interior Detail',
    description: 'Full vacuum, steam extraction on carpets and upholstery, leather conditioning, all hard surfaces wiped down, vents and door jambs cleaned.',
    icon:        'IconArmchair',
    image:         '/images/services/interior.jpg',
    imagePosition: 'object-[center_25%]',
  },
  {
    index:       '02',
    name:        'Exterior Detail',
    description: 'Two-bucket hand wash, clay bar decontamination, wheels and tires cleaned, glass polished, and a hand-applied sealant for protection that holds up against Oregon weather.',
    icon:        'IconCar',
    image:       '/images/services/exterior.jpg',
  },
  {
    index:       '03',
    name:        'Paint Correction',
    description: 'Multi-stage machine polishing to remove swirl marks, light scratches, and oxidation. Restores depth and clarity to the clear coat before any sealant or coating is applied.',
    icon:        'IconSparkles',
    image:       '/images/services/paint-correction.jpg',
  },
  {
    index:       '04',
    name:        'Headlight Restoration',
    description: 'Sanding, polishing, and UV-resistant sealing to restore yellowed or hazed lenses. Improves nighttime visibility and saves hundreds compared to replacing assemblies.',
    icon:        'IconBulb',
    image:       '/images/services/headlight.jpg',
  },
]
