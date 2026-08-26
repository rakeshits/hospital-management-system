package com.hospital.controller;

import com.google.gson.JsonObject;
import com.hospital.dao.DAOException;
import com.hospital.dao.UserDAO;
import com.hospital.dao.impl.UserDAOImpl;
import com.hospital.model.User;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

/**
 * UserServlet — /api/users
 *
 * GET    /api/users              → list all users          (admin)
 * GET    /api/users/{id}         → get user by id          (admin, or own userId)
 * POST   /api/users              → create user             (admin)
 * PUT    /api/users/{id}         → update user             (admin)
 * DELETE /api/users/{id}         → delete user             (admin)
 * PATCH  /api/users/{id}/active  → toggle active status    (admin)
 *
 * passwordHash is NEVER returned in any GET response.
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/api/users", "/api/users/*"})
public class UserServlet extends HttpServlet {

    private final UserDAO userDAO = new UserDAOImpl();

    // ── GET ──────────────────────────────────────────────────────────────────

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;

        Integer id = extractId(req);

        if (id == null) {
            if (!SessionUtil.hasRole(req, resp, "admin")) return;
            try {
                List<User> users = userDAO.getAll();
                users.forEach(u -> u.setPasswordHash(null));   // never expose hash
                JsonUtil.writeJson(resp, 200, users);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, 500, e.getMessage());
            }
        } else {
            // Admin can view any; a user can view their own
            if (!SessionUtil.isAnyRole(req, "admin") && SessionUtil.getUserId(req) != id) {
                JsonUtil.writeError(resp, 403, "Access denied.");
                return;
            }
            try {
                User user = userDAO.getById(id);
                if (user == null) { JsonUtil.writeError(resp, 404, "User not found id=" + id); return; }
                user.setPasswordHash(null);
                JsonUtil.writeJson(resp, 200, user);
            } catch (DAOException e) {
                JsonUtil.writeError(resp, 500, e.getMessage());
            }
        }
    }

    // ── POST ─────────────────────────────────────────────────────────────────

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        try {
            User user = JsonUtil.fromJson(req, User.class);
            if (user == null || isBlank(user.getEmail()) || isBlank(user.getPasswordHash())) {
                JsonUtil.writeError(resp, 400, "email and password_hash are required");
                return;
            }
            int newId = userDAO.insert(user);
            user.setUserId(newId);
            user.setPasswordHash(null);
            JsonUtil.writeJson(resp, 201, user);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    // ── PUT ──────────────────────────────────────────────────────────────────

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            User user = JsonUtil.fromJson(req, User.class);
            if (user == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            user.setUserId(id);
            int rows = userDAO.update(user);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "User not found id=" + id); return; }
            User result = userDAO.getById(id);
            result.setPasswordHash(null);
            JsonUtil.writeJson(resp, 200, result);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    // ── DELETE ───────────────────────────────────────────────────────────────

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            int rows = userDAO.delete(id);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "User not found id=" + id); return; }
            resp.setStatus(204);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, 500, e.getMessage());
        }
    }

    // ── PATCH — toggle active ─────────────────────────────────────────────────
    // PATCH /api/users/{id}/active   body: {"active": true|false}

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws IOException, jakarta.servlet.ServletException {
        if ("PATCH".equalsIgnoreCase(req.getMethod())) {
            doPatch(req, resp);
        } else {
            super.service(req, resp);
        }
    }

    protected void doPatch(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;

        // Expect path: /api/users/{id}/active
        String pathInfo = req.getPathInfo();  // e.g. "/42/active"
        if (pathInfo == null || !pathInfo.endsWith("/active")) {
            JsonUtil.writeError(resp, 400, "Use PATCH /api/users/{id}/active");
            return;
        }
        String[] parts = pathInfo.split("/");
        if (parts.length < 2) { JsonUtil.writeError(resp, 400, "id required"); return; }
        int id;
        try { id = Integer.parseInt(parts[1]); }
        catch (NumberFormatException e) { JsonUtil.writeError(resp, 400, "Invalid id"); return; }

        try {
            JsonObject body = JsonUtil.fromJson(req.getReader().lines()
                    .reduce("", String::concat), JsonObject.class);
            boolean active = body.get("active").getAsBoolean();
            int rows = userDAO.setActive(id, active);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "User not found id=" + id); return; }
            JsonUtil.writeMessage(resp, 200, "User " + id + " active=" + active);
        } catch (Exception e) {
            JsonUtil.writeError(resp, 400, "body must be {\"active\": true|false}");
        }
    }

    private Integer extractId(HttpServletRequest req) {
        String p = req.getPathInfo();
        if (p != null && p.length() > 1) {
            String seg = p.substring(1).split("/")[0];
            try { return Integer.parseInt(seg); } catch (NumberFormatException ignored) {}
        }
        String q = req.getParameter("id");
        if (q != null && !q.isBlank()) { try { return Integer.parseInt(q); } catch (NumberFormatException ignored) {} }
        return null;
    }

    private boolean isBlank(String s) { return s == null || s.isBlank(); }
}
