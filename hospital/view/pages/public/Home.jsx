import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout.jsx';
import {
  Heart, ArrowRight, Star, Shield, Clock, Users, Award,
  Stethoscope, Brain, Bone, Baby, Activity, Microscope,
  CheckCircle2, ChevronRight, Phone, Play
} from 'lucide-react';

// ── Dummy Data ───────────────────────────────────────────────────────────────
const STATS = [
  { value: '12,400+', label: 'Patients Treated',    icon: Users   },
  { value: '280+',    label: 'Specialist Doctors',  icon: Stethoscope },
  { value: '25+',     label: 'Years of Excellence', icon: Award   },
  { value: '98%',     label: 'Patient Satisfaction',icon: Star    },
];

const DEPARTMENTS = [
  { name: 'Cardiology',   icon: Heart,       desc: 'Advanced heart care & cardiac surgery',          color: 'bg-red-50 text-red-500 border-red-100'    },
  { name: 'Neurology',    icon: Brain,       desc: 'Comprehensive brain & nervous system treatment',  color: 'bg-purple-50 text-purple-500 border-purple-100'},
  { name: 'Orthopedics',  icon: Bone,        desc: 'Bone, joint & musculoskeletal specialists',       color: 'bg-amber-50 text-amber-500 border-amber-100'  },
  { name: 'Pediatrics',   icon: Baby,        desc: 'Dedicated child healthcare & development',        color: 'bg-sky-50 text-sky-500 border-sky-100'        },
  { name: 'Diagnostics',  icon: Microscope,  desc: 'State-of-the-art lab & imaging services',        color: 'bg-teal-50 text-teal-500 border-teal-100'    },
  { name: 'Emergency',    icon: Activity,    desc: '24×7 trauma & emergency care unit',               color: 'bg-rose-50 text-rose-500 border-rose-100'    },
];

const DOCTORS = [
  { name: 'Dr. Priya Mehta',  spec: 'Senior Cardiologist',     exp: '15 yrs', rating: 4.9, reviews: 312, init: 'PM', color: 'bg-sky-100 text-sky-700'    },
  { name: 'Dr. Rajan Verma',  spec: 'Chief Orthopedic Surgeon',exp: '18 yrs', rating: 4.8, reviews: 245, init: 'RV', color: 'bg-emerald-100 text-emerald-700'},
  { name: 'Dr. Anjali Singh', spec: 'Head of Neurology',       exp: '20 yrs', rating: 4.9, reviews: 410, init: 'AS', color: 'bg-violet-100 text-violet-700' },
  { name: 'Dr. Amit Kumar',   spec: 'Consultant Pediatrician', exp: '12 yrs', rating: 4.7, reviews: 198, init: 'AK', color: 'bg-amber-100 text-amber-700'  },
];

const TESTIMONIALS = [
  { text: "MediCare saved my father's life during a cardiac emergency. The team was incredibly professional and the ICU care was world-class.", name: 'Sunita Rao', role: "Patient's Relative", rating: 5 },
  { text: "Booking appointments online is so easy. Dr. Anjali Singh is the most thorough neurologist I've ever visited. Highly recommend!", name: 'Vikram Desai', role: 'Patient', rating: 5 },
  { text: 'The facility is spotless, staff is warm, and the reports were ready within 4 hours. Truly a 5-star hospital experience.', name: 'Meena Pillai', role: 'Patient', rating: 5 },
];

const WHYCHOOSE = [
  { title: 'NABH Accredited',         desc: 'Certified by the National Accreditation Board for Hospitals.' },
  { title: '24×7 Emergency Care',     desc: 'Round-the-clock trauma center with ambulance services.'       },
  { title: 'Digital Health Records',  desc: 'Access your complete medical history anytime, anywhere.'      },
  { title: 'Expert Specialists',      desc: 'Over 280 specialists across 20+ departments.'                  },
  { title: 'Advanced Technology',     desc: '3T MRI, robotic surgery, AI diagnostics on-site.'             },
  { title: 'Affordable Care',         desc: 'Transparent billing. All major insurance plans accepted.'      },
];

