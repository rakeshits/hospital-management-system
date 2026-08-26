import AppointmentDAO from '../AppointmentDAO.js';
import Appointment    from '../../entity/Appointment.js';

export default class AppointmentDAOImpl extends AppointmentDAO {
  constructor(dbClient) { super(); this.db = dbClient; }

  async getAll()                          { throw new Error('AppointmentDAOImpl.getAll() — not connected'); }
  async getById(id)                       { throw new Error('AppointmentDAOImpl.getById() — not connected'); }
  async getByPatient(patientId)           { throw new Error('AppointmentDAOImpl.getByPatient() — not connected'); }
  async getByDoctor(doctorId)             { throw new Error('AppointmentDAOImpl.getByDoctor() — not connected'); }
  async getByDate(date)                   { throw new Error('AppointmentDAOImpl.getByDate() — not connected'); }
  async getByDoctorAndDate(doctorId,date) { throw new Error('AppointmentDAOImpl.getByDoctorAndDate() — not connected'); }
  async getByStatus(status)               { throw new Error('AppointmentDAOImpl.getByStatus() — not connected'); }
  async create(appointment)               { throw new Error('AppointmentDAOImpl.create() — not connected'); }
  async update(id, data)                  { throw new Error('AppointmentDAOImpl.update() — not connected'); }
  async updateStatus(id, status)          { throw new Error('AppointmentDAOImpl.updateStatus() — not connected'); }
  async delete(id)                        { throw new Error('AppointmentDAOImpl.delete() — not connected'); }
  async countToday()                      { throw new Error('AppointmentDAOImpl.countToday() — not connected'); }
  async getBookedSlots(doctorId, date)    { throw new Error('AppointmentDAOImpl.getBookedSlots() — not connected'); }
}
