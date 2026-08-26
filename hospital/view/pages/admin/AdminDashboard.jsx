import React from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import { StatCard } from '../../components/Card.jsx';
import {
  Users, Stethoscope, CalendarDays, DollarSign,
  TrendingUp, Clock, CheckCircle2, AlertCircle, Activity
} from 'lucide-react';

const STATS = [
  { label: 'Total Patients',       value: '3,842',  icon: Users,        color: 'text-sky-500',     bg: 'bg-sky-50',     trend: '↑ 12% this month' },
  { label: 'Active Doctors',       value: '48',     icon: Stethoscope,  color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '2 new this week'  },
  { label: "Today's Appointments", value: '127',    icon: CalendarDays, color: 'text-violet-500',  bg: 'bg-violet-50',  trend: '18 pending'       },
  { label: 'Monthly Revenue',      value: '₹8.4L',  icon: DollarSign,   color: 'text-amber-500',   bg: 'bg-amber-50',   trend: '↑ 8% vs last month'},
];

const RECENT_ACTIVITY = [
  { id:1, type:'appointment', msg:'New appointment booked — Rahul Sharma with Dr. Priya Mehta',  time:'2 min ago',  status:'new'     },
  { id:2, type:'admission',   msg:'Patient Sunita Rao admitted to Room 204 (Cardiology)',         time:'15 min ago', status:'info'    },
  { id:3, type:'billing',     msg:'Invoice #INV-2847 marked as paid — ₹12,500',                  time:'32 min ago', status:'success' },
  { id:4, type:'alert',       msg:'Medicine stock low: Metformin 500mg — only 12 units left',    time:'1 hr ago',   status:'warning' },
  { id:5, type:'appointment', msg:'Appointment cancelled — Vikram Desai (Dr. Rajan Verma)',      time:'2 hrs ago',  status:'danger'  },
  { id:6, type:'doctor',      msg:'Dr. Anjali Singh updated availability for next week',          time:'3 hrs ago',  status:'info'    },
];

const DEPT_LOAD = [
  { dept: 'Cardiology',  patients: 42, capacity: 50, color: 'bg-red-400'    },
  { dept: 'Neurology',   patients: 28, capacity: 40, color: 'bg-purple-400' },
  { dept: 'Orthopedics', patients: 35, capacity: 45, color: 'bg-amber-400'  },
  { dept: 'Pediatrics',  patients: 19, capacity: 30, color: 'bg-sky-400'    },
  { dept: 'Oncology',    patients: 24, capacity: 35, color: 'bg-indigo-400' },
];

const TODAY_APPTS = [
  { id:1, patient:'Rahul Sharma',   doctor:'Dr. Priya Mehta',  time:'09:00 AM', dept:'Cardiology',  status:'Confirmed' },
  { id:2, patient:'Meena Pillai',   doctor:'Dr. Anjali Singh', time:'09:30 AM', dept:'Neurology',   status:'Confirmed' },
  { id:3, patient:'Vikram Desai',   doctor:'Dr. Amit Kumar',   time:'10:00 AM', dept:'Pediatrics',  status:'Pending'   },
  { id:4, patient:'Sunita Rao',     doctor:'Dr. Rajan Verma',  time:'10:30 AM', dept:'Orthopedics', status:'Confirmed' },
  { id:5, patient:'Arun Patel',     doctor:'Dr. Kavitha Nair', time:'11:00 AM', dept:'Oncology',    status:'Cancelled' },
];

const STATUS_BADGE = {
  Confirmed: 'badge badge-green',
  Pending:   'badge badge-yellow',
  Cancelled: 'badge badge-red',
};

const ACTIVITY_ICON = {
  new:     { cls: 'bg-sky-100 text-sky-600',     icon: CalendarDays  },
  info:    { cls: 'bg-blue-100 text-blue-600',   icon: Activity      },
  success: { cls: 'bg-emerald-100 text-emerald-600', icon: CheckCircle2 },
  warning: { cls: 'bg-amber-100 text-amber-600', icon: AlertCircle   },
  danger:  { cls: 'bg-red-100 text-red-600',     icon: AlertCircle   },
};

export default function AdminDashboard() {
  return (
    <AppLayout title="Admin Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {STATS.map((s, i) => (
          <div key={s.label} className={`animate-fade-in delay-${i + 1}`}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Today's Appointments */}
        <div className="xl:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <CalendarDays className="w-4.5 h-4.5 text-sky-500" /> Today's Appointments
            </h2>
            <span className="badge badge-blue">{TODAY_APPTS.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Patient</th><th>Doctor</th><th>Time</th><th>Dept</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {TODAY_APPTS.map(a => (
                  <tr key={a.id}>
                    <td className="font-medium text-slate-800">{a.patient}</td>
                    <td className="text-slate-600">{a.doctor}</td>
                    <td><span className="flex items-center gap-1 text-slate-500"><Clock className="w-3.5 h-3.5" />{a.time}</span></td>
                    <td><span className="badge badge-blue">{a.dept}</span></td>
                    <td><span className={STATUS_BADGE[a.status]}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Load */}
        <div className="card">
          <h2 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-emerald-500" /> Department Load
          </h2>
          <div className="flex flex-col gap-4">
            {DEPT_LOAD.map(({ dept, patients, capacity, color }) => {
              const pct = Math.round((patients / capacity) * 100);
              return (
                <div key={dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{dept}</span>
                    <span className="text-slate-400">{patients}/{capacity}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{pct}% capacity</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-violet-500" /> Recent Activity
        </h2>
        <div className="flex flex-col gap-3">
          {RECENT_ACTIVITY.map(({ id, msg, time, status }) => {
            const { cls, icon: Icon } = ACTIVITY_ICON[status];
            return (
              <div key={id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cls}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-snug">{msg}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
