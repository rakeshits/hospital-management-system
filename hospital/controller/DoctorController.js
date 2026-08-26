/**
 * DoctorController
 * Handles doctor-facing operations.
 */
export default class DoctorController {
  static async getDashboard(doctorId)                { throw new Error('DoctorController.getDashboard() — not implemented'); }
  static async getMyAppointments(doctorId)           { throw new Error('DoctorController.getMyAppointments() — not implemented'); }
  static async getMyPatients(doctorId)               { throw new Error('DoctorController.getMyPatients() — not implemented'); }
  static async getPatientDetail(patientId)           { throw new Error('DoctorController.getPatientDetail() — not implemented'); }
  static async addMedicalRecord(data)                { throw new Error('DoctorController.addMedicalRecord() — not implemented'); }
  static async prescribeMedicine(recordId, medicines){ throw new Error('DoctorController.prescribeMedicine() — not implemented'); }
  static async updateAppointmentStatus(id, status)   { throw new Error('DoctorController.updateAppointmentStatus() — not implemented'); }
}
