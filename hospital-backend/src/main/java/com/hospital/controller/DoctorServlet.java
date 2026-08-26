package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.DoctorDAO;
import com.hospital.dao.impl.DoctorDAOImpl;
import com.hospital.model.Doctor;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * DoctorServlet — /api/doctors
 *
 * GET    /api/doctors                    → list all           (any authenticated)
 * GET    /api/doctors/{id}               → get by id          (any authenticated)
 * GET    /api/doctors?departmentId=N     → filter by dept     (any authenticated)
 * POST   /api/doctors                    → create             (admin)
 * PUT    /api/doctors/{id}               → update             (admin; doctor can update own)
 * DELETE /api/doctors/{id}               → delete             (admin)
 */
@WebServlet(name = "DoctorServlet", urlPatterns = {"/api/doctors", "/api/doctors/*"})
public class DoctorServlet extends HttpServlet {

    private final DoctorDAO doctorDAO = new DoctorDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        Integer id = extractId(req);
        try {
            if (id != null) {
                Doctor d = doctorDAO.getById(id);
                if (d == null) { JsonUtil.writeError(resp, 404, "Doctor not found id=" + id); return; }
                JsonUtil.writeJson(resp, 200, d);
                return;
            }
            String deptParam = req.getParameter("departmentId");
            if (deptParam != null && !deptParam.isBlank()) {
                JsonUtil.writeJson(resp, 200, doctorDAO.getByDepartment(Integer.parseInt(deptParam)));
            } else {
                JsonUtil.writeJson(resp, 200, doctorDAO.getAll());
            }
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        try {
            Doctor d = JsonUtil.fromJson(req, Doctor.class);
            if (d == null || isBlank(d.getFirstName())) { JsonUtil.writeError(resp, 400, "first_name required"); return; }
            int newId = doctorDAO.insert(d);
            d.setDoctorId(newId);
            JsonUtil.writeJson(resp, 201, d);
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }

        // Doctor can update their own record; admin can update any
        if (SessionUtil.isRole(req, "doctor")) {
            Doctor own = doctorDAO.getByUserId(SessionUtil.getUserId(req));
            if (own == null || own.getDoctorId() != id) {
                JsonUtil.writeError(resp, 403, "Access denied. You can only update your own profile.");
                return;
            }
        } else if (!SessionUtil.isRole(req, "admin")) {
            JsonUtil.writeError(resp, 403, "Access denied.");
            return;
        }

        try {
            Doctor d = JsonUtil.fromJson(req, Doctor.class);
            if (d == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            d.setDoctorId(id);
            int rows = doctorDAO.update(d);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Doctor not found id=" + id); return; }
            JsonUtil.writeJson(resp, 200, doctorDAO.getById(id));
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            int rows = doctorDAO.delete(id);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Doctor not found id=" + id); return; }
            resp.setStatus(204);
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    private Integer extractId(HttpServletRequest req) {
        String p = req.getPathInfo();
        if (p != null && p.length() > 1) { try { return Integer.parseInt(p.substring(1)); } catch (NumberFormatException ignored) {} }
        String q = req.getParameter("id");
        if (q != null && !q.isBlank()) { try { return Integer.parseInt(q); } catch (NumberFormatException ignored) {} }
        return null;
    }

    private boolean isBlank(String s) { return s == null || s.isBlank(); }
}
