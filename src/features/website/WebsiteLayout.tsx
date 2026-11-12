import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logoFullDark from '@/assets/brand/logo/logo-full-for-dark-bg.png'
import logoQWhite from '@/assets/brand/logo/logo-q-white.png'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const ADDRESS = 'R60/2, South Avenue Road, Muthamizh Nagar, Kodungaiyur, Chennai 600118'

export function WebsiteLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="website-root flex min-h-svh flex-col bg-brand-paper text-brand-navy-dark">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-navy">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
          <Link
            to="/"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-sky"
          >
            <img
              src={logoFullDark}
              alt="Quantora Industries"
              className="h-9 w-auto md:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={'end' in item ? item.end : false}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white',
                    isActive && 'bg-white/10 text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button
              asChild
              size="sm"
              className="ml-2 bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy-light active:scale-[0.98]"
            >
              <Link to="/login">Staff Login</Link>
            </Button>
          </nav>

          <Button
            type="button"
            size="icon"
            className="border border-white/20 bg-transparent text-white hover:bg-white/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>

        {open ? (
          <nav
            className="border-t border-white/10 bg-brand-navy-dark px-4 pb-4 pt-3 md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={'end' in item ? item.end : false}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-3 py-2.5 text-sm font-medium text-white/75',
                      isActive && 'bg-white/10 text-white',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button
                asChild
                className="mt-2 bg-brand-blue font-semibold text-white hover:bg-brand-navy-light"
              >
                <Link to="/login" onClick={() => setOpen(false)}>
                  Staff Login
                </Link>
              </Button>
            </div>
          </nav>
        ) : null}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative overflow-hidden border-t border-white/10 bg-brand-navy-dark text-brand-silver">
        <img
          src={logoQWhite}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 hidden w-80 opacity-[0.06] lg:block"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
          <div>
            <img
              src={logoFullDark}
              alt="Quantora Industries"
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-silver/70">
              Partnership firm manufacturing sheet-metal stampings, assemblies,
              and press tooling for industrial customers in Tamil Nadu.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-silver/50">
              {ADDRESS}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/capabilities" className="hover:text-white">
              Capabilities
            </Link>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link to="/login" className="hover:text-white">
              Staff Login
            </Link>
          </div>
        </div>
        <div className="relative border-t border-white/10 py-4 text-center text-xs text-brand-steel">
          © {new Date().getFullYear()} Quantora Industries. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
