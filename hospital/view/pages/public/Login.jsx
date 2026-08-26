import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import { Heart, Mail, Lock, Eye, EyeOff, ShieldCheck, Stethoscope, User } from 'lucide-react';

const ROLES = [
  { id: 'admin',   label: 'Admin',   icon: ShieldCheck, desc: 'Full system access'  },
  { id: 'doctor',  label: 'Doctor',  icon: Stethoscope, desc: 'Clinical dashboard'  },
  { id: 'patient', label: 'Patient', icon: User,        desc: 'Patient portal'      },
];

export default function Login() {
  const navigate = useNavigate();
  const [role,    setRole]    = useState('patient');
  const [email,   setEmail]   = useState('');
  const [pass,    setPass]    = useState('');
  const [showPw,  setShowPw]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const DASHBOARDS = { admin: '/admin/dashboard', doctor: '/doctor/dashboard', patient: '/patient/dashboard' };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !pass) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    // Mock auth: store session in localStorage so ProtectedRoute works during dev
    setTimeout(() => {
      localStorage.setItem('hms_session', JSON.stringify({ role, email, userId: 1 }));
      setLoading(false);
      navigate(DASHBOARDS[role]);
    }, 1200);
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex pt-20">
        {/* Left branding panel */}
        <div className="hidden lg:flex flex-col justify-between w-[45%] hero-blue p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-14">
              <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">MediCare HMS</h1>
                <p className="text-sky-200 text-xs">Hospital Management System</p>
              </div>
            </div>
            <div className="animate-float">
              <h2 className="text-white text-4xl font-extrabold leading-tight mb-4">
                Delivering Care,<br />Powered by Technology
              </h2>
              <p className="text-sky-100 leading-relaxed max-w-md text-sm">
                A unified platform for managing patient records, appointments, billing, and clinical workflows — all in one place.
              </p>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-3">
            {[
              { label: 'Patients', value: '12,400+' },
              { label: 'Doctors',  value: '280+'    },
              { label: 'Depts',    value: '20+'     },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-white text-xl font-bold">{s.value}</p>
                <p className="text-sky-200 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-md animate-fade-in">
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <Heart className="w-7 h-7 text-sky-500" />
              <span className="text-xl font-bold text-slate-800">MediCare HMS</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Welcome back</h2>
            <p className="text-slate-500 mb-8 text-sm">Sign in to your account to continue</p>

            {/* Role selector */}
            <div className="grid grid-cols-3 gap-2 mb-7">
              {ROLES.map(({ id, label, icon: Icon, desc }) => (
                <button key={id} type="button" onClick={() => setRole(id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm font-semibold
                    ${role === id ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-md shadow-sky-100' : 'border-slate-200 bg-white text-slate-500 hover:border-sky-200'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label htmlFor="login-email" className="text-sm font-medium text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@hospital.com" required className="input-field pl-10" />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="text-sm font-medium text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input id="login-password" type={showPw ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)}
                    placeholder="••••••••" required className="input-field pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <a href="#" className="text-sky-500 hover:text-sky-700 font-medium transition-colors">Forgot password?</a>
              </div>

              <button type="submit" disabled={loading}
                className="btn btn-primary w-full py-3 text-base mt-1 justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : `Sign in as ${ROLES.find(r => r.id === role)?.label}`}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              New patient?{' '}
              <Link to="/signup" className="text-sky-500 hover:text-sky-700 font-semibold transition-colors">Register here</Link>
            </p>
            <p className="text-center text-xs text-slate-400 mt-4">
              Protected by enterprise-grade security · HIPAA compliant
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
