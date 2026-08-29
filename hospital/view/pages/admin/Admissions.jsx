import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import { Plus, LogOut, Search, ClipboardList } from 'lucide-react';

const INIT = { patient:'', doctor:'', room:'', department:'', admitDate:'', reason:'', status:'Admitted' };

const SEED = [
  { id:1, patient:'Sunita Rao',     doctor:'Dr. Anjali Singh', room:'201', department:'Neurology',   admitDate:'2025-06-01', reason:'Stroke evaluation',      status:'Admitted'   },
  { id:2, patient:'Lakshmi Iyer',   doctor:'Dr. Priya Mehta',  room:'102', department:'Cardiology',  admitDate:'2025-06-03', reason:'Cardiac monitoring',     status:'Admitted'   },
  { id:3, patient:'Ravi Kumar',     doctor:'Dr. Rajan Verma',  room:'203', department:'Orthopedics', admitDate:'2025-05-28', reason:'Post-surgery recovery',  status:'Admitted'   },
  { id:4, patient:'Deepak Nair',    doctor:'Dr. Priya Mehta',  room:'204', department:'Cardiology',  admitDate:'2025-05-20', reason:'Angioplasty recovery',   status:'Discharged' },
  { id:5, patient:'Anita Sharma',   doctor:'Dr. Amit Kumar',   room:'301', department:'Pediatrics',  admitDate:'2025-06-05', reason:'Fever & dehydration',    status:'Admitted'   },
  { id:6, patient:'Priya Krishnan', doctor:'Dr. Sunita Reddy', room:'105', department:'Gynecology',  admitDate:'2025-05-30', reason:'Post-delivery care',     status:'Discharged' },
];

const STATUS_BADGE = { Admitted:'badge-blue', Discharged:'badge-green', Critical:'badge-red' };

const COLS = [
  { key:'patient',    label:'Patient',    render:(v) => <span className="font-semibold text-slate-800">{v}</span> },
  { key:'doctor',     label:'Doctor'      },
  { key:'room',       label:'Room',       render:(v) => <span className="badge badge-purple">Room {v}</span> },
  { key:'department', label:'Department'  },
  { key:'admitDate',  label:'Admit Date', render:(v) => new Date(v).toLocaleDateString('en-IN') },
  { key:'reason',     label:'Reason'      },
  { key:'status',     label:'Status',     render:(v) => <span className={`badge ${STATUS_BADGE[v]}`}>{v}</span> },
];

export default function Admissions() {
  const [admissions, setAdmissions] = useState(SEED);
  const [modal,      setModal]      = useState(false);
  const [form,       setForm]       = useState(INIT);
  const [filter,     setFilter]     = useState('All');
  const [query,      setQuery]      = useState('');

  const filtered = admissions
    .filter(a => filter === 'All' || a.status === filter)
    .filter(a => a.patient.toLowerCase().includes(query.toLowerCase()));

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleAdmit = (e) => {
    e.preventDefault();
    setAdmissions(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(false);
    setForm(INIT);
  };

  const handleDischarge = (id) => {
    if (confirm('Discharge this patient?'))
      setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: 'Discharged' } : a));
  };

  return (
    <AppLayout title="Admissions">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Admissions</h1>
          <p className="text-slate-500 text-sm">{admissions.filter(a=>a.status==='Admitted').length} currently admitted</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search…" className="input-field pl-9 py-2 text-sm" />
          </div>
          <button onClick={() => setModal(true)} className="btn btn-primary shrink-0">
            <Plus className="w-4 h-4" /> Admit Patient
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['All','Admitted','Discharged','Critical'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all
              ${filter===s ? 'bg-[--color-forest-ink] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <Table
          columns={COLS}
          data={filtered}
          actions={(row) => row.status === 'Admitted' ? (
            <button onClick={() => handleDischarge(row.id)} className="btn btn-success py-1.5 px-2.5 text-xs">
              <LogOut className="w-3.5 h-3.5" /> Discharge
            </button>
          ) : (
            <span className="text-xs text-slate-400">Discharged</span>
          )}
        />
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Admit New Patient">
        <form onSubmit={handleAdmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Patient Name"  id="apname" value={form.patient}    onChange={e=>set('patient',e.target.value)}    placeholder="Full name" required />
          <FormInput label="Doctor"        id="adoc"   value={form.doctor}     onChange={e=>set('doctor',e.target.value)}     placeholder="Dr. Name" />
          <FormInput label="Room Number"   id="aroom"  value={form.room}       onChange={e=>set('room',e.target.value)}       placeholder="e.g. 204" />
          <FormInput label="Department"    id="adept"  value={form.department} onChange={e=>set('department',e.target.value)} placeholder="e.g. Cardiology" />
          <FormInput label="Admit Date"    id="adate"  type="date" value={form.admitDate} onChange={e=>set('admitDate',e.target.value)} />
          <FormInput label="Status" id="astatus" type="select" value={form.status} onChange={e=>set('status',e.target.value)}>
            <option value="Admitted">Admitted</option>
            <option value="Critical">Critical</option>
          </FormInput>
          <FormInput label="Reason for Admission" id="areason" type="textarea" rows={2} value={form.reason} onChange={e=>set('reason',e.target.value)} placeholder="Brief reason…" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary"><ClipboardList className="w-4 h-4" /> Admit Patient</button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
