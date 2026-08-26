/**
 * DAO Interface: DepartmentDAO
 */
export default class DepartmentDAO {
  async getAll()           { throw new Error('DepartmentDAO.getAll() not implemented'); }
  async getById(id)        { throw new Error('DepartmentDAO.getById() not implemented'); }
  async create(dept)       { throw new Error('DepartmentDAO.create() not implemented'); }
  async update(id, data)   { throw new Error('DepartmentDAO.update() not implemented'); }
  async delete(id)         { throw new Error('DepartmentDAO.delete() not implemented'); }
  async count()            { throw new Error('DepartmentDAO.count() not implemented'); }
}
