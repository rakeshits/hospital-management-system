package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.DepartmentDAO;
import com.hospital.model.Department;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DepartmentDAOImpl implements DepartmentDAO {

    private static final String SQL_GET_ALL =
        "SELECT department_id, name, description, head_doctor_id, floor_number, phone, is_active, created_at " +
        "FROM departments ORDER BY department_id ASC";

    private static final String SQL_GET_BY_ID =
        "SELECT department_id, name, description, head_doctor_id, floor_number, phone, is_active, created_at " +
        "FROM departments WHERE department_id = ?";

    private static final String SQL_INSERT =
        "INSERT INTO departments (name, description, head_doctor_id, floor_number, phone, is_active) " +
        "VALUES (?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
        "UPDATE departments SET name=?, description=?, head_doctor_id=?, floor_number=?, phone=?, is_active=? " +
        "WHERE department_id=?";

    private static final String SQL_DELETE =
        "DELETE FROM departments WHERE department_id=?";

    private Department mapRow(ResultSet rs) throws SQLException {
        Department d = new Department();
        d.setDepartmentId(rs.getInt("department_id"));
        d.setName(rs.getString("name"));
        d.setDescription(rs.getString("description"));
        int hd = rs.getInt("head_doctor_id");
        d.setHeadDoctorId(rs.wasNull() ? null : hd);
        int fl = rs.getInt("floor_number");
        d.setFloorNumber(rs.wasNull() ? null : fl);
        d.setPhone(rs.getString("phone"));
        d.setActive(rs.getBoolean("is_active"));
        d.setCreatedAt(rs.getTimestamp("created_at"));
        return d;
    }

    @Override
    public List<Department> getAll() {
        List<Department> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[DepartmentDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve departments", e);
        }
        return list;
    }

    @Override
    public Department getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[DepartmentDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve department id=" + id, e);
        }
        return null;
    }

    @Override
    public int insert(Department d) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, d.getName());
            ps.setString(2, d.getDescription());
            if (d.getHeadDoctorId() != null) ps.setInt(3, d.getHeadDoctorId()); else ps.setNull(3, Types.INTEGER);
            if (d.getFloorNumber()  != null) ps.setInt(4, d.getFloorNumber());  else ps.setNull(4, Types.INTEGER);
            ps.setString(5, d.getPhone());
            ps.setBoolean(6, d.isActive());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Insert department succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[DepartmentDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert department: " + d.getName(), e);
        }
    }

    @Override
    public int update(Department d) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setString(1, d.getName());
            ps.setString(2, d.getDescription());
            if (d.getHeadDoctorId() != null) ps.setInt(3, d.getHeadDoctorId()); else ps.setNull(3, Types.INTEGER);
            if (d.getFloorNumber()  != null) ps.setInt(4, d.getFloorNumber());  else ps.setNull(4, Types.INTEGER);
            ps.setString(5, d.getPhone());
            ps.setBoolean(6, d.isActive());
            ps.setInt(7, d.getDepartmentId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[DepartmentDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update department id=" + d.getDepartmentId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[DepartmentDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete department id=" + id, e);
        }
    }
}
