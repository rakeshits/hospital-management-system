package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.RoomDAO;
import com.hospital.model.Room;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RoomDAOImpl implements RoomDAO {

    private static final String COLS =
        "room_id, room_number, room_type, department_id, capacity, occupied, price_per_day, is_available, floor_number, created_at";

    private static final String SQL_GET_ALL   = "SELECT " + COLS + " FROM rooms ORDER BY room_id ASC";
    private static final String SQL_GET_BY_ID = "SELECT " + COLS + " FROM rooms WHERE room_id = ?";
    private static final String SQL_INSERT    =
        "INSERT INTO rooms (room_number, room_type, department_id, capacity, occupied, price_per_day, is_available, floor_number) " +
        "VALUES (?,?,?,?,?,?,?,?)";
    private static final String SQL_UPDATE    =
        "UPDATE rooms SET room_number=?, room_type=?, department_id=?, capacity=?, occupied=?, price_per_day=?, is_available=?, floor_number=? " +
        "WHERE room_id=?";
    private static final String SQL_DELETE    = "DELETE FROM rooms WHERE room_id=?";

    private Room mapRow(ResultSet rs) throws SQLException {
        Room r = new Room();
        r.setRoomId(rs.getInt("room_id"));
        r.setRoomNumber(rs.getString("room_number"));
        r.setRoomType(rs.getString("room_type"));
        r.setDepartmentId(rs.getInt("department_id"));
        r.setCapacity(rs.getInt("capacity"));
        r.setOccupied(rs.getInt("occupied"));
        r.setPricePerDay(rs.getBigDecimal("price_per_day"));
        r.setAvailable(rs.getBoolean("is_available"));
        int fl = rs.getInt("floor_number");
        r.setFloorNumber(rs.wasNull() ? null : fl);
        r.setCreatedAt(rs.getTimestamp("created_at"));
        return r;
    }

    @Override
    public List<Room> getAll() {
        List<Room> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) list.add(mapRow(rs));
        } catch (SQLException e) {
            System.err.println("[RoomDAOImpl.getAll] " + e.getMessage());
            throw new DAOException("Failed to retrieve rooms", e);
        }
        return list;
    }

    @Override
    public Room getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return mapRow(rs); }
        } catch (SQLException e) {
            System.err.println("[RoomDAOImpl.getById] " + e.getMessage());
            throw new DAOException("Failed to retrieve room id=" + id, e);
        }
        return null;
    }

    @Override
    public int insert(Room r) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, r.getRoomNumber());
            ps.setString(2, r.getRoomType());
            ps.setInt(3,    r.getDepartmentId());
            ps.setInt(4,    r.getCapacity());
            ps.setInt(5,    r.getOccupied());
            ps.setBigDecimal(6, r.getPricePerDay());
            ps.setBoolean(7, r.isAvailable());
            if (r.getFloorNumber() != null) ps.setInt(8, r.getFloorNumber()); else ps.setNull(8, Types.INTEGER);
            ps.executeUpdate();
            try (ResultSet keys = ps.getGeneratedKeys()) { if (keys.next()) return keys.getInt(1); }
            throw new DAOException("Insert room succeeded but no key returned");
        } catch (SQLException e) {
            System.err.println("[RoomDAOImpl.insert] " + e.getMessage());
            throw new DAOException("Failed to insert room: " + r.getRoomNumber(), e);
        }
    }

    @Override
    public int update(Room r) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            ps.setString(1, r.getRoomNumber());
            ps.setString(2, r.getRoomType());
            ps.setInt(3,    r.getDepartmentId());
            ps.setInt(4,    r.getCapacity());
            ps.setInt(5,    r.getOccupied());
            ps.setBigDecimal(6, r.getPricePerDay());
            ps.setBoolean(7, r.isAvailable());
            if (r.getFloorNumber() != null) ps.setInt(8, r.getFloorNumber()); else ps.setNull(8, Types.INTEGER);
            ps.setInt(9, r.getRoomId());
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[RoomDAOImpl.update] " + e.getMessage());
            throw new DAOException("Failed to update room id=" + r.getRoomId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            System.err.println("[RoomDAOImpl.delete] " + e.getMessage());
            throw new DAOException("Failed to delete room id=" + id, e);
        }
    }
}
