import DoctorDAO from '../DoctorDAO.js';
import Doctor    from '../../entity/Doctor.js';

/**
 * Concrete implementation of DoctorDAO.
 * Replace TODO stubs with real DB query logic.
 */
export default class DoctorDAOImpl extends DoctorDAO {
  constructor(dbClient) { super(); this.db = dbClient; }

  async getAll()                      { throw new Error('DoctorDAOImpl.getAll() — not connected'); }
  async getById(id)                   { throw new Error('DoctorDAOImpl.getById() — not connected'); }
  async getByUserId(userId)           { throw new Error('DoctorDAOImpl.getByUserId() — not connected'); }
  async getByDepartment(deptId)       { throw new Error('DoctorDAOImpl.getByDepartment() — not connected'); }
  async getBySpecialization(spec)     { throw new Error('DoctorDAOImpl.getBySpecialization() — not connected'); }
  async search(query)                 { throw new Error('DoctorDAOImpl.search() — not connected'); }
  async create(doctor)                { throw new Error('DoctorDAOImpl.create() — not connected'); }
  async update(id, data)              { throw new Error('DoctorDAOImpl.update() — not connected'); }
  async delete(id)                    { throw new Error('DoctorDAOImpl.delete() — not connected'); }
  async setActive(id, isActive)       { throw new Error('DoctorDAOImpl.setActive() — not connected'); }
  async count()                       { throw new Error('DoctorDAOImpl.count() — not connected'); }
}
