import { useState } from 'react'
import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  src: string
  alt: string
  label: string
  className?: string
  imgClassName?: string
}

function PlaceholderPanel({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex size-full items-center justify-center bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark',
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(oklch(0.9_0.01_250_/0.4)_1px,transparent_1px),linear-gradient(90deg,oklch(0.9_0.01_250_/0.4)_1px,transparent_1px)] [background-size:40px_40px]" />
      <span className="relative px-4 text-center text-sm font-medium tracking-wide text-brand-silver/90 md:text-base">
        {label}
      </span>
    </div>
  )
}

/** Prefix with Vite `base` so GitHub Pages (and local with base) resolve public assets. */
function withBase(src: string) {
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith(import.meta.env.BASE_URL)) return src
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
}

/**
 * Prefer the given raster (png/jpg), then a sibling .svg placeholder under public/.
 */
function resolveCandidates(src: string): string[] {
  const rooted = withBase(src)
  if (/\.(png|jpe?g)$/i.test(src)) {
    const svgSibling = withBase(src.replace(/\.(png|jpe?g)$/i, '.svg'))
    return rooted === svgSibling ? [rooted] : [rooted, svgSibling]
  }
  return [rooted]
}

/**
 * Loads public website images with BASE_URL. Falls back to matching `.svg`,
 * then a CSS metal panel.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  className,
  imgClassName,
}: ImagePlaceholderProps) {
  const candidates = resolveCandidates(src)
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const currentSrc = candidates[index]

  return (
    <div className={cn('relative overflow-hidden bg-brand-navy-dark', className)}>
      {!loaded || failed ? <PlaceholderPanel label={label} /> : null}
      {!failed && currentSrc ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          className={cn(
            'size-full object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'absolute inset-0 opacity-0',
            imgClassName,
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            const next = index + 1
            if (next < candidates.length) {
              setIndex(next)
              setLoaded(false)
            } else {
              setFailed(true)
            }
          }}
        />
      ) : null}
    </div>
  )
}
