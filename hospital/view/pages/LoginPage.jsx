import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ShieldCheck, Stethoscope, User } from 'lucide-react';

const ROLES = [
  { id: 'admin',   label: 'Admin',   icon: ShieldCheck, color: 'from-sky-500 to-sky-700',  desc: 'Full system access' },
  { id: 'doctor',  label: 'Doctor',  icon: Stethoscope, color: 'from-emerald-500 to-teal-700', desc: 'Clinical dashboard' },
  { id: 'patient', label: 'Patient', icon: User,        color: 'from-violet-500 to-purple-700', desc: 'Patient portal' },
];

export default function LoginPage() {
  const navigate           = useNavigate();
  const [role, setRole]    = useState('admin');
  const [email, setEmail]  = useState('');
  const [pass,  setPass]   = useState('');
  const [showPw, setShowPw]= useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/${role}/dashboard`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel (Branding) ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 hero-blue p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">MediCare HMS</h1>
              <p className="text-sky-200 text-sm">Hospital Management System</p>
            </div>
          </div>

          <div className="animate-float">
            <h2 className="text-white text-4xl font-extrabold leading-tight mb-4">
              Delivering Care,<br />Powered by Technology
            </h2>
            <p className="text-sky-100 text-base leading-relaxed max-w-md">
              A unified platform for managing patient records, appointments, billing, and clinical workflows — all in one place.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: 'Patients Managed', value: '12,400+' },
            { label: 'Doctors Online',   value: '280+'    },
            { label: 'Appointments/Day', value: '1,050+'  },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-white text-2xl font-bold">{s.value}</p>
              <p className="text-sky-200 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md animate-fade-in">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Heart className="w-7 h-7 text-sky-500" />
            <span className="text-xl font-bold text-slate-800">MediCare HMS</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 mb-8 text-sm">Sign in to your account to continue</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            {ROLES.map(({ id, label, icon: Icon, color, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-sm font-semibold
                  ${role === id
                    ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-md shadow-sky-100'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-sky-200 hover:bg-sky-50/50'}`}
              >
                {role === id && (
                  <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${color}`} />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="login-email" className="text-sm font-medium text-slate-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hospital.com"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-medium text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input type="checkbox" className="rounded border-slate-300 text-sky-500 focus:ring-sky-300" />
                Remember me
              </label>
              <a href="#" className="text-sky-500 hover:text-sky-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-base mt-1 justify-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                `Sign in as ${ROLES.find(r => r.id === role)?.label}`
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            New patient?{' '}
            <a href="/register" className="text-sky-500 hover:text-sky-700 font-semibold transition-colors" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>
              Register here
            </a>
          </p>

          <p className="text-center text-xs text-slate-400 mt-6">
            Protected by enterprise-grade security · HIPAA compliant
          </p>
        </div>
      </div>
    </div>
  );
}
