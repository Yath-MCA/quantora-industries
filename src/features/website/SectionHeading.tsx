import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn('max-w-2xl', className)}>
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-brand-sky" aria-hidden />
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-navy-light uppercase">
          {eyebrow}
        </p>
      </div>
      <Heading className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy-dark md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-brand-navy/70">
          {description}
        </p>
      ) : null}
    </header>
  )
}
