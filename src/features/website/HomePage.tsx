import { HOME_TRUST_STRIP } from './homeContent'
import { HomeCarousel } from './HomeCarousel'
import { HomeGallery } from './HomeGallery'
import { HomeImageCards } from './HomeImageCards'
import { CtaBand } from './CtaBand'

export function HomePage() {
  return (
    <>
      <HomeCarousel />

      <div className="border-b border-brand-silver bg-white">
        <p className="mx-auto max-w-6xl px-4 py-3 text-center text-xs font-medium tracking-[0.16em] text-brand-navy/70 uppercase md:px-6">
          {HOME_TRUST_STRIP.join(' · ')}
        </p>
      </div>

      <HomeGallery />
      <HomeImageCards />
      <CtaBand />
    </>
  )
}
