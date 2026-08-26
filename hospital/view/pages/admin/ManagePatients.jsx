import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import { Search, Eye, Users } from 'lucide-react';

const SEED = [
  { id:1,  name:'Rahul Sharma',    email:'rahul@gmail.com',   phone:'+91 98765 11111', dob:'1990-05-14', gender:'Male',   bloodGroup:'B+', doctor:'Dr. Priya Mehta',  status:'Active'    },
  { id:2,  name:'Sunita Rao',      email:'sunita@gmail.com',  phone:'+91 98765 22222', dob:'1975-08-22', gender:'Female', bloodGroup:'O+', doctor:'Dr. Anjali Singh', status:'Admitted'  },
  { id:3,  name:'Vikram Desai',    email:'vikram@gmail.com',  phone:'+91 98765 33333', dob:'1985-11-03', gender:'Male',   bloodGroup:'A+', doctor:'Dr. Rajan Verma',  status:'Active'    },
  { id:4,  name:'Meena Pillai',    email:'meena@gmail.com',   phone:'+91 98765 44444', dob:'1992-02-17', gender:'Female', bloodGroup:'AB-',doctor:'Dr. Amit Kumar',   status:'Active'    },
  { id:5,  name:'Arun Patel',      email:'arun@gmail.com',    phone:'+91 98765 55555', dob:'1968-07-30', gender:'Male',   bloodGroup:'O-', doctor:'Dr. Kavitha Nair', status:'Discharged'},
  { id:6,  name:'Priya Krishnan',  email:'priya.k@gmail.com', phone:'+91 98765 66666', dob:'1998-12-05', gender:'Female', bloodGroup:'B-', doctor:'Dr. Sunita Reddy', status:'Active'    },
  { id:7,  name:'Deepak Nair',     email:'deepak@gmail.com',  phone:'+91 98765 77777', dob:'1955-04-19', gender:'Male',   bloodGroup:'A-', doctor:'Dr. Priya Mehta',  status:'Active'    },
  { id:8,  name:'Lakshmi Iyer',    email:'lakshmi@gmail.com', phone:'+91 98765 88888', dob:'1980-09-11', gender:'Female', bloodGroup:'O+', doctor:'Dr. Anjali Singh', status:'Admitted'  },
];

const STATUS_BADGE = { Active:'badge-green', Admitted:'badge-blue', Discharged:'badge-yellow' };

const COLS = [
  { key:'name',   label:'Patient', render:(v,r) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center">
        {v.split(' ').map(w=>w[0]).join('')}
      </div>
      <div><p className="font-semibold text-slate-800 text-sm">{v}</p><p className="text-xs text-slate-400">{r.email}</p></div>
    </div>
  )},
  { key:'phone',       label:'Phone'       },
  { key:'gender',      label:'Gender'      },
  { key:'bloodGroup',  label:'Blood Group', render:(v) => <span className="badge badge-red">{v}</span> },
  { key:'doctor',      label:'Assigned Doctor' },
  { key:'status',      label:'Status',      render:(v) => <span className={`badge ${STATUS_BADGE[v]||'badge-yellow'}`}>{v}</span> },
];

export default function ManagePatients() {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = SEED
    .filter(p => filter === 'All' || p.status === filter)
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.email.toLowerCase().includes(query.toLowerCase()));

  return (
    <AppLayout title="Manage Patients">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Patients</h1>
          <p className="text-slate-500 text-sm">{SEED.length} registered patients</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search patients…" className="input-field pl-9 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['All','Active','Admitted','Discharged'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${filter===s ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <Table
          columns={COLS}
          data={filtered}
          actions={(row) => (
            <a href={`/doctor/patients/${row.id}`} className="btn btn-ghost py-1.5 px-2.5 text-xs">
              <Eye className="w-3.5 h-3.5" /> View
            </a>
          )}
        />
      </div>
    </AppLayout>
  );
}
