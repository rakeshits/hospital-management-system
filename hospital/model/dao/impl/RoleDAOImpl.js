import RoleDAO from '../RoleDAO.js';
export default class RoleDAOImpl extends RoleDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()         { throw new Error('RoleDAOImpl.getAll() — not connected'); }
  async getById(id)      { throw new Error('RoleDAOImpl.getById() — not connected'); }
  async getByName(name)  { throw new Error('RoleDAOImpl.getByName() — not connected'); }
  async create(role)     { throw new Error('RoleDAOImpl.create() — not connected'); }
  async update(id, data) { throw new Error('RoleDAOImpl.update() — not connected'); }
  async delete(id)       { throw new Error('RoleDAOImpl.delete() — not connected'); }
}
