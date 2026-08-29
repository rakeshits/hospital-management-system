import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home',        path: '/'            },
  { label: 'About Us',    path: '/about'       },
  { label: 'Departments', path: '/departments' },
  { label: 'Our Doctors', path: '/doctors'     },
  { label: 'Login',       path: '/login'       },
  { label: 'Register',    path: '/signup'      },
];

const DEPARTMENTS = [
  'Cardiology', 'Orthopedics', 'Neurology',
  'Pediatrics', 'Gynecology', 'Dermatology',
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-[--color-forest-ink] rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-lg leading-none">MediCare HMS</p>
              <p className="text-[--color-sage-mist] text-xs">Your Health, Our Priority</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            A state-of-the-art hospital management system providing seamless care across all departments. NABH accredited.
          </p>
          <div className="flex gap-3">
            {['f', 'x', 'in', 'ig'].map((label) => (
              <a key={label} href="#" className="w-8 h-8 bg-slate-800 hover:bg-[--color-forest-ink] rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xs font-bold" aria-label={label}>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} className="text-sm hover:text-[--color-sage-mist] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Departments</h3>
          <ul className="flex flex-col gap-2">
            {DEPARTMENTS.map(d => (
              <li key={d}>
                <Link to="/departments" className="text-sm hover:text-[--color-sage-mist] transition-colors">{d}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[--color-sage-mist] shrink-0 mt-0.5" />
              <span>42, Health City Road, Bengaluru, Karnataka — 560001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[--color-sage-mist] shrink-0" />
              <span>+91 98765 00000 (24×7)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[--color-sage-mist] shrink-0" />
              <span>info@medicare-hms.com</span>
            </div>
          </div>

          <div className="mt-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-xs font-bold mb-0.5">🚨 Emergency Helpline</p>
            <p className="text-white text-lg font-extrabold">108 / +91 98765 00000</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} MediCare HMS. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-slate-300 transition-colors">HIPAA Compliance</a>
        </div>
      </div>
    </footer>
  );
}
