import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SectionCard from '../components/ui/SectionCard';
import Badge from '../components/ui/Badge';
import { Calendar, Clock, Search, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const DOCTORS = [
  { id: 1, name: 'Dr. Priya Mehta',   dept: 'Cardiology',  exp: '15 yrs', fee: '₹800',  rating: 4.9, avatar: 'PM', available: true  },
  { id: 2, name: 'Dr. Rajan Verma',   dept: 'Orthopedics', exp: '12 yrs', fee: '₹600',  rating: 4.7, avatar: 'RV', available: true  },
  { id: 3, name: 'Dr. Anjali Singh',  dept: 'Neurology',   exp: '18 yrs', fee: '₹1000', rating: 4.9, avatar: 'AS', available: false },
  { id: 4, name: 'Dr. Amit Kumar',    dept: 'Pediatrics',  exp: '10 yrs', fee: '₹500',  rating: 4.8, avatar: 'AK', available: true  },
  { id: 5, name: 'Dr. Sunita Reddy',  dept: 'Gynecology',  exp: '14 yrs', fee: '₹700',  rating: 4.6, avatar: 'SR', available: true  },
  { id: 6, name: 'Dr. Manoj Joshi',   dept: 'Dermatology', exp: '9 yrs',  fee: '₹550',  rating: 4.5, avatar: 'MJ', available: true  },
];

const DEPTS = ['All', 'Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Gynecology', 'Dermatology'];

const TIME_SLOTS = [
  '09:00 AM','09:30 AM','10:00 AM','10:30 AM',
  '11:00 AM','11:30 AM','02:00 PM','02:30 PM',
  '03:00 PM','03:30 PM','04:00 PM','04:30 PM',
];
const BOOKED = ['10:00 AM', '11:00 AM', '02:30 PM'];

// mini calendar
const today = new Date();
function buildCalendar(year, month) {
  const first = new Date(year, month, 1).getDay();
  const days  = new Date(year, month + 1, 0).getDate();
  return { first, days };
}

export default function AppointmentBookingPage() {
  const [dept,    setDept]    = useState('All');
  const [query,   setQuery]   = useState('');
  const [selDoc,  setSelDoc]  = useState(null);
  const [selDate, setSelDate] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [step,    setStep]    = useState(1); // 1-doctor, 2-datetime, 3-confirm, 4-done
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [reason,   setReason]  = useState('');

  const { first, days } = buildCalendar(calYear, calMonth);
  const monthName = new Date(calYear, calMonth).toLocaleString('default', { month: 'long' });

  const filtered = DOCTORS
    .filter(d => dept === 'All' || d.dept === dept)
    .filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

  const handleBook = () => setStep(4);

  return (
    <Layout role="patient">
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-slate-800">Book an Appointment</h1>
        <p className="text-slate-500 text-sm">Select a doctor, date, and time slot to schedule your visit</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 animate-fade-in delay-1">
        {['Choose Doctor', 'Select Date & Time', 'Confirm'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-emerald-600' : step === i + 1 ? 'text-sky-600' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                ${step > i + 1 ? 'bg-emerald-500 border-emerald-500 text-white'
                : step === i + 1 ? 'bg-sky-500 border-sky-500 text-white'
                : 'border-slate-300 text-slate-400'}`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className="text-sm font-semibold hidden sm:block">{s}</span>
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="card p-12 flex flex-col items-center gap-5 text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Confirmed!</h2>
            <p className="text-slate-500">Your appointment has been successfully booked.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 text-left w-full max-w-sm space-y-3">
            <p className="text-sm"><span className="text-slate-500 font-medium">Doctor:</span> <span className="font-semibold">{selDoc?.name}</span></p>
            <p className="text-sm"><span className="text-slate-500 font-medium">Department:</span> <span className="font-semibold">{selDoc?.dept}</span></p>
            <p className="text-sm"><span className="text-slate-500 font-medium">Date:</span> <span className="font-semibold">{selDate ? `${selDate} ${monthName} ${calYear}` : '—'}</span></p>
            <p className="text-sm"><span className="text-slate-500 font-medium">Time:</span> <span className="font-semibold">{selSlot}</span></p>
            <p className="text-sm"><span className="text-slate-500 font-medium">Token:</span> <span className="font-mono font-bold text-sky-600">APT-{Math.floor(Math.random()*90000)+10000}</span></p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-outline" onClick={() => { setStep(1); setSelDoc(null); setSelDate(null); setSelSlot(null); }}>
              Book Another
            </button>
            <button className="btn btn-primary">View My Appointments</button>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: Doctor selector */}
          <div className={`xl:col-span-${step === 1 ? '3' : '2'} flex flex-col gap-4 animate-fade-in`}>
            {step === 1 && (
              <SectionCard title="Select a Doctor">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Search doctor…"
                      className="input-field pl-9 text-sm"
                    />
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {DEPTS.map(d => (
                      <button key={d} onClick={() => setDept(d)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                          ${dept === d ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(doc => (
                    <div key={doc.id}
                      onClick={() => { if (doc.available) { setSelDoc(doc); setStep(2); } }}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer
                        ${!doc.available ? 'opacity-50 cursor-not-allowed border-slate-200 bg-slate-50'
                        : selDoc?.id === doc.id ? 'border-sky-400 bg-sky-50 shadow-md'
                        : 'border-slate-200 hover:border-sky-300 hover:shadow-sm bg-white'}`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm shrink-0">
                          {doc.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 text-sm leading-snug">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.dept}</p>
                          <p className="text-xs text-slate-400">{doc.exp} experience</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-sky-600">{doc.fee}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-xs font-semibold text-slate-700">{doc.rating}</span>
                        </div>
                      </div>
                      {!doc.available && (
                        <div className="mt-2">
                          <Badge color="red">Unavailable Today</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {step >= 2 && (
              <>
                {/* Selected doctor summary bar */}
                <div className="flex items-center gap-4 p-4 bg-sky-50 border border-sky-200 rounded-xl animate-fade-in">
                  <div className="w-10 h-10 rounded-xl bg-sky-200 flex items-center justify-center text-sky-800 font-bold text-sm">
                    {selDoc?.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{selDoc?.name}</p>
                    <p className="text-xs text-slate-500">{selDoc?.dept} · Consultation fee: {selDoc?.fee}</p>
                  </div>
                  <button onClick={() => { setStep(1); setSelDate(null); setSelSlot(null); }}
                    className="btn btn-ghost text-xs">Change</button>
                </div>

                {/* Calendar */}
                <SectionCard title="Select Date">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCalMonth(m => m === 0 ? (setCalYear(y => y-1), 11) : m-1)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <h3 className="font-bold text-slate-800">{monthName} {calYear}</h3>
                    <button onClick={() => setCalMonth(m => m === 11 ? (setCalYear(y => y+1), 0) : m+1)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <div key={d} className="text-xs font-semibold text-slate-400 py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array(first).fill(null).map((_, i) => <div key={`e${i}`} />)}
                    {Array(days).fill(null).map((_, i) => {
                      const d = i + 1;
                      const isPast = calYear === today.getFullYear() && calMonth === today.getMonth() && d < today.getDate();
                      const isSel  = selDate === d;
                      return (
                        <button key={d} disabled={isPast}
                          onClick={() => setSelDate(d)}
                          className={`w-full aspect-square rounded-lg text-sm font-medium transition-all
                            ${isPast ? 'text-slate-300 cursor-not-allowed'
                            : isSel ? 'bg-sky-500 text-white shadow-md'
                            : 'hover:bg-sky-50 text-slate-700 hover:text-sky-600'}`}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </SectionCard>

                {/* Time slots */}
                {selDate && (
                  <SectionCard title="Select Time Slot" className="animate-fade-in">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => {
                        const booked = BOOKED.includes(slot);
                        return (
                          <button key={slot} disabled={booked}
                            onClick={() => setSelSlot(slot)}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all
                              ${booked ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed line-through'
                              : selSlot === slot ? 'bg-sky-500 border-sky-500 text-white shadow'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-600'}`}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sky-500 inline-block" />Selected</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 inline-block" />Booked</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border border-slate-200 inline-block" />Available</span>
                    </div>
                  </SectionCard>
                )}
              </>
            )}
          </div>

          {/* Right: Confirmation panel */}
          {step >= 2 && (
            <div className="animate-fade-in delay-2">
              <SectionCard title="Booking Summary">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2.5 text-sm">
                    {[
                      { label: 'Doctor',     val: selDoc?.name || '—' },
                      { label: 'Department', val: selDoc?.dept || '—' },
                      { label: 'Date',       val: selDate ? `${selDate} ${monthName} ${calYear}` : '—' },
                      { label: 'Time',       val: selSlot || '—' },
                      { label: 'Fee',        val: selDoc?.fee || '—' },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-semibold text-slate-800">{val}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1">Reason for Visit</label>
                    <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)}
                      placeholder="Describe your symptoms or reason…"
                      className="input-field resize-none text-sm" />
                  </div>

                  <button
                    disabled={!selDoc || !selDate || !selSlot}
                    onClick={handleBook}
                    className="btn btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Calendar className="w-4 h-4" /> Confirm Appointment
                  </button>
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
