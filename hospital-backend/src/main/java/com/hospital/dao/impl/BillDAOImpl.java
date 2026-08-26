package com.hospital.dao.impl;

import com.hospital.dao.BillDAO;
import com.hospital.dao.DAOException;
import com.hospital.model.Bill;
import com.hospital.util.DBConnection;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * BillDAOImpl
 *
 * JDBC implementation of {@link BillDAO}.
 *
 * Rules enforced here:
 *   - Every query uses PreparedStatement — no string concatenation.
 *   - Every Connection/Statement/ResultSet is closed via try-with-resources.
 *   - SQLExceptions are caught, logged to stderr, and rethrown as DAOException.
 *   - No business logic, no session checks — pure DB I/O only.
 *
 * SQL column ↔ Java field mapping:
 *   bill_id          ↔ billId
 *   patient_id       ↔ patientId
 *   appointment_id   ↔ appointmentId   (nullable)
 *   admission_id     ↔ admissionId     (nullable)
 *   consultation_fee ↔ consultationFee
 *   medicine_charges ↔ medicineCharges
 *   lab_charges      ↔ labCharges
 *   room_charges     ↔ roomCharges
 *   other_charges    ↔ otherCharges
 *   discount         ↔ discount
 *   tax              ↔ tax
 *   total_amount     ↔ totalAmount
 *   paid_amount      ↔ paidAmount
 *   payment_status   ↔ paymentStatus   ('unpaid'|'partial'|'paid')
 *   payment_method   ↔ paymentMethod   ('cash'|'card'|'upi'|'insurance')
 *   issued_at        ↔ issuedAt
 *   updated_at       ↔ updatedAt
 */
public class BillDAOImpl implements BillDAO {

    // ── SQL constants ────────────────────────────────────────────────────────

    private static final String SQL_COLS =
            "bill_id, patient_id, appointment_id, admission_id, " +
            "consultation_fee, medicine_charges, lab_charges, room_charges, " +
            "other_charges, discount, tax, total_amount, paid_amount, " +
            "payment_status, payment_method, issued_at, updated_at";

    private static final String SQL_GET_ALL =
            "SELECT " + SQL_COLS + " FROM bills ORDER BY bill_id ASC";

    private static final String SQL_GET_BY_ID =
            "SELECT " + SQL_COLS + " FROM bills WHERE bill_id = ?";

    private static final String SQL_GET_BY_PATIENT_ID =
            "SELECT " + SQL_COLS + " FROM bills WHERE patient_id = ? ORDER BY issued_at DESC";

    private static final String SQL_INSERT =
            "INSERT INTO bills " +
            "  (patient_id, appointment_id, admission_id, consultation_fee, medicine_charges, " +
            "   lab_charges, room_charges, other_charges, discount, tax, total_amount, " +
            "   paid_amount, payment_status, payment_method) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_UPDATE =
            "UPDATE bills SET " +
            "  patient_id = ?, appointment_id = ?, admission_id = ?, " +
            "  consultation_fee = ?, medicine_charges = ?, lab_charges = ?, room_charges = ?, " +
            "  other_charges = ?, discount = ?, tax = ?, total_amount = ?, paid_amount = ?, " +
            "  payment_status = ?, payment_method = ?, updated_at = NOW() " +
            "WHERE bill_id = ?";

    private static final String SQL_DELETE =
            "DELETE FROM bills WHERE bill_id = ?";

    private static final String SQL_UPDATE_PAYMENT_STATUS =
            "UPDATE bills SET payment_status = ?, updated_at = NOW() WHERE bill_id = ?";

    // ── Helper: map a ResultSet row → Bill object ────────────────────────────

    /**
     * Extracts all columns from the current ResultSet row into a Bill object.
     * Handles nullable FK columns (appointment_id, admission_id) via getObject().
     */
    private Bill mapRow(ResultSet rs) throws SQLException {
        Bill b = new Bill();
        b.setBillId(rs.getInt("bill_id"));
        b.setPatientId(rs.getInt("patient_id"));

        // Nullable FK columns — use getObject to detect SQL NULL
        int appointmentId = rs.getInt("appointment_id");
        b.setAppointmentId(rs.wasNull() ? null : appointmentId);

        int admissionId = rs.getInt("admission_id");
        b.setAdmissionId(rs.wasNull() ? null : admissionId);

        b.setConsultationFee(rs.getBigDecimal("consultation_fee"));
        b.setMedicineCharges(rs.getBigDecimal("medicine_charges"));
        b.setLabCharges(rs.getBigDecimal("lab_charges"));
        b.setRoomCharges(rs.getBigDecimal("room_charges"));
        b.setOtherCharges(rs.getBigDecimal("other_charges"));
        b.setDiscount(rs.getBigDecimal("discount"));
        b.setTax(rs.getBigDecimal("tax"));
        b.setTotalAmount(rs.getBigDecimal("total_amount"));
        b.setPaidAmount(rs.getBigDecimal("paid_amount"));
        b.setPaymentStatus(rs.getString("payment_status"));
        b.setPaymentMethod(rs.getString("payment_method"));
        b.setIssuedAt(rs.getTimestamp("issued_at"));
        b.setUpdatedAt(rs.getTimestamp("updated_at"));
        return b;
    }

