/**
 * DAO Interface: DoctorDAO
 * Contract for doctor-related database operations.
 * Implementation: dao/impl/DoctorDAOImpl.js
 */
export default class DoctorDAO {
  async getAll()                        { throw new Error('DoctorDAO.getAll() not implemented'); }
  async getById(id)                     { throw new Error('DoctorDAO.getById() not implemented'); }
  async getByUserId(userId)             { throw new Error('DoctorDAO.getByUserId() not implemented'); }
  async getByDepartment(departmentId)   { throw new Error('DoctorDAO.getByDepartment() not implemented'); }
  async getBySpecialization(spec)       { throw new Error('DoctorDAO.getBySpecialization() not implemented'); }
  async search(query)                   { throw new Error('DoctorDAO.search() not implemented'); }
  async create(doctor)                  { throw new Error('DoctorDAO.create() not implemented'); }
  async update(id, data)               { throw new Error('DoctorDAO.update() not implemented'); }
  async delete(id)                      { throw new Error('DoctorDAO.delete() not implemented'); }
  async setActive(id, isActive)         { throw new Error('DoctorDAO.setActive() not implemented'); }
  async count()                         { throw new Error('DoctorDAO.count() not implemented'); }
}
