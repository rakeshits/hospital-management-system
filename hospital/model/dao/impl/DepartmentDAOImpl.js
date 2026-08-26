import DepartmentDAO from '../DepartmentDAO.js';
export default class DepartmentDAOImpl extends DepartmentDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()         { throw new Error('DepartmentDAOImpl.getAll() — not connected'); }
  async getById(id)      { throw new Error('DepartmentDAOImpl.getById() — not connected'); }
  async create(dept)     { throw new Error('DepartmentDAOImpl.create() — not connected'); }
  async update(id, data) { throw new Error('DepartmentDAOImpl.update() — not connected'); }
  async delete(id)       { throw new Error('DepartmentDAOImpl.delete() — not connected'); }
  async count()          { throw new Error('DepartmentDAOImpl.count() — not connected'); }
}
