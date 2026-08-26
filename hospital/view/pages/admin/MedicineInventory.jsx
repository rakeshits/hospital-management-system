import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import { Plus, Pencil, Trash2, Pill, AlertTriangle, Search } from 'lucide-react';

const INIT = { name:'', category:'', manufacturer:'', stock:0, unit:'Tablets', price:'', expiry:'', status:'In Stock' };
const CATEGORIES = ['Antibiotic','Analgesic','Antihypertensive','Antidiabetic','Cardiac','Neurological','Vitamin','Anticoagulant','Other'];

const SEED = [
  { id:1,  name:'Amoxicillin 500mg',   category:'Antibiotic',       manufacturer:'Cipla',       stock:250, unit:'Capsules', price:'₹8',   expiry:'2026-03-01', status:'In Stock'  },
  { id:2,  name:'Metformin 500mg',     category:'Antidiabetic',     manufacturer:'Sun Pharma',  stock:12,  unit:'Tablets',  price:'₹3',   expiry:'2025-12-01', status:'Low Stock' },
  { id:3,  name:'Atorvastatin 10mg',   category:'Cardiac',          manufacturer:'Ranbaxy',     stock:180, unit:'Tablets',  price:'₹12',  expiry:'2026-06-01', status:'In Stock'  },
  { id:4,  name:'Paracetamol 500mg',   category:'Analgesic',        manufacturer:'GSK',         stock:500, unit:'Tablets',  price:'₹2',   expiry:'2026-09-01', status:'In Stock'  },
  { id:5,  name:'Amlodipine 5mg',      category:'Antihypertensive', manufacturer:'Cipla',       stock:8,   unit:'Tablets',  price:'₹6',   expiry:'2025-11-01', status:'Low Stock' },
  { id:6,  name:'Warfarin 5mg',        category:'Anticoagulant',    manufacturer:'Abbott',      stock:95,  unit:'Tablets',  price:'₹25',  expiry:'2026-04-01', status:'In Stock'  },
  { id:7,  name:'Levetiracetam 500mg', category:'Neurological',     manufacturer:'Dr. Reddy\'s',stock:0,   unit:'Tablets',  price:'₹45',  expiry:'2026-01-01', status:'Out of Stock'},
  { id:8,  name:'Vitamin D3 60K IU',   category:'Vitamin',          manufacturer:'Mankind',     stock:320, unit:'Capsules', price:'₹18',  expiry:'2026-08-01', status:'In Stock'  },
];

const STATUS_BADGE = { 'In Stock':'badge-green', 'Low Stock':'badge-yellow', 'Out of Stock':'badge-red' };

const COLS = [
  { key:'name',         label:'Medicine',    render:(v,r) => (
    <div>
      <p className="font-semibold text-slate-800 text-sm">{v}</p>
      <p className="text-xs text-slate-400">{r.manufacturer}</p>
    </div>
  )},
  { key:'category',     label:'Category',    render:(v) => <span className="badge badge-purple">{v}</span> },
  { key:'stock',        label:'Stock',       render:(v,r) => (
    <div className="flex items-center gap-2">
      {v <= 15 && v > 0 && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
      <span className={`font-semibold ${v===0?'text-red-500':v<=15?'text-amber-600':'text-slate-800'}`}>{v} {r.unit}</span>
    </div>
  )},
  { key:'price',        label:'Unit Price'   },
  { key:'expiry',       label:'Expiry',      render:(v) => new Date(v).toLocaleDateString('en-IN') },
  { key:'status',       label:'Status',      render:(v) => <span className={`badge ${STATUS_BADGE[v]}`}>{v}</span> },
];

export default function MedicineInventory() {
  const [meds,    setMeds]    = useState(SEED);
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(INIT);
  const [query,   setQuery]   = useState('');

  const filtered = meds.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.category.toLowerCase().includes(query.toLowerCase()));

  const openAdd  = () => { setEditing(null); setForm(INIT); setModal(true); };
  const openEdit = (row) => { setEditing(row.id); setForm({ ...row }); setModal(true); };
  const closeModal = () => setModal(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = (e) => {
    e.preventDefault();
    const status = form.stock === 0 ? 'Out of Stock' : form.stock <= 15 ? 'Low Stock' : 'In Stock';
    if (editing) setMeds(prev => prev.map(m => m.id === editing ? { ...form, id: editing, status } : m));
    else setMeds(prev => [...prev, { ...form, id: Date.now(), status }]);
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this medicine?')) setMeds(prev => prev.filter(m => m.id !== id));
  };

  const lowStock = meds.filter(m => m.status === 'Low Stock' || m.status === 'Out of Stock').length;

  return (
    <AppLayout title="Medicine Inventory">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Medicine Inventory</h1>
          <p className="text-slate-500 text-sm">{meds.length} medicines · {lowStock} need restocking</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search medicines…" className="input-field pl-9 py-2 text-sm" />
          </div>
          <button onClick={openAdd} className="btn btn-primary shrink-0"><Plus className="w-4 h-4" /> Add Medicine</button>
        </div>
      </div>

      {lowStock > 0 && (
        <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-amber-700 text-sm font-medium">{lowStock} medicine(s) are low on stock or out of stock. Please restock soon.</p>
        </div>
      )}

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

      <Modal open={modal} onClose={closeModal} title={editing ? 'Edit Medicine' : 'Add Medicine'} size="lg">
        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput label="Medicine Name"  id="mname"  value={form.name}         onChange={e=>set('name',e.target.value)}         placeholder="e.g. Amoxicillin 500mg" required className="sm:col-span-2" />
          <FormInput label="Category" id="mcat" type="select" value={form.category} onChange={e=>set('category',e.target.value)}>
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </FormInput>
          <FormInput label="Manufacturer"   id="mmfr"   value={form.manufacturer} onChange={e=>set('manufacturer',e.target.value)} placeholder="e.g. Cipla" />
          <FormInput label="Stock Quantity" id="mstock" type="number" value={form.stock} onChange={e=>set('stock',+e.target.value)} min={0} />
          <FormInput label="Unit" id="munit" type="select" value={form.unit} onChange={e=>set('unit',e.target.value)}>
            {['Tablets','Capsules','Syrup (ml)','Injection (vials)','Cream (g)','Drops'].map(u => <option key={u} value={u}>{u}</option>)}
          </FormInput>
          <FormInput label="Unit Price"     id="mprice" value={form.price}        onChange={e=>set('price',e.target.value)}        placeholder="e.g. ₹10" />
          <FormInput label="Expiry Date"    id="mexp"   type="date" value={form.expiry} onChange={e=>set('expiry',e.target.value)} />
          <div className="sm:col-span-2 flex gap-3 justify-end pt-2">
            <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary"><Pill className="w-4 h-4" /> {editing ? 'Save Changes' : 'Add Medicine'}</button>
          </div>
        </form>
      </Modal>
    </AppLayout>
  );
}
