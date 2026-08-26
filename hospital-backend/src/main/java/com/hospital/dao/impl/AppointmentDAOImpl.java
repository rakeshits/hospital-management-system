package com.hospital.dao.impl;

import com.hospital.dao.AppointmentDAO;
import com.hospital.dao.DAOException;
import com.hospital.model.Appointment;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AppointmentDAOImpl implements AppointmentDAO {

    private static final String COLS =
        "appointment_id, patient_id, doctor_id, department_id, date, time_slot, reason, status, notes, created_at, updated_at";

    private static final String SQL_GET_ALL        = "SELECT " + COLS + " FROM appointments ORDER BY date DESC, time_slot ASC";
    private static final String SQL_GET_BY_ID      = "SELECT " + COLS + " FROM appointments WHERE appointment_id=?";
    private static final String SQL_GET_BY_PATIENT = "SELECT " + COLS + " FROM appointments WHERE patient_id=? ORDER BY date DESC";
    private static final String SQL_GET_BY_DOCTOR  = "SELECT " + COLS + " FROM appointments WHERE doctor_id=? ORDER BY date DESC";
    private static final String SQL_INSERT =
        "INSERT INTO appointments (patient_id, doctor_id, department_id, date, time_slot, reason, status, notes) " +
        "VALUES (?,?,?,?,?,?,?,?)";
    private static final String SQL_UPDATE =
        "UPDATE appointments SET patient_id=?, doctor_id=?, department_id=?, date=?, time_slot=?, reason=?, status=?, notes=?, updated_at=NOW() " +
        "WHERE appointment_id=?";
    private static final String SQL_DELETE        = "DELETE FROM appointments WHERE appointment_id=?";
    private static final String SQL_UPDATE_STATUS = "UPDATE appointments SET status=?, updated_at=NOW() WHERE appointment_id=?";

    private Appointment mapRow(ResultSet rs) throws SQLException {
        Appointment a = new Appointment();
        a.setAppointmentId(rs.getInt("appointment_id"));
        a.setPatientId(rs.getInt("patient_id"));
        a.setDoctorId(rs.getInt("doctor_id"));
        a.setDepartmentId(rs.getInt("department_id"));
        a.setDate(rs.getDate("date"));
        a.setTimeSlot(rs.getString("time_slot"));
        a.setReason(rs.getString("reason"));
        a.setStatus(rs.getString("status"));
        a.setNotes(rs.getString("notes"));
        a.setCreatedAt(rs.getTimestamp("created_at"));
        a.setUpdatedAt(rs.getTimestamp("updated_at"));
        return a;
    }

    private List<Appointment> queryList(String sql, int param) {
        List<Appointment> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, param);
            try (ResultSet rs = ps.executeQuery()) { while (rs.next()) list.add(mapRow(rs)); }
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl] " + e.getMessage());
            throw new DAOException("Failed to query appointments", e);
        }
        return list;
    }

    @Override
    public List<Appointment> getAll() {
        List<Appointment> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve appointments", e);
        }
        return list;
    }

    @Override
    public Appointment getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return mapRow(rs); }
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve appointment id=" + id, e);
        }
        return null;
    }

    @Override public List<Appointment> getByPatientId(int patientId) { return queryList(SQL_GET_BY_PATIENT, patientId); }
    @Override public List<Appointment> getByDoctorId(int doctorId)   { return queryList(SQL_GET_BY_DOCTOR,  doctorId);  }

    @Override
    public int insert(Appointment a) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1,    a.getPatientId());
            ps.setInt(2,    a.getDoctorId());
            ps.setInt(3,    a.getDepartmentId());
            ps.setDate(4,   a.getDate());
            ps.setString(5, a.getTimeSlot());
            ps.setString(6, a.getReason());
            ps.setString(7, a.getStatus() != null ? a.getStatus() : "pending");
            ps.setString(8, a.getNotes());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) { if (keys.next()) return keys.getInt(1); }
            throw new DAOException("Insert appointment succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert appointment", e);
        }
    }

    @Override
    public int update(Appointment a) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setInt(1,    a.getPatientId());
            ps.setInt(2,    a.getDoctorId());
            ps.setInt(3,    a.getDepartmentId());
            ps.setDate(4,   a.getDate());
            ps.setString(5, a.getTimeSlot());
            ps.setString(6, a.getReason());
            ps.setString(7, a.getStatus());
            ps.setString(8, a.getNotes());
            ps.setInt(9,    a.getAppointmentId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update appointment id=" + a.getAppointmentId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete appointment id=" + id, e);
        }
    }

    @Override
    public int updateStatus(int id, String status) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE_STATUS)) {
            ps.setString(1, status);
            ps.setInt(2, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[AppointmentDAOImpl.updateStatus] " + e.getMessage());
            throw new DAOException("Failed to update status for appointment id=" + id, e);
        }
    }
}
