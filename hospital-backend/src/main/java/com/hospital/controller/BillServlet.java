package com.hospital.controller;

import com.hospital.dao.BillDAO;
import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.dao.impl.BillDAOImpl;
import com.hospital.dao.impl.PatientDAOImpl;
import com.hospital.model.Bill;
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
 * BillServlet — /api/bills
 *
 * GET    /api/bills            → admin/staff: all bills; patient: own bills only
 * GET    /api/bills/{id}       → admin/staff: any; patient: own only
 * GET    /api/bills?patientId=N→ admin/staff: patient's bills; patient: own only
 * POST   /api/bills            → create bill        (admin, staff only)
 * PUT    /api/bills/{id}       → update bill        (admin, staff only)
 * PUT    /api/bills/{id}/pay   → update status only (admin, staff only)
 * DELETE /api/bills/{id}       → hard delete        (admin only)
 */
@WebServlet(name = "BillServlet", urlPatterns = {"/api/bills", "/api/bills/*"})
public class BillServlet extends HttpServlet {

    // DAOs are stateless — safe to share across requests
    private final BillDAO    billDAO    = new BillDAOImpl();
    private final PatientDAO patientDAO = new PatientDAOImpl();

    // ── GET ──────────────────────────────────────────────────────────────────

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;

        String role         = SessionUtil.getRole(req);
        int    sessionUserId = SessionUtil.getUserId(req);

        // Resolve path: /api/bills/{id} or /api/bills/{id}/pay
        Integer id = extractId(req);

        // ── /api/bills/{id} — single bill ────────────────────────────────
        if (id != null) {
            try {
                Bill bill = billDAO.getById(id);
                if (bill == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "Bill not found with id=" + id);
                    return;
                }
                // Patient may only see their own bills
                if ("patient".equalsIgnoreCase(role)) {
                    Patient own = patientDAO.getByUserId(sessionUserId);
                    if (own == null || own.getPatientId() != bill.getPatientId()) {
                        JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                                "Access denied. You can only view your own bills.");
                        return;
                    }
                } else if (!SessionUtil.isAnyRole(req, "admin", "staff", "doctor")) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                            "Access denied.");
                    return;
                }
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, bill);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve bill: " + e.getMessage());
            }
            return;
        }

        // ── /api/bills?patientId=N — bills for a specific patient ─────────
        String patientParam = req.getParameter("patientId");
        if (patientParam != null) {
            int pid;
            try {
                pid = Integer.parseInt(patientParam);
            } catch (NumberFormatException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid patientId parameter.");
                return;
            }
            // Patient may only query their own
            if ("patient".equalsIgnoreCase(role)) {
                Patient own = patientDAO.getByUserId(sessionUserId);
                if (own == null || own.getPatientId() != pid) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                            "Access denied. You can only view your own bills.");
                    return;
                }
            } else if (!SessionUtil.isAnyRole(req, "admin", "staff", "doctor")) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN, "Access denied.");
                return;
            }
            try {
                List<Bill> bills = billDAO.getByPatientId(pid);
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, bills);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve bills: " + e.getMessage());
            }
            return;
        }

        // ── /api/bills — list all ─────────────────────────────────────────
        if ("patient".equalsIgnoreCase(role)) {
            // Patient: return only their own bills
            try {
                Patient own = patientDAO.getByUserId(sessionUserId);
                if (own == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "No patient profile found for your account.");
                    return;
                }
                List<Bill> bills = billDAO.getByPatientId(own.getPatientId());
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, bills);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve bills: " + e.getMessage());
            }
        } else {
            // Admin / staff / doctor: see all
            if (!SessionUtil.hasRole(req, resp, "admin", "staff", "doctor")) return;
            try {
                List<Bill> bills = billDAO.getAll();
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, bills);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to retrieve bills: " + e.getMessage());
            }
        }
    }

    // ── POST ─────────────────────────────────────────────────────────────────

    /**
     * POST /api/bills — create a new bill.
     * Allowed: admin, staff only.
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "staff")) return;

        Bill bill;
        try {
            bill = JsonUtil.fromJson(req, Bill.class);
        } catch (Exception e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid JSON body: " + e.getMessage());
            return;
        }

        if (bill == null || bill.getPatientId() == 0) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "patient_id is required.");
            return;
        }

        try {
            int generatedId = billDAO.insert(bill);
            bill.setBillId(generatedId);
            JsonUtil.writeJson(resp, HttpServletResponse.SC_CREATED, bill);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to create bill: " + e.getMessage());
        }
    }

    // ── PUT ──────────────────────────────────────────────────────────────────

    /**
     * PUT /api/bills/{id}       — full update of a bill    (admin, staff)
     * PUT /api/bills/{id}/pay   — update payment status only (admin, staff)
     *
     * Body for /pay: { "paymentStatus": "paid" }
     */
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "staff")) return;

        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Bill id is required in the URL path: /api/bills/{id}");
            return;
        }

        // Check if this is a /pay sub-action
        String pathInfo = req.getPathInfo();
        if (pathInfo != null && pathInfo.endsWith("/pay")) {
            // Update payment status only
            try {
                Bill body = JsonUtil.fromJson(req, Bill.class);
                if (body == null || body.getPaymentStatus() == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                            "paymentStatus field is required.");
                    return;
                }
                int rows = billDAO.updatePaymentStatus(id, body.getPaymentStatus());
                if (rows == 0) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "Bill not found with id=" + id);
                    return;
                }
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, billDAO.getById(id));
            } catch (DAOException e) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                        "Failed to update payment status: " + e.getMessage());
            }
            return;
        }

        // Full update
        Bill existing;
        try {
            existing = billDAO.getById(id);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to verify bill: " + e.getMessage());
            return;
        }
        if (existing == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                    "Bill not found with id=" + id);
            return;
        }

        Bill updated;
        try {
            updated = JsonUtil.fromJson(req, Bill.class);
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
        updated.setBillId(id);

        try {
            int rows = billDAO.update(updated);
            if (rows == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "No bill updated — id=" + id + " may not exist.");
                return;
            }
            JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, billDAO.getById(id));
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to update bill: " + e.getMessage());
        }
    }

    // ── DELETE ───────────────────────────────────────────────────────────────

    /**
     * DELETE /api/bills/{id} — hard delete. Admin only.
     */
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;

        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Bill id is required in the URL path: /api/bills/{id}");
            return;
        }

        try {
            int rows = billDAO.delete(id);
            if (rows == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "Bill not found with id=" + id);
                return;
            }
            resp.setStatus(HttpServletResponse.SC_NO_CONTENT);  // 204 — success, no body
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to delete bill: " + e.getMessage());
        }
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    /**
     * Extracts the bill id from either:
     *   1. The URL path  → /api/bills/42       (pathInfo = "/42")
     *   2. The URL path  → /api/bills/42/pay   (pathInfo = "/42/pay") — returns 42
     *   3. A query param → /api/bills?id=42
     *
     * Returns null if no id is present or the value is not a valid integer.
     */
    private Integer extractId(HttpServletRequest req) {
        String pathInfo = req.getPathInfo();
        if (pathInfo != null && pathInfo.length() > 1) {
            // Strip leading slash, then take first segment only (handles /42/pay)
            String[] segments = pathInfo.substring(1).split("/");
            try {
                return Integer.parseInt(segments[0]);
            } catch (NumberFormatException e) {
                return null;
            }
        }
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
}
