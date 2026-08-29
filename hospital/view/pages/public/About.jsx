import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import { Heart, Award, Users, Shield, Target, Microscope, CheckCircle2, ArrowRight, MapPin, Phone, Star } from 'lucide-react';

const TIMELINE = [
  { year: '1999', event: 'MediCare founded with a 50-bed facility in Bengaluru' },
  { year: '2005', event: 'Expanded to 200 beds; launched Cardiology & Neurology departments' },
  { year: '2011', event: 'NABH Accreditation received; ICU & Trauma Center inaugurated' },
  { year: '2016', event: 'New 10-floor tower opened; robotic surgery suite introduced' },
  { year: '2020', event: 'MediCare HMS digital platform & Telemedicine services launched' },
  { year: '2025', event: '12,400+ patients served; ranked #1 multi-specialty hospital in the region' },
];

const LEADERSHIP = [
  { name: 'Dr. Suresh Menon',  role: 'CEO & Chief Medical Officer',     exp: '30 yrs', init: 'SM', color: 'bg-[--color-keylime-wash] text-[--color-forest-ink]' },
  { name: 'Dr. Kavitha Nair',  role: 'Medical Director',                exp: '24 yrs', init: 'KN', color: 'bg-emerald-100 text-emerald-800' },
  { name: 'Mr. Arun Patel',    role: 'Chief Operations Officer',        exp: '18 yrs', init: 'AP', color: 'bg-violet-100 text-violet-800' },
  { name: 'Dr. Ramesh Shetty', role: 'Head of Research & Innovation',   exp: '22 yrs', init: 'RS', color: 'bg-amber-100 text-amber-800'  },
];

const VALUES = [
  { icon: Heart,     title: 'Compassion', desc: 'We treat every patient with empathy, dignity and respect — always putting humanity first.' },
  { icon: Shield,    title: 'Integrity',  desc: 'Honest, transparent communication and ethical practices in everything we do.' },
  { icon: Award,     title: 'Excellence', desc: 'Continuously pursuing the highest clinical standards through education and innovation.' },
  { icon: Users,     title: 'Community',  desc: 'Committed to the health and wellbeing of the communities we serve.' },
  { icon: Target,    title: 'Innovation', desc: 'Adopting cutting-edge technology to deliver better outcomes for patients.' },
  { icon: Microscope,title: 'Research',   desc: 'Driving medical breakthroughs through dedicated research and clinical trial programs.' },
];

const ACCREDITATIONS = [
  'NABH Accredited Hospital', 'ISO 9001:2015 Certified',
  'JCI International Standards', 'NABL Certified Laboratory',
  'Green OT Certified', 'HIPAA Compliant HMS',
];

