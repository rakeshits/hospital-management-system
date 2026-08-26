/**
 * Entity: Appointment
 * Maps to the `appointments` table.
 */
export default class Appointment {
  constructor({
    appointmentId = null,
    patientId     = null,
    doctorId      = null,
    departmentId  = null,
    date          = null,
    timeSlot      = '',
    reason        = '',
    status        = 'pending',  // 'pending'|'confirmed'|'completed'|'cancelled'
    notes         = '',
    createdAt     = null,
    updatedAt     = null,
  } = {}) {
    this.appointmentId = appointmentId;
    this.patientId     = patientId;
    this.doctorId      = doctorId;
    this.departmentId  = departmentId;
    this.date          = date;
    this.timeSlot      = timeSlot;
    this.reason        = reason;
    this.status        = status;
    this.notes         = notes;
    this.createdAt     = createdAt;
    this.updatedAt     = updatedAt;
  }

  get isUpcoming() {
    return this.date && new Date(this.date) >= new Date() && this.status !== 'cancelled';
  }
}
