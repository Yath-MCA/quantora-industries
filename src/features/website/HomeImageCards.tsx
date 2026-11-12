import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CAPABILITY_COUNT, HOME_CAPABILITY_TEASER } from './capabilities'
import { HOME_IMAGE_CARDS } from './homeContent'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function HomeImageCards() {
  return (
    <section className="website-section-reveal border-t border-brand-silver bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="Capabilities"
          title="What we manufacture"
          description="Three focus areas spanning stampings, assemblies, and in-house tooling development."
        />

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {HOME_IMAGE_CARDS.map((card) => (
            <li key={card.href}>
              <Link
                to={card.href}
                className="group block overflow-hidden rounded-lg border border-brand-silver bg-brand-paper transition-all hover:border-brand-sky hover:shadow-lg hover:shadow-brand-navy/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <ImagePlaceholder
                  src={card.src}
                  alt={card.title}
                  label={card.label}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="px-4 py-4 md:px-5">
                  <h3 className="text-lg font-semibold tracking-tight text-brand-navy-dark">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">
                    {card.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy">
                    View capabilities
                    <ArrowRight className="size-3.5 text-brand-blue transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-brand-silver pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-brand-navy/70">
            {HOME_CAPABILITY_TEASER}
          </p>
          <Link
            to="/capabilities"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-navy underline-offset-4 hover:text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            View all {CAPABILITY_COUNT} capabilities
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
