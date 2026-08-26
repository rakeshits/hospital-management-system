package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.DoctorDAO;
import com.hospital.model.Doctor;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DoctorDAOImpl implements DoctorDAO {

    private static final String COLS =
        "doctor_id, user_id, first_name, last_name, email, phone, specialization, " +
        "department_id, qualification, experience, consultation_fee, available_days, " +
        "available_from, available_to, rating, is_active, created_at, updated_at";

    private static final String SQL_GET_ALL    = "SELECT " + COLS + " FROM doctors ORDER BY doctor_id ASC";
    private static final String SQL_GET_BY_ID  = "SELECT " + COLS + " FROM doctors WHERE doctor_id = ?";
    private static final String SQL_GET_BY_UID = "SELECT " + COLS + " FROM doctors WHERE user_id = ?";
    private static final String SQL_GET_BY_DEPT= "SELECT " + COLS + " FROM doctors WHERE department_id = ? ORDER BY doctor_id ASC";

    private static final String SQL_INSERT =
        "INSERT INTO doctors (user_id, first_name, last_name, email, phone, specialization, " +
        "department_id, qualification, experience, consultation_fee, available_days, " +
        "available_from, available_to, rating, is_active) " +
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    private static final String SQL_UPDATE =
        "UPDATE doctors SET first_name=?, last_name=?, email=?, phone=?, specialization=?, " +
        "department_id=?, qualification=?, experience=?, consultation_fee=?, available_days=?, " +
        "available_from=?, available_to=?, rating=?, is_active=?, updated_at=NOW() " +
        "WHERE doctor_id=?";

    private static final String SQL_DELETE = "DELETE FROM doctors WHERE doctor_id=?";

    private Doctor mapRow(ResultSet rs) throws SQLException {
        Doctor d = new Doctor();
        d.setDoctorId(rs.getInt("doctor_id"));
        d.setUserId(rs.getInt("user_id"));
        d.setFirstName(rs.getString("first_name"));
        d.setLastName(rs.getString("last_name"));
        d.setEmail(rs.getString("email"));
        d.setPhone(rs.getString("phone"));
        d.setSpecialization(rs.getString("specialization"));
        d.setDepartmentId(rs.getInt("department_id"));
        d.setQualification(rs.getString("qualification"));
        d.setExperience(rs.getInt("experience"));
        d.setConsultationFee(rs.getBigDecimal("consultation_fee"));
        d.setAvailableDays(rs.getString("available_days"));
        d.setAvailableFrom(rs.getString("available_from"));
        d.setAvailableTo(rs.getString("available_to"));
        d.setRating(rs.getBigDecimal("rating"));
        d.setActive(rs.getBoolean("is_active"));
        d.setCreatedAt(rs.getTimestamp("created_at"));
        d.setUpdatedAt(rs.getTimestamp("updated_at"));
        return d;
    }

    @Override
    public List<Doctor> getAll() {
        List<Doctor> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve doctors", e);
        }
        return list;
    }

    @Override
    public Doctor getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return mapRow(rs); }
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve doctor id=" + id, e);
        }
        return null;
    }

    @Override
    public Doctor getByUserId(int userId) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_UID)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return mapRow(rs); }
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.getByUserId] " + e.getMessage());
            throw new DAOException("Failed to retrieve doctor userId=" + userId, e);
        }
        return null;
    }

    @Override
    public List<Doctor> getByDepartment(int departmentId) {
        List<Doctor> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_DEPT)) {
            ps.setInt(1, departmentId);
            try (ResultSet rs = ps.executeQuery()) { while (rs.next()) list.add(mapRow(rs)); }
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.getByDepartment] " + e.getMessage());
            throw new DAOException("Failed to retrieve doctors for dept=" + departmentId, e);
        }
        return list;
    }

    @Override
    public int insert(Doctor d) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1,    d.getUserId());
            ps.setString(2, d.getFirstName());
            ps.setString(3, d.getLastName());
            ps.setString(4, d.getEmail());
            ps.setString(5, d.getPhone());
            ps.setString(6, d.getSpecialization());
            ps.setInt(7,    d.getDepartmentId());
            ps.setString(8, d.getQualification());
            ps.setInt(9,    d.getExperience());
            ps.setBigDecimal(10, d.getConsultationFee());
            ps.setString(11, d.getAvailableDays());
            ps.setString(12, d.getAvailableFrom());
            ps.setString(13, d.getAvailableTo());
            ps.setBigDecimal(14, d.getRating());
            ps.setBoolean(15, d.isActive());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Insert doctor succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert doctor: " + d.getFirstName(), e);
        }
    }

    @Override
    public int update(Doctor d) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setString(1, d.getFirstName());
            ps.setString(2, d.getLastName());
            ps.setString(3, d.getEmail());
            ps.setString(4, d.getPhone());
            ps.setString(5, d.getSpecialization());
            ps.setInt(6,    d.getDepartmentId());
            ps.setString(7, d.getQualification());
            ps.setInt(8,    d.getExperience());
            ps.setBigDecimal(9, d.getConsultationFee());
            ps.setString(10, d.getAvailableDays());
            ps.setString(11, d.getAvailableFrom());
            ps.setString(12, d.getAvailableTo());
            ps.setBigDecimal(13, d.getRating());
            ps.setBoolean(14, d.isActive());
            ps.setInt(15, d.getDoctorId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update doctor id=" + d.getDoctorId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[DoctorDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete doctor id=" + id, e);
        }
    }
}
