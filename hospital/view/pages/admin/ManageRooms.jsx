import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import { Plus, Pencil, Trash2, BedDouble } from 'lucide-react';

const INIT = { number:'', type:'General', floor:'', department:'', capacity:1, status:'Available', notes:'' };
const TYPES = ['General','Private','ICU','NICU','Emergency','Operation Theatre','Recovery'];
const DEPTS = ['Cardiology','Neurology','Orthopedics','Pediatrics','Gynecology','Oncology','Emergency','General'];

const SEED = [
  { id:1,  number:'101', type:'General',            floor:'1', department:'General',     capacity:4, status:'Available', notes:'' },
  { id:2,  number:'102', type:'Private',            floor:'1', department:'Cardiology',  capacity:1, status:'Occupied',  notes:'Patient: Rahul Sharma' },
  { id:3,  number:'201', type:'ICU',                floor:'2', department:'Cardiology',  capacity:2, status:'Occupied',  notes:'Critical care' },
  { id:4,  number:'202', type:'General',            floor:'2', department:'Neurology',   capacity:4, status:'Available', notes:'' },
  { id:5,  number:'203', type:'Private',            floor:'2', department:'Orthopedics', capacity:1, status:'Available', notes:'' },
  { id:6,  number:'204', type:'General',            floor:'2', department:'Cardiology',  capacity:4, status:'Occupied',  notes:'Patient: Sunita Rao' },
  { id:7,  number:'301', type:'NICU',               floor:'3', department:'Pediatrics',  capacity:3, status:'Available', notes:'' },
  { id:8,  number:'OT1', type:'Operation Theatre',  floor:'4', department:'General',     capacity:1, status:'Available', notes:'Scheduled: 10:00 AM' },
];

const STATUS_COLORS = { Available:'badge-green', Occupied:'badge-red', Maintenance:'badge-yellow' };

const COLS = [
  { key:'number',     label:'Room No.',   render:(v) => <span className="font-bold text-slate-800">#{v}</span> },
  { key:'type',       label:'Type',       render:(v) => <span className="badge badge-blue">{v}</span> },
  { key:'floor',      label:'Floor',      render:(v) => `Floor ${v}` },
  { key:'department', label:'Department'  },
  { key:'capacity',   label:'Capacity',   render:(v) => `${v} bed${v>1?'s':''}` },
  { key:'status',     label:'Status',     render:(v) => <span className={`badge ${STATUS_COLORS[v]||'badge-yellow'}`}>{v}</span> },
];

export default function ManageRooms() {
  const [rooms,   setRooms]   = useState(SEED);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(INIT);
  const [filter,  setFilter]  = useState('All');

  const filtered = filter === 'All' ? rooms : rooms.filter(r => r.status === filter);

  const openAdd  = () => { setEditing(null); setForm(INIT); setModal(true); };
  const openEdit = (row) => { setEditing(row.id); setForm({ ...row }); setModal(true); };
  const closeModal = () => setModal(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    if (editing) setRooms(prev => prev.map(r => r.id === editing ? { ...form, id: editing } : r));
    else setRooms(prev => [...prev, { ...form, id: Date.now() }]);
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this room?')) setRooms(prev => prev.filter(r => r.id !== id));
  };

  const available = rooms.filter(r => r.status === 'Available').length;
  const occupied  = rooms.filter(r => r.status === 'Occupied').length;

  return (
    <AppLayout title="Manage Rooms">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Rooms</h1>
          <p className="text-slate-500 text-sm">{rooms.length} rooms · {available} available · {occupied} occupied</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary"><Plus className="w-4 h-4" /> Add Room</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {['All','Available','Occupied','Maintenance'].map(s => (
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
            <>
              <button onClick={() => openEdit(row)} className="btn btn-ghost py-1.5 px-2.5 text-xs"><Pencil className="w-3.5 h-3.5" /> Edit</button>
              <button onClick={() => handleDelete(row.id)} className="btn btn-danger py-1.5 px-2.5 text-xs"><Trash2 className="w-3.5 h-3.5" /></button>
            </>
          )}
        />
      </div>

      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Room' : 'Add Room'}>
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Room Number"  id="rnum"  value={form.number}     onChange={e=>set('number',e.target.value)}     placeholder="e.g. 101" required />
          <FormInput label="Floor"        id="rfloor" value={form.floor}     onChange={e=>set('floor',e.target.value)}      placeholder="e.g. 2" />
          <FormInput label="Room Type" id="rtype" type="select" value={form.type} onChange={e=>set('type',e.target.value)}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </FormInput>
          <FormInput label="Department" id="rdept" type="select" value={form.department} onChange={e=>set('department',e.target.value)}>
            {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
          </FormInput>
          <FormInput label="Capacity (beds)" id="rcap" type="number" value={form.capacity} onChange={e=>set('capacity',+e.target.value)} min={1} />
          <FormInput label="Status" id="rstatus" type="select" value={form.status} onChange={e=>set('status',e.target.value)}>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </FormInput>
          <FormInput label="Notes" id="rnotes" type="textarea" rows={2} value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Optional notes…" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
            <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary"><BedDouble className="w-4 h-4" /> {editing ? 'Save Changes' : 'Add Room'}</button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
