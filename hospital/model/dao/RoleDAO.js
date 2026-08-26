/**
 * DAO Interface: RoleDAO
 */
export default class RoleDAO {
  async getAll()         { throw new Error('RoleDAO.getAll() not implemented'); }
  async getById(id)      { throw new Error('RoleDAO.getById() not implemented'); }
  async getByName(name)  { throw new Error('RoleDAO.getByName() not implemented'); }
  async create(role)     { throw new Error('RoleDAO.create() not implemented'); }
  async update(id, data) { throw new Error('RoleDAO.update() not implemented'); }
  async delete(id)       { throw new Error('RoleDAO.delete() not implemented'); }
}
