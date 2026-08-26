/**
 * Entity: MedicalRecord
 * Maps to the `medical_records` table.
 */
export default class MedicalRecord {
  constructor({
    recordId      = null,
    patientId     = null,
    doctorId      = null,
    appointmentId = null,
    diagnosis     = '',
    symptoms      = '',
    treatment     = '',
    prescription  = [],   // array of medicine objects
    labTests      = [],
    notes         = '',
    visitDate     = null,
    followUpDate  = null,
    createdAt     = null,
  } = {}) {
    this.recordId      = recordId;
    this.patientId     = patientId;
    this.doctorId      = doctorId;
    this.appointmentId = appointmentId;
    this.diagnosis     = diagnosis;
    this.symptoms      = symptoms;
    this.treatment     = treatment;
    this.prescription  = prescription;
    this.labTests      = labTests;
    this.notes         = notes;
    this.visitDate     = visitDate;
    this.followUpDate  = followUpDate;
    this.createdAt     = createdAt;
  }
}
