import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';

const INIT = { name:'', head:'', doctors:0, beds:0, phone:'', status:'Active', description:'' };

const SEED = [
  { id:1, name:'Cardiology',   head:'Dr. Priya Mehta',   doctors:18, beds:40, phone:'Ext. 101', status:'Active',   description:'Advanced heart care & cardiac surgery' },
  { id:2, name:'Neurology',    head:'Dr. Anjali Singh',  doctors:14, beds:30, phone:'Ext. 102', status:'Active',   description:'Brain, spine & nervous system treatment' },
  { id:3, name:'Orthopedics',  head:'Dr. Rajan Verma',   doctors:16, beds:35, phone:'Ext. 103', status:'Active',   description:'Bone, joint & musculoskeletal specialists' },
  { id:4, name:'Pediatrics',   head:'Dr. Amit Kumar',    doctors:12, beds:25, phone:'Ext. 104', status:'Active',   description:'Dedicated child healthcare' },
  { id:5, name:'Gynecology',   head:'Dr. Sunita Reddy',  doctors:10, beds:22, phone:'Ext. 105', status:'Active',   description:"Complete women's health services" },
  { id:6, name:'Oncology',     head:'Dr. Kavitha Nair',  doctors:12, beds:30, phone:'Ext. 106', status:'Active',   description:'Comprehensive cancer care' },
  { id:7, name:'Dermatology',  head:'Dr. Manoj Joshi',   doctors:8,  beds:10, phone:'Ext. 107', status:'Active',   description:'Medical and cosmetic dermatology' },
  { id:8, name:'Emergency',    head:'Dr. Suresh Menon',  doctors:20, beds:20, phone:'Ext. 108', status:'Active',   description:'24×7 Level-1 trauma centre' },
];

const COLS = [
  { key:'name',    label:'Department', render:(v) => <span className="font-semibold text-slate-800">{v}</span> },
  { key:'head',    label:'Head Doctor' },
  { key:'doctors', label:'Doctors',    render:(v) => <span className="badge badge-blue">{v} doctors</span> },
  { key:'beds',    label:'Beds',       render:(v) => v > 0 ? <span className="badge badge-purple">{v} beds</span> : <span className="text-slate-400 text-xs">—</span> },
  { key:'phone',   label:'Extension'  },
  { key:'status',  label:'Status',     render:(v) => <span className={`badge ${v==='Active'?'badge-green':'badge-red'}`}>{v}</span> },
];

export default function ManageDepartments() {
  const [depts,   setDepts]   = useState(SEED);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(INIT);

  const openAdd  = () => { setEditing(null); setForm(INIT); setModal(true); };
  const openEdit = (row) => { setEditing(row.id); setForm({ ...row }); setModal(true); };
  const closeModal = () => setModal(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) setDepts(prev => prev.map(d => d.id === editing ? { ...form, id: editing } : d));
    else setDepts(prev => [...prev, { ...form, id: Date.now() }]);
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this department?')) setDepts(prev => prev.filter(d => d.id !== id));
  };

  return (
    <AppLayout title="Manage Departments">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Departments</h1>
          <p className="text-slate-500 text-sm">{depts.length} departments</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <Table
          columns={COLS}
          data={depts}
          actions={(row) => (
            <>
              <button onClick={() => openEdit(row)} className="btn btn-ghost py-1.5 px-2.5 text-xs"><Pencil className="w-3.5 h-3.5" /> Edit</button>
              <button onClick={() => handleDelete(row.id)} className="btn btn-danger py-1.5 px-2.5 text-xs"><Trash2 className="w-3.5 h-3.5" /></button>
            </>
          )}
        />
      </div>

      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Department' : 'Add Department'} size="lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Department Name" id="dname" value={form.name}    onChange={e=>set('name',e.target.value)}    placeholder="e.g. Cardiology" required />
          <FormInput label="Head Doctor"     id="dhead" value={form.head}    onChange={e=>set('head',e.target.value)}    placeholder="Dr. Name" />
          <FormInput label="No. of Doctors"  id="ddocs" type="number" value={form.doctors} onChange={e=>set('doctors',+e.target.value)} min={0} />
          <FormInput label="No. of Beds"     id="dbeds" type="number" value={form.beds}    onChange={e=>set('beds',+e.target.value)}    min={0} />
          <FormInput label="Extension/Phone" id="dphone" value={form.phone}  onChange={e=>set('phone',e.target.value)}  placeholder="Ext. 101" />
          <FormInput label="Status" id="dstatus" type="select" value={form.status} onChange={e=>set('status',e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </FormInput>
          <FormInput label="Description" id="ddesc" type="textarea" rows={2} value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Brief description…" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
            <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary"><Building2 className="w-4 h-4" /> {editing ? 'Save Changes' : 'Add Department'}</button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
