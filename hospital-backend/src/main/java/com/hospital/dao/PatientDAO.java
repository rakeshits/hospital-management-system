package com.hospital.dao;

import com.hospital.model.Patient;
import java.util.List;

/**
 * PatientDAO
 *
 * Interface defining the contract for all patient-related database operations.
 * The concrete implementation lives in {@link com.hospital.dao.impl.PatientDAOImpl}.
 *
 * Rules:
 *   - No SQL, no JDBC, no business logic here — signatures only.
 *   - All methods throw {@link DAOException} (unchecked) on DB failure.
 *   - Servlets call this interface; they never instantiate DAOImpl directly
 *     (swap implementation without touching controllers).
 */
public interface PatientDAO {

    /**
     * Returns all patient records ordered by patient_id ascending.
     *
     * @return list of all patients; empty list if none exist
     * @throws DAOException on any DB error
     */
    List<Patient> getAll();

    /**
     * Returns the patient with the given primary key.
     *
     * @param id the patient_id
     * @return the matching {@link Patient}, or {@code null} if not found
     * @throws DAOException on any DB error
     */
    Patient getById(int id);

    /**
     * Returns the patient record linked to the given user account.
     * Used to resolve the logged-in user's patient profile from their session userId.
     *
     * @param userId the user_id foreign key
     * @return the matching {@link Patient}, or {@code null} if not found
     * @throws DAOException on any DB error
     */
    Patient getByUserId(int userId);

    /**
     * Inserts a new patient record and returns the generated patient_id.
     *
     * @param patient the patient to insert (patientId is ignored — DB auto-generates it)
     * @return the generated patient_id
     * @throws DAOException on any DB error or constraint violation
     */
    int insert(Patient patient);

    /**
     * Updates an existing patient record identified by {@code patient.getPatientId()}.
     *
     * @param patient the patient with updated field values
     * @return number of rows affected (1 on success, 0 if not found)
     * @throws DAOException on any DB error
     */
    int update(Patient patient);

    /**
     * Deletes the patient record with the given primary key.
     *
     * @param id the patient_id to delete
     * @return number of rows affected (1 on success, 0 if not found)
     * @throws DAOException on any DB error
     */
    int delete(int id);
}
