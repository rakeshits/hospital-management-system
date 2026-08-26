import React from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import SectionCard from '../components/ui/SectionCard';
import Badge from '../components/ui/Badge';
import {
  Users, Stethoscope, Calendar, DollarSign,
  TrendingUp, Activity, Clock, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';

const stats = [
  { title: 'Total Patients',      value: '12,430', icon: Users,       color: 'blue',   trend: { up: true,  value: '8.2%' } },
  { title: 'Active Doctors',      value: '284',    icon: Stethoscope, color: 'green',  trend: { up: true,  value: '3.1%' } },
  { title: "Today's Appointments",value: '1,042',  icon: Calendar,    color: 'yellow', trend: { up: false, value: '1.4%' } },
  { title: 'Monthly Revenue',     value: '₹8.4L',  icon: DollarSign,  color: 'purple', trend: { up: true,  value: '14.5%' } },
];

const recentAppointments = [
  { id: 'APT-001', patient: 'Aarav Shah',    doctor: 'Dr. Priya Mehta',    time: '09:00 AM', dept: 'Cardiology', status: 'Confirmed'  },
  { id: 'APT-002', patient: 'Nisha Patel',   doctor: 'Dr. Rajan Verma',    time: '09:30 AM', dept: 'Orthopedics',status: 'Pending'    },
  { id: 'APT-003', patient: 'Kiran Rao',     doctor: 'Dr. Anjali Singh',   time: '10:00 AM', dept: 'Neurology',  status: 'Confirmed'  },
  { id: 'APT-004', patient: 'Mehul Desai',   doctor: 'Dr. Priya Mehta',    time: '10:30 AM', dept: 'Cardiology', status: 'Cancelled'  },
  { id: 'APT-005', patient: 'Riya Gupta',    doctor: 'Dr. Amit Kumar',     time: '11:00 AM', dept: 'Pediatrics', status: 'Completed'  },
];

const activities = [
  { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50', text: 'New patient Aarav Shah registered', time: '2 min ago'  },
  { icon: Calendar,    color: 'text-sky-500 bg-sky-50',         text: 'Appointment APT-006 confirmed',     time: '12 min ago' },
  { icon: AlertCircle, color: 'text-amber-500 bg-amber-50',     text: 'Lab report pending for P-1090',     time: '35 min ago' },
  { icon: XCircle,     color: 'text-red-500 bg-red-50',         text: 'Appointment APT-004 cancelled',     time: '1 hr ago'   },
  { icon: DollarSign,  color: 'text-violet-500 bg-violet-50',   text: 'Invoice #INV-2034 paid – ₹4,200',   time: '2 hr ago'   },
];

const deptData = [
  { name: 'Cardiology',   count: 310, pct: 85 },
  { name: 'Orthopedics',  count: 240, pct: 66 },
  { name: 'Neurology',    count: 190, pct: 52 },
  { name: 'Pediatrics',   count: 160, pct: 44 },
  { name: 'Gynecology',   count: 130, pct: 36 },
];

const statusBadge = (s) => {
  const map = { Confirmed: 'green', Pending: 'yellow', Cancelled: 'red', Completed: 'blue' };
  return <Badge color={map[s] || 'blue'}>{s}</Badge>;
};

export default function AdminDashboard() {
  return (
    <Layout role="admin">
      {/* Header */}
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-extrabold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Thursday, 31 Jul 2026 · MediCare General Hospital</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={s.title} className={`animate-fade-in delay-${i + 1}`}>
            <StatCard {...s} />
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {/* Appointments Table */}
        <div className="xl:col-span-2 animate-fade-in delay-3">
          <SectionCard
            title="Today's Appointments"
            action={<button className="btn btn-outline btn-sm text-xs">View All</button>}
          >
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="hms-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Patient</th><th>Doctor</th>
                    <th>Time</th><th>Department</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map(a => (
                    <tr key={a.id}>
                      <td className="font-mono text-xs text-slate-500">{a.id}</td>
                      <td className="font-medium">{a.patient}</td>
                      <td className="text-slate-600">{a.doctor}</td>
                      <td>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />{a.time}
                        </span>
                      </td>
                      <td><Badge color="blue">{a.dept}</Badge></td>
                      <td>{statusBadge(a.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Activity Feed */}
        <div className="animate-fade-in delay-4">
          <SectionCard title="Recent Activity">
            <div className="flex flex-col gap-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`${a.color} p-2 rounded-lg shrink-0`}>
                    <a.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Dept load */}
        <SectionCard title="Department Patient Load" className="animate-fade-in delay-3">
          <div className="flex flex-col gap-4">
            {deptData.map(d => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{d.name}</span>
                  <span className="text-slate-500">{d.count} pts</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-700"
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Quick actions */}
        <SectionCard title="Quick Actions" className="animate-fade-in delay-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add New Doctor',     color: 'bg-sky-500',     icon: Stethoscope },
              { label: 'Register Patient',   color: 'bg-emerald-500', icon: Users       },
              { label: 'Book Appointment',   color: 'bg-amber-500',   icon: Calendar    },
              { label: 'Generate Report',    color: 'bg-violet-500',  icon: TrendingUp  },
              { label: 'View Billing',       color: 'bg-rose-500',    icon: DollarSign  },
              { label: 'System Monitor',     color: 'bg-slate-600',   icon: Activity    },
            ].map(({ label, color, icon: Icon }) => (
              <button key={label}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all hover:shadow-sm text-left group">
                <div className={`${color} w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </Layout>
  );
}
