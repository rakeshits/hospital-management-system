import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Phone, Lock, Calendar, MapPin, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const STEPS = ['Personal Info', 'Contact Details', 'Account Setup', 'Confirmation'];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function RegistrationPage() {
  const navigate      = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '',
    email: '', phone: '', address: '', city: '', pincode: '',
    username: '', password: '', confirm: '', emergencyName: '', emergencyPhone: '',
  });

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const next   = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const back   = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const Field = ({ id, label, icon: Icon, type = 'text', placeholder, value, onChange, children }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      {children ? (
        children
      ) : (
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
          <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
            className={`input-field ${Icon ? 'pl-10' : ''}`} />
        </div>
      )}
    </div>
  );

  const StepContent = () => {
    if (step === 3) return (
      <div className="flex flex-col items-center gap-6 py-8 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Registration Successful!</h3>
          <p className="text-slate-500 text-sm">Your patient account has been created.<br />You can now log in to book appointments and access your records.</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 w-full text-left space-y-2">
          <p className="text-sm"><span className="font-medium text-slate-600">Name:</span> <span className="text-slate-800">{form.firstName} {form.lastName}</span></p>
          <p className="text-sm"><span className="font-medium text-slate-600">Email:</span> <span className="text-slate-800">{form.email || 'patient@example.com'}</span></p>
          <p className="text-sm"><span className="font-medium text-slate-600">Patient ID:</span> <span className="text-slate-800 font-mono">PAT-{Math.floor(Math.random() * 90000) + 10000}</span></p>
        </div>
        <button className="btn btn-primary w-full justify-center py-3" onClick={() => navigate('/login')}>
          Proceed to Login
        </button>
      </div>
    );

    if (step === 0) return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        <Field id="firstName" label="First Name" icon={User} placeholder="John" value={form.firstName} onChange={e => update('firstName', e.target.value)} />
        <Field id="lastName" label="Last Name" icon={User} placeholder="Doe" value={form.lastName} onChange={e => update('lastName', e.target.value)} />
        <Field id="dob" label="Date of Birth" icon={Calendar} type="date" value={form.dob} onChange={e => update('dob', e.target.value)} />
        <Field id="gender" label="Gender">
          <select id="gender" value={form.gender} onChange={e => update('gender', e.target.value)} className="input-field">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field id="bloodGroup" label="Blood Group">
          <select id="bloodGroup" value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)} className="input-field">
            <option value="">Select blood group</option>
            {bloodGroups.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
      </div>
    );

    if (step === 1) return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        <div className="sm:col-span-2">
          <Field id="email" label="Email Address" icon={Mail} type="email" placeholder="john.doe@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
        </div>
        <Field id="phone" label="Phone Number" icon={Phone} placeholder="+91 98765 43210" value={form.phone} onChange={e => update('phone', e.target.value)} />
        <Field id="city" label="City" icon={MapPin} placeholder="Mumbai" value={form.city} onChange={e => update('city', e.target.value)} />
        <div className="sm:col-span-2">
          <Field id="address" label="Address">
            <textarea id="address" rows={2} placeholder="House no., Street, Area…" value={form.address}
              onChange={e => update('address', e.target.value)} className="input-field resize-none" />
          </Field>
        </div>
        <Field id="emergencyName" label="Emergency Contact Name" icon={User} placeholder="Jane Doe" value={form.emergencyName} onChange={e => update('emergencyName', e.target.value)} />
        <Field id="emergencyPhone" label="Emergency Contact Phone" icon={Phone} placeholder="+91 98765 00000" value={form.emergencyPhone} onChange={e => update('emergencyPhone', e.target.value)} />
      </div>
    );

    if (step === 2) return (
      <div className="grid grid-cols-1 gap-4 animate-fade-in">
        <Field id="username" label="Username" icon={User} placeholder="johndoe123" value={form.username} onChange={e => update('username', e.target.value)} />
        <Field id="reg-password" label="Password" icon={Lock} type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => update('password', e.target.value)} />
        <Field id="confirm" label="Confirm Password" icon={Lock} type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => update('confirm', e.target.value)} />
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700 border border-blue-100">
          <p className="font-semibold mb-1">Password Requirements:</p>
          <ul className="list-disc list-inside space-y-0.5 text-xs">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One number or special character</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-2xl animate-fade-in">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">MediCare HMS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Create Patient Account</h2>
          <p className="text-slate-500 text-sm">Register to manage your health records and appointments</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-4">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                  ${i < step ? 'bg-sky-500 border-sky-500 text-white'
                  : i === step ? 'bg-white border-sky-500 text-sky-600'
                  : 'bg-white border-slate-200 text-slate-400'}`}>
                  {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? 'text-sky-600' : i < step ? 'text-sky-400' : 'text-slate-400'}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${i < step ? 'bg-sky-400' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="card p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">{step < 3 ? `Step ${step + 1}: ${STEPS[step]}` : ''}</h3>
          <form onSubmit={handleSubmit}>
            <StepContent />

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
          <a href="/login" className="text-sky-500 hover:text-sky-700 font-semibold transition-colors" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
