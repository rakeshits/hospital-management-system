import React from 'react';

/**
 * Stat card for dashboards
 */
export default function StatCard({ title, value, icon: Icon, color = 'blue', trend, className = '' }) {
  const colorMap = {
    blue:   { border: 'border-l-sky-500',   bg: 'bg-sky-50',    text: 'text-sky-600'   },
    green:  { border: 'border-l-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    yellow: { border: 'border-l-amber-500',  bg: 'bg-amber-50',  text: 'text-amber-600'  },
    purple: { border: 'border-l-violet-500', bg: 'bg-violet-50', text: 'text-violet-600' },
    red:    { border: 'border-l-red-500',    bg: 'bg-red-50',    text: 'text-red-600'    },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`card p-6 border-l-4 ${c.border} ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 leading-tight">{value}</h3>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trend.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend.up ? '▲' : '▼'} {trend.value} vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`${c.bg} p-3 rounded-xl`}>
            <Icon className={`w-6 h-6 ${c.text}`} />
          </div>
        )}
      </div>
    </div>
  );
}
