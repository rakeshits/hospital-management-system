import PatientDAO from '../PatientDAO.js';
import Patient    from '../../entity/Patient.js';

/**
 * Concrete implementation of PatientDAO.
 *
 * This class contains all actual database query logic for the `patients` table.
 * Replace the stub bodies below with real DB client calls (e.g. mysql2, pg, etc.)
 * when connecting the backend.
 *
 * Controllers call this class via the PatientDAO interface — never directly.
 */
export default class PatientDAOImpl extends PatientDAO {
  /** @param {import('some-db-client')} dbClient - injected DB connection */
  constructor(dbClient) {
    super();
    this.db = dbClient;
  }

  async getAll() {
    // TODO: const rows = await this.db.query('SELECT * FROM patients ORDER BY created_at DESC');
    // return rows.map(r => new Patient(r));
    throw new Error('PatientDAOImpl.getAll() — DB not connected yet');
  }

  async getById(id) {
    // TODO: const [row] = await this.db.query('SELECT * FROM patients WHERE patient_id = ?', [id]);
    // return row ? new Patient(row) : null;
    throw new Error('PatientDAOImpl.getById() — DB not connected yet');
  }

  async getByUserId(userId) {
    // TODO: const [row] = await this.db.query('SELECT * FROM patients WHERE user_id = ?', [userId]);
    // return row ? new Patient(row) : null;
    throw new Error('PatientDAOImpl.getByUserId() — DB not connected yet');
  }

  async search(query) {
    // TODO: SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?
    throw new Error('PatientDAOImpl.search() — DB not connected yet');
  }

  async create(patient) {
    // TODO: INSERT INTO patients (...) VALUES (...)
    // return new Patient({ ...patient, patientId: insertId });
    throw new Error('PatientDAOImpl.create() — DB not connected yet');
  }

  async update(id, data) {
    // TODO: UPDATE patients SET ... WHERE patient_id = ?
    throw new Error('PatientDAOImpl.update() — DB not connected yet');
  }

  async delete(id) {
    // TODO: DELETE FROM patients WHERE patient_id = ?
    throw new Error('PatientDAOImpl.delete() — DB not connected yet');
  }

  async count() {
    // TODO: SELECT COUNT(*) as total FROM patients
    throw new Error('PatientDAOImpl.count() — DB not connected yet');
  }
}
