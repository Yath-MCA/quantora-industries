import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import wallSign from '@/assets/quantora-wall-sign.png'
import { SectionHeading } from './SectionHeading'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Company"
        title="About Quantora Industries"
        description="A partnership firm focused on sheet-metal stampings, assemblies, and press tooling for industrial customers across Tamil Nadu."
        className="website-section-reveal"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div className="website-section-reveal space-y-6 text-base leading-relaxed text-brand-navy/80">
          <p>
            We supply OEM and Tier programmes with stamped and fabricated
            components, welded and riveted assemblies, coated parts, and the
            press tools, dies, jigs, and fixtures that keep production
            repeatable.
          </p>
          <p>
            Operations are rooted in Tamil Nadu&apos;s manufacturing corridor —
            close to automotive and engineering demand, with schedules and
            quality expectations that match industrial supply chains.
          </p>
          <p>
            Company legal, GST, and bank details for transactions are managed
            inside our staff ERP. This site is the public face of our
            manufacturing capability.
          </p>
        </div>

        <figure className="website-section-reveal overflow-hidden rounded-lg border border-brand-silver bg-white p-2 shadow-sm">
          <img
            src={wallSign}
            alt="Quantora Industries wall sign at the registered office in Chennai"
            className="w-full rounded-md"
          />
          <figcaption className="px-2 pb-2 pt-3 text-xs tracking-wide text-brand-navy/60">
            Registered office · Chennai
          </figcaption>
        </figure>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button
          asChild
          className="bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy-light"
        >
          <Link to="/capabilities">
            View capabilities
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-brand-navy/25 text-brand-navy hover:bg-brand-navy/5 hover:text-brand-navy"
        >
          <Link to="/contact">Get in touch</Link>
        </Button>
      </div>
    </div>
  )
}
