/**
 * DAO Interface: AdmissionDAO
 */
export default class AdmissionDAO {
  async getAll()                { throw new Error('AdmissionDAO.getAll() not implemented'); }
  async getById(id)             { throw new Error('AdmissionDAO.getById() not implemented'); }
  async getByPatient(patientId) { throw new Error('AdmissionDAO.getByPatient() not implemented'); }
  async getActive()             { throw new Error('AdmissionDAO.getActive() not implemented'); }
  async create(admission)       { throw new Error('AdmissionDAO.create() not implemented'); }
  async update(id, data)        { throw new Error('AdmissionDAO.update() not implemented'); }
  async discharge(id, notes)    { throw new Error('AdmissionDAO.discharge() not implemented'); }
  async delete(id)              { throw new Error('AdmissionDAO.delete() not implemented'); }
}
