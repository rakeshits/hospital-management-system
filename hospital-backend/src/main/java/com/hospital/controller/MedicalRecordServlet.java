package com.hospital.controller;

import com.hospital.dao.DAOException;
import com.hospital.dao.DoctorDAO;
import com.hospital.dao.MedicalRecordDAO;
import com.hospital.dao.PatientDAO;
import com.hospital.dao.impl.DoctorDAOImpl;
import com.hospital.dao.impl.MedicalRecordDAOImpl;
import com.hospital.dao.impl.PatientDAOImpl;
import com.hospital.model.Doctor;
import com.hospital.model.MedicalRecord;
import com.hospital.model.Patient;
import com.hospital.util.JsonUtil;
import com.hospital.util.SessionUtil;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "MedicalRecordServlet", urlPatterns = {"/api/medical-records", "/api/medical-records/*"})
public class MedicalRecordServlet extends HttpServlet {

    private final MedicalRecordDAO medicalRecordDAO = new MedicalRecordDAOImpl();
    private final PatientDAO patientDAO = new PatientDAOImpl();
    private final DoctorDAO doctorDAO = new DoctorDAOImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;

        String role = SessionUtil.getRole(req);
        Integer id = extractId(req);
        try {
            if (id != null) {
                MedicalRecord record = medicalRecordDAO.getById(id);
                if (record == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "Medical record not found with id=" + id);
                    return;
                }
                if (!canReadRecord(req, resp, record, role)) return;
                JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, record);
                return;
            }

            List<MedicalRecord> records;
            if ("admin".equalsIgnoreCase(role)) {
                String patientId = req.getParameter("patientId");
                String doctorId = req.getParameter("doctorId");
                if (patientId != null) records = medicalRecordDAO.getByPatientId(parseId(patientId, "patientId"));
                else if (doctorId != null) records = medicalRecordDAO.getByDoctorId(parseId(doctorId, "doctorId"));
                else records = medicalRecordDAO.getAll();
            } else if ("doctor".equalsIgnoreCase(role)) {
                Doctor doctor = doctorDAO.getByUserId(SessionUtil.getUserId(req));
                if (doctor == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                            "No doctor profile found for your account.");
                    return;
                }
                records = medicalRecordDAO.getByDoctorId(doctor.getDoctorId());
            } else if ("patient".equalsIgnoreCase(role)) {
                Patient patient = patientDAO.getByUserId(SessionUtil.getUserId(req));
                if (patient == null) {
                    JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                            "No patient profile found for your account.");
                    return;
                }
                records = medicalRecordDAO.getByPatientId(patient.getPatientId());
            } else {
                JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                        "Access denied. Insufficient privileges.");
                return;
            }
            JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, records);
        } catch (NumberFormatException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to retrieve medical records: " + e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "doctor")) return;

        try {
            Doctor doctor = currentDoctor(req);
            if (doctor == null) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                        "No doctor profile found for your account.");
                return;
            }
            MedicalRecord record = JsonUtil.fromJson(req, MedicalRecord.class);
            if (record == null || record.getPatientId() == null) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                        "patientId is required.");
                return;
            }
            record.setDoctorId(doctor.getDoctorId());
            int id = medicalRecordDAO.insert(record);
            record.setRecordId(id);
            JsonUtil.writeJson(resp, HttpServletResponse.SC_CREATED, record);
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to create medical record: " + e.getMessage());
        } catch (Exception e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid JSON body: " + e.getMessage());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "doctor")) return;

        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Record id is required in the URL path: /api/medical-records/{id}");
            return;
        }
        try {
            Doctor doctor = currentDoctor(req);
            MedicalRecord existing = medicalRecordDAO.getById(id);
            if (doctor == null || existing == null || existing.getDoctorId() == null
                    || existing.getDoctorId() != doctor.getDoctorId()) {
                JsonUtil.writeError(resp, existing == null
                        ? HttpServletResponse.SC_NOT_FOUND : HttpServletResponse.SC_FORBIDDEN,
                        existing == null ? "Medical record not found with id=" + id
                                : "Access denied. You can only update your own patients' records.");
                return;
            }
            MedicalRecord updated = JsonUtil.fromJson(req, MedicalRecord.class);
            if (updated == null) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                        "Request body is empty or malformed.");
                return;
            }
            updated.setRecordId(id);
            updated.setPatientId(existing.getPatientId());
            updated.setDoctorId(existing.getDoctorId());
            int rows = medicalRecordDAO.update(updated);
            if (rows == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "Medical record not found with id=" + id);
                return;
            }
            JsonUtil.writeJson(resp, HttpServletResponse.SC_OK, medicalRecordDAO.getById(id));
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to update medical record: " + e.getMessage());
        } catch (Exception e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid JSON body: " + e.getMessage());
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        if (!SessionUtil.isLoggedIn(req, resp)) return;
        if (!SessionUtil.hasRole(req, resp, "admin")) return;
        Integer id = extractId(req);
        if (id == null) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_BAD_REQUEST,
                    "Record id is required in the URL path: /api/medical-records/{id}");
            return;
        }
        try {
            if (medicalRecordDAO.delete(id) == 0) {
                JsonUtil.writeError(resp, HttpServletResponse.SC_NOT_FOUND,
                        "Medical record not found with id=" + id);
                return;
            }
            JsonUtil.writeMessage(resp, HttpServletResponse.SC_OK, "Medical record deleted successfully.");
        } catch (DAOException e) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to delete medical record: " + e.getMessage());
        }
    }

    private boolean canReadRecord(HttpServletRequest req, HttpServletResponse resp,
                                  MedicalRecord record, String role) throws IOException {
        if ("admin".equalsIgnoreCase(role)) return true;
        if ("doctor".equalsIgnoreCase(role)) {
            Doctor doctor = doctorDAO.getByUserId(SessionUtil.getUserId(req));
            if (doctor != null && record.getDoctorId() != null
                    && record.getDoctorId() == doctor.getDoctorId()) return true;
        }
        if ("patient".equalsIgnoreCase(role)) {
            Patient patient = patientDAO.getByUserId(SessionUtil.getUserId(req));
            if (patient != null && record.getPatientId() != null
                    && record.getPatientId() == patient.getPatientId()) return true;
        }
        JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                "Access denied. You can only view authorized medical records.");
        return false;
    }

    private Doctor currentDoctor(HttpServletRequest req) {
        return doctorDAO.getByUserId(SessionUtil.getUserId(req));
    }

    private Integer extractId(HttpServletRequest req) {
        String path = req.getPathInfo();
        if (path == null || path.equals("/") || path.isBlank()) return null;
        String value = path.startsWith("/") ? path.substring(1) : path;
        if (value.contains("/")) value = value.substring(0, value.indexOf('/'));
        return parseId(value, "recordId");
    }

    private int parseId(String value, String name) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Invalid " + name + " parameter.");
        }
    }
}
