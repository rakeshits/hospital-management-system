/**
 * DAO Interface: MedicalRecordDAO
 */
export default class MedicalRecordDAO {
  async getAll()                    { throw new Error('MedicalRecordDAO.getAll() not implemented'); }
  async getById(id)                 { throw new Error('MedicalRecordDAO.getById() not implemented'); }
  async getByPatient(patientId)     { throw new Error('MedicalRecordDAO.getByPatient() not implemented'); }
  async getByDoctor(doctorId)       { throw new Error('MedicalRecordDAO.getByDoctor() not implemented'); }
  async getByAppointment(apptId)    { throw new Error('MedicalRecordDAO.getByAppointment() not implemented'); }
  async create(record)              { throw new Error('MedicalRecordDAO.create() not implemented'); }
  async update(id, data)            { throw new Error('MedicalRecordDAO.update() not implemented'); }
  async delete(id)                  { throw new Error('MedicalRecordDAO.delete() not implemented'); }
}
