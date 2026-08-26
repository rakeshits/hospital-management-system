/**
 * DAO Interface: RoomDAO
 */
export default class RoomDAO {
  async getAll()             { throw new Error('RoomDAO.getAll() not implemented'); }
  async getById(id)          { throw new Error('RoomDAO.getById() not implemented'); }
  async getAvailable()       { throw new Error('RoomDAO.getAvailable() not implemented'); }
  async getByType(type)      { throw new Error('RoomDAO.getByType() not implemented'); }
  async create(room)         { throw new Error('RoomDAO.create() not implemented'); }
  async update(id, data)     { throw new Error('RoomDAO.update() not implemented'); }
  async delete(id)           { throw new Error('RoomDAO.delete() not implemented'); }
  async setAvailability(id, isAvailable) { throw new Error('RoomDAO.setAvailability() not implemented'); }
}
