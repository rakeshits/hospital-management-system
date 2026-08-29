import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import { Heart, User, Mail, Phone, Lock, Calendar, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const STEPS = ['Personal Info', 'Contact Details', 'Account Setup', 'Done'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName:'', lastName:'', dob:'', gender:'', bloodGroup:'',
    email:'', phone:'', address:'', city:'', emergencyName:'', emergencyPhone:'',
    username:'', password:'', confirm:'',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('hms_session', JSON.stringify({ role: 'patient', email: form.email, userId: Date.now() }));
    setStep(3);
  };

  const Input = ({ id, label, icon: Icon, type = 'text', placeholder, value, onChange }) => (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
          className={`input-field ${Icon ? 'pl-10' : ''}`} />
      </div>
    </div>
  );

  const renderStep = () => {
    if (step === 3) return (
      <div className="flex flex-col items-center gap-6 py-6 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Account Created!</h3>
          <p className="text-slate-500 text-sm">Your patient account is ready. You can now log in.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 w-full text-left space-y-2 text-sm">
          <p><span className="font-medium text-slate-600">Name:</span> {form.firstName} {form.lastName}</p>
          <p><span className="font-medium text-slate-600">Email:</span> {form.email || 'patient@example.com'}</p>
          <p><span className="font-medium text-slate-600">Patient ID:</span> <span className="font-mono text-[--color-forest-ink]">PAT-{Math.floor(Math.random() * 90000) + 10000}</span></p>
        </div>
        <button className="btn btn-primary w-full justify-center py-3" onClick={() => navigate('/patient/dashboard')}>
          Go to My Dashboard
        </button>
      </div>
    );

    if (step === 0) return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        <Input id="fn" label="First Name" icon={User} placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} />
        <Input id="ln" label="Last Name"  icon={User} placeholder="Doe"  value={form.lastName}  onChange={e => set('lastName',  e.target.value)} />
        <Input id="dob" label="Date of Birth" icon={Calendar} type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Gender</label>
          <select value={form.gender} onChange={e => set('gender', e.target.value)} className="input-field">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Blood Group</label>
          <select value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)} className="input-field">
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
    );

    if (step === 1) return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        <div className="sm:col-span-2">
          <Input id="email" label="Email Address" icon={Mail} type="email" placeholder="john@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
        <Input id="phone" label="Phone Number" icon={Phone} placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} />
        <Input id="city" label="City" placeholder="Bengaluru" value={form.city} onChange={e => set('city', e.target.value)} />
        <div className="sm:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Address</label>
          <textarea rows={2} placeholder="House no., Street, Area…" value={form.address}
            onChange={e => set('address', e.target.value)} className="input-field resize-none" />
        </div>
        <Input id="ename" label="Emergency Contact Name"  icon={User}  placeholder="Jane Doe"     value={form.emergencyName}  onChange={e => set('emergencyName',  e.target.value)} />
        <Input id="ephone" label="Emergency Contact Phone" icon={Phone} placeholder="+91 98765 0000" value={form.emergencyPhone} onChange={e => set('emergencyPhone', e.target.value)} />
      </div>
    );

    if (step === 2) return (
      <div className="flex flex-col gap-4 animate-fade-in">
        <Input id="uname" label="Username" icon={User} placeholder="johndoe123" value={form.username} onChange={e => set('username', e.target.value)} />
        <Input id="pass"  label="Password" icon={Lock} type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => set('password', e.target.value)} />
        <Input id="confirm" label="Confirm Password" icon={Lock} type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
        <div className="bg-[--color-keylime-wash] rounded-lg p-4 text-xs text-[--color-forest-ink] border border-[--color-border-mist]">
          <p className="font-semibold mb-1">Password Requirements:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One number or special character</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-[--color-keylime-wash] px-4 py-32">
        <div className="w-full max-w-2xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-[--color-forest-ink] rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">MediCare HMS</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Create Patient Account</h2>
            <p className="text-slate-500 text-sm">Register to manage appointments and health records</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center mb-8 px-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                    ${i < step ? 'bg-[--color-forest-ink] border-[--color-forest-ink] text-white' : i === step ? 'bg-[--color-cream-paper] border-[--color-forest-ink] text-[--color-forest-ink]' : 'bg-[--color-cream-paper] border-slate-200 text-slate-400'}`}>
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? 'text-[--color-forest-ink]' : i < step ? 'text-[--color-sage-mist]' : 'text-slate-400'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${i < step ? 'bg-[--color-sage-mist]' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div className="card p-8">
            {step < 3 && <h3 className="text-lg font-bold text-slate-800 mb-6">Step {step + 1}: {STEPS[step]}</h3>}
            <form onSubmit={handleSubmit}>
              {renderStep()}
              {step < 3 && (
                <div className="flex gap-3 mt-8">
                  {step > 0 && (
                    <button type="button" onClick={back} className="btn btn-ghost flex-1 justify-center">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button" onClick={next} className="btn btn-primary flex-1 justify-center">
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success flex-1 justify-center">
                      Create Account <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[--color-forest-ink] hover:text-[--color-forest-shadow] font-semibold transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
