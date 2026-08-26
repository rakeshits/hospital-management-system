import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import { Heart, Brain, Bone, Baby, Microscope, Activity, Search, Phone, ArrowRight, Clock } from 'lucide-react';

const DEPARTMENTS = [
  { name: 'Cardiology',    icon: Heart,      color: 'bg-red-50 text-red-500 border-red-200',     desc: 'Expert care for all heart and vascular conditions. Advanced interventional cardiology and cardiac surgery.', doctors: 18, beds: 40 },
  { name: 'Neurology',     icon: Brain,      color: 'bg-purple-50 text-purple-500 border-purple-200', desc: 'Comprehensive brain, spine & nervous system treatment with neuro-ICU and stroke rapid response unit.', doctors: 14, beds: 30 },
  { name: 'Orthopedics',   icon: Bone,       color: 'bg-amber-50 text-amber-500 border-amber-200',  desc: 'Bone, joint & musculoskeletal specialists. Joint replacement, sports injuries, and spine surgery.', doctors: 16, beds: 35 },
  { name: 'Pediatrics',    icon: Baby,       color: 'bg-sky-50 text-sky-500 border-sky-200',       desc: 'Dedicated child healthcare from neonatology to adolescent medicine. PICU and pediatric emergency.', doctors: 12, beds: 25 },
  { name: 'Diagnostics',   icon: Microscope, color: 'bg-teal-50 text-teal-500 border-teal-200',    desc: 'NABL-certified labs, 3T MRI, CT scan, PET scan, digital X-ray and advanced pathology.', doctors: 10, beds: 0  },
  { name: 'Emergency',     icon: Activity,   color: 'bg-rose-50 text-rose-500 border-rose-200',    desc: '24×7 Level-1 trauma centre with rapid assessment, resuscitation bays and ambulance network.', doctors: 20, beds: 20 },
  { name: 'Gynecology',    icon: Heart,      color: 'bg-pink-50 text-pink-500 border-pink-200',    desc: "Complete women's health services: obstetrics, IVF, minimally invasive surgery, oncology.", doctors: 10, beds: 22 },
  { name: 'Dermatology',   icon: Activity,   color: 'bg-orange-50 text-orange-500 border-orange-200', desc: 'Medical and cosmetic dermatology, hair & skin treatments, laser therapy and allergy testing.', doctors: 8,  beds: 10 },
  { name: 'Oncology',      icon: Microscope, color: 'bg-indigo-50 text-indigo-500 border-indigo-200', desc: 'Comprehensive cancer care: chemotherapy, radiation, immunotherapy and precision medicine.', doctors: 12, beds: 30 },
];

export default function DepartmentsPreview() {
  const [query, setQuery] = useState('');
  const filtered = DEPARTMENTS.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            20+ Specialties
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            Our Medical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300">Departments</span>
          </h1>
          <p className="text-sky-100 text-base leading-relaxed mb-8">
            World-class care across all major medical specialties, staffed by leading consultants and equipped with the latest technology.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search departments…"
              className="input-field pl-12 py-3.5 text-sm rounded-xl shadow-lg shadow-sky-900/20"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" className="w-full fill-slate-50" preserveAspectRatio="none">
            <path d="M0,20 C360,50 1080,0 1440,30 L1440,50 L0,50 Z" />
          </svg>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No departments found for "{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(({ name, icon: Icon, color, desc, doctors, beds }, i) => (
                <div key={name}
                  className={`card p-6 border ${color.split(' ')[2]} group cursor-pointer animate-fade-in delay-${(i%4)+1}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-sky-600 transition-colors">{name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex gap-4 text-xs text-slate-400 mb-4">
                    {doctors > 0 && <span className="flex items-center gap-1">👨‍⚕️ {doctors} Doctors</span>}
                    {beds > 0    && <span className="flex items-center gap-1">🛏 {beds} Beds</span>}
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 24×7</span>
                  </div>
                  <Link to="/signup"
                    className="inline-flex items-center gap-1 text-sky-500 font-semibold text-sm hover:gap-2 transition-all">
                    Book Appointment <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-14 bg-red-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">Medical Emergency?</h2>
          <p className="text-red-100 text-sm mb-6">Our 24×7 trauma centre is fully equipped for all emergencies. Call us now.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:108" className="btn bg-white text-red-600 hover:bg-red-50 px-8 py-3.5 text-base font-bold justify-center">
              <Phone className="w-5 h-5" /> Call 108 (Emergency)
            </a>
            <a href="tel:+919876500000" className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 text-base justify-center">
              <Phone className="w-5 h-5" /> +91 98765 00000
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
