import MedicalRecordDAO from '../MedicalRecordDAO.js';
export default class MedicalRecordDAOImpl extends MedicalRecordDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()                 { throw new Error('MedicalRecordDAOImpl.getAll() — not connected'); }
  async getById(id)              { throw new Error('MedicalRecordDAOImpl.getById() — not connected'); }
  async getByPatient(patientId)  { throw new Error('MedicalRecordDAOImpl.getByPatient() — not connected'); }
  async getByDoctor(doctorId)    { throw new Error('MedicalRecordDAOImpl.getByDoctor() — not connected'); }
  async getByAppointment(apptId) { throw new Error('MedicalRecordDAOImpl.getByAppointment() — not connected'); }
  async create(record)           { throw new Error('MedicalRecordDAOImpl.create() — not connected'); }
  async update(id, data)         { throw new Error('MedicalRecordDAOImpl.update() — not connected'); }
  async delete(id)               { throw new Error('MedicalRecordDAOImpl.delete() — not connected'); }
}
