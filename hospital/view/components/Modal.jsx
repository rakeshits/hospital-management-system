import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest-ink/8" onClick={onClose} />
      <div className={`relative bg-cream-paper rounded-[14px] w-full ${sizes[size]} animate-fade-in max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-7 py-5 border-b border-border-mist shrink-0">
          <h2 className="font-display text-3xl font-light text-forest-ink">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-[7px] text-forest-ink hover:bg-mint-veil transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-7 flex-1">{children}</div>
      </div>
    </div>
  );
}
