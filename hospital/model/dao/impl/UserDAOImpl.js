import UserDAO from '../UserDAO.js';
export default class UserDAOImpl extends UserDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()                  { throw new Error('UserDAOImpl.getAll() — not connected'); }
  async getById(id)               { throw new Error('UserDAOImpl.getById() — not connected'); }
  async getByEmail(email)         { throw new Error('UserDAOImpl.getByEmail() — not connected'); }
  async getByUsername(username)   { throw new Error('UserDAOImpl.getByUsername() — not connected'); }
  async getByRole(roleId)         { throw new Error('UserDAOImpl.getByRole() — not connected'); }
  async create(user)              { throw new Error('UserDAOImpl.create() — not connected'); }
  async update(id, data)          { throw new Error('UserDAOImpl.update() — not connected'); }
  async delete(id)                { throw new Error('UserDAOImpl.delete() — not connected'); }
  async setActive(id, isActive)   { throw new Error('UserDAOImpl.setActive() — not connected'); }
  async updateLastLogin(id)       { throw new Error('UserDAOImpl.updateLastLogin() — not connected'); }
  async verifyPassword(id, hash)  { throw new Error('UserDAOImpl.verifyPassword() — not connected'); }
}
