/**
 * Entity: Patient
 * Maps to the `patients` table.
 */
export default class Patient {
  constructor({
    patientId      = null,
    userId         = null,
    firstName      = '',
    lastName       = '',
    email          = '',
    phone          = '',
    dob            = null,
    gender         = '',       // 'male' | 'female' | 'other'
    bloodGroup     = '',
    address        = '',
    city           = '',
    pincode        = '',
    emergencyName  = '',
    emergencyPhone = '',
    allergies      = [],
    createdAt      = null,
    updatedAt      = null,
  } = {}) {
    this.patientId      = patientId;
    this.userId         = userId;
    this.firstName      = firstName;
    this.lastName       = lastName;
    this.email          = email;
    this.phone          = phone;
    this.dob            = dob;
    this.gender         = gender;
    this.bloodGroup     = bloodGroup;
    this.address        = address;
    this.city           = city;
    this.pincode        = pincode;
    this.emergencyName  = emergencyName;
    this.emergencyPhone = emergencyPhone;
    this.allergies      = allergies;
    this.createdAt      = createdAt;
    this.updatedAt      = updatedAt;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  get age() {
    if (!this.dob) return null;
    const diff = Date.now() - new Date(this.dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
}