    /** Null-safe helper: sets a nullable Integer FK on a PreparedStatement. */
    private void setNullableInt(PreparedStatement ps, int paramIndex, Integer value)
            throws SQLException {
        if (value != null) {
            ps.setInt(paramIndex, value);
        } else {
            ps.setNull(paramIndex, Types.INTEGER);
        }
    }

    /** Null-safe helper: sets a nullable BigDecimal on a PreparedStatement (defaults to 0). */
    private void setDecimal(PreparedStatement ps, int paramIndex, BigDecimal value)
            throws SQLException {
        ps.setBigDecimal(paramIndex, value != null ? value : BigDecimal.ZERO);
    }

    // ── DAO method implementations ───────────────────────────────────────────

    @Override
    public List<Bill> getAll() {
        List<Bill> bills = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                bills.add(mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.getAll] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve all bills", e);
        }
        return bills;
    }

    @Override
    public Bill getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.getById] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve bill with id=" + id, e);
        }
        return null;
    }

    @Override
    public List<Bill> getByPatientId(int patientId) {
        List<Bill> bills = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_PATIENT_ID)) {

            ps.setInt(1, patientId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) bills.add(mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.getByPatientId] SQLException: " + e.getMessage());
            throw new DAOException("Failed to retrieve bills for patientId=" + patientId, e);
        }
        return bills;
    }

    @Override
    public int insert(Bill b) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT,
                     Statement.RETURN_GENERATED_KEYS)) {

            ps.setInt(1, b.getPatientId());
            setNullableInt(ps, 2, b.getAppointmentId());
            setNullableInt(ps, 3, b.getAdmissionId());
            setDecimal(ps, 4, b.getConsultationFee());
            setDecimal(ps, 5, b.getMedicineCharges());
            setDecimal(ps, 6, b.getLabCharges());
            setDecimal(ps, 7, b.getRoomCharges());
            setDecimal(ps, 8, b.getOtherCharges());
            setDecimal(ps, 9, b.getDiscount());
            setDecimal(ps, 10, b.getTax());
            setDecimal(ps, 11, b.getTotalAmount());
            setDecimal(ps, 12, b.getPaidAmount());
            ps.setString(13, b.getPaymentStatus() != null ? b.getPaymentStatus() : "unpaid");
            ps.setString(14, b.getPaymentMethod());

            int rows = ps.executeUpdate();
            if (rows == 0) throw new DAOException("Insert bill failed — no rows affected");

            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Insert bill succeeded but no generated key returned");

        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.insert] SQLException: " + e.getMessage());
            throw new DAOException("Failed to insert bill for patientId=" + b.getPatientId(), e);
        }
    }

    @Override
    public int update(Bill b) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {

            ps.setInt(1, b.getPatientId());
            setNullableInt(ps, 2, b.getAppointmentId());
            setNullableInt(ps, 3, b.getAdmissionId());
            setDecimal(ps, 4, b.getConsultationFee());
            setDecimal(ps, 5, b.getMedicineCharges());
            setDecimal(ps, 6, b.getLabCharges());
            setDecimal(ps, 7, b.getRoomCharges());
            setDecimal(ps, 8, b.getOtherCharges());
            setDecimal(ps, 9, b.getDiscount());
            setDecimal(ps, 10, b.getTax());
            setDecimal(ps, 11, b.getTotalAmount());
            setDecimal(ps, 12, b.getPaidAmount());
            ps.setString(13, b.getPaymentStatus());
            ps.setString(14, b.getPaymentMethod());
            ps.setInt(15, b.getBillId());   // WHERE clause

            return ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.update] SQLException: " + e.getMessage());
            throw new DAOException("Failed to update bill with id=" + b.getBillId(), e);
        }
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {

            ps.setInt(1, id);
            return ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.delete] SQLException: " + e.getMessage());
            throw new DAOException("Failed to delete bill with id=" + id, e);
        }
    }

    @Override
    public int updatePaymentStatus(int id, String status) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE_PAYMENT_STATUS)) {

            ps.setString(1, status);
            ps.setInt(2, id);
            return ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("[BillDAOImpl.updatePaymentStatus] SQLException: " + e.getMessage());
            throw new DAOException("Failed to update payment status for bill id=" + id, e);
        }
    }
}
