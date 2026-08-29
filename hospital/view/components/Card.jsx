import React from 'react';

export function Card({ children, className = '', background = 'keylime' }) {
  const backgrounds = { sage: 'bg-sage-mist', keylime: 'bg-keylime-wash', mint: 'bg-mint-veil', slate: 'bg-slate-hush' };
  return (
    <div className={`card ${backgrounds[background] || backgrounds.keylime} ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, color = 'text-forest-ink', bg = 'bg-keylime-wash', trend }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-charcoal text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
          <p className="font-display text-4xl font-light text-forest-ink">{value}</p>
          {trend && <p className="text-xs text-forest-ink font-medium mt-1">{trend}</p>}
        </div>
        <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}