export default function About() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[--color-forest-ink]" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <span className="inline-block bg-[--color-forest-ink]/20 border border-[--color-sage-mist]/30 text-[--color-sage-mist] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            About MediCare HMS
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            25 Years of Healing,<br />
            <span className="text-[--color-sage-mist]">One Patient at a Time</span>
          </h1>
          <p className="text-[--color-mint-veil] text-lg max-w-2xl mx-auto leading-relaxed">
            Since 1999, MediCare has been the region's most trusted multi-specialty hospital — combining advanced medical technology with compassionate care.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { val: '25+',    label: 'Years',    color: 'from-[--color-sage-mist] to-[--color-forest-ink]' },
              { val: '500+',   label: 'Beds',      color: 'from-emerald-500 to-teal-700' },
              { val: '280+',   label: 'Doctors',   color: 'from-violet-500 to-purple-700'},
              { val: '12,400+',label: 'Patients',  color: 'from-amber-500 to-orange-700' },
            ].map(({ val, label, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-center text-white`}>
                <p className="text-3xl font-extrabold">{val}</p>
                <p className="text-white/80 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" className="w-full fill-white" preserveAspectRatio="none">
            <path d="M0,20 C360,50 1080,0 1440,30 L1440,50 L0,50 Z" />
          </svg>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: Target, color: 'bg-[--color-forest-ink]', title: 'Our Mission',
              text: 'To provide every patient with access to world-class, affordable, and compassionate healthcare, delivered by a team of passionate professionals.' },
            { icon: Star, color: 'bg-emerald-500', title: 'Our Vision',
              text: "To be South India's leading healthcare institution, recognised globally for clinical excellence, patient safety, and pioneering medical research." },
          ].map(({ icon: Icon, color, title, text }) => (
            <div key={title} className="card p-8 flex gap-5">
              <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 mb-3">{title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[--color-forest-ink] font-bold text-xs uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`card p-6 group hover:border-[--color-sage-mist] border border-transparent animate-fade-in delay-${(i%4)+1}`}>
                <div className="w-11 h-11 bg-[--color-keylime-wash] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[--color-mint-veil] transition-colors">
                  <Icon className="w-5 h-5 text-[--color-forest-ink]" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORY TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[--color-forest-ink] font-bold text-xs uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2">Milestones That Define Us</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[--color-sage-mist] to-[--color-keylime-wash]" />
            <div className="flex flex-col gap-10">
              {TIMELINE.map(({ year, event }, i) => (
                <div key={year}
                  className={`flex items-center gap-6 animate-fade-in delay-${(i%4)+1} ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="card p-4 inline-block max-w-xs">
                      <p className="text-sm text-slate-600 leading-relaxed">{event}</p>
                    </div>
                  </div>
                  <div className="shrink-0 w-14 h-14 rounded-full bg-[--color-forest-ink] border-4 border-white flex items-center justify-center z-10 text-white font-extrabold text-xs text-center leading-tight">
                    {year}
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-[--color-forest-ink] font-bold text-xs uppercase tracking-widest">Our Leadership</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2">The Team Behind MediCare</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEADERSHIP.map(({ name, role, exp, init, color }, i) => (
              <div key={name} className={`card text-center overflow-hidden animate-fade-in delay-${i+1}`}>
                <div className="bg-[--color-keylime-wash] h-28 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full ${color} text-xl font-extrabold flex items-center justify-center border-4 border-white shadow`}>{init}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-sm">{name}</h3>
                  <p className="text-[--color-forest-ink] text-xs font-semibold mt-1 mb-2">{role}</p>
                  <p className="text-slate-400 text-xs">{exp} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className="py-16 bg-[--color-forest-ink] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-2">Accreditations & Certifications</h2>
          <p className="text-[--color-sage-mist] text-sm mb-8">Recognised by the world's most rigorous healthcare quality bodies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACCREDITATIONS.map((a) => (
              <div key={a} className="flex items-center gap-3 bg-white/10 backdrop-blur border border-white/10 rounded-xl px-5 py-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-white font-semibold text-sm">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION / CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="text-[--color-forest-ink] font-bold text-xs uppercase tracking-widest">Find Us</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Visit MediCare HMS</h2>
            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[--color-forest-ink] shrink-0 mt-0.5" />
                <span>42, Health City Road, Bengaluru, Karnataka — 560001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[--color-forest-ink] shrink-0" />
                <span>+91 98765 00000 · Emergency: 108</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Link to="/signup" className="btn btn-primary px-6 py-2.5">Book a Visit <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/doctors" className="btn btn-outline px-6 py-2.5">Meet Our Doctors</Link>
            </div>
          </div>
          <div className="flex-1 w-full h-56 md:h-72 bg-[--color-keylime-wash] rounded-2xl border border-[--color-border-mist] flex items-center justify-center text-slate-400">
            <div className="text-center">
              <MapPin className="w-10 h-10 text-[--color-sage-mist] mx-auto mb-2" />
              <p className="text-sm font-medium">Map Integration Here</p>
              <p className="text-xs">Google Maps / Leaflet</p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
