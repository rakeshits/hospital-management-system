/**
 * DAO Interface: AppointmentDAO
 * Contract for appointment-related database operations.
 * Implementation: dao/impl/AppointmentDAOImpl.js
 */
export default class AppointmentDAO {
  async getAll()                              { throw new Error('AppointmentDAO.getAll() not implemented'); }
  async getById(id)                           { throw new Error('AppointmentDAO.getById() not implemented'); }
  async getByPatient(patientId)               { throw new Error('AppointmentDAO.getByPatient() not implemented'); }
  async getByDoctor(doctorId)                 { throw new Error('AppointmentDAO.getByDoctor() not implemented'); }
  async getByDate(date)                       { throw new Error('AppointmentDAO.getByDate() not implemented'); }
  async getByDoctorAndDate(doctorId, date)    { throw new Error('AppointmentDAO.getByDoctorAndDate() not implemented'); }
  async getByStatus(status)                   { throw new Error('AppointmentDAO.getByStatus() not implemented'); }
  async create(appointment)                   { throw new Error('AppointmentDAO.create() not implemented'); }
  async update(id, data)                      { throw new Error('AppointmentDAO.update() not implemented'); }
  async updateStatus(id, status)              { throw new Error('AppointmentDAO.updateStatus() not implemented'); }
  async delete(id)                            { throw new Error('AppointmentDAO.delete() not implemented'); }
  async countToday()                          { throw new Error('AppointmentDAO.countToday() not implemented'); }
  async getBookedSlots(doctorId, date)        { throw new Error('AppointmentDAO.getBookedSlots() not implemented'); }
}
