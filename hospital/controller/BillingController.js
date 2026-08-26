/**
 * BillingController
 * Handles bill generation, payment tracking, invoice export.
 */
export default class BillingController {
  static async generateBill(appointmentId)     { throw new Error('BillingController.generateBill() — not implemented'); }
  static async getById(billId)                 { throw new Error('BillingController.getById() — not implemented'); }
  static async getByPatient(patientId)         { throw new Error('BillingController.getByPatient() — not implemented'); }
  static async applyPayment(billId, amount, method) { throw new Error('BillingController.applyPayment() — not implemented'); }
  static async getAll()                        { throw new Error('BillingController.getAll() — not implemented'); }
  static async getRevenueStats()               { throw new Error('BillingController.getRevenueStats() — not implemented'); }
}
