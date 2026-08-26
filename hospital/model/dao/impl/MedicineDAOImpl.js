import MedicineDAO from '../MedicineDAO.js';
export default class MedicineDAOImpl extends MedicineDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()             { throw new Error('MedicineDAOImpl.getAll() — not connected'); }
  async getById(id)          { throw new Error('MedicineDAOImpl.getById() — not connected'); }
  async search(query)        { throw new Error('MedicineDAOImpl.search() — not connected'); }
  async getLowStock()        { throw new Error('MedicineDAOImpl.getLowStock() — not connected'); }
  async create(medicine)     { throw new Error('MedicineDAOImpl.create() — not connected'); }
  async update(id, data)     { throw new Error('MedicineDAOImpl.update() — not connected'); }
  async delete(id)           { throw new Error('MedicineDAOImpl.delete() — not connected'); }
  async adjustStock(id, qty) { throw new Error('MedicineDAOImpl.adjustStock() — not connected'); }
}
