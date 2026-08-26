package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.UserDAO;
import com.hospital.model.User;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAOImpl implements UserDAO {

    private static final String COLS =
        "u.user_id, u.username, u.email, u.password_hash, u.role_id, " +
        "u.is_active, u.last_login_at, u.created_at, u.updated_at";

    private static final String SQL_GET_ALL =
        "SELECT " + COLS + " FROM users u ORDER BY u.user_id ASC";

    private static final String SQL_GET_BY_ID =
        "SELECT " + COLS + " FROM users u WHERE u.user_id = ?";

    private static final String SQL_GET_BY_EMAIL =
        "SELECT " + COLS + " FROM users u WHERE u.email = ?";

    private static final String SQL_GET_BY_USERNAME =
        "SELECT " + COLS + " FROM users u WHERE u.username = ?";

    private static final String SQL_GET_BY_ROLE =
        "SELECT " + COLS + " FROM users u " +
        "JOIN roles r ON u.role_id = r.role_id " +
        "WHERE r.name = ? ORDER BY u.user_id ASC";

    private static final String SQL_INSERT =
        "INSERT INTO users (username, email, password_hash, role_id, is_active) " +
        "VALUES (?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
        "UPDATE users SET username = ?, email = ?, role_id = ?, is_active = ?, updated_at = NOW() " +
        "WHERE user_id = ?";

    private static final String SQL_DELETE =
        "DELETE FROM users WHERE user_id = ?";

    private static final String SQL_SET_ACTIVE =
        "UPDATE users SET is_active = ?, updated_at = NOW() WHERE user_id = ?";

    private static final String SQL_UPDATE_LAST_LOGIN =
        "UPDATE users SET last_login_at = NOW() WHERE user_id = ?";

    private User mapRow(ResultSet rs) throws SQLException {
        User u = new User();
        u.setUserId(rs.getInt("user_id"));
        u.setUsername(rs.getString("username"));
        u.setEmail(rs.getString("email"));
        u.setPasswordHash(rs.getString("password_hash"));
        u.setRoleId(rs.getInt("role_id"));
        u.setActive(rs.getBoolean("is_active"));
        u.setLastLoginAt(rs.getTimestamp("last_login_at"));
        u.setCreatedAt(rs.getTimestamp("created_at"));
        u.setUpdatedAt(rs.getTimestamp("updated_at"));
        return u;
    }

    @Override
    public List<User> getAll() {
        List<User> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve users", e);
        }
        return list;
    }

    @Override
    public User getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve user id=" + id, e);
        }
        return null;
    }

    @Override
    public User getByEmail(String email) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_EMAIL)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.getByEmail] " + e.getMessage());
            throw new DAOException("Failed to retrieve user email=" + email, e);
        }
        return null;
    }

    @Override
    public User getByUsername(String username) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_USERNAME)) {
            ps.setString(1, username);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.getByUsername] " + e.getMessage());
            throw new DAOException("Failed to retrieve user username=" + username, e);
        }
        return null;
    }

    @Override
    public List<User> getByRole(String roleName) {
        List<User> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ROLE)) {
            ps.setString(1, roleName);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) list.add(mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.getByRole] " + e.getMessage());
            throw new DAOException("Failed to retrieve users by role=" + roleName, e);
        }
        return list;
    }

    @Override
    public int insert(User user) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPasswordHash());
            ps.setInt(4,    user.getRoleId());
            ps.setBoolean(5, user.isActive());
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Insert user succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert user: " + user.getEmail(), e);
        }
    }

    @Override
    public int update(User user) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setInt(3,    user.getRoleId());
            ps.setBoolean(4, user.isActive());
            ps.setInt(5,    user.getUserId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update user id=" + user.getUserId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete user id=" + id, e);
        }
    }

    @Override
    public int setActive(int userId, boolean active) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_SET_ACTIVE)) {
            ps.setBoolean(1, active);
            ps.setInt(2, userId);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.setActive] " + e.getMessage());
            throw new DAOException("Failed to set active for user id=" + userId, e);
        }
    }

    @Override
    public int updateLastLogin(int userId) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE_LAST_LOGIN)) {
            ps.setInt(1, userId);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[UserDAOImpl.updateLastLogin] " + e.getMessage());
            throw new DAOException("Failed to update last_login for user id=" + userId, e);
        }
    }
}
