package com.hospital.model;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * Patient
 *
 * POJO mapping to the `patients` table.
 *
 * Column mapping (DB column → Java field):
 *   patient_id       → patientId
 *   user_id          → userId
 *   first_name       → firstName
 *   last_name        → lastName
 *   email            → email
 *   phone            → phone
 *   dob              → dob
 *   gender           → gender        ('male' | 'female' | 'other')
 *   blood_group      → bloodGroup
 *   address          → address
 *   city             → city
 *   pincode          → pincode
 *   emergency_name   → emergencyName
 *   emergency_phone  → emergencyPhone
 *   allergies        → allergies     (stored as TEXT / VARCHAR in DB)
 *   created_at       → createdAt
 *   updated_at       → updatedAt
 */
public class Patient {

    private int       patientId;
    private int       userId;
    private String    firstName;
    private String    lastName;
    private String    email;
    private String    phone;
    private Date      dob;
    private String    gender;
    private String    bloodGroup;
    private String    address;
    private String    city;
    private String    pincode;
    private String    emergencyName;
    private String    emergencyPhone;
    private String    allergies;       // comma-separated or JSON string
    private Timestamp createdAt;
    private Timestamp updatedAt;

    // ── Constructors ─────────────────────────────────────────────────────────

    /** No-arg constructor — required for Gson deserialisation. */
    public Patient() {}

    /** All-args constructor — used by PatientDAOImpl when mapping ResultSet rows. */
    public Patient(int patientId, int userId, String firstName, String lastName,
                   String email, String phone, Date dob, String gender,
                   String bloodGroup, String address, String city, String pincode,
                   String emergencyName, String emergencyPhone, String allergies,
                   Timestamp createdAt, Timestamp updatedAt) {
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

    // ── Getters ──────────────────────────────────────────────────────────────

    public int       getPatientId()      { return patientId;      }
    public int       getUserId()         { return userId;         }
    public String    getFirstName()      { return firstName;      }
    public String    getLastName()       { return lastName;       }
    public String    getEmail()          { return email;          }
    public String    getPhone()          { return phone;          }
    public Date      getDob()            { return dob;            }
    public String    getGender()         { return gender;         }
    public String    getBloodGroup()     { return bloodGroup;     }
    public String    getAddress()        { return address;        }
    public String    getCity()           { return city;           }
    public String    getPincode()        { return pincode;        }
    public String    getEmergencyName()  { return emergencyName;  }
    public String    getEmergencyPhone() { return emergencyPhone; }
    public String    getAllergies()      { return allergies;      }
    public Timestamp getCreatedAt()      { return createdAt;      }
    public Timestamp getUpdatedAt()      { return updatedAt;      }

    // ── Setters ──────────────────────────────────────────────────────────────

    public void setPatientId(int patientId)           { this.patientId      = patientId;      }
    public void setUserId(int userId)                 { this.userId         = userId;         }
    public void setFirstName(String firstName)        { this.firstName      = firstName;      }
    public void setLastName(String lastName)          { this.lastName       = lastName;       }
    public void setEmail(String email)                { this.email          = email;          }
    public void setPhone(String phone)                { this.phone          = phone;          }
    public void setDob(Date dob)                      { this.dob            = dob;            }
    public void setGender(String gender)              { this.gender         = gender;         }
    public void setBloodGroup(String bloodGroup)      { this.bloodGroup     = bloodGroup;     }
    public void setAddress(String address)            { this.address        = address;        }
    public void setCity(String city)                  { this.city           = city;           }
    public void setPincode(String pincode)            { this.pincode        = pincode;        }
    public void setEmergencyName(String emergencyName)   { this.emergencyName  = emergencyName;  }
    public void setEmergencyPhone(String emergencyPhone) { this.emergencyPhone = emergencyPhone; }
    public void setAllergies(String allergies)        { this.allergies      = allergies;      }
    public void setCreatedAt(Timestamp createdAt)     { this.createdAt      = createdAt;      }
    public void setUpdatedAt(Timestamp updatedAt)     { this.updatedAt      = updatedAt;      }

    // ── toString ─────────────────────────────────────────────────────────────

    @Override
    public String toString() {
        return "Patient{" +
               "patientId="      + patientId      +
               ", userId="       + userId         +
               ", firstName='"   + firstName      + '\'' +
               ", lastName='"    + lastName       + '\'' +
               ", email='"       + email          + '\'' +
               ", phone='"       + phone          + '\'' +
               ", dob="          + dob            +
               ", gender='"      + gender         + '\'' +
               ", bloodGroup='"  + bloodGroup     + '\'' +
               ", city='"        + city           + '\'' +
               ", createdAt="    + createdAt      +
               '}';
    }
}
