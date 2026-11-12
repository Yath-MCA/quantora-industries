import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOME_HERO_SLIDES, type HomeHeroSlide } from './homeContent'

const DRAG_CLICK_THRESHOLD = 8

function HeroSlide({
  slide,
  index,
}: {
  slide: HomeHeroSlide
  index: number
}) {
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (
      start &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) >
        DRAG_CLICK_THRESHOLD
    ) {
      event.preventDefault()
    }
  }

  const className =
    'group relative block aspect-[4/5] w-full overflow-hidden bg-brand-navy-dark focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-sky md:aspect-[8/3]'

  const content = (
    <picture>
      <source media="(max-width: 767px)" srcSet={slide.mobile} />
      <img
        src={slide.desktop}
        alt={slide.alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-[filter] duration-300 group-hover:brightness-[1.04]"
      />
    </picture>
  )

  if (slide.external) {
    return (
      <a
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      to={slide.href}
      className={className}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      {content}
    </Link>
  )
}

export function HomeCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 24 }, [
    autoplay,
  ])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    if (playing && !reduceMotion) autoplay.play()
    else autoplay.stop()
  }, [autoplay, emblaApi, playing, reduceMotion])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      className="relative bg-brand-navy-dark"
      aria-roledescription="carousel"
      aria-label="Quantora highlights"
    >
      <h1 className="sr-only">
        Quantora Industries — sheet-metal stampings, assemblies, and press
        tooling in Chennai, Tamil Nadu
      </h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {HOME_HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-0 shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${HOME_HERO_SLIDES.length}`}
            >
              <HeroSlide slide={slide} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4 md:px-6 md:pb-5">
        <div
          className="pointer-events-auto flex items-center gap-2 rounded-full bg-brand-navy-dark/45 px-3 py-2 backdrop-blur-sm"
          role="tablist"
          aria-label="Carousel slides"
        >
          {HOME_HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'h-2.5 rounded-full border transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky',
                index === selectedIndex
                  ? 'w-8 border-brand-sky bg-brand-sky'
                  : 'w-2.5 border-white/60 bg-white/30 hover:bg-white/60',
              )}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {!reduceMotion ? (
            <button
              type="button"
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-brand-navy-dark/45 text-white backdrop-blur-sm transition-colors hover:bg-brand-navy-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Previous slide"
            className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-brand-navy-dark/45 text-white backdrop-blur-sm transition-colors hover:bg-brand-navy-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
            onClick={scrollPrev}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-brand-navy-dark/45 text-white backdrop-blur-sm transition-colors hover:bg-brand-navy-dark/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
            onClick={scrollNext}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

