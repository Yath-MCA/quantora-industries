import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import bgNavy from '@/assets/brand/backgrounds/bg-navy-1920x1080.jpg'
import bgNavyMobile from '@/assets/brand/backgrounds/bg-navy-mobile-1080x1920.jpg'
import logoQWhite from '@/assets/brand/logo/logo-q-white.png'

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy-dark">
      <picture>
        <source media="(max-width: 767px)" srcSet={bgNavyMobile} />
        <img
          src={bgNavy}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover opacity-40"
        />
      </picture>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy-dark via-brand-navy-dark/85 to-brand-navy/60"
        aria-hidden
      />
      <img
        src={logoQWhite}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-16 -z-10 w-64 opacity-10 md:w-96"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:flex-row md:items-end md:justify-between md:px-6 md:py-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-brand-sky" aria-hidden />
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-sky uppercase">
              Work with us
            </p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-4xl">
            Discuss drawings, volumes, or tooling programs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-silver/75">
            Send us your part requirements and we will respond with capability
            and capacity.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy-light"
          >
            <Link to="/contact">
              Contact us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-white transition-colors hover:bg-white/10 hover:text-white"
          >
            <Link to="/capabilities">View capabilities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
