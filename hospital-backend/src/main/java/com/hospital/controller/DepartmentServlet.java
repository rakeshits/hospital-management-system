package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.DepartmentDAO;
import com.hospital.dao.impl.DepartmentDAOImpl;
import com.hospital.model.Department;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * DepartmentServlet — /api/departments
 *
 * GET    (any authenticated role)  — public read for booking flows
 * POST / PUT / DELETE              — admin only
 */
@WebServlet(name = "DepartmentServlet", urlPatterns = {"/api/departments", "/api/departments/*"})
public class DepartmentServlet extends HttpServlet {

    private final DepartmentDAO deptDAO = new DepartmentDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        Integer id = extractId(req);
        try {
            if (id == null) {
                JsonUtil.writeJson(resp, 200, deptDAO.getAll());
            } else {
                Department d = deptDAO.getById(id);
                if (d == null) { JsonUtil.writeError(resp, 404, "Department not found id=" + id); return; }
                JsonUtil.writeJson(resp, 200, d);
            }
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        try {
            Department d = JsonUtil.fromJson(req, Department.class);
            if (d == null || isBlank(d.getName())) { JsonUtil.writeError(resp, 400, "name is required"); return; }
            int newId = deptDAO.insert(d);
            d.setDepartmentId(newId);
            JsonUtil.writeJson(resp, 201, d);
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            Department d = JsonUtil.fromJson(req, Department.class);
            if (d == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            d.setDepartmentId(id);
            int rows = deptDAO.update(d);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Department not found id=" + id); return; }
            JsonUtil.writeJson(resp, 200, deptDAO.getById(id));
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            int rows = deptDAO.delete(id);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Department not found id=" + id); return; }
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
