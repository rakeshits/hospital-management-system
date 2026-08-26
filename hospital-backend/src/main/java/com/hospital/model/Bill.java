package com.hospital.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Bill — maps to the `bills` table.
 *
 * DB column         → Java field
 * bill_id           → billId
 * patient_id        → patientId
 * appointment_id    → appointmentId
 * admission_id      → admissionId
 * consultation_fee  → consultationFee
 * medicine_charges  → medicineCharges
 * lab_charges       → labCharges
 * room_charges      → roomCharges
 * other_charges     → otherCharges
 * discount          → discount
 * tax               → tax
 * total_amount      → totalAmount
 * paid_amount       → paidAmount
 * payment_status    → paymentStatus  ('unpaid'|'partial'|'paid')
 * payment_method    → paymentMethod  ('cash'|'card'|'upi'|'insurance')
 * issued_at         → issuedAt
 * updated_at        → updatedAt
 */
public class Bill {

    private int        billId;
    private int        patientId;
    private Integer    appointmentId;
    private Integer    admissionId;
    private BigDecimal consultationFee;
    private BigDecimal medicineCharges;
    private BigDecimal labCharges;
    private BigDecimal roomCharges;
    private BigDecimal otherCharges;
    private BigDecimal discount;
    private BigDecimal tax;
    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private String     paymentStatus;
    private String     paymentMethod;
    private Timestamp  issuedAt;
    private Timestamp  updatedAt;

    public Bill() {}

    public int        getBillId()          { return billId;          }
    public int        getPatientId()       { return patientId;       }
    public Integer    getAppointmentId()   { return appointmentId;   }
    public Integer    getAdmissionId()     { return admissionId;     }
    public BigDecimal getConsultationFee() { return consultationFee; }
    public BigDecimal getMedicineCharges() { return medicineCharges; }
    public BigDecimal getLabCharges()      { return labCharges;      }
    public BigDecimal getRoomCharges()     { return roomCharges;     }
    public BigDecimal getOtherCharges()    { return otherCharges;    }
    public BigDecimal getDiscount()        { return discount;        }
    public BigDecimal getTax()             { return tax;             }
    public BigDecimal getTotalAmount()     { return totalAmount;     }
    public BigDecimal getPaidAmount()      { return paidAmount;      }
    public String     getPaymentStatus()   { return paymentStatus;   }
    public String     getPaymentMethod()   { return paymentMethod;   }
    public Timestamp  getIssuedAt()        { return issuedAt;        }
    public Timestamp  getUpdatedAt()       { return updatedAt;       }

    public void setBillId(int billId)                    { this.billId          = billId;          }
    public void setPatientId(int patientId)              { this.patientId       = patientId;       }
    public void setAppointmentId(Integer appointmentId)  { this.appointmentId   = appointmentId;   }
    public void setAdmissionId(Integer admissionId)      { this.admissionId     = admissionId;     }
    public void setConsultationFee(BigDecimal v)         { this.consultationFee = v;               }
    public void setMedicineCharges(BigDecimal v)         { this.medicineCharges = v;               }
    public void setLabCharges(BigDecimal v)              { this.labCharges      = v;               }
    public void setRoomCharges(BigDecimal v)             { this.roomCharges     = v;               }
    public void setOtherCharges(BigDecimal v)            { this.otherCharges    = v;               }
    public void setDiscount(BigDecimal v)                { this.discount        = v;               }
    public void setTax(BigDecimal v)                     { this.tax             = v;               }
    public void setTotalAmount(BigDecimal v)             { this.totalAmount     = v;               }
    public void setPaidAmount(BigDecimal v)              { this.paidAmount      = v;               }
    public void setPaymentStatus(String paymentStatus)   { this.paymentStatus   = paymentStatus;   }
    public void setPaymentMethod(String paymentMethod)   { this.paymentMethod   = paymentMethod;   }
    public void setIssuedAt(Timestamp issuedAt)          { this.issuedAt        = issuedAt;        }
    public void setUpdatedAt(Timestamp updatedAt)        { this.updatedAt       = updatedAt;       }

    @Override
    public String toString() {
        return "Bill{billId=" + billId + ", patientId=" + patientId
               + ", total=" + totalAmount + ", status='" + paymentStatus + "'}";
    }
}
