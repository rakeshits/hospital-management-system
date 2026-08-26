import React from 'react';

/**
 * Reusable InputField
 */
export default function InputField({
  label,
  id,
  icon: Icon,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <input
          id={id}
          className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:ring-red-200' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
