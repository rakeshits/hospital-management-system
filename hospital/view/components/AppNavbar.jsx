import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext.jsx';
import { Menu, Bell, Search, LogOut, ChevronDown } from 'lucide-react';

export default function AppNavbar({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-[--color-charcoal] hover:bg-[--color-mint-veil] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-[--color-charcoal] font-bold text-base hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[--color-mint-veil] rounded-lg px-3 py-2 text-sm text-slate-400 w-52">
          <Search className="w-4 h-4 shrink-0" />
          <span>Search…</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-[--color-charcoal] hover:bg-[--color-mint-veil] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-[--color-border-mist]">
          <div className="w-8 h-8 rounded-full bg-[--color-keylime-wash] text-[--color-forest-ink] font-bold text-xs flex items-center justify-center">
            {user?.avatar || '?'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[--color-charcoal] leading-none">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
