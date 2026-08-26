/**
 * DAO Interface: MedicineDAO
 */
export default class MedicineDAO {
  async getAll()              { throw new Error('MedicineDAO.getAll() not implemented'); }
  async getById(id)           { throw new Error('MedicineDAO.getById() not implemented'); }
  async search(query)         { throw new Error('MedicineDAO.search() not implemented'); }
  async getLowStock()         { throw new Error('MedicineDAO.getLowStock() not implemented'); }
  async create(medicine)      { throw new Error('MedicineDAO.create() not implemented'); }
  async update(id, data)      { throw new Error('MedicineDAO.update() not implemented'); }
  async delete(id)            { throw new Error('MedicineDAO.delete() not implemented'); }
  async adjustStock(id, qty)  { throw new Error('MedicineDAO.adjustStock() not implemented'); }
}