// ── Subcomponents ────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <PublicLayout>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900" />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        {/* Blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 rounded-full px-4 py-1.5 text-sky-300 text-xs font-semibold mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              NABH Accredited · ISO 9001:2015 Certified
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Your Health Is Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-teal-300">
                Greatest Priority
              </span>
            </h1>

            <p className="text-sky-100 text-lg leading-relaxed mb-8 max-w-xl">
              MediCare HMS brings world-class healthcare to your fingertips — book appointments, access medical records, and receive expert care from 280+ specialists across 20+ departments.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/signup')}
                className="btn bg-white text-sky-700 hover:bg-sky-50 text-base px-7 py-3.5 font-bold shadow-xl shadow-sky-900/30 hover:shadow-2xl hover:shadow-sky-900/40 transition-all">
                Book Appointment <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setVideoOpen(true)}
                className="btn border-2 border-white/30 text-white hover:bg-white/10 text-base px-6 py-3.5">
                <Play className="w-4 h-4 fill-white" /> Watch Video
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-2">
                {['PM','RV','AS','AK'].map((i, idx) => (
                  <div key={idx}
                    className="w-9 h-9 rounded-full border-2 border-white bg-sky-600 flex items-center justify-center text-white text-xs font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sky-200 text-xs"><strong className="text-white">4.9/5</strong> from 12,400+ happy patients</p>
              </div>
            </div>
          </div>

          {/* Right — floating card cluster */}
          <div className="hidden lg:flex justify-center items-center relative animate-fade-in delay-2">
            <div className="relative w-80 h-80">
              {/* Central circle */}
              <div className="absolute inset-8 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-white mx-auto mb-2 animate-pulse-slow" />
                  <p className="text-white font-bold text-lg">MediCare</p>
                  <p className="text-sky-200 text-xs">HMS</p>
                </div>
              </div>
              {/* Orbit cards */}
              {[
                { label: 'Patients', value: '12,400+', pos: '-top-4 left-1/2 -translate-x-1/2', color: 'bg-emerald-500' },
                { label: 'Doctors',  value: '280+',    pos: 'top-1/2 -right-4 -translate-y-1/2', color: 'bg-amber-500' },
                { label: 'Depts',    value: '20+',     pos: '-bottom-4 left-1/2 -translate-x-1/2', color: 'bg-violet-500' },
                { label: 'Exp Yrs',  value: '25+',     pos: 'top-1/2 -left-4 -translate-y-1/2', color: 'bg-rose-500'  },
              ].map(({ label, value, pos, color }) => (
                <div key={label}
                  className={`absolute ${pos} bg-white rounded-xl px-4 py-2.5 shadow-xl text-center min-w-[80px]`}>
                  <p className={`text-lg font-extrabold ${color.replace('bg-','text-')}`}>{value}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-sky-50" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          QUICK ACTIONS BAND
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-sky-50 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Book Appointment',  color: 'btn-primary',  path: '/signup',      icon: Clock      },
            { label: 'Find a Doctor',     color: 'btn-outline',  path: '/doctors',     icon: Stethoscope },
            { label: 'Our Departments',   color: 'btn-ghost',    path: '/departments', icon: Activity   },
            { label: 'Emergency: 108',    color: 'btn-danger',   path: '#',            icon: Phone      },
          ].map(({ label, color, path, icon: Icon }) => (
            <Link key={label} to={path}
              className={`btn ${color} justify-center text-sm py-3`}>
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div key={label}
                className={`text-center p-6 rounded-2xl border border-sky-100 hover:shadow-lg hover:border-sky-200 transition-all animate-fade-in delay-${i+1}`}>
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-sky-500" />
                </div>
                <p className="text-4xl font-extrabold text-slate-800 mb-1">{value}</p>
                <p className="text-slate-500 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DEPARTMENTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-sky-500 font-bold text-xs uppercase tracking-widest">Our Specialties</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-3">World-Class Departments</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Equipped with the latest technology and staffed by leading specialists, our departments deliver unmatched clinical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEPARTMENTS.map(({ name, icon: Icon, desc, color }, i) => (
              <div key={name}
                className={`card p-6 border ${color.split(' ')[2]} group cursor-pointer animate-fade-in delay-${(i % 4) + 1}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.split(' ').slice(0,2).join(' ')} border ${color.split(' ')[2]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-sky-600 transition-colors">{name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-sky-500 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/departments" className="btn btn-outline px-8 py-3">
              View All Departments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURED DOCTORS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-sky-500 font-bold text-xs uppercase tracking-widest">Our Team</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-3">Meet Our Expert Doctors</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Our doctors are leaders in their fields — combining decades of clinical experience with compassionate patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCTORS.map(({ name, spec, exp, rating, reviews, init, color }, i) => (
              <div key={name}
                className={`card overflow-hidden text-center group animate-fade-in delay-${i+1}`}>
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 h-32 flex items-center justify-center relative">
                  <div className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-2xl font-extrabold border-4 border-white shadow-lg group-hover:scale-105 transition-transform`}>
                    {init}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 mb-0.5">{name}</h3>
                  <p className="text-sky-500 text-xs font-semibold mb-3">{spec}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <StarRating rating={Math.floor(rating)} />
                    <span className="text-xs font-bold text-slate-700">{rating}</span>
                    <span className="text-xs text-slate-400">({reviews})</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{exp} experience</p>
                  <Link to="/signup"
                    className="btn btn-primary w-full justify-center text-xs py-2">
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/doctors" className="btn btn-outline px-8 py-3">
              View All Doctors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-sky-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-sky-300 font-bold text-xs uppercase tracking-widest">Why MediCare?</span>
            <h2 className="text-4xl font-extrabold text-white mt-2 mb-4">Healthcare You Can Trust</h2>
            <p className="text-sky-200 text-sm leading-relaxed mb-8">
              For over 25 years, MediCare has been the region&apos;s most trusted name in healthcare &mdash; delivering advanced treatment with a human touch.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHYCHOOSE.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 border border-emerald-400/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{title}</p>
                    <p className="text-sky-300 text-xs leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '280+', label: 'Specialist Doctors', color: 'from-sky-500 to-sky-700'     },
              { val: '20+',  label: 'Departments',        color: 'from-emerald-500 to-teal-700' },
              { val: '98%',  label: 'Success Rate',       color: 'from-violet-500 to-purple-700'},
              { val: '24/7', label: 'Emergency Care',     color: 'from-rose-500 to-red-700'    },
            ].map(({ val, label, color }) => (
              <div key={label}
                className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-center text-white`}>
                <p className="text-3xl font-extrabold mb-1">{val}</p>
                <p className="text-white/80 text-xs font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="text-sky-500 font-bold text-xs uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-3">What Our Patients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ text, name, role, rating }, i) => (
              <div key={name}
                className={`card p-6 animate-fade-in delay-${i+1}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array(rating).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold text-sm flex items-center justify-center">
                    {name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{name}</p>
                    <p className="text-slate-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
            Ready to Take Charge of Your Health?
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-xl mx-auto">
            Register as a patient today to book appointments, track prescriptions, and access your complete medical history — all in one secure place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="btn btn-primary px-10 py-3.5 text-base justify-center">
              Register as Patient <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn btn-ghost px-8 py-3.5 text-base justify-center">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
