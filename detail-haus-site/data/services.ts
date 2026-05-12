export interface Service {
  index:       string
  name:        string
  description: string
  icon:        string   // icon name from @tabler/icons-react (for future use)
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
    icon:        'IconSparkles',
  },
  {
    index:       '04',
    name:        'Headlight Restoration',
    description: 'Sanding, polishing, and UV-resistant sealing to restore yellowed or hazed lenses. Improves nighttime visibility and saves hundreds compared to replacing assemblies.',
    icon:        'IconBulb',
  },
]
