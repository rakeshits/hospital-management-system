import React from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import { StatCard } from '../../components/Card.jsx';
import { useAuth } from '../../../src/context/AuthContext.jsx';
import { CalendarDays, Users, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TODAY_APPTS = [
  { id:1, patient:'Rahul Sharma',   time:'09:00 AM', type:'Consultation', status:'Confirmed', age:35, issue:'Chest pain follow-up'    },
  { id:2, patient:'Sunita Rao',     time:'09:30 AM', type:'Follow-up',    status:'Confirmed', age:50, issue:'Post-angioplasty review' },
  { id:3, patient:'Deepak Nair',    time:'10:00 AM', type:'Consultation', status:'Pending',   age:70, issue:'Shortness of breath'     },
  { id:4, patient:'Anita Sharma',   time:'10:30 AM', type:'Follow-up',    status:'Confirmed', age:45, issue:'Hypertension management' },
  { id:5, patient:'Ravi Kumar',     time:'11:00 AM', type:'Consultation', status:'Confirmed', age:58, issue:'ECG review'              },
];

const RECENT_PATIENTS = [
  { id:1, name:'Meena Pillai',   last:'2025-06-08', diagnosis:'Atrial Fibrillation',  init:'MP', color:'bg-[--color-keylime-wash] text-[--color-forest-ink]' },
  { id:2, name:'Vikram Desai',   last:'2025-06-07', diagnosis:'Hypertension Stage 2', init:'VD', color:'bg-emerald-100 text-emerald-700'},
  { id:3, name:'Lakshmi Iyer',   last:'2025-06-06', diagnosis:'Coronary Artery Disease',init:'LI',color:'bg-violet-100 text-violet-700'},
];

const STATUS_BADGE = { Confirmed:'badge-green', Pending:'badge-yellow', Cancelled:'badge-red' };

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <AppLayout title="Doctor Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-800">Good morning, {user?.name} 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Here's your schedule for today — {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <StatCard label="Today's Appointments" value="5"  icon={CalendarDays} color="text-[--color-forest-ink]" bg="bg-[--color-keylime-wash]" />
        <StatCard label="Patients Seen"         value="3"  icon={CheckCircle2} color="text-emerald-500" bg="bg-emerald-50" trend="Today" />
        <StatCard label="Pending"               value="2"  icon={Clock}        color="text-amber-500"   bg="bg-amber-50"   />
        <StatCard label="Total Patients"        value="84" icon={Users}        color="text-violet-500"  bg="bg-violet-50"  />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <CalendarDays className="w-4.5 h-4.5 text-[--color-forest-ink]" /> Today's Schedule
            </h2>
            <Link to="/doctor/appointments" className="text-[--color-forest-ink] text-xs font-semibold hover:text-[--color-forest-shadow] flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {TODAY_APPTS.map(a => (
              <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-center shrink-0 w-16">
                  <p className="text-xs font-bold text-[--color-forest-ink]">{a.time.split(' ')[0]}</p>
                  <p className="text-xs text-slate-400">{a.time.split(' ')[1]}</p>
                </div>
                <div className="w-px h-10 bg-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{a.patient}</p>
                  <p className="text-xs text-slate-400">{a.issue} · Age {a.age}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="badge badge-purple text-xs">{a.type}</span>
                  <span className={`badge ${STATUS_BADGE[a.status]} text-xs`}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-emerald-500" /> Recent Patients
            </h2>
            <Link to="/doctor/patients" className="text-[--color-forest-ink] text-xs font-semibold hover:text-[--color-forest-shadow]">View all</Link>
          </div>
          <div className="flex flex-col gap-3">
            {RECENT_PATIENTS.map(p => (
              <Link key={p.id} to={`/doctor/patients/${p.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className={`w-10 h-10 rounded-full ${p.color} font-bold text-sm flex items-center justify-center shrink-0`}>
                  {p.init}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400 truncate">{p.diagnosis}</p>
                  <p className="text-xs text-slate-300">Last: {new Date(p.last).toLocaleDateString('en-IN')}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[--color-forest-ink] transition-colors" />
              </Link>
            ))}
          </div>
          <Link to="/doctor/patients" className="btn btn-outline w-full justify-center mt-4 text-sm py-2">
            All My Patients
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
