import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CAPABILITY_GROUPS } from './capabilities'
import { SectionHeading } from './SectionHeading'

export function CapabilitiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Manufacturing catalogue"
        title="Capabilities"
        description="Full scope for OEM and Tier customers — stampings, assemblies, finishing, and in-house tooling development."
        className="website-section-reveal"
      />

      <div className="mt-14 space-y-16">
        {CAPABILITY_GROUPS.map((group, gi) => (
          <section
            key={group.id}
            id={group.id}
            className="website-capability-block scroll-mt-24"
            style={{ animationDelay: `${gi * 80}ms` }}
          >
            <h2 className="flex items-center gap-3 border-b border-brand-silver pb-3 text-xl font-semibold tracking-tight text-brand-navy-dark">
              <span className="h-4 w-1 rounded-full bg-brand-sky" aria-hidden />
              {group.title}
            </h2>
            <ol className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-3 text-brand-navy/80"
                >
                  <span className="w-7 shrink-0 tabular-nums text-sm font-medium text-brand-steel">
                    {String(
                      CAPABILITY_GROUPS.slice(0, gi).reduce(
                        (n, g) => n + g.items.length,
                        0,
                      ) +
                        i +
                        1,
                    ).padStart(2, '0')}
                  </span>
                  <span className="text-base leading-snug">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-brand-silver pt-10">
        <p className="text-sm text-brand-navy/70">
          Discuss drawings, volumes, or tooling programs with our team.
        </p>
        <Button
          asChild
          className="bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy-light"
        >
          <Link to="/contact">
            Contact us
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
