package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.RoleDAO;
import com.hospital.model.Role;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RoleDAOImpl implements RoleDAO {

    private static final String SQL_GET_ALL    = "SELECT role_id, name, description, created_at FROM roles ORDER BY role_id ASC";
    private static final String SQL_GET_BY_ID  = "SELECT role_id, name, description, created_at FROM roles WHERE role_id = ?";
    private static final String SQL_GET_BY_NAME= "SELECT role_id, name, description, created_at FROM roles WHERE name = ?";
    private static final String SQL_INSERT     = "INSERT INTO roles (name, description) VALUES (?, ?)";
    private static final String SQL_UPDATE     = "UPDATE roles SET name = ?, description = ? WHERE role_id = ?";
    private static final String SQL_DELETE     = "DELETE FROM roles WHERE role_id = ?";

    private Role mapRow(ResultSet rs) throws SQLException {
        Role r = new Role();
        r.setRoleId(rs.getInt("role_id"));
        r.setName(rs.getString("name"));
        r.setDescription(rs.getString("description"));
        r.setCreatedAt(rs.getTimestamp("created_at"));
        return r;
    }

    @Override
    public List<Role> getAll() {
        List<Role> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve roles", e);
        }
        return list;
    }

    @Override
    public Role getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve role id=" + id, e);
        }
        return null;
    }

    @Override
    public Role getByName(String name) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_NAME)) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.getByName] " + e.getMessage());
            throw new DAOException("Failed to retrieve role name=" + name, e);
        }
        return null;
    }

    @Override
    public int insert(Role role) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, role.getName());
            ps.setString(2, role.getDescription());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Insert role succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert role: " + role.getName(), e);
        }
    }

    @Override
    public int update(Role role) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setString(1, role.getName());
            ps.setString(2, role.getDescription());
            ps.setInt(3, role.getRoleId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update role id=" + role.getRoleId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[RoleDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete role id=" + id, e);
        }
    }
}
