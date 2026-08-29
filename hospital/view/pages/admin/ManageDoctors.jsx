import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import { Plus, Pencil, Trash2, Search, Stethoscope } from 'lucide-react';

const INIT = { name:'', email:'', phone:'', specialization:'', department:'', experience:'', fee:'', status:'Active' };
const DEPTS = ['Cardiology','Neurology','Orthopedics','Pediatrics','Gynecology','Dermatology','Oncology','Emergency'];

const SEED = [
  { id:1, name:'Dr. Priya Mehta',   email:'priya@medicare.com',   phone:'+91 98765 11111', specialization:'Senior Cardiologist',      department:'Cardiology',  experience:'15 yrs', fee:'₹800',  status:'Active'   },
  { id:2, name:'Dr. Rajan Verma',   email:'rajan@medicare.com',   phone:'+91 98765 22222', specialization:'Chief Orthopedic Surgeon', department:'Orthopedics', experience:'18 yrs', fee:'₹600',  status:'Active'   },
  { id:3, name:'Dr. Anjali Singh',  email:'anjali@medicare.com',  phone:'+91 98765 33333', specialization:'Head of Neurology',        department:'Neurology',   experience:'20 yrs', fee:'₹1000', status:'Active'   },
  { id:4, name:'Dr. Amit Kumar',    email:'amit@medicare.com',    phone:'+91 98765 44444', specialization:'Consultant Pediatrician',  department:'Pediatrics',  experience:'12 yrs', fee:'₹500',  status:'Active'   },
  { id:5, name:'Dr. Sunita Reddy',  email:'sunita@medicare.com',  phone:'+91 98765 55555', specialization:'Senior Gynaecologist',     department:'Gynecology',  experience:'14 yrs', fee:'₹700',  status:'On Leave' },
  { id:6, name:'Dr. Kavitha Nair',  email:'kavitha@medicare.com', phone:'+91 98765 66666', specialization:'Senior Oncologist',        department:'Oncology',    experience:'22 yrs', fee:'₹1200', status:'Active'   },
];

const COLS = [
  { key:'name',           label:'Doctor',         render:(v,r) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[--color-keylime-wash] text-[--color-forest-ink] font-bold text-xs flex items-center justify-center">
        {v.split(' ').filter((_,i)=>i>0).map(w=>w[0]).join('')}
      </div>
      <div><p className="font-semibold text-slate-800 text-sm">{v}</p><p className="text-xs text-slate-400">{r.email}</p></div>
    </div>
  )},
  { key:'specialization', label:'Specialization' },
  { key:'department',     label:'Department',     render:(v) => <span className="badge badge-blue">{v}</span> },
  { key:'experience',     label:'Experience'      },
  { key:'fee',            label:'Fee'             },
  { key:'status',         label:'Status',         render:(v) => <span className={`badge ${v==='Active'?'badge-green':'badge-yellow'}`}>{v}</span> },
];

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState(SEED);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(INIT);
  const [query,   setQuery]   = useState('');

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.specialization.toLowerCase().includes(query.toLowerCase())
  );

  const openAdd  = () => { setEditing(null); setForm(INIT); setModal(true); };
  const openEdit = (row) => { setEditing(row.id); setForm({ ...row }); setModal(true); };
  const closeModal = () => setModal(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) {
      setDoctors(prev => prev.map(d => d.id === editing ? { ...form, id: editing } : d));
    } else {
      setDoctors(prev => [...prev, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this doctor?')) setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AppLayout title="Manage Doctors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Doctors</h1>
          <p className="text-slate-500 text-sm">{doctors.length} registered doctors</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search doctors…" className="input-field pl-9 py-2 text-sm" />
          </div>
          <button onClick={openAdd} className="btn btn-primary shrink-0">
            <Plus className="w-4 h-4" /> Add Doctor
          </button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <Table
          columns={COLS}
          data={filtered}
          actions={(row) => (
            <>
              <button onClick={() => openEdit(row)} className="btn btn-ghost py-1.5 px-2.5 text-xs">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(row.id)} className="btn btn-danger py-1.5 px-2.5 text-xs">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        />
      </div>

      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Doctor' : 'Add New Doctor'} size="lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Full Name"       id="dname"  value={form.name}           onChange={e=>set('name',e.target.value)}           placeholder="Dr. Full Name" required />
          <FormInput label="Email"           id="demail" type="email" value={form.email}  onChange={e=>set('email',e.target.value)}     placeholder="doctor@medicare.com" required />
          <FormInput label="Phone"           id="dphone" value={form.phone}          onChange={e=>set('phone',e.target.value)}          placeholder="+91 98765 00000" />
          <FormInput label="Specialization"  id="dspec"  value={form.specialization} onChange={e=>set('specialization',e.target.value)} placeholder="e.g. Senior Cardiologist" />
          <FormInput label="Department" id="ddept" type="select" value={form.department} onChange={e=>set('department',e.target.value)}>
            <option value="">Select department</option>
            {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
          </FormInput>
          <FormInput label="Experience"      id="dexp"   value={form.experience}     onChange={e=>set('experience',e.target.value)}     placeholder="e.g. 10 yrs" />
          <FormInput label="Consultation Fee"id="dfee"   value={form.fee}            onChange={e=>set('fee',e.target.value)}            placeholder="e.g. ₹500" />
          <FormInput label="Status" id="dstatus" type="select" value={form.status} onChange={e=>set('status',e.target.value)}>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </FormInput>
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
            <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Stethoscope className="w-4 h-4" /> {editing ? 'Save Changes' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
