/**
 * Entity: Admission
 * Maps to the `admissions` table.
 */
export default class Admission {
  constructor({
    admissionId  = null,
    patientId    = null,
    doctorId     = null,
    roomId       = null,
    admittedAt   = null,
    dischargedAt = null,
    diagnosis    = '',
    status       = 'admitted',  // 'admitted'|'discharged'|'transferred'
    notes        = '',
    createdAt    = null,
  } = {}) {
    this.admissionId  = admissionId;
    this.patientId    = patientId;
    this.doctorId     = doctorId;
    this.roomId       = roomId;
    this.admittedAt   = admittedAt;
    this.dischargedAt = dischargedAt;
    this.diagnosis    = diagnosis;
    this.status       = status;
    this.notes        = notes;
    this.createdAt    = createdAt;
  }

  get daysAdmitted() {
    if (!this.admittedAt) return 0;
    const end = this.dischargedAt ? new Date(this.dischargedAt) : new Date();
    return Math.ceil((end - new Date(this.admittedAt)) / (1000 * 60 * 60 * 24));
  }
}
