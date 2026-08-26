import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock users for dev preview — swap any role to test dashboards
const MOCK_USERS = {
  admin:   { id: 1, name: 'Admin User',       email: 'admin@medicare.com',   role: 'admin',   avatar: 'AU' },
  doctor:  { id: 2, name: 'Dr. Priya Mehta',  email: 'priya@medicare.com',   role: 'doctor',  avatar: 'PM', specialization: 'Cardiology' },
  patient: { id: 3, name: 'Rahul Sharma',     email: 'rahul@gmail.com',      role: 'patient', avatar: 'RS' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('hms_session');
    if (raw) {
      try {
        const session = JSON.parse(raw);
        setUser(MOCK_USERS[session.role] || null);
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    const u = MOCK_USERS[role];
    localStorage.setItem('hms_session', JSON.stringify({ role, email: u.email, userId: u.id }));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('hms_session');
    setUser(null);
  };

  // Dev helper: switch role without going through login page
  const switchRole = (role) => login(role);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
