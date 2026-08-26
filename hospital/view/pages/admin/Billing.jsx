import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Table from '../../components/Table.jsx';
import { Receipt, CheckCircle2, XCircle, Search } from 'lucide-react';

const SEED = [
  { id:1,  invoiceNo:'INV-2841', patient:'Rahul Sharma',   doctor:'Dr. Priya Mehta',  date:'2025-06-01', amount:'₹12,500', type:'Consultation + Tests', status:'Paid'    },
  { id:2,  invoiceNo:'INV-2842', patient:'Sunita Rao',     doctor:'Dr. Anjali Singh', date:'2025-06-02', amount:'₹8,200',  type:'Surgery',              status:'Pending' },
  { id:3,  invoiceNo:'INV-2843', patient:'Vikram Desai',   doctor:'Dr. Rajan Verma',  date:'2025-06-03', amount:'₹5,000',  type:'Consultation',         status:'Paid'    },
  { id:4,  invoiceNo:'INV-2844', patient:'Meena Pillai',   doctor:'Dr. Amit Kumar',   date:'2025-06-04', amount:'₹3,500',  type:'Consultation + Meds',  status:'Pending' },
  { id:5,  invoiceNo:'INV-2845', patient:'Arun Patel',     doctor:'Dr. Kavitha Nair', date:'2025-06-05', amount:'₹22,000', type:'Chemotherapy',         status:'Paid'    },
  { id:6,  invoiceNo:'INV-2846', patient:'Priya Krishnan', doctor:'Dr. Sunita Reddy', date:'2025-06-06', amount:'₹6,800',  type:'Consultation + Scan',  status:'Overdue' },
  { id:7,  invoiceNo:'INV-2847', patient:'Deepak Nair',    doctor:'Dr. Priya Mehta',  date:'2025-06-07', amount:'₹15,000', type:'Angioplasty',          status:'Paid'    },
  { id:8,  invoiceNo:'INV-2848', patient:'Lakshmi Iyer',   doctor:'Dr. Anjali Singh', date:'2025-06-08', amount:'₹9,500',  type:'MRI + Consultation',   status:'Pending' },
];

const STATUS_BADGE = { Paid:'badge-green', Pending:'badge-yellow', Overdue:'badge-red' };

export default function Billing() {
  const [bills,  setBills]  = useState(SEED);
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = bills
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b => b.patient.toLowerCase().includes(query.toLowerCase()) || b.invoiceNo.toLowerCase().includes(query.toLowerCase()));

  const toggleStatus = (id) => setBills(prev => prev.map(b =>
    b.id === id ? { ...b, status: b.status === 'Paid' ? 'Pending' : 'Paid' } : b
  ));

  const totalRevenue = bills.filter(b => b.status === 'Paid').length;
  const pending      = bills.filter(b => b.status === 'Pending').length;
  const overdue      = bills.filter(b => b.status === 'Overdue').length;

  const COLS = [
    { key:'invoiceNo', label:'Invoice',  render:(v) => <span className="font-mono text-sky-600 font-semibold text-sm">{v}</span> },
    { key:'patient',   label:'Patient'  },
    { key:'doctor',    label:'Doctor'   },
    { key:'date',      label:'Date',    render:(v) => new Date(v).toLocaleDateString('en-IN') },
    { key:'type',      label:'Type'     },
    { key:'amount',    label:'Amount',  render:(v) => <span className="font-bold text-slate-800">{v}</span> },
    { key:'status',    label:'Status',  render:(v) => <span className={`badge ${STATUS_BADGE[v]}`}>{v}</span> },
  ];

  return (
    <AppLayout title="Billing">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Billing</h1>
          <p className="text-slate-500 text-sm">{totalRevenue} paid · {pending} pending · {overdue} overdue</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search bills…" className="input-field pl-9 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        {['All','Paid','Pending','Overdue'].map(s => (
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
            <button
              onClick={() => toggleStatus(row.id)}
              className={`btn py-1.5 px-2.5 text-xs ${row.status === 'Paid' ? 'btn-ghost' : 'btn-success'}`}
            >
              {row.status === 'Paid'
                ? <><XCircle className="w-3.5 h-3.5" /> Mark Unpaid</>
                : <><CheckCircle2 className="w-3.5 h-3.5" /> Mark Paid</>}
            </button>
          )}
        />
      </div>
    </AppLayout>
  );
}
