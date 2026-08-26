package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.RoleDAO;
import com.hospital.dao.impl.RoleDAOImpl;
import com.hospital.model.Role;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * RoleServlet — /api/roles
 * All operations restricted to admin only.
 */
@WebServlet(name = "RoleServlet", urlPatterns = {"/api/roles", "/api/roles/*"})
public class RoleServlet extends HttpServlet {

    private final RoleDAO roleDAO = new RoleDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;

        Integer id = extractId(req);
        try {
            if (id == null) {
                JsonUtil.writeJson(resp, 200, roleDAO.getAll());
            } else {
                Role role = roleDAO.getById(id);
                if (role == null) { JsonUtil.writeError(resp, 404, "Role not found id=" + id); return; }
                JsonUtil.writeJson(resp, 200, role);
            }
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        try {
            Role role = JsonUtil.fromJson(req, Role.class);
            if (role == null || isBlank(role.getName())) { JsonUtil.writeError(resp, 400, "name is required"); return; }
            int id = roleDAO.insert(role);
            role.setRoleId(id);
            JsonUtil.writeJson(resp, 201, role);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            Role role = JsonUtil.fromJson(req, Role.class);
            if (role == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            role.setRoleId(id);
            int rows = roleDAO.update(role);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Role not found id=" + id); return; }
            JsonUtil.writeJson(resp, 200, roleDAO.getById(id));
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            int rows = roleDAO.delete(id);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Role not found id=" + id); return; }
            resp.setStatus(204);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
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
