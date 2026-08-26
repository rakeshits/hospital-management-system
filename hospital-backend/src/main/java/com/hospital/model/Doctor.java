package com.hospital.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Doctor — maps to the `doctors` table.
 *
 * DB column         → Java field
 * doctor_id         → doctorId
 * user_id           → userId
 * first_name        → firstName
 * last_name         → lastName
 * email             → email
 * phone             → phone
 * specialization    → specialization
 * department_id     → departmentId
 * qualification     → qualification
 * experience        → experience       (years)
 * consultation_fee  → consultationFee
 * available_days    → availableDays    (stored as VARCHAR, e.g. "MON,WED,FRI")
 * available_from    → availableFrom    (TIME stored as String "09:00")
 * available_to      → availableTo
 * rating            → rating
 * is_active         → isActive
 * created_at        → createdAt
 * updated_at        → updatedAt
 */
public class Doctor {

    private int        doctorId;
    private int        userId;
    private String     firstName;
    private String     lastName;
    private String     email;
    private String     phone;
    private String     specialization;
    private int        departmentId;
    private String     qualification;
    private int        experience;
    private BigDecimal consultationFee;
    private String     availableDays;
    private String     availableFrom;
    private String     availableTo;
    private BigDecimal rating;
    private boolean    isActive;
    private Timestamp  createdAt;
    private Timestamp  updatedAt;

    public Doctor() {}

    public Doctor(int doctorId, int userId, String firstName, String lastName,
                  String email, String phone, String specialization, int departmentId,
                  String qualification, int experience, BigDecimal consultationFee,
                  String availableDays, String availableFrom, String availableTo,
                  BigDecimal rating, boolean isActive, Timestamp createdAt, Timestamp updatedAt) {
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

    public int        getDoctorId()       { return doctorId;        }
    public int        getUserId()         { return userId;          }
    public String     getFirstName()      { return firstName;       }
    public String     getLastName()       { return lastName;        }
    public String     getEmail()          { return email;           }
    public String     getPhone()          { return phone;           }
    public String     getSpecialization() { return specialization;  }
    public int        getDepartmentId()   { return departmentId;    }
    public String     getQualification()  { return qualification;   }
    public int        getExperience()     { return experience;      }
    public BigDecimal getConsultationFee(){ return consultationFee; }
    public String     getAvailableDays()  { return availableDays;   }
    public String     getAvailableFrom()  { return availableFrom;   }
    public String     getAvailableTo()    { return availableTo;     }
    public BigDecimal getRating()         { return rating;          }
    public boolean    isActive()          { return isActive;        }
    public Timestamp  getCreatedAt()      { return createdAt;       }
    public Timestamp  getUpdatedAt()      { return updatedAt;       }

    public void setDoctorId(int doctorId)              { this.doctorId        = doctorId;        }
    public void setUserId(int userId)                  { this.userId          = userId;          }
    public void setFirstName(String firstName)         { this.firstName       = firstName;       }
    public void setLastName(String lastName)           { this.lastName        = lastName;        }
    public void setEmail(String email)                 { this.email           = email;           }
    public void setPhone(String phone)                 { this.phone           = phone;           }
    public void setSpecialization(String s)            { this.specialization  = s;               }
    public void setDepartmentId(int departmentId)      { this.departmentId    = departmentId;    }
    public void setQualification(String qualification) { this.qualification   = qualification;   }
    public void setExperience(int experience)          { this.experience      = experience;      }
    public void setConsultationFee(BigDecimal fee)     { this.consultationFee = fee;             }
    public void setAvailableDays(String availableDays) { this.availableDays   = availableDays;   }
    public void setAvailableFrom(String availableFrom) { this.availableFrom   = availableFrom;   }
    public void setAvailableTo(String availableTo)     { this.availableTo     = availableTo;     }
    public void setRating(BigDecimal rating)           { this.rating          = rating;          }
    public void setActive(boolean active)              { this.isActive        = active;          }
    public void setCreatedAt(Timestamp createdAt)      { this.createdAt       = createdAt;       }
    public void setUpdatedAt(Timestamp updatedAt)      { this.updatedAt       = updatedAt;       }

    @Override
    public String toString() {
        return "Doctor{doctorId=" + doctorId + ", name='Dr. " + firstName + " " + lastName
               + "', specialization='" + specialization + "'}";
    }
}
