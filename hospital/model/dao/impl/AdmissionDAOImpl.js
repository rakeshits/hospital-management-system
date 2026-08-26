import AdmissionDAO from '../AdmissionDAO.js';
export default class AdmissionDAOImpl extends AdmissionDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()                { throw new Error('AdmissionDAOImpl.getAll() — not connected'); }
  async getById(id)             { throw new Error('AdmissionDAOImpl.getById() — not connected'); }
  async getByPatient(patientId) { throw new Error('AdmissionDAOImpl.getByPatient() — not connected'); }
  async getActive()             { throw new Error('AdmissionDAOImpl.getActive() — not connected'); }
  async create(admission)       { throw new Error('AdmissionDAOImpl.create() — not connected'); }
  async update(id, data)        { throw new Error('AdmissionDAOImpl.update() — not connected'); }
  async discharge(id, notes)    { throw new Error('AdmissionDAOImpl.discharge() — not connected'); }
  async delete(id)              { throw new Error('AdmissionDAOImpl.delete() — not connected'); }
}
