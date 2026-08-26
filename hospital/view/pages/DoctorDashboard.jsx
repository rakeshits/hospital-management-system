import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import SectionCard from '../components/ui/SectionCard';
import Badge from '../components/ui/Badge';
import { Calendar, Users, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

const stats = [
  { title: "Today's Appointments", value: '14',  icon: Calendar,      color: 'blue'   },
  { title: 'Total Patients',        value: '326', icon: Users,         color: 'green'  },
  { title: 'Pending Reviews',       value: '6',   icon: Clock,         color: 'yellow' },
  { title: 'Completed Today',       value: '8',   icon: CheckCircle,   color: 'purple' },
];

const todayAppts = [
  { time: '09:00', name: 'Aarav Shah',   age: 34, reason: 'Chest Pain Follow-up', status: 'Completed', room: 'B-201' },
  { time: '09:30', name: 'Nisha Patel',  age: 28, reason: 'Routine Check-up',     status: 'Completed', room: 'B-201' },
  { time: '10:00', name: 'Kiran Rao',    age: 55, reason: 'Hypertension Review',  status: 'In Progress', room: 'B-201' },
  { time: '10:30', name: 'Mehul Desai',  age: 41, reason: 'ECG Abnormality',      status: 'Waiting',   room: 'B-201' },
  { time: '11:00', name: 'Riya Gupta',   age: 19, reason: 'Palpitations',         status: 'Waiting',   room: 'B-201' },
  { time: '11:30', name: 'Sanjay Iyer',  age: 62, reason: 'Post-surgery Review',  status: 'Scheduled', room: 'B-201' },
];

const patients = [
  { id: 'P-1001', name: 'Aarav Shah',   lastVisit: '31 Jul 2026', diagnosis: 'Hypertension', next: '15 Aug' },
  { id: 'P-1002', name: 'Nisha Patel',  lastVisit: '28 Jul 2026', diagnosis: 'Arrhythmia',   next: '10 Aug' },
  { id: 'P-1003', name: 'Kiran Rao',    lastVisit: '31 Jul 2026', diagnosis: 'CAD',           next: '31 Aug' },
  { id: 'P-1004', name: 'Preethi Rao',  lastVisit: '25 Jul 2026', diagnosis: 'Heart Failure', next: '05 Aug' },
  { id: 'P-1005', name: 'Vivek Kumar',  lastVisit: '20 Jul 2026', diagnosis: 'Chest Pain',    next: '20 Aug' },
];

const statusBadge = (s) => {
  const map = { 'Completed': 'green', 'In Progress': 'blue', 'Waiting': 'yellow', 'Scheduled': 'purple', 'Cancelled': 'red' };
  return <Badge color={map[s] || 'blue'}>{s}</Badge>;
};

export default function DoctorDashboard() {
  const [tab, setTab] = useState('appointments');

  return (
    <Layout role="doctor">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Good morning, Dr. Priya Mehta 👋</h1>
          <p className="text-slate-500 text-sm mt-0.5">Cardiology Dept · Thursday, 31 Jul 2026</p>
        </div>
        <button className="btn btn-primary self-start sm:self-auto">
          <Calendar className="w-4 h-4" /> View Full Schedule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={s.title} className={`animate-fade-in delay-${i + 1}`}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Appointment timeline */}
        <div className="xl:col-span-2 animate-fade-in delay-2">
          <SectionCard title="Today's Schedule" action={
            <div className="flex gap-1">
              {['appointments', 'patients'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                    ${tab === t ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {t}
                </button>
              ))}
            </div>
          }>
            {tab === 'appointments' ? (
              <div className="flex flex-col gap-2">
                {todayAppts.map((a, i) => (
                  <div key={i}
                    className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-all cursor-pointer group">
                    <div className="text-center min-w-[3.5rem]">
                      <p className="text-sm font-bold text-slate-800">{a.time}</p>
                      <p className="text-xs text-slate-400">AM</p>
                    </div>
                    <div className={`w-1 h-10 rounded-full shrink-0 ${a.status === 'Completed' ? 'bg-emerald-400' : a.status === 'In Progress' ? 'bg-sky-400 animate-pulse-slow' : 'bg-slate-200'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm">{a.name}</p>
                      <p className="text-xs text-slate-500 truncate">{a.reason} · Age {a.age}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {statusBadge(a.status)}
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="hms-table">
                  <thead><tr><th>ID</th><th>Name</th><th>Diagnosis</th><th>Last Visit</th><th>Next Appt</th></tr></thead>
                  <tbody>
                    {patients.map(p => (
                      <tr key={p.id}>
                        <td className="font-mono text-xs text-slate-500">{p.id}</td>
                        <td className="font-medium">{p.name}</td>
                        <td><Badge color="blue">{p.diagnosis}</Badge></td>
                        <td className="text-slate-500 text-xs">{p.lastVisit}</td>
                        <td className="text-xs font-medium text-sky-600">{p.next}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 animate-fade-in delay-3">
          {/* Current patient */}
          <SectionCard title="Current Patient">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-xl">KR</div>
              <div>
                <p className="font-bold text-slate-800">Kiran Rao</p>
                <p className="text-xs text-slate-400">ID: P-1003 · Room B-201</p>
              </div>
              <div className="w-full bg-slate-50 rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Age</span><span className="font-medium">55 yrs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Blood Group</span><span className="font-medium">O+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Diagnosis</span><span className="font-medium">CAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Allergies</span><span className="font-medium text-red-500">Penicillin</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <button className="btn btn-primary text-xs justify-center py-2">Add Note</button>
                <button className="btn btn-outline text-xs justify-center py-2">View History</button>
              </div>
            </div>
          </SectionCard>

          {/* Vitals */}
          <SectionCard title="Latest Vitals – Kiran Rao">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'BP',         val: '138/88', unit: 'mmHg', color: 'text-red-500'   },
                { label: 'Pulse',      val: '78',     unit: 'bpm',  color: 'text-sky-500'   },
                { label: 'SpO2',       val: '97%',    unit: '',     color: 'text-emerald-500'},
                { label: 'Temp',       val: '98.4',   unit: '°F',   color: 'text-amber-500' },
              ].map(v => (
                <div key={v.label} className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className={`text-xl font-bold ${v.color}`}>{v.val}<span className="text-xs font-normal text-slate-400 ml-0.5">{v.unit}</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">{v.label}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </Layout>
  );
}
