/**
 * AppointmentController
 * Handles appointment booking, cancellation, rescheduling.
 */
export default class AppointmentController {
  static async getAvailableDoctors(deptId, date) { throw new Error('AppointmentController.getAvailableDoctors() — not implemented'); }
  static async getAvailableSlots(doctorId, date) { throw new Error('AppointmentController.getAvailableSlots() — not implemented'); }
  static async book(data)                        { throw new Error('AppointmentController.book() — not implemented'); }
  static async cancel(appointmentId)             { throw new Error('AppointmentController.cancel() — not implemented'); }
  static async reschedule(id, date, slot)        { throw new Error('AppointmentController.reschedule() — not implemented'); }
  static async getAll()                          { throw new Error('AppointmentController.getAll() — not implemented'); }
  static async getById(id)                       { throw new Error('AppointmentController.getById() — not implemented'); }
}
