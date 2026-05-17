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
      <div className={`font-display font-medium text-sm tracking-[0.15em] pt-2.5 ${light ? 'text-stone' : 'text-graphite'}`}>
        {index}
      </div>
      <div className="flex flex-col gap-4">
        <div className={`font-body text-[0.7rem] tracking-[0.2em] uppercase font-semibold ${light ? 'text-stone' : 'text-graphite'}`}>
          {label}
        </div>
        <h2 className={`font-display font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.3] tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>
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
