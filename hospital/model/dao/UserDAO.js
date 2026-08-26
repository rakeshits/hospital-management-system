/**
 * DAO Interface: UserDAO
 * Core auth table — shared across all roles.
 */
export default class UserDAO {
  async getAll()                     { throw new Error('UserDAO.getAll() not implemented'); }
  async getById(id)                  { throw new Error('UserDAO.getById() not implemented'); }
  async getByEmail(email)            { throw new Error('UserDAO.getByEmail() not implemented'); }
  async getByUsername(username)      { throw new Error('UserDAO.getByUsername() not implemented'); }
  async getByRole(roleId)            { throw new Error('UserDAO.getByRole() not implemented'); }
  async create(user)                 { throw new Error('UserDAO.create() not implemented'); }
  async update(id, data)             { throw new Error('UserDAO.update() not implemented'); }
  async delete(id)                   { throw new Error('UserDAO.delete() not implemented'); }
  async setActive(id, isActive)      { throw new Error('UserDAO.setActive() not implemented'); }
  async updateLastLogin(id)          { throw new Error('UserDAO.updateLastLogin() not implemented'); }
  async verifyPassword(id, hash)     { throw new Error('UserDAO.verifyPassword() not implemented'); }
}
