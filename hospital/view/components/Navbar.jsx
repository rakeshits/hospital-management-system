import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ChevronDown, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',        path: '/'            },
  { label: 'About',       path: '/about'       },
  { label: 'Departments', path: '/departments' },
  { label: 'Doctors',     path: '/doctors'     },
];

/**
 * Public-facing Navbar
 * Used on all public routes (/, /about, /departments, /doctors, /login, /signup).
 * Authenticated users also see a "Go to Dashboard" button.
 */
export default function Navbar() {
  const navigate        = useNavigate();
  const location        = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for glass effect toggle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isOnHero = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled || !isOnHero
          ? 'bg-[--color-cream-paper]/95 backdrop-blur-md border-b border-[--color-border-mist]'
          : 'bg-transparent'}`}
    >
      {/* Top bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 bg-[--color-forest-ink] text-white text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" /> Emergency: +91 98765 00000
          </span>
          <span>Open 24 × 7 · All major insurance accepted</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login"  className="hover:text-[--color-sage-mist] transition-colors">Staff Login</Link>
          <span className="opacity-40">|</span>
          <Link to="/signup" className="hover:text-[--color-sage-mist] transition-colors">Patient Register</Link>
        </div>
      </div>

      {/* Main bar */}
      <nav className="flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-[--color-forest-ink] rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div className="leading-none">
            <span className={`font-extrabold text-lg block ${isOnHero && !scrolled ? 'text-white' : 'text-slate-800'}`}>
              MediCare
            </span>
            <span className={`text-xs ${isOnHero && !scrolled ? 'text-[--color-sage-mist]' : 'text-[--color-forest-ink]'}`}>HMS</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} end={path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150
                   ${isActive
                     ? 'bg-[--color-keylime-wash] text-[--color-forest-ink]'
                     : isOnHero && !scrolled
                       ? 'text-white/90 hover:bg-white/10'
                       : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`
                }>{label}</NavLink>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/login"
            className={`btn text-sm py-2 px-4 ${isOnHero && !scrolled ? 'btn-outline border-white text-white hover:bg-white hover:text-[--color-forest-ink]' : 'btn-ghost'}`}>
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary text-sm py-2 px-5">
            Book Appointment
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${isOnHero && !scrolled ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-[--color-cream-paper] border-t border-[--color-border-mist] animate-fade-in">
          <ul className="flex flex-col px-4 py-3 gap-0.5">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink to={path} end={path === '/'}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors
                     ${isActive ? 'bg-[--color-keylime-wash] text-[--color-forest-ink]' : 'text-slate-700 hover:bg-slate-50'}`
                  }>{label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 px-4 pb-4 pt-2 border-t border-slate-100">
            <Link to="/login"  className="btn btn-ghost w-full justify-center">Login</Link>
            <Link to="/signup" className="btn btn-primary w-full justify-center">Register as Patient</Link>
          </div>
        </div>
      )}
    </header>
  );
}
