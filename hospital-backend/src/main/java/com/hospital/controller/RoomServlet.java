package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.RoomDAO;
import com.hospital.dao.impl.RoomDAOImpl;
import com.hospital.model.Room;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * RoomServlet — /api/rooms
 * GET: admin, doctor, staff  |  POST/PUT/DELETE: admin only
 */
@WebServlet(name = "RoomServlet", urlPatterns = {"/api/rooms", "/api/rooms/*"})
public class RoomServlet extends HttpServlet {

    private final RoomDAO roomDAO = new RoomDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin", "doctor", "staff")) return;
        Integer id = extractId(req);
        try {
            if (id == null) { JsonUtil.writeJson(resp, 200, roomDAO.getAll()); }
            else {
                Room r = roomDAO.getById(id);
                if (r == null) { JsonUtil.writeError(resp, 404, "Room not found id=" + id); return; }
                JsonUtil.writeJson(resp, 200, r);
            }
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        try {
            Room r = JsonUtil.fromJson(req, Room.class);
            if (r == null || isBlank(r.getRoomNumber())) { JsonUtil.writeError(resp, 400, "room_number required"); return; }
            int newId = roomDAO.insert(r);
            r.setRoomId(newId);
            JsonUtil.writeJson(resp, 201, r);
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            Room r = JsonUtil.fromJson(req, Room.class);
            if (r == null) { JsonUtil.writeError(resp, 400, "body required"); return; }
            r.setRoomId(id);
            int rows = roomDAO.update(r);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Room not found id=" + id); return; }
            JsonUtil.writeJson(resp, 200, roomDAO.getById(id));
        } catch (DAOException e) { JsonUtil.writeError(resp, 500, e.getMessage()); }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) { JsonUtil.writeError(resp, 400, "id required in path"); return; }
        try {
            int rows = roomDAO.delete(id);
            if (rows == 0) { JsonUtil.writeError(resp, 404, "Room not found id=" + id); return; }
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
