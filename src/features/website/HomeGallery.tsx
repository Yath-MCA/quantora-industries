import { cn } from '@/lib/utils'
import { HOME_GALLERY } from './homeContent'
import { ImagePlaceholder } from './ImagePlaceholder'
import { SectionHeading } from './SectionHeading'

export function HomeGallery() {
  return (
    <section className="website-section-reveal border-t border-brand-silver bg-brand-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <SectionHeading
          eyebrow="On the floor"
          title="Facility and work"
          description="Press capacity, stampings, assemblies, and tooling — the work behind OEM and Tier supply."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {HOME_GALLERY.map((photo, index) => (
            <figure
              key={photo.src}
              className={cn(
                'group relative overflow-hidden rounded-lg bg-brand-navy-dark',
                index === 0 && 'md:col-span-2 md:row-span-2',
                index === 3 && 'md:col-span-3',
              )}
            >
              <ImagePlaceholder
                src={photo.src}
                alt={photo.alt}
                label={photo.caption}
                className={cn(
                  'w-full',
                  index === 0
                    ? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[24rem]'
                    : index === 3
                      ? 'aspect-[16/9] md:aspect-[21/9]'
                      : 'aspect-[4/3]',
                )}
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark/85 to-transparent px-4 pb-3 pt-12 text-sm font-medium text-white md:px-5 md:pb-4">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
