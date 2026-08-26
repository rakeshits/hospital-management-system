import BillDAO from '../BillDAO.js';
export default class BillDAOImpl extends BillDAO {
  constructor(dbClient) { super(); this.db = dbClient; }
  async getAll()                        { throw new Error('BillDAOImpl.getAll() — not connected'); }
  async getById(id)                     { throw new Error('BillDAOImpl.getById() — not connected'); }
  async getByPatient(patientId)         { throw new Error('BillDAOImpl.getByPatient() — not connected'); }
  async getByAppointment(appointmentId) { throw new Error('BillDAOImpl.getByAppointment() — not connected'); }
  async getByStatus(paymentStatus)      { throw new Error('BillDAOImpl.getByStatus() — not connected'); }
  async create(bill)                    { throw new Error('BillDAOImpl.create() — not connected'); }
  async update(id, data)                { throw new Error('BillDAOImpl.update() — not connected'); }
  async updatePaymentStatus(id, status) { throw new Error('BillDAOImpl.updatePaymentStatus() — not connected'); }
  async delete(id)                      { throw new Error('BillDAOImpl.delete() — not connected'); }
  async totalRevenue()                  { throw new Error('BillDAOImpl.totalRevenue() — not connected'); }
  async revenueByMonth(year)            { throw new Error('BillDAOImpl.revenueByMonth() — not connected'); }
}
