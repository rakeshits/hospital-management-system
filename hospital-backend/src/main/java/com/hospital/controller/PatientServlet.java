package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.dao.impl.PatientDAOImpl;
import com.hospital.model.Patient;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

/**
 * PatientServlet
 *
 * REST controller for the /api/patients resource.
 *
 * URL patterns handled:
 *   GET    /api/patients          → list all patients      (admin, doctor, staff)
 *   GET    /api/patients/{id}     → get patient by id      (admin, doctor, staff — any; patient — own only)
 *   POST   /api/patients          → create new patient     (admin, staff)
 *   PUT    /api/patients/{id}     → update patient         (admin, staff — any; patient — own only)
 *   DELETE /api/patients/{id}     → delete patient         (admin only)
 *
 * Path parameter extraction:
 *   The servlet is mapped to /api/patients and /api/patients/*.
 *   An id in the URL path (/api/patients/42) is extracted from pathInfo.
 *   An id can also be passed as a query param (?id=42) for compatibility.
 *
 * Error responses always use the JSON envelope: { "error": "message" }
 */
@WebServlet(name = "PatientServlet", urlPatterns = {"/api/patients", "/api/patients/*"})
public class PatientServlet extends HttpServlet {

    // DAO is stateless — safe to share across requests
    private final PatientDAO patientDAO = new PatientDAOImpl();

    // ── GET ──────────────────────────────────────────────────────────────────

    /**
     * GET /api/patients        → list all (admin, doctor, staff)
     * GET /api/patients/{id}   → get by id (role-checked)
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        // 1. Must be logged in
        if (!SessionUtil.isLoggedIn(req, resp)) return;

        Integer id = extractId(req);

        if (id == null) {
            // ── List all patients ────────────────────────────────────────────
            // Only admin, doctor, and staff may list all patients
            if (!SessionUtil.hasRole(req, resp, "admin", "doctor", "staff")) return;

            try {
                List<Patient> patients = patientDAO.getAll();
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, patients);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve patients: " + e.getMessage());
            }

        } else {
            // ── Get single patient by id ─────────────────────────────────────
            String role = SessionUtil.getRole(req);

            // Patient role: may only view their own record
            if ("patient".equalsIgnoreCase(role)) {
                Patient ownRecord = patientDAO.getByUserId(SessionUtil.getUserId(req));
                if (ownRecord == null || ownRecord.getPatientId() != id) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                            "Access denied. You can only view your own patient record.");
                    return;
                }
            } else if (!SessionUtil.isAnyRole(req, "admin", "doctor", "staff")) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                        "Access denied. Insufficient privileges.");
                return;
            }

            try {
                Patient patient = patientDAO.getById(id);
                if (patient == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "Patient not found with id=" + id);
                    return;
                }
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, patient);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve patient: " + e.getMessage());
            }
        }
    }

    // ── POST ─────────────────────────────────────────────────────────────────

    /**
     * POST /api/patients
     * Body: Patient JSON (without patientId — DB generates it)
     * Allowed roles: admin, staff
     *
     * Note: Patient self-registration goes through SignupServlet, not here.
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "staff")) return;

        Patient patient;
        try {
            patient = JsonUtil.fromJson(req, Patient.class);
        } catch (Exception e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid JSON body: " + e.getMessage());
            return;
        }

        // Basic validation
        if (patient == null || isBlank(patient.getFirstName()) || isBlank(patient.getLastName())) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "first_name and last_name are required.");
            return;
        }

        try {
            int generatedId = patientDAO.insert(patient);
            patient.setPatientId(generatedId);
            JsonUtil.writeJson(resp, HttpServletResponse.SC_CREATED, patient);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to create patient: " + e.getMessage());
        }
    }

    // ── PUT ──────────────────────────────────────────────────────────────────

    /**
     * PUT /api/patients/{id}
     * Body: Patient JSON with updated fields
     * Allowed roles:
     *   admin, staff → can update any patient
     *   patient      → can only update their own record
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;

        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Patient id is required in the URL path: /api/patients/{id}");
            return;
        }

        String role = SessionUtil.getRole(req);

        // Patient role: may only update their own record
        if ("patient".equalsIgnoreCase(role)) {
            Patient ownRecord = patientDAO.getByUserId(SessionUtil.getUserId(req));
            if (ownRecord == null || ownRecord.getPatientId() != id) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                        "Access denied. You can only update your own patient record.");
                return;
            }
        } else if (!SessionUtil.isAnyRole(req, "admin", "staff")) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                    "Access denied. Insufficient privileges.");
            return;
        }

        // Verify the patient exists before updating
        Patient existing;
        try {
            existing = patientDAO.getById(id);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to verify patient: " + e.getMessage());
            return;
        }
        if (existing == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                    "Patient not found with id=" + id);
            return;
        }

        Patient updated;
        try {
            updated = JsonUtil.fromJson(req, Patient.class);
        } catch (Exception e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid JSON body: " + e.getMessage());
            return;
        }

        if (updated == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Request body is empty or malformed.");
            return;
        }

        // Force the id from the URL — never trust the body's id
        updated.setPatientId(id);

        try {
            int rows = patientDAO.update(updated);
            if (rows == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "No patient updated — id=" + id + " may not exist.");
                return;
            }
            // Return the updated record
            Patient result = patientDAO.getById(id);
            JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, result);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to update patient: " + e.getMessage());
        }
    }

    // ── DELETE ───────────────────────────────────────────────────────────────

    /**
     * DELETE /api/patients/{id}
     * Allowed roles: admin ONLY
     */
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;

        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Patient id is required in the URL path: /api/patients/{id}");
            return;
        }

        try {
            int rows = patientDAO.delete(id);
            if (rows == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "Patient not found with id=" + id);
                return;
            }
            // 204 No Content — successful delete, no body
            resp.setStatus(HttpServletResponse.SC_NO_CONTENT);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to delete patient: " + e.getMessage());
        }
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    /**
     * Extracts the patient id from either:
     *   1. The URL path  → /api/patients/42   (pathInfo = "/42")
     *   2. A query param → /api/patients?id=42
     *
     * Returns null if no id is present or if the value is not a valid integer.
     */
    private Integer extractId(HttpServletRequest req) {
        // Try path first: /api/patients/{id}
        String pathInfo = req.getPathInfo();
        if (pathInfo != null && pathInfo.length() > 1) {
            String segment = pathInfo.substring(1);  // strip leading "/"
            try {
                return Integer.parseInt(segment);
            } catch (NumberFormatException e) {
                return null;  // non-numeric path segment
            }
        }
        // Fall back to query parameter: ?id=42
        String idParam = req.getParameter("id");
        if (idParam != null && !idParam.isBlank()) {
            try {
                return Integer.parseInt(idParam);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    /** Null-safe blank check. */
    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
