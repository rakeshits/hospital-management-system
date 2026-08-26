import RoomDAO from '../RoomDAO.js';
export default class RoomDAOImpl extends RoomDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()                         { throw new Error('RoomDAOImpl.getAll() — not connected'); }
  async getById(id)                      { throw new Error('RoomDAOImpl.getById() — not connected'); }
  async getAvailable()                   { throw new Error('RoomDAOImpl.getAvailable() — not connected'); }
  async getByType(type)                  { throw new Error('RoomDAOImpl.getByType() — not connected'); }
  async create(room)                     { throw new Error('RoomDAOImpl.create() — not connected'); }
  async update(id, data)                 { throw new Error('RoomDAOImpl.update() — not connected'); }
  async delete(id)                       { throw new Error('RoomDAOImpl.delete() — not connected'); }
  async setAvailability(id, isAvailable) { throw new Error('RoomDAOImpl.setAvailability() — not connected'); }
}
