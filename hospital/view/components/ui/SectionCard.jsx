import React from 'react';

/**
 * Section card wrapper with optional title and action slot
 */
export default function SectionCard({ title, action, children, className = '' }) {
  return (
    <div className={`card p-6 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-5">
          {title && <h2 className="text-base font-bold text-slate-800">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
