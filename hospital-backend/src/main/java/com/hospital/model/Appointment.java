package com.hospital.model;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * Appointment — maps to the `appointments` table.
 *
 * DB column       → Java field
 * appointment_id  → appointmentId
 * patient_id      → patientId
 * doctor_id       → doctorId
 * department_id   → departmentId
 * date            → date
 * time_slot       → timeSlot
 * reason          → reason
 * status          → status   ('pending'|'confirmed'|'completed'|'cancelled')
 * notes           → notes
 * created_at      → createdAt
 * updated_at      → updatedAt
 */
public class Appointment {

    private int       appointmentId;
    private int       patientId;
    private int       doctorId;
    private int       departmentId;
    private Date      date;
    private String    timeSlot;
    private String    reason;
    private String    status;
    private String    notes;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public Appointment() {}

    public Appointment(int appointmentId, int patientId, int doctorId, int departmentId,
                       Date date, String timeSlot, String reason, String status, String notes,
                       Timestamp createdAt, Timestamp updatedAt) {
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

    public int       getAppointmentId() { return appointmentId; }
    public int       getPatientId()     { return patientId;     }
    public int       getDoctorId()      { return doctorId;      }
    public int       getDepartmentId()  { return departmentId;  }
    public Date      getDate()          { return date;          }
    public String    getTimeSlot()      { return timeSlot;      }
    public String    getReason()        { return reason;        }
    public String    getStatus()        { return status;        }
    public String    getNotes()         { return notes;         }
    public Timestamp getCreatedAt()     { return createdAt;     }
    public Timestamp getUpdatedAt()     { return updatedAt;     }

    public void setAppointmentId(int appointmentId) { this.appointmentId = appointmentId; }
    public void setPatientId(int patientId)         { this.patientId     = patientId;     }
    public void setDoctorId(int doctorId)           { this.doctorId      = doctorId;      }
    public void setDepartmentId(int departmentId)   { this.departmentId  = departmentId;  }
    public void setDate(Date date)                  { this.date          = date;          }
    public void setTimeSlot(String timeSlot)        { this.timeSlot      = timeSlot;      }
    public void setReason(String reason)            { this.reason        = reason;        }
    public void setStatus(String status)            { this.status        = status;        }
    public void setNotes(String notes)              { this.notes         = notes;         }
    public void setCreatedAt(Timestamp createdAt)   { this.createdAt     = createdAt;     }
    public void setUpdatedAt(Timestamp updatedAt)   { this.updatedAt     = updatedAt;     }

    @Override
    public String toString() {
        return "Appointment{id=" + appointmentId + ", patientId=" + patientId
               + ", doctorId=" + doctorId + ", date=" + date + ", status='" + status + "'}";
    }
}
