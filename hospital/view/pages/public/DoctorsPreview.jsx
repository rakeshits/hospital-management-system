import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import { Search, Star, ArrowRight, Filter } from 'lucide-react';

const DOCTORS = [
  { id:1, name:'Dr. Priya Mehta',   spec:'Senior Cardiologist',      dept:'Cardiology',    exp:'15 yrs', fee:'₹800',  rating:4.9, reviews:312, init:'PM', color:'bg-[--color-keylime-wash] text-[--color-forest-ink]', avail:['Mon','Wed','Fri'] },
  { id:2, name:'Dr. Rajan Verma',   spec:'Chief Orthopedic Surgeon', dept:'Orthopedics',   exp:'18 yrs', fee:'₹600',  rating:4.8, reviews:245, init:'RV', color:'bg-emerald-100 text-emerald-800', avail:['Tue','Thu','Sat'] },
  { id:3, name:'Dr. Anjali Singh',  spec:'Head of Neurology',        dept:'Neurology',     exp:'20 yrs', fee:'₹1000', rating:4.9, reviews:410, init:'AS', color:'bg-violet-100 text-violet-800',  avail:['Mon','Tue','Thu'] },
  { id:4, name:'Dr. Amit Kumar',    spec:'Consultant Pediatrician',  dept:'Pediatrics',    exp:'12 yrs', fee:'₹500',  rating:4.7, reviews:198, init:'AK', color:'bg-amber-100 text-amber-800',    avail:['Mon','Wed','Fri'] },
  { id:5, name:'Dr. Sunita Reddy',  spec:'Senior Gynaecologist',     dept:'Gynecology',    exp:'14 yrs', fee:'₹700',  rating:4.6, reviews:167, init:'SR', color:'bg-pink-100 text-pink-800',      avail:['Tue','Thu','Sat'] },
  { id:6, name:'Dr. Manoj Joshi',   spec:'Consultant Dermatologist', dept:'Dermatology',   exp:'9 yrs',  fee:'₹550',  rating:4.5, reviews:134, init:'MJ', color:'bg-orange-100 text-orange-800',  avail:['Mon','Wed','Fri'] },
  { id:7, name:'Dr. Kavitha Nair',  spec:'Senior Oncologist',        dept:'Oncology',      exp:'22 yrs', fee:'₹1200', rating:4.9, reviews:389, init:'KN', color:'bg-[--color-keylime-wash] text-[--color-forest-ink]', avail:['Tue','Thu']       },
  { id:8, name:'Dr. Suresh Menon',  spec:'Chief Cardiologist',       dept:'Cardiology',    exp:'28 yrs', fee:'₹1500', rating:5.0, reviews:521, init:'SM', color:'bg-red-100 text-red-800',        avail:['Mon','Thu']       },
];

const DEPTS = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Dermatology', 'Oncology'];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i}
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  );
}

export default function DoctorsPreview() {
  const [query, setQuery] = useState('');
  const [dept,  setDept]  = useState('All');

  const filtered = DOCTORS
    .filter(d => dept === 'All' || d.dept === dept)
    .filter(d => d.name.toLowerCase().includes(query.toLowerCase()) ||
                 d.spec.toLowerCase().includes(query.toLowerCase()));

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-[--color-forest-ink]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            280+ Expert Specialists
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            Meet Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">Expert Doctors</span>
          </h1>
          <p className="text-teal-100 text-base leading-relaxed mb-8">
            Our team of experienced specialists is committed to delivering exceptional, personalised care across all medical disciplines.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or specialization…"
              className="input-field pl-12 py-3.5 text-sm rounded-xl" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" className="w-full fill-white" preserveAspectRatio="none">
            <path d="M0,20 C360,50 1080,0 1440,30 L1440,50 L0,50 Z" />
          </svg>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Department filter */}
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            {DEPTS.map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                  ${dept === d ? 'bg-[--color-forest-ink] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {d}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No doctors found for "{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map(({ id, name, spec, dept: d, exp, fee, rating, reviews, init, color, avail }, i) => (
                <div key={id} className={`card overflow-hidden text-center group animate-fade-in delay-${(i%4)+1}`}>
                  <div className="bg-[--color-keylime-wash] h-32 flex flex-col items-center justify-center relative">
                    <div className={`w-20 h-20 rounded-full ${color} text-2xl font-extrabold flex items-center justify-center border-4 border-white group-hover:scale-105 transition-transform`}>
                      {init}
                    </div>
                    <span className="absolute top-3 right-3 text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                      Available
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-800 text-sm">{name}</h3>
                    <p className="text-[--color-forest-ink] text-xs font-semibold mt-0.5 mb-1">{spec}</p>
                    <p className="text-slate-400 text-xs mb-3">{d} · {exp}</p>
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <StarRating rating={rating} />
                      <span className="text-xs font-bold text-slate-700">{rating}</span>
                      <span className="text-xs text-slate-400">({reviews})</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {avail.map(day => (
                        <span key={day} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">{day}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4 px-1">
                      <span className="text-xs text-slate-500">Consultation</span>
                      <span className="text-sm font-bold text-[--color-forest-ink]">{fee}</span>
                    </div>
                    <Link to="/signup" className="btn btn-primary w-full justify-center text-xs py-2">
                      Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[--color-keylime-wash] border-t border-[--color-border-mist]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Can't find the right doctor?</h2>
          <p className="text-slate-500 text-sm mb-6">Our patient care team is available 24×7 to help you find the right specialist for your needs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="btn btn-primary px-8 py-3 text-sm justify-center">
              Register & Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+919876500000" className="btn btn-outline px-8 py-3 text-sm justify-center">
              Call Us: +91 98765 00000
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
