import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Calendar, FileText, CreditCard,
  Stethoscope, LogOut, ChevronRight, Heart, X, Menu,
  UserCircle, Bell, Search, Settings, Activity
} from 'lucide-react';

// ── Nav items keyed by role ──────────────────────────────────────────────────
const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard',         path: '/admin/dashboard',   icon: LayoutDashboard },
    { label: 'Patients',          path: '/admin/patients',    icon: Users            },
    { label: 'Doctors',           path: '/admin/doctors',     icon: Stethoscope      },
    { label: 'Appointments',      path: '/admin/appointments',icon: Calendar         },
    { label: 'Billing',           path: '/admin/billing',     icon: CreditCard       },
    { label: 'Reports',           path: '/admin/reports',     icon: FileText         },
  ],
  doctor: [
    { label: 'Dashboard',         path: '/doctor/dashboard',       icon: LayoutDashboard },
    { label: 'My Appointments',   path: '/doctor/appointments',    icon: Calendar         },
    { label: 'Patients',          path: '/doctor/patients',        icon: Users            },
    { label: 'Prescriptions',     path: '/doctor/prescriptions',   icon: FileText         },
  ],
  patient: [
    { label: 'Dashboard',         path: '/patient/dashboard',      icon: LayoutDashboard },
    { label: 'Book Appointment',  path: '/patient/book',           icon: Calendar         },
    { label: 'Medical History',   path: '/patient/records',        icon: FileText         },
    { label: 'Billing',           path: '/patient/billing',        icon: CreditCard       },
  ],
};

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ role = 'admin', open, onClose }) {
  const navigate  = useNavigate();
  const navItems  = NAV_ITEMS[role] || NAV_ITEMS.admin;

  const handleLogout = () => navigate('/login');

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? '' : 'collapsed'} lg:translate-x-0`}
        style={{ transform: open ? 'translateX(0)' : undefined }}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-none">MediCare</h1>
              <p className="text-sky-200 text-xs capitalize">{role} Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 flex flex-col gap-0.5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                 ${isActive
                   ? 'bg-white/20 text-white shadow-sm'
                   : 'text-sky-100 hover:bg-white/10 hover:text-white'}`
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-sky-300 flex items-center justify-center text-sky-900 font-bold text-sm">
              {role === 'admin' ? 'A' : role === 'doctor' ? 'D' : 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {role === 'admin' ? 'Admin User' : role === 'doctor' ? 'Dr. Smith' : 'John Patient'}
              </p>
              <p className="text-sky-300 text-xs capitalize truncate">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sky-200 hover:bg-white/10 hover:text-white text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ role, onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = [
    { id: 1, text: 'New appointment booked – Room 3', time: '2 min ago' },
    { id: 2, text: 'Lab results ready for P-1042',   time: '18 min ago' },
    { id: 3, text: 'Invoice #INV-2034 generated',    time: '1 hr ago'   },
  ];

  return (
    <header className="navbar">
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients, doctors…"
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse-slow" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
                <span className="badge badge-blue">3 new</span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <p className="text-sm text-slate-700">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </div>
              ))}
              <div className="px-4 py-2.5 text-center">
                <button className="text-sm text-sky-500 hover:text-sky-700 font-medium">View all</button>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xs">
            {role === 'admin' ? 'AD' : role === 'doctor' ? 'DR' : 'PT'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {role === 'admin' ? 'Admin' : role === 'doctor' ? 'Dr. Smith' : 'John Doe'}
            </p>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Layout Wrapper ───────────────────────────────────────────────────────────
export default function Layout({ children, role = 'admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-shell">
      <Sidebar
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Navbar
          role={role}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-6 min-h-screen">
          {children}
        </main>

        <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-100">
          © {new Date().getFullYear()} MediCare HMS · All rights reserved
        </footer>
      </div>
    </div>
  );
}
