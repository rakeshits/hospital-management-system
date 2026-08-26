/**
 * Entity: Bill
 * Maps to the `bills` table.
 */
export default class Bill {
  constructor({
    billId         = null,
    patientId      = null,
    appointmentId  = null,
    admissionId    = null,
    consultationFee= 0,
    medicineCharges= 0,
    labCharges     = 0,
    roomCharges    = 0,
    otherCharges   = 0,
    discount       = 0,
    tax            = 0,
    totalAmount    = 0,
    paidAmount     = 0,
    paymentStatus  = 'unpaid', // 'unpaid'|'partial'|'paid'
    paymentMethod  = '',       // 'cash'|'card'|'upi'|'insurance'
    issuedAt       = null,
    updatedAt      = null,
  } = {}) {
    this.billId          = billId;
    this.patientId       = patientId;
    this.appointmentId   = appointmentId;
    this.admissionId     = admissionId;
    this.consultationFee = consultationFee;
    this.medicineCharges = medicineCharges;
    this.labCharges      = labCharges;
    this.roomCharges     = roomCharges;
    this.otherCharges    = otherCharges;
    this.discount        = discount;
    this.tax             = tax;
    this.totalAmount     = totalAmount;
    this.paidAmount      = paidAmount;
    this.paymentStatus   = paymentStatus;
    this.paymentMethod   = paymentMethod;
    this.issuedAt        = issuedAt;
    this.updatedAt       = updatedAt;
  }

  get balance() {
    return this.totalAmount - this.paidAmount;
  }
}
