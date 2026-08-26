package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.model.Patient;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PatientDAOImpl implements PatientDAO {

    private static final String SELECT_ALL = "SELECT * FROM patients";
    private static final String SELECT_BY_ID = "SELECT * FROM patients WHERE patient_id = ?";
    private static final String SELECT_BY_USER_ID = "SELECT * FROM patients WHERE user_id = ?";
    private static final String DELETE_BY_ID = "DELETE FROM patients WHERE patient_id = ?";

n    @Override
    public List<Patient> getAll() {
        List<Patient> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
            return list;
        } catch (SQLException e) {
            throw new DAOException("Error fetching all patients", e);
        }
    }

    @Override
    public Patient getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? mapRow(rs) : null;
            }
        } catch (SQLException e) {
            throw new DAOException("Error fetching patient by id", e);
        }
    }

    @Override
    public Patient getByUserId(int userId) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_USER_ID)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? mapRow(rs) : null;
            }
        } catch (SQLException e) {
            throw new DAOException("Error fetching patient by user_id", e);
        }
    }

    @Override
    public int insert(Patient patient) {
        String sql = "INSERT INTO patients (user_id, patient_code, first_name, last_name, gender, dob, blood_group, phone, email, address, emergency_contact_name, emergency_contact_phone, registration_date, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int i = 1;
            if (patient.getUser_id() != null) ps.setInt(i++, patient.getUser_id()); else ps.setNull(i++, Types.INTEGER);
            ps.setString(i++, patient.getPatient_code());
            ps.setString(i++, patient.getFirst_name());
            ps.setString(i++, patient.getLast_name());
            ps.setString(i++, patient.getGender());
            ps.setDate(i++, patient.getDob());
            ps.setString(i++, patient.getBlood_group());
            ps.setString(i++, patient.getPhone());
            ps.setString(i++, patient.getEmail());
            ps.setString(i++, patient.getAddress());
            ps.setString(i++, patient.getEmergency_contact_name());
            ps.setString(i++, patient.getEmergency_contact_phone());
            ps.setDate(i++, patient.getRegistration_date());
            ps.setString(i++, patient.getStatus());

n            int affected = ps.executeUpdate();
            if (affected == 0) return -1;
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            return -1;
        } catch (SQLException e) {
            throw new DAOException("Error inserting patient", e);
        }
    }

    @Override
    public int update(Patient patient) {
        String sql = "UPDATE patients SET user_id=?, patient_code=?, first_name=?, last_name=?, gender=?, dob=?, blood_group=?, phone=?, email=?, address=?, emergency_contact_name=?, emergency_contact_phone=?, registration_date=?, status=? WHERE patient_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int i = 1;
            if (patient.getUser_id() != null) ps.setInt(i++, patient.getUser_id()); else ps.setNull(i++, Types.INTEGER);
            ps.setString(i++, patient.getPatient_code());
            ps.setString(i++, patient.getFirst_name());
            ps.setString(i++, patient.getLast_name());
            ps.setString(i++, patient.getGender());
            ps.setDate(i++, patient.getDob());
            ps.setString(i++, patient.getBlood_group());
            ps.setString(i++, patient.getPhone());
            ps.setString(i++, patient.getEmail());
            ps.setString(i++, patient.getAddress());
            ps.setString(i++, patient.getEmergency_contact_name());
            ps.setString(i++, patient.getEmergency_contact_phone());
            ps.setDate(i++, patient.getRegistration_date());
            ps.setString(i++, patient.getStatus());
            ps.setInt(i++, patient.getPatient_id());

n            return ps.executeUpdate();
        } catch (SQLException e) {
            throw new DAOException("Error updating patient", e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_BY_ID)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            throw new DAOException("Error deleting patient", e);
        }
    }

    private Patient mapRow(ResultSet rs) throws SQLException {
        Patient p = new Patient();
        p.setPatient_id(rs.getInt("patient_id"));
        int uid = rs.getInt("user_id");
        if (!rs.wasNull()) p.setUser_id(uid);
        p.setPatient_code(rs.getString("patient_code"));
        p.setFirst_name(rs.getString("first_name"));
        p.setLast_name(rs.getString("last_name"));
        p.setGender(rs.getString("gender"));
        p.setDob(rs.getDate("dob"));
        p.setBlood_group(rs.getString("blood_group"));
        p.setPhone(rs.getString("phone"));
        p.setEmail(rs.getString("email"));
        p.setAddress(rs.getString("address"));
        p.setEmergency_contact_name(rs.getString("emergency_contact_name"));
        p.setEmergency_contact_phone(rs.getString("emergency_contact_phone"));
        p.setRegistration_date(rs.getDate("registration_date"));
        p.setStatus(rs.getString("status"));
        return p;
    }
}
