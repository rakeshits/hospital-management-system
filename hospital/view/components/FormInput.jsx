import React from 'react';

export default function FormInput({ label, id, type = 'text', icon: Icon, error, className = '', ...props }) {
  const isTextarea = type === 'textarea';
  const isSelect   = type === 'select';

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-forest-ink">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && !isTextarea && !isSelect && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}
        {isTextarea ? (
          <textarea
            id={id}
            className={`input-field resize-none ${error ? 'border-red-400 focus:border-red-400' : ''}`}
            {...props}
          />
        ) : isSelect ? (
          <select
            id={id}
            className={`input-field ${error ? 'border-red-400' : ''}`}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:border-red-400' : ''}`}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
