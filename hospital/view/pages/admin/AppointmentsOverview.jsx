import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import { Search, CalendarDays } from 'lucide-react';

const SEED = [
  { id:1,  patient:'Rahul Sharma',    doctor:'Dr. Priya Mehta',   dept:'Cardiology',  date:'2025-06-10', time:'09:00 AM', type:'Consultation', status:'Confirmed'  },
  { id:2,  patient:'Sunita Rao',      doctor:'Dr. Anjali Singh',  dept:'Neurology',   date:'2025-06-10', time:'09:30 AM', type:'Follow-up',    status:'Confirmed'  },
  { id:3,  patient:'Vikram Desai',    doctor:'Dr. Rajan Verma',   dept:'Orthopedics', date:'2025-06-10', time:'10:00 AM', type:'Consultation', status:'Pending'    },
  { id:4,  patient:'Meena Pillai',    doctor:'Dr. Amit Kumar',    dept:'Pediatrics',  date:'2025-06-10', time:'10:30 AM', type:'Consultation', status:'Confirmed'  },
  { id:5,  patient:'Arun Patel',      doctor:'Dr. Kavitha Nair',  dept:'Oncology',    date:'2025-06-10', time:'11:00 AM', type:'Chemotherapy', status:'Cancelled'  },
  { id:6,  patient:'Priya Krishnan',  doctor:'Dr. Sunita Reddy',  dept:'Gynecology',  date:'2025-06-11', time:'09:00 AM', type:'Consultation', status:'Confirmed'  },
  { id:7,  patient:'Deepak Nair',     doctor:'Dr. Priya Mehta',   dept:'Cardiology',  date:'2025-06-11', time:'09:30 AM', type:'Follow-up',    status:'Completed'  },
  { id:8,  patient:'Lakshmi Iyer',    doctor:'Dr. Anjali Singh',  dept:'Neurology',   date:'2025-06-11', time:'10:00 AM', type:'MRI Review',   status:'Pending'    },
  { id:9,  patient:'Ravi Kumar',      doctor:'Dr. Rajan Verma',   dept:'Orthopedics', date:'2025-06-12', time:'11:00 AM', type:'Surgery Prep', status:'Confirmed'  },
  { id:10, patient:'Anita Sharma',    doctor:'Dr. Amit Kumar',    dept:'Pediatrics',  date:'2025-06-12', time:'02:00 PM', type:'Vaccination',  status:'Completed'  },
];

const STATUS_BADGE = { Confirmed:'badge-green', Pending:'badge-yellow', Cancelled:'badge-red', Completed:'badge-blue' };

const COLS = [
  { key:'patient',  label:'Patient'    },
  { key:'doctor',   label:'Doctor'     },
  { key:'dept',     label:'Department', render:(v) => <span className="badge badge-blue">{v}</span> },
  { key:'date',     label:'Date',       render:(v) => new Date(v).toLocaleDateString('en-IN') },
  { key:'time',     label:'Time'        },
  { key:'type',     label:'Type'        },
  { key:'status',   label:'Status',     render:(v) => <span className={`badge ${STATUS_BADGE[v]}`}>{v}</span> },
];

export default function AppointmentsOverview() {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = SEED
    .filter(a => filter === 'All' || a.status === filter)
    .filter(a => a.patient.toLowerCase().includes(query.toLowerCase()) || a.doctor.toLowerCase().includes(query.toLowerCase()));

  return (
    <AppLayout title="Appointments Overview">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">All Appointments</h1>
          <p className="text-slate-500 text-sm">{SEED.length} total appointments</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search…" className="input-field pl-9 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {['All','Confirmed','Pending','Completed','Cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${filter===s ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <Table columns={COLS} data={filtered} emptyMessage="No appointments match the filter." />
      </div>
    </AppLayout>
  );
}
