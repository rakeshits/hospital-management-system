package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.dao.impl.PatientDAOImpl;
import com.hospital.model.Patient;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(name = "PatientServlet", urlPatterns = {"/api/patients", "/api/patients/*"})
public class PatientServlet extends HttpServlet {

    private final PatientDAO dao = new PatientDAOImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String pathInfo = request.getPathInfo();
        try (PrintWriter out = response.getWriter()) {
            if (pathInfo == null || pathInfo.equals("/")) {
                // list all
                if (!SessionUtil.hasRole(request, "admin") && !SessionUtil.hasRole(request, "doctor") && !SessionUtil.hasRole(request, "staff")) {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                    return;
                }
                List<Patient> list = dao.getAll();
                out.print(JsonUtil.toJson(list));
                return;
            }

            String[] parts = pathInfo.split("/");
            if (parts.length >= 2) {
                int id;
                try {
                    id = Integer.parseInt(parts[1]);
                } catch (NumberFormatException e) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "invalid id")));
                    return;
                }

                // access control
                if (SessionUtil.hasRole(request, "admin") || SessionUtil.hasRole(request, "doctor") || SessionUtil.hasRole(request, "staff")) {
                    Patient p = dao.getById(id);
                    if (p == null) {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "not found")));
                        return;
                    }
                    out.print(JsonUtil.toJson(p));
                    return;
                }

                // patient role: allow only own record
                if (SessionUtil.hasRole(request, "patient")) {
                    Integer userId = SessionUtil.getCurrentUserId(request);
                    if (userId == null) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "not logged in")));
                        return;
                    }
                    Patient p = dao.getByUserId(userId);
                    if (p == null || p.getPatient_id() != id) {
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                        return;
                    }
                    out.print(JsonUtil.toJson(p));
                    return;
                }

                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                return;
            }

            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "bad request")));
        } catch (DAOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(JsonUtil.toJson(java.util.Collections.singletonMap("error", e.getMessage())));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            if (!SessionUtil.hasRole(request, "admin") && !SessionUtil.hasRole(request, "staff")) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                return;
            }

            Patient p = JsonUtil.fromJson(request.getReader(), Patient.class);
            int newId = dao.insert(p);
            if (newId <= 0) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "could not create")));
                return;
            }
            p.setPatient_id(newId);
            response.setStatus(HttpServletResponse.SC_CREATED);
            out.print(JsonUtil.toJson(p));
        } catch (DAOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(JsonUtil.toJson(java.util.Collections.singletonMap("error", e.getMessage())));
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String pathInfo = request.getPathInfo();
        try (PrintWriter out = response.getWriter()) {
            if (pathInfo == null || pathInfo.equals("/")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "missing id")));
                return;
            }
            String[] parts = pathInfo.split("/");
            if (parts.length < 2) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "invalid id")));
                return;
            }
            int id;
            try { id = Integer.parseInt(parts[1]); } catch (NumberFormatException ex) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "invalid id")));
                return;
            }

            Patient existing = dao.getById(id);
            if (existing == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "not found")));
                return;
            }

            boolean allowed = false;
            if (SessionUtil.hasRole(request, "admin") || SessionUtil.hasRole(request, "staff")) allowed = true;
            if (!allowed && SessionUtil.hasRole(request, "patient")) {
                Integer userId = SessionUtil.getCurrentUserId(request);
                Patient pByUser = dao.getByUserId(userId);
                if (pByUser != null && pByUser.getPatient_id() == id) allowed = true;
            }
            if (!allowed) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                return;
            }

            Patient updated = JsonUtil.fromJson(request.getReader(), Patient.class);
            updated.setPatient_id(id);
            int updatedRows = dao.update(updated);
            if (updatedRows == 0) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "could not update")));
                return;
            }
            out.print(JsonUtil.toJson(updated));
        } catch (DAOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(JsonUtil.toJson(java.util.Collections.singletonMap("error", e.getMessage())));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String pathInfo = request.getPathInfo();
        try (PrintWriter out = response.getWriter()) {
            if (!SessionUtil.hasRole(request, "admin")) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "forbidden")));
                return;
            }
            if (pathInfo == null || pathInfo.equals("/")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "missing id")));
                return;
            }
            String[] parts = pathInfo.split("/");
            if (parts.length < 2) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "invalid id")));
                return;
            }
            int id;
            try { id = Integer.parseInt(parts[1]); } catch (NumberFormatException ex) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "invalid id")));
                return;
            }

            int deleted = dao.delete(id);
            if (deleted == 0) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(JsonUtil.toJson(java.util.Collections.singletonMap("error", "not found")));
                return;
            }
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
        } catch (DAOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().print(JsonUtil.toJson(java.util.Collections.singletonMap("error", e.getMessage())));
        }
    }
}
