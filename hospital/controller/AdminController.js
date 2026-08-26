/**
 * AdminController
 * Handles admin-level operations: stats overview, user management, system configuration.
 * Calls PatientDAO, DoctorDAO, AppointmentDAO, BillDAO — never queries DB directly.
 */
// import PatientDAO     from '../model/dao/PatientDAO.js';
// import DoctorDAO      from '../model/dao/DoctorDAO.js';
// import AppointmentDAO from '../model/dao/AppointmentDAO.js';
// import BillDAO        from '../model/dao/BillDAO.js';

export default class AdminController {
  /** GET /api/admin/dashboard-stats → { totalPatients, totalDoctors, todayAppointments, monthlyRevenue } */
  static async getDashboardStats()          { throw new Error('AdminController.getDashboardStats() — not implemented'); }

  /** GET /api/admin/patients */
  static async getAllPatients()             { throw new Error('AdminController.getAllPatients() — not implemented'); }

  /** GET /api/admin/doctors */
  static async getAllDoctors()              { throw new Error('AdminController.getAllDoctors() — not implemented'); }

  /** POST /api/admin/doctors */
  static async createDoctor(data)          { throw new Error('AdminController.createDoctor() — not implemented'); }

  /** PUT /api/admin/doctors/:id */
  static async updateDoctor(id, data)      { throw new Error('AdminController.updateDoctor() — not implemented'); }

  /** DELETE /api/admin/doctors/:id */
  static async deleteDoctor(id)            { throw new Error('AdminController.deleteDoctor() — not implemented'); }

  /** GET /api/admin/departments */
  static async getAllDepartments()          { throw new Error('AdminController.getAllDepartments() — not implemented'); }

  /** GET /api/admin/rooms */
  static async getAllRooms()               { throw new Error('AdminController.getAllRooms() — not implemented'); }

  /** GET /api/admin/medicines */
  static async getMedicineInventory()      { throw new Error('AdminController.getMedicineInventory() — not implemented'); }

  /** GET /api/admin/admissions */
  static async getAllAdmissions()          { throw new Error('AdminController.getAllAdmissions() — not implemented'); }

  /** GET /api/admin/billing */
  static async getAllBills()               { throw new Error('AdminController.getAllBills() — not implemented'); }
}
