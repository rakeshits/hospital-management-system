import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import { UserCog, ToggleLeft, ToggleRight } from 'lucide-react';

const SEED = [
  { id:1, name:'Admin User',      email:'admin@medicare.com',   role:'admin',   active:true,  joined:'2020-01-15' },
  { id:2, name:'Dr. Priya Mehta', email:'priya@medicare.com',   role:'doctor',  active:true,  joined:'2020-03-10' },
  { id:3, name:'Dr. Rajan Verma', email:'rajan@medicare.com',   role:'doctor',  active:true,  joined:'2020-04-05' },
  { id:4, name:'Rahul Sharma',    email:'rahul@gmail.com',      role:'patient', active:true,  joined:'2023-06-20' },
  { id:5, name:'Sunita Rao',      email:'sunita@gmail.com',     role:'patient', active:true,  joined:'2023-07-14' },
  { id:6, name:'Vikram Desai',    email:'vikram@gmail.com',     role:'patient', active:false, joined:'2023-08-01' },
  { id:7, name:'Dr. Anjali Singh',email:'anjali@medicare.com',  role:'doctor',  active:true,  joined:'2021-01-20' },
  { id:8, name:'Meena Pillai',    email:'meena@gmail.com',      role:'patient', active:true,  joined:'2024-01-05' },
];

const ROLE_BADGE = { admin:'badge-red', doctor:'badge-blue', patient:'badge-green' };

export default function ManageUsers() {
  const [users, setUsers] = useState(SEED);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? users : users.filter(u => u.role === filter);

  const toggleActive = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const changeRole   = (id, role) => setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));

  const COLS = [
    { key:'name',   label:'User', render:(v,r) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
          {v.split(' ').map(w=>w[0]).join('').slice(0,2)}
        </div>
        <div><p className="font-semibold text-slate-800 text-sm">{v}</p><p className="text-xs text-slate-400">{r.email}</p></div>
      </div>
    )},
    { key:'role',   label:'Role', render:(v,r) => (
      <select value={v} onChange={e => changeRole(r.id, e.target.value)}
        className="text-xs border border-[--color-border-mist] rounded-lg px-2 py-1 bg-[--color-cream-paper] text-slate-700 focus:outline-none focus:border-[--color-forest-ink]">
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
    )},
    { key:'joined', label:'Joined', render:(v) => new Date(v).toLocaleDateString('en-IN') },
    { key:'active', label:'Status', render:(v) => <span className={`badge ${v?'badge-green':'badge-red'}`}>{v?'Active':'Inactive'}</span> },
  ];

  return (
    <AppLayout title="Manage Users">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Users</h1>
          <p className="text-slate-500 text-sm">{users.length} total users</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['All','admin','doctor','patient'].map(r => (
          <button key={r} onClick={() => setFilter(r)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all
              ${filter===r ? 'bg-[--color-forest-ink] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <Table
          columns={COLS}
          data={filtered}
          actions={(row) => (
            <button
              onClick={() => toggleActive(row.id)}
              className={`btn py-1.5 px-2.5 text-xs flex items-center gap-1 ${row.active ? 'btn-danger' : 'btn-success'}`}
            >
              {row.active
                ? <><ToggleRight className="w-3.5 h-3.5" /> Deactivate</>
                : <><ToggleLeft  className="w-3.5 h-3.5" /> Activate</>}
            </button>
          )}
        />
      </div>
    </AppLayout>
  );
}
