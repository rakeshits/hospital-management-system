import React from 'react';

const colorMap = {
  blue:   'badge-blue',
  green:  'badge-green',
  yellow: 'badge-yellow',
  red:    'badge-red',
  purple: 'badge-purple',
};

export default function Badge({ children, color = 'blue', className = '' }) {
  return (
    <span className={`badge ${colorMap[color] || 'badge-blue'} ${className}`}>
      {children}
    </span>
  );
}
