import React from 'react';

/**
 * Stat card for dashboards
 */
export default function StatCard({ title, value, icon: Icon, color = 'blue', trend, className = '' }) {
  const colorMap = {
    blue:   { bg: 'bg-keylime-wash', text: 'text-forest-ink' },
    green:  { bg: 'bg-sage-mist', text: 'text-forest-ink' },
    yellow: { bg: 'bg-cream-paper', text: 'text-forest-ink' },
    purple: { bg: 'bg-mint-veil', text: 'text-forest-ink' },
    red:    { bg: 'bg-cream-paper', text: 'text-forest-ink' },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`card ${c.bg} ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">{title}</p>
          <h3 className="font-display text-4xl font-light text-forest-ink leading-tight">{value}</h3>
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
