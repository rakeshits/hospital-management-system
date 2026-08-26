/**
 * DAO Interface: PatientDAO
 *
 * Defines the contract for all patient-related database operations.
 * Concrete implementations live in dao/impl/PatientDAOImpl.js.
 *
 * Controllers MUST only call these methods — never raw DB queries.
 */
export default class PatientDAO {
  /**
   * Fetch all patients.
   * @returns {Promise<Patient[]>}
   */
  async getAll()                   { throw new Error('PatientDAO.getAll() not implemented'); }

  /**
   * Fetch a single patient by primary key.
   * @param {number} id
   * @returns {Promise<Patient|null>}
   */
  async getById(id)                { throw new Error('PatientDAO.getById() not implemented'); }

  /**
   * Fetch a patient by userId (linked User record).
   * @param {number} userId
   * @returns {Promise<Patient|null>}
   */
  async getByUserId(userId)        { throw new Error('PatientDAO.getByUserId() not implemented'); }

  /**
   * Search patients by name or phone.
   * @param {string} query
   * @returns {Promise<Patient[]>}
   */
  async search(query)              { throw new Error('PatientDAO.search() not implemented'); }

  /**
   * Insert a new patient record.
   * @param {Patient} patient
   * @returns {Promise<Patient>} the created record with generated ID
   */
  async create(patient)            { throw new Error('PatientDAO.create() not implemented'); }

  /**
   * Update an existing patient.
   * @param {number}  id
   * @param {Partial<Patient>} data
   * @returns {Promise<Patient>}
   */
  async update(id, data)           { throw new Error('PatientDAO.update() not implemented'); }

  /**
   * Delete a patient record.
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  async delete(id)                 { throw new Error('PatientDAO.delete() not implemented'); }

  /**
   * Count total patients.
   * @returns {Promise<number>}
   */
  async count()                    { throw new Error('PatientDAO.count() not implemented'); }
}
