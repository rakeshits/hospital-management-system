/**
 * Entity: Doctor
 * Maps to the `doctors` table.
 */
export default class Doctor {
  constructor({
    doctorId       = null,
    userId         = null,
    firstName      = '',
    lastName       = '',
    email          = '',
    phone          = '',
    specialization = '',
    departmentId   = null,
    qualification  = '',
    experience     = 0,       // years
    consultationFee= 0,
    availableDays  = [],      // e.g. ['MON','WED','FRI']
    availableFrom  = '',      // '09:00'
    availableTo    = '',      // '17:00'
    rating         = 0,
    isActive       = true,
    createdAt      = null,
    updatedAt      = null,
  } = {}) {
    this.doctorId        = doctorId;
    this.userId          = userId;
    this.firstName       = firstName;
    this.lastName        = lastName;
    this.email           = email;
    this.phone           = phone;
    this.specialization  = specialization;
    this.departmentId    = departmentId;
    this.qualification   = qualification;
    this.experience      = experience;
    this.consultationFee = consultationFee;
    this.availableDays   = availableDays;
    this.availableFrom   = availableFrom;
    this.availableTo     = availableTo;
    this.rating          = rating;
    this.isActive        = isActive;
    this.createdAt       = createdAt;
    this.updatedAt       = updatedAt;
  }

  get fullName() {
    return `Dr. ${this.firstName} ${this.lastName}`.trim();
  }
}
