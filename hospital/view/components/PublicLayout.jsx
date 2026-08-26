import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

/**
 * PublicLayout — wraps all public-facing pages (Home, About, Departments, etc.)
 * Renders the shared public Navbar and Footer around {children}.
 */
export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
