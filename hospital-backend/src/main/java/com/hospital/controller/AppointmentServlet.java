package com.hospital.controller;

import com.hospital.dao.AppointmentDAO;
import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.dao.impl.AppointmentDAOImpl;
import com.hospital.dao.impl.PatientDAOImpl;
import com.hospital.model.Appointment;
import com.hospital.model.Patient;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * AppointmentServlet — /api/appointments
 *
 * GET    /api/appointments                  → all (admin, staff)
 * GET    /api/appointments/{id}             → single (admin, staff, owning patient, owning doctor)
 * GET    /api/appointments?patientId=N      → by patient (admin, staff, that patient)
 * GET    /api/appointments?doctorId=N       → by doctor  (admin, staff, that doctor)
 * POST   /api/appointments                  → book (patient, staff, admin)
 * PUT    /api/appointments/{id}             → update (admin, staff, owning doctor)
 * DELETE /api/appointments/{id}             → cancel/delete (admin; patient can cancel own)
 */
@WebServlet(name = "AppointmentServlet", urlPatterns = {"/api/appointments", "/api/appointments/*"})
public class AppointmentServlet extends HttpServlet {

    private final AppointmentDAO apptDAO    = new AppointmentDAOImpl();
    private final PatientDAO     patientDAO = new PatientDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;

        Integer id = extractId(req);
        String role = SessionUtil.getRole(req);
        int sessionUserId = SessionUtil.getUserId(req);

        try {
            if (id != null) {
                Appointment a = apptDAO.getById(id);
                if (a == null) { JsonUtil.writeError(resp, 404, "Appointment not found id=" + id); return; }
                // Access check: admin/staff see all; patient sees own; doctor sees own
                if ("patient".equalsIgnoreCase(role)) {
                    Patient own = patientDAO.getByUserId(sessionUserId);
                    if (own == null || own.getPatientId() != a.getPatientId()) {
                        JsonUtil.writeError(resp, 403, "Access denied."); return;
                    }
                }
                JsonUtil.writeJson(resp, 200, a);
                return;
            }

            String patientParam = req.getParameter("patientId");
            String doctorParam  = req.getParameter("doctorId");

            if (patientParam != null) {
                int pid = Integer.parseInt(patientParam);
                // Patient can only query their own
                if ("patient".equalsIgnoreCase(role)) {
                    Patient own = patientDAO.getByUserId(sessionUserId);
                    if (own == null || own.getPatientId() != pid) {
                        JsonUtil.writeError(resp, 403, "Access denied."); return;
                    }
                } else if (!SessionUtil.isAnyRole(req, "admin", "staff", "doctor")) {
                    JsonUtil.writeError(resp, 403, "Access denied."); return;
                }
                JsonUtil.writeJson(resp, 200, apptDAO.getByPatientId(pid));
            } else if (doctorParam != null) {
                if (!SessionUtil.hasRole(req, resp, "admin", "staff", "doctor")) return;
                JsonUtil.writeJson(resp, 200, apptDAO.getByDoctorId(Integer.parseInt(doctorParam)));
            } else {
                if (!SessionUtil.hasRole(req, resp, "admin", "staff")) return;
                JsonUtil.writeJson(resp, 200, apptDAO.getAll());
            }
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "staff", "patient")) return;
        try {
            Appointment a = JsonUtil.fromJson(req, Appointment.class);
            if (a == null || a.getPatientId() == 0 || a.getDoctorId() == 0 || a.getDate() == null) {
                JsonUtil.writeError(resp, 400, "patient_id, doctor_id, and date are required"); return;
            }
            // Patient can only book for themselves
            if (SessionUtil.isRole(req, "patient")) {
                Patient own = patientDAO.getByUserId(SessionUtil.getUserId(req));
                if (own == null || own.getPatientId() != a.getPatientId()) {
                    JsonUtil.writeError(resp, 403, "You can only book appointments for yourself."); return;
                }
            }
            int newId = apptDAO.insert(a);
            a.setAppointmentId(newId);
            JsonUtil.writeJson(resp, 201, a);
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "staff", "doctor")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            Appointment a = JsonUtil.fromJson(req, Appointment.class);
            if (a == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            a.setAppointmentId(id);
            int rows = apptDAO.update(a);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Appointment not found id=" + id); return; }
            JsonUtil.writeJson(resp, 200, apptDAO.getById(id));
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        String role = SessionUtil.getRole(req);
        try {
            // Patient can cancel (status=cancelled) their own; admin can hard-delete
            if ("patient".equalsIgnoreCase(role)) {
                Appointment a = apptDAO.getById(id);
                if (a == null) { JsonUtil.writeError(resp, 404, "Appointment not found"); return; }
                Patient own = patientDAO.getByUserId(SessionUtil.getUserId(req));
                if (own == null || own.getPatientId() != a.getPatientId()) {
                    JsonUtil.writeError(resp, 403, "Access denied."); return;
                }
                apptDAO.updateStatus(id, "cancelled");
                JsonUtil.writeMessage(resp, 200, "Appointment cancelled.");
            } else if (SessionUtil.isAnyRole(req, "admin", "staff")) {
                int rows = apptDAO.delete(id);
                if (rows == 0) { JsonUtil.writeError(resp, 404, "Appointment not found id=" + id); return; }
                resp.setStatus(204);
            } else {
                JsonUtil.writeError(resp, 403, "Access denied.");
            }
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    private Integer extractId(HttpServletRequest req) {
        String p = req.getPathInfo();
        if (p != null && p.length() > 1) { try { return Integer.parseInt(p.substring(1)); } catch (NumberFormatException ignored) {} }
        String q = req.getParameter("id");
        if (q != null && !q.isBlank()) { try { return Integer.parseInt(q); } catch (NumberFormatException ignored) {} }
        return null;
    }
}
