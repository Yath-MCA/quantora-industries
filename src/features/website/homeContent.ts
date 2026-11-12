import slide1Desktop from '@/assets/brand/carousel/slide-1-desktop-1920x720.jpg'
import slide1Mobile from '@/assets/brand/carousel/slide-1-mobile-1080x1350.jpg'
import slide2Desktop from '@/assets/brand/carousel/slide-2-desktop-1920x720.jpg'
import slide2Mobile from '@/assets/brand/carousel/slide-2-mobile-1080x1350.jpg'
import slide3Desktop from '@/assets/brand/carousel/slide-3-desktop-1920x720.jpg'
import slide3Mobile from '@/assets/brand/carousel/slide-3-mobile-1080x1350.jpg'

export const REGISTERED_ADDRESS =
  'R60/2, South Avenue Road, Muthamizh Nagar, Kodungaiyur, Chennai 600118'

export const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(REGISTERED_ADDRESS)}`

export type HomeHeroSlide = {
  id: string
  desktop: string
  mobile: string
  alt: string
  href: string
  external?: boolean
}

export type HomeGalleryPhoto = {
  src: string
  alt: string
  caption: string
}

export type HomeImageCard = {
  src: string
  title: string
  description: string
  href: string
  label: string
}

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    id: 'welcome',
    desktop: slide1Desktop,
    mobile: slide1Mobile,
    alt: 'Welcome to Quantora Industries, Chennai, Tamil Nadu. Opens our capabilities.',
    href: '/capabilities',
  },
  {
    id: 'office',
    desktop: slide2Desktop,
    mobile: slide2Mobile,
    alt: `Visit our registered office: ${REGISTERED_ADDRESS}. Opens Google Maps directions.`,
    href: DIRECTIONS_URL,
    external: true,
  },
  {
    id: 'contact',
    desktop: slide3Desktop,
    mobile: slide3Mobile,
    alt: 'Get in touch — talk to us about your requirements. Opens the contact page.',
    href: '/contact',
  },
]

/** Facility photos — replace PNGs in public/website/ (same filenames) without code changes. */
export const HOME_GALLERY: HomeGalleryPhoto[] = [
  {
    src: '/website/THREE_MACHINE_RWO.png',
    alt: 'Press bay and facility floor',
    caption: 'Press bay capacity',
  },
  {
    src: '/website/CLOSE_OUTPUT_MACHINE.png',
    alt: 'Sheet metal stampings and pressed components',
    caption: 'Stampings and components',
  },
  {
    src: '/website/PROD_PEOPLE_QC.png',
    alt: 'Welded sheet metal assembly',
    caption: 'Assemblies and finishing',
  },
  {
    src: '/website/PNUMETIC_MACHINE.png',
    alt: 'Pneumatic press on the shop floor',
    caption: 'Press tooling in production',
  },
]

export const HOME_IMAGE_CARDS: HomeImageCard[] = [
  {
    src: '/website/PROD_PEOPLE_QC.png',
    title: 'Stampings and components',
    description:
      'Sheet metal stampings, pressed parts, and fabricated components.',
    href: '/capabilities#stampings',
    label: 'Stampings and components',
  },
  {
    src: '/website/SHORT_OUTPUT_MACHINE.png',
    title: 'Assemblies and finishing',
    description: 'Welded and riveted assemblies with coated components.',
    href: '/capabilities#assemblies',
    label: 'Assemblies and finishing',
  },
  {
    src: '/website/THREE_MACHINE_RWO.png',
    title: 'Tooling and development',
    description: 'Press tools, dies, jigs, fixtures, and tool design.',
    href: '/capabilities#tooling',
    label: 'Tooling and development',
  },
]

export const HOME_TRUST_STRIP = [
  'Partnership firm',
  'Chennai, Tamil Nadu',
  'Sheet metal & tooling',
] as const

