import React from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import SectionCard from '../components/ui/SectionCard';
import Badge from '../components/ui/Badge';
import { Calendar, FileText, Pill, Clock, Heart, ChevronRight, AlertTriangle } from 'lucide-react';

const stats = [
  { title: 'Upcoming Appointments', value: '3',   icon: Calendar, color: 'blue'   },
  { title: 'Active Prescriptions',  value: '5',   icon: Pill,     color: 'green'  },
  { title: 'Pending Lab Reports',   value: '2',   icon: FileText, color: 'yellow' },
  { title: 'Next Appointment',      value: '5d',  icon: Clock,    color: 'purple' },
];

const appointments = [
  { id: 'APT-089', doctor: 'Dr. Priya Mehta',  dept: 'Cardiology',  date: '05 Aug 2026', time: '10:00 AM', status: 'Confirmed'  },
  { id: 'APT-094', doctor: 'Dr. Rajan Verma',  dept: 'Orthopedics', date: '12 Aug 2026', time: '11:30 AM', status: 'Pending'    },
  { id: 'APT-102', doctor: 'Dr. Anjali Singh',  dept: 'Neurology',  date: '20 Aug 2026', time: '09:00 AM', status: 'Scheduled'  },
];

const prescriptions = [
  { drug: 'Amlodipine 5mg',    schedule: '1-0-1', duration: '30 days',  doctor: 'Dr. Priya Mehta',  status: 'Active'   },
  { drug: 'Metoprolol 25mg',   schedule: '0-0-1', duration: '30 days',  doctor: 'Dr. Priya Mehta',  status: 'Active'   },
  { drug: 'Aspirin 75mg',      schedule: '1-0-0', duration: 'Lifelong', doctor: 'Dr. Priya Mehta',  status: 'Active'   },
  { drug: 'Atorvastatin 10mg', schedule: '0-0-1', duration: '90 days',  doctor: 'Dr. Priya Mehta',  status: 'Active'   },
  { drug: 'Pantoprazole 40mg', schedule: '1-0-0', duration: '15 days',  doctor: 'Dr. Rajan Verma',  status: 'Expiring' },
];

const history = [
  { date: '28 Jul 2026', diagnosis: 'Hypertension Review',  doctor: 'Dr. Priya Mehta',  action: 'Prescription updated' },
  { date: '15 Jul 2026', diagnosis: 'Chest X-Ray',          doctor: 'Dr. Rajan Verma',  action: 'Report uploaded' },
  { date: '02 Jul 2026', diagnosis: 'Routine Blood Work',   doctor: 'Lab',              action: 'Results available' },
  { date: '20 Jun 2026', diagnosis: 'Cardiology Consult',   doctor: 'Dr. Priya Mehta',  action: 'Follow-up scheduled' },
];

export default function PatientDashboard() {
  return (
    <Layout role="patient">
      {/* Hero greeting */}
      <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-6 mb-6 overflow-hidden animate-fade-in">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 right-20 w-28 h-28 bg-white/5 rounded-full" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white">Welcome back, John Doe</h1>
            <p className="text-sky-100 text-sm mt-0.5">Patient ID: PAT-10042 · Blood Group: O+ · DOB: 15 Mar 1990</p>
          </div>
          <button className="btn bg-white text-sky-600 hover:bg-sky-50 self-start sm:self-auto shrink-0">
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={s.title} className={`animate-fade-in delay-${i + 1}`}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* Alert */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 animate-fade-in delay-2">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Prescription Expiring Soon</p>
          <p className="text-xs text-amber-700 mt-0.5">Pantoprazole 40mg expires in 3 days. Please contact your doctor for renewal.</p>
        </div>
        <button className="ml-auto btn btn-ghost text-xs shrink-0">Request Renewal</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Upcoming appointments */}
        <div className="xl:col-span-2 animate-fade-in delay-2">
          <SectionCard title="Upcoming Appointments" action={
            <button className="btn btn-outline text-xs py-1.5">+ Book New</button>
          }>
            <div className="flex flex-col gap-3">
              {appointments.map((a) => {
                const map = { Confirmed: 'green', Pending: 'yellow', Scheduled: 'blue' };
                return (
                  <div key={a.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex flex-col items-center justify-center shrink-0">
                      <p className="text-xs font-bold text-sky-700">{a.date.split(' ')[0]}</p>
                      <p className="text-xs text-sky-500">{a.date.split(' ')[1].slice(0,3)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{a.doctor}</p>
                      <p className="text-xs text-slate-500">{a.dept} · {a.time}</p>
                    </div>
                    <Badge color={map[a.status] || 'blue'}>{a.status}</Badge>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-400 transition-colors" />
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Active prescriptions */}
        <div className="flex flex-col gap-4 animate-fade-in delay-3">
          <SectionCard title="Active Prescriptions">
            <div className="flex flex-col gap-2.5">
              {prescriptions.map((p, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${p.status === 'Expiring' ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${p.status === 'Expiring' ? 'bg-amber-200' : 'bg-sky-100'}`}>
                    <Pill className={`w-4 h-4 ${p.status === 'Expiring' ? 'text-amber-700' : 'text-sky-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{p.drug}</p>
                    <p className="text-xs text-slate-500">{p.schedule} · {p.duration}</p>
                  </div>
                  {p.status === 'Expiring' && <Badge color="yellow">Expiring</Badge>}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Medical history timeline */}
      <div className="mt-4 animate-fade-in delay-4">
        <SectionCard title="Recent Medical History">
          <div className="relative flex flex-col gap-6 pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-200" />
            {history.map((h, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-sky-400 border-2 border-white" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <p className="text-xs text-slate-400 font-medium min-w-[8rem]">{h.date}</p>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{h.diagnosis}</p>
                    <p className="text-xs text-slate-500">{h.doctor} · <span className="text-sky-500">{h.action}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </Layout>
  );
}
