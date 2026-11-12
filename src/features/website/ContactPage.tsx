import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DIRECTIONS_URL, REGISTERED_ADDRESS } from './homeContent'
import { SectionHeading } from './SectionHeading'

const phone =
  import.meta.env.VITE_PUBLIC_PHONE?.trim() || '+91 XXXXX XXXXX'
const email =
  import.meta.env.VITE_PUBLIC_EMAIL?.trim() || 'enquiries@example.com'
const address = import.meta.env.VITE_PUBLIC_ADDRESS?.trim() || REGISTERED_ADDRESS

export function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeading
        as="h1"
        eyebrow="Reach us"
        title="Contact"
        description="For RFQs, drawings, and capability discussions — use the details below. Staff ERP access is separate via Staff Login."
        className="website-section-reveal"
      />

      <div className="website-section-reveal mt-12 grid max-w-2xl gap-8">
        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-navy/5 text-brand-navy">
            <Phone className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-navy/60">Phone</p>
            <a
              href={phone.startsWith('+') || phone.startsWith('0') ? `tel:${phone.replace(/\s/g, '')}` : undefined}
              className="mt-0.5 block text-lg font-medium text-brand-navy-dark"
            >
              {phone}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-navy/5 text-brand-navy">
            <Mail className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-navy/60">Email</p>
            <a
              href={`mailto:${email}`}
              className="mt-0.5 block text-lg font-medium text-brand-navy-dark underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-navy/5 text-brand-navy">
            <MapPin className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-navy/60">Address</p>
            <p className="mt-0.5 text-lg font-medium text-brand-navy-dark">
              {address}
            </p>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              Get directions
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-3 border-t border-brand-silver pt-10">
        <Button
          asChild
          variant="outline"
          className="border-brand-navy/25 text-brand-navy hover:bg-brand-navy/5 hover:text-brand-navy"
        >
          <Link to="/capabilities">Browse capabilities</Link>
        </Button>
        <Button
          asChild
          className="bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy-light"
        >
          <Link to="/login">Staff Login</Link>
        </Button>
      </div>
    </div>
  )
}
