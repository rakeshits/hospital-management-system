import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext.jsx';
import {
  Heart, LayoutDashboard, Users, Stethoscope, Building2, BedDouble,
  Receipt, Pill, CalendarDays, ClipboardList, UserCog,
  Calendar, FileText, FlaskConical, LogOut, X, ChevronRight,
} from 'lucide-react';

const MENUS = {
  admin: [
    { label: 'Dashboard',       path: '/admin/dashboard',    icon: LayoutDashboard },
    { label: 'Doctors',         path: '/admin/doctors',      icon: Stethoscope     },
    { label: 'Departments',     path: '/admin/departments',  icon: Building2       },
    { label: 'Rooms',           path: '/admin/rooms',        icon: BedDouble       },
    { label: 'Patients',        path: '/admin/patients',     icon: Users           },
    { label: 'Users',           path: '/admin/users',        icon: UserCog         },
    { label: 'Appointments',    path: '/admin/appointments', icon: CalendarDays    },
    { label: 'Admissions',      path: '/admin/admissions',   icon: ClipboardList   },
    { label: 'Billing',         path: '/admin/billing',      icon: Receipt         },
    { label: 'Medicines',       path: '/admin/medicines',    icon: Pill            },
  ],
  doctor: [
    { label: 'Dashboard',       path: '/doctor/dashboard',    icon: LayoutDashboard },
    { label: 'My Appointments', path: '/doctor/appointments', icon: CalendarDays    },
    { label: 'My Patients',     path: '/doctor/patients',     icon: Users           },
    { label: 'Prescribe',       path: '/doctor/prescribe',    icon: FlaskConical    },
  ],
  patient: [
    { label: 'Dashboard',       path: '/patient/dashboard',    icon: LayoutDashboard },
    { label: 'Book Appointment',path: '/patient/book',         icon: CalendarDays    },
    { label: 'My Appointments', path: '/patient/appointments', icon: Calendar        },
    { label: 'Medical History', path: '/patient/history',      icon: FileText        },
    { label: 'My Bills',        path: '/patient/billing',      icon: Receipt         },
    { label: 'My Profile',      path: '/patient/profile',      icon: UserCog         },
  ],
};

const ROLE_LABELS = { admin: 'Administrator', doctor: 'Doctor Portal', patient: 'Patient Portal' };
const ROLE_COLORS = { admin: 'from-[--color-forest-ink] via-[--color-forest-ink] to-[--color-forest-shadow]', doctor: 'from-emerald-900 via-teal-800 to-emerald-900', patient: 'from-violet-900 via-purple-800 to-violet-900' };

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'patient';
  const menu = MENUS[role] || [];
  const gradient = ROLE_COLORS[role];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar bg-gradient-to-b ${gradient} flex flex-col
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-extrabold text-base leading-none">MediCare</p>
              <p className="text-white/50 text-xs mt-0.5">{ROLE_LABELS[role]}</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User card */}
        <div className="mx-4 mt-4 mb-2 p-3 bg-white/10 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.avatar || '?'}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
            <p className="text-white/50 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-3 mb-2">Menu</p>
          <ul className="flex flex-col gap-0.5">
            {menu.map(({ label, path, icon: Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group
                     ${isActive
                       ? 'bg-white/20 text-white'
                       : 'text-white/70 hover:bg-white/10 hover:text-white'}`
                  }
                >
                  <Icon className="w-4.5 h-4.5 shrink-0" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
