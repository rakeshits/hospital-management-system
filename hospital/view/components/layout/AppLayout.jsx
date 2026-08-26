import React, { useState } from 'react';
import Sidebar from '../Sidebar.jsx';
import AppNavbar from '../AppNavbar.jsx';

export default function AppLayout({ children, title = 'MediCare HMS' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <AppNavbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="p-5 lg:p-7 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
