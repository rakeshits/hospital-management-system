import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ── Public pages ─────────────────────────────────────────────────────────────
import Home               from '../view/pages/public/Home.jsx';
import About              from '../view/pages/public/About.jsx';
import Login              from '../view/pages/public/Login.jsx';
import Signup             from '../view/pages/public/Signup.jsx';
import DepartmentsPreview from '../view/pages/public/DepartmentsPreview.jsx';
import DoctorsPreview     from '../view/pages/public/DoctorsPreview.jsx';

// ── Auth guard ────────────────────────────────────────────────────────────────
import ProtectedRoute from '../view/components/ProtectedRoute.jsx';

// ── Admin pages (stubs — full implementation in next phase) ──────────────────
import AdminDashboard       from '../view/pages/admin/AdminDashboard.jsx';
import ManageDoctors        from '../view/pages/admin/ManageDoctors.jsx';
import ManageDepartments    from '../view/pages/admin/ManageDepartments.jsx';
import ManageRooms          from '../view/pages/admin/ManageRooms.jsx';
import ManagePatients       from '../view/pages/admin/ManagePatients.jsx';
import ManageUsers          from '../view/pages/admin/ManageUsers.jsx';
import Billing              from '../view/pages/admin/Billing.jsx';
import MedicineInventory    from '../view/pages/admin/MedicineInventory.jsx';
import AppointmentsOverview from '../view/pages/admin/AppointmentsOverview.jsx';
import Admissions           from '../view/pages/admin/Admissions.jsx';

// ── Doctor pages (stubs) ──────────────────────────────────────────────────────
import DoctorDashboard      from '../view/pages/doctor/DoctorDashboard.jsx';
import MyAppointmentsDoctor from '../view/pages/doctor/MyAppointments.jsx';
import PatientList          from '../view/pages/doctor/PatientList.jsx';
import PatientDetail        from '../view/pages/doctor/PatientDetail.jsx';
import PrescribeMedicine    from '../view/pages/doctor/PrescribeMedicine.jsx';

// ── Patient pages (stubs) ─────────────────────────────────────────────────────
import PatientDashboard     from '../view/pages/patient/PatientDashboard.jsx';
import BookAppointment      from '../view/pages/patient/BookAppointment.jsx';
import MyAppointmentsPatient from '../view/pages/patient/MyAppointments.jsx';
import MedicalHistory       from '../view/pages/patient/MedicalHistory.jsx';
import MyBilling            from '../view/pages/patient/MyBilling.jsx';
import Profile              from '../view/pages/patient/Profile.jsx';

/**
 * App — root router
 *
 * PUBLIC ROUTES  : no auth required
 * PROTECTED ROUTES: wrapped in <ProtectedRoute role="..."> which reads
 *                   localStorage.hms_session and redirects to /login if absent
 *                   or to the correct dashboard if role doesn't match.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ─────────────────────────────────────────────────── */}
        <Route path="/"            element={<Home />}               />
        <Route path="/about"       element={<About />}              />
        <Route path="/departments" element={<DepartmentsPreview />} />
        <Route path="/doctors"     element={<DoctorsPreview />}     />
        <Route path="/login"       element={<Login />}              />
        <Route path="/signup"      element={<Signup />}             />

        {/* ── Admin ──────────────────────────────────────────────────── */}
        <Route path="/admin/dashboard"    element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}       />
        <Route path="/admin/doctors"      element={<ProtectedRoute role="admin"><ManageDoctors /></ProtectedRoute>}        />
        <Route path="/admin/departments"  element={<ProtectedRoute role="admin"><ManageDepartments /></ProtectedRoute>}    />
        <Route path="/admin/rooms"        element={<ProtectedRoute role="admin"><ManageRooms /></ProtectedRoute>}           />
        <Route path="/admin/patients"     element={<ProtectedRoute role="admin"><ManagePatients /></ProtectedRoute>}       />
        <Route path="/admin/users"        element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>}          />
        <Route path="/admin/billing"      element={<ProtectedRoute role="admin"><Billing /></ProtectedRoute>}              />
        <Route path="/admin/medicines"    element={<ProtectedRoute role="admin"><MedicineInventory /></ProtectedRoute>}    />
        <Route path="/admin/appointments" element={<ProtectedRoute role="admin"><AppointmentsOverview /></ProtectedRoute>} />
        <Route path="/admin/admissions"   element={<ProtectedRoute role="admin"><Admissions /></ProtectedRoute>}           />

        {/* ── Doctor ─────────────────────────────────────────────────── */}
        <Route path="/doctor/dashboard"    element={<ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>}      />
        <Route path="/doctor/appointments" element={<ProtectedRoute role="doctor"><MyAppointmentsDoctor /></ProtectedRoute>} />
        <Route path="/doctor/patients"     element={<ProtectedRoute role="doctor"><PatientList /></ProtectedRoute>}          />
        <Route path="/doctor/patients/:id" element={<ProtectedRoute role="doctor"><PatientDetail /></ProtectedRoute>}        />
        <Route path="/doctor/prescribe"    element={<ProtectedRoute role="doctor"><PrescribeMedicine /></ProtectedRoute>}    />

        {/* ── Patient ────────────────────────────────────────────────── */}
        <Route path="/patient/dashboard"    element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>}      />
        <Route path="/patient/book"         element={<ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>}        />
        <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><MyAppointmentsPatient /></ProtectedRoute>}  />
        <Route path="/patient/history"      element={<ProtectedRoute role="patient"><MedicalHistory /></ProtectedRoute>}         />
        <Route path="/patient/billing"      element={<ProtectedRoute role="patient"><MyBilling /></ProtectedRoute>}              />
        <Route path="/patient/profile"      element={<ProtectedRoute role="patient"><Profile /></ProtectedRoute>}                />

        {/* ── Fallback ───────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
