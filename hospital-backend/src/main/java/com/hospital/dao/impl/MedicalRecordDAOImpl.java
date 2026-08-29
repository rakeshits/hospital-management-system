package com.hospital.dao.impl;

import com.hospital.dao.DAOException;
import com.hospital.dao.MedicalRecordDAO;
import com.hospital.model.MedicalRecord;
import com.hospital.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

public class MedicalRecordDAOImpl implements MedicalRecordDAO {

    private static final String COLUMNS =
            "record_id, patient_id, doctor_id, appointment_id, diagnosis, treatment, notes, visit_date";
    private static final String SQL_GET_ALL =
            "SELECT " + COLUMNS + " FROM medical_records ORDER BY visit_date DESC, record_id DESC";
    private static final String SQL_GET_BY_ID =
            "SELECT " + COLUMNS + " FROM medical_records WHERE record_id = ?";
    private static final String SQL_GET_BY_PATIENT_ID =
            "SELECT " + COLUMNS + " FROM medical_records WHERE patient_id = ? ORDER BY visit_date DESC, record_id DESC";
    private static final String SQL_GET_BY_DOCTOR_ID =
            "SELECT " + COLUMNS + " FROM medical_records WHERE doctor_id = ? ORDER BY visit_date DESC, record_id DESC";
    private static final String SQL_INSERT =
            "INSERT INTO medical_records " +
            "(patient_id, doctor_id, appointment_id, diagnosis, treatment, notes, visit_date) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?)";
    private static final String SQL_UPDATE =
            "UPDATE medical_records SET patient_id = ?, doctor_id = ?, appointment_id = ?, " +
            "diagnosis = ?, treatment = ?, notes = ?, visit_date = ? WHERE record_id = ?";
    private static final String SQL_DELETE =
            "DELETE FROM medical_records WHERE record_id = ?";

    private MedicalRecord mapRow(ResultSet rs) throws SQLException {
        MedicalRecord record = new MedicalRecord();
        record.setRecordId(rs.getInt("record_id"));
        record.setPatientId(getNullableInt(rs, "patient_id"));
        record.setDoctorId(getNullableInt(rs, "doctor_id"));
        record.setAppointmentId(getNullableInt(rs, "appointment_id"));
        record.setDiagnosis(rs.getString("diagnosis"));
        record.setTreatment(rs.getString("treatment"));
        record.setNotes(rs.getString("notes"));
        record.setVisitDate(rs.getDate("visit_date"));
        return record;
    }

    private Integer getNullableInt(ResultSet rs, String column) throws SQLException {
        int value = rs.getInt(column);
        return rs.wasNull() ? null : value;
    }

    private List<MedicalRecord> queryList(String sql, int id, String operation) {
        List<MedicalRecord> records = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) records.add(mapRow(rs));
            }
        } catch (SQLException e) {
            throw new DAOException("Failed to " + operation, e);
        }
        return records;
    }

    @Override
    public List<MedicalRecord> getAll() {
        List<MedicalRecord> records = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_ALL);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) records.add(mapRow(rs));
        } catch (SQLException e) {
            throw new DAOException("Failed to retrieve medical records", e);
        }
        return records;
    }

    @Override
    public MedicalRecord getById(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_GET_BY_ID)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) return mapRow(rs);
            }
        } catch (SQLException e) {
            throw new DAOException("Failed to retrieve medical record with id=" + id, e);
        }
        return null;
    }

    @Override
    public List<MedicalRecord> getByPatientId(int patientId) {
        return queryList(SQL_GET_BY_PATIENT_ID, patientId,
                "retrieve medical records for patientId=" + patientId);
    }

    @Override
    public List<MedicalRecord> getByDoctorId(int doctorId) {
        return queryList(SQL_GET_BY_DOCTOR_ID, doctorId,
                "retrieve medical records for doctorId=" + doctorId);
    }

    @Override
    public int insert(MedicalRecord record) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_INSERT, Statement.RETURN_GENERATED_KEYS)) {
            setValues(ps, record, false);
            if (ps.executeUpdate() == 0) {
                throw new DAOException("Medical record insert affected no rows");
            }
            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) return keys.getInt(1);
            }
            throw new DAOException("Medical record inserted without a generated id");
        } catch (SQLException e) {
            throw new DAOException("Failed to insert medical record", e);
        }
    }

    @Override
    public int update(MedicalRecord record) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_UPDATE)) {
            setValues(ps, record, true);
            return ps.executeUpdate();
        } catch (SQLException e) {
            throw new DAOException("Failed to update medical record with id=" + record.getRecordId(), e);
        }
    }

    private void setValues(PreparedStatement ps, MedicalRecord record, boolean includeId)
            throws SQLException {
        setNullableInt(ps, 1, record.getPatientId());
        setNullableInt(ps, 2, record.getDoctorId());
        setNullableInt(ps, 3, record.getAppointmentId());
        ps.setString(4, record.getDiagnosis());
        ps.setString(5, record.getTreatment());
        ps.setString(6, record.getNotes());
        ps.setDate(7, record.getVisitDate());
        if (includeId) ps.setInt(8, record.getRecordId());
    }

    private void setNullableInt(PreparedStatement ps, int index, Integer value)
            throws SQLException {
        if (value == null) ps.setNull(index, Types.INTEGER);
        else ps.setInt(index, value);
    }

    @Override
    public int delete(int id) {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(SQL_DELETE)) {
            ps.setInt(1, id);
            return ps.executeUpdate();
        } catch (SQLException e) {
            throw new DAOException("Failed to delete medical record with id=" + id, e);
        }
    }
}
