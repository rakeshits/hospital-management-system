/**
 * DAO Interface: BillDAO
 * Contract for billing-related database operations.
 * Implementation: dao/impl/BillDAOImpl.js
 */
export default class BillDAO {
  async getAll()                        { throw new Error('BillDAO.getAll() not implemented'); }
  async getById(id)                     { throw new Error('BillDAO.getById() not implemented'); }
  async getByPatient(patientId)         { throw new Error('BillDAO.getByPatient() not implemented'); }
  async getByAppointment(appointmentId) { throw new Error('BillDAO.getByAppointment() not implemented'); }
  async getByStatus(paymentStatus)      { throw new Error('BillDAO.getByStatus() not implemented'); }
  async create(bill)                    { throw new Error('BillDAO.create() not implemented'); }
  async update(id, data)               { throw new Error('BillDAO.update() not implemented'); }
  async updatePaymentStatus(id, status) { throw new Error('BillDAO.updatePaymentStatus() not implemented'); }
  async delete(id)                      { throw new Error('BillDAO.delete() not implemented'); }
  async totalRevenue()                  { throw new Error('BillDAO.totalRevenue() not implemented'); }
  async revenueByMonth(year)            { throw new Error('BillDAO.revenueByMonth() not implemented'); }
}
