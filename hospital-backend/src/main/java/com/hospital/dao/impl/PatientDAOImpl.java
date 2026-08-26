package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.PatientDAO;
import com.hospital.model.Patient;
import com.hospital.util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * PatientDAOImpl
 *
 * JDBC implementation of {@link PatientDAO}.
 *
 * Rules enforced here:
 *   - Every query uses PreparedStatement — no string concatenation.
 *   - Every Connection/Statement/ResultSet is closed via try-with-resources.
 *   - SQLExceptions are caught, logged to stderr, and rethrown as DAOException.
 *   - No business logic, no session checks — pure DB I/O only.
 *
 * SQL column ↔ Java field mapping:
 *   patient_id       ↔ patientId
 *   user_id          ↔ userId
 *   first_name       ↔ firstName
 *   last_name        ↔ lastName
 *   email            ↔ email
 *   phone            ↔ phone
 *   dob              ↔ dob
 *   gender           ↔ gender
 *   blood_group      ↔ bloodGroup
 *   address          ↔ address
 *   city             ↔ city
 *   pincode          ↔ pincode
 *   emergency_name   ↔ emergencyName
 *   emergency_phone  ↔ emergencyPhone
 *   allergies        ↔ allergies
 *   created_at       ↔ createdAt
 *   updated_at       ↔ updatedAt
 */
public class PatientDAOImpl implements PatientDAO {

    // ── SQL constants ────────────────────────────────────────────────────────

    private static final String SQL_GET_ALL =
            "SELECT patient_id, user_id, first_name, last_name, email, phone, " +
            "       dob, gender, blood_group, address, city, pincode, " +
            "       emergency_name, emergency_phone, allergies, created_at, updated_at " +
            "FROM patients " +
            "ORDER BY patient_id ASC";

    private static final String SQL_GET_BY_ID =
            "SELECT patient_id, user_id, first_name, last_name, email, phone, " +
            "       dob, gender, blood_group, address, city, pincode, " +
            "       emergency_name, emergency_phone, allergies, created_at, updated_at " +
            "FROM patients " +
            "WHERE patient_id = ?";

    private static final String SQL_GET_BY_USER_ID =
            "SELECT patient_id, user_id, first_name, last_name, email, phone, " +
            "       dob, gender, blood_group, address, city, pincode, " +
            "       emergency_name, emergency_phone, allergies, created_at, updated_at " +
            "FROM patients " +
            "WHERE user_id = ?";

    private static final String SQL_INSERT =
            "INSERT INTO patients " +
            "  (user_id, first_name, last_name, email, phone, dob, gender, " +
            "   blood_group, address, city, pincode, emergency_name, emergency_phone, allergies) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
            "UPDATE patients SET " +
            "  first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, " +
            "  gender = ?, blood_group = ?, address = ?, city = ?, pincode = ?, " +
            "  emergency_name = ?, emergency_phone = ?, allergies = ?, updated_at = NOW() " +
            "WHERE patient_id = ?";

    private static final String SQL_DELETE =
            "DELETE FROM patients WHERE patient_id = ?";

    // ── Helper: map a ResultSet row → Patient object ─────────────────────────

    /**
     * Extracts all columns from the current ResultSet row into a Patient object.
     * Called by every query method — single place to update if columns change.
     */
    private Patient mapRow(ResultSet rs) throws SQLException {
        Patient p = new Patient();
        p.setPatientId(rs.getInt("patient_id"));
        p.setUserId(rs.getInt("user_id"));
        p.setFirstName(rs.getString("first_name"));
        p.setLastName(rs.getString("last_name"));
        p.setEmail(rs.getString("email"));
        p.setPhone(rs.getString("phone"));
        p.setDob(rs.getDate("dob"));
        p.setGender(rs.getString("gender"));
        p.setBloodGroup(rs.getString("blood_group"));
        p.setAddress(rs.getString("address"));
        p.setCity(rs.getString("city"));
        p.setPincode(rs.getString("pincode"));
        p.setEmergencyName(rs.getString("emergency_name"));
        p.setEmergencyPhone(rs.getString("emergency_phone"));
        p.setAllergies(rs.getString("allergies"));
        p.setCreatedAt(rs.getTimestamp("created_at"));
        p.setUpdatedAt(rs.getTimestamp("updated_at"));
        return p;
    }

    // ── DAO method implementations ───────────────────────────────────────────

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Patient> getAll() {
        List<Patient> patients = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                patients.add(mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.getAll] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve all patients", e);
        }
        return patients;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Patient getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.getById] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve patient with id=" + id, e);
        }
        return null;  // not found
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Patient getByUserId(int userId) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_USER_ID)) {

            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return mapRow(rs);
                }
            }
        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.getByUserId] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve patient for userId=" + userId, e);
        }
        return null;  // not found
    }

    /**
     * {@inheritDoc}
     *
     * Uses Statement.RETURN_GENERATED_KEYS to capture the auto-incremented patient_id.
     */
    @Override
    public int insert(Patient p) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT,
                     Statement.RETURN_GENERATED_KEYS)) {

            ps.setInt(1,    p.getUserId());
            ps.setString(2, p.getFirstName());
            ps.setString(3, p.getLastName());
            ps.setString(4, p.getEmail());
            ps.setString(5, p.getPhone());
            ps.setDate(6,   p.getDob());                    // java.sql.Date
            ps.setString(7, p.getGender());
            ps.setString(8, p.getBloodGroup());
            ps.setString(9, p.getAddress());
            ps.setString(10, p.getCity());
            ps.setString(11, p.getPincode());
            ps.setString(12, p.getEmergencyName());
            ps.setString(13, p.getEmergencyPhone());
            ps.setString(14, p.getAllergies());

            int affectedRows = ps.executeUpdate();
            if (affectedRows == 0) {
                throw new DAOException("Insert failed — no rows affected for patient: "
                        + p.getFirstName() + " " + p.getLastName());
            }

            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) {
                    return keys.getInt(1);   // return the generated patient_id
                }
            }
            throw new DAOException("Insert succeeded but no generated key returned");

        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.insert] SQLException: " + e.getMessage());
            throw new DAOException("Failed to insert patient: " + p.getFirstName(), e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int update(Patient p) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {

            ps.setString(1,  p.getFirstName());
            ps.setString(2,  p.getLastName());
            ps.setString(3,  p.getEmail());
            ps.setString(4,  p.getPhone());
            ps.setDate(5,    p.getDob());
            ps.setString(6,  p.getGender());
            ps.setString(7,  p.getBloodGroup());
            ps.setString(8,  p.getAddress());
            ps.setString(9,  p.getCity());
            ps.setString(10, p.getPincode());
            ps.setString(11, p.getEmergencyName());
            ps.setString(12, p.getEmergencyPhone());
            ps.setString(13, p.getAllergies());
            ps.setInt(14,    p.getPatientId());   // WHERE clause

            return ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.update] SQLException: " + e.getMessage());
            throw new DAOException("Failed to update patient with id=" + p.getPatientId(), e);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {

            ps.setInt(1, id);
            return ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("[PatientDAOImpl.delete] SQLException: " + e.getMessage());
            throw new DAOException("Failed to delete patient with id=" + id, e);
        }
    }
}
