package com.hospital.model;

import java.sql.Timestamp;

/**
 * Department — maps to the `departments` table.
 *
 * DB column       → Java field
 * department_id   → departmentId
 * name            → name
 * description     → description
 * head_doctor_id  → headDoctorId
 * floor_number    → floorNumber
 * phone           → phone
 * is_active       → isActive
 * created_at      → createdAt
 */
public class Department {

    private int       departmentId;
    private String    name;
    private String    description;
    private Integer   headDoctorId;   // nullable FK → doctors.doctor_id
    private Integer   floorNumber;
    private String    phone;
    private boolean   isActive;
    private Timestamp createdAt;

    public Department() {}

    public Department(int departmentId, String name, String description,
                      Integer headDoctorId, Integer floorNumber, String phone,
                      boolean isActive, Timestamp createdAt) {
        this.departmentId = departmentId;
        this.name         = name;
        this.description  = description;
        this.headDoctorId = headDoctorId;
        this.floorNumber  = floorNumber;
        this.phone        = phone;
        this.isActive     = isActive;
        this.createdAt    = createdAt;
    }

    public int       getDepartmentId() { return departmentId; }
    public String    getName()         { return name;         }
    public String    getDescription()  { return description;  }
    public Integer   getHeadDoctorId() { return headDoctorId; }
    public Integer   getFloorNumber()  { return floorNumber;  }
    public String    getPhone()        { return phone;        }
    public boolean   isActive()        { return isActive;     }
    public Timestamp getCreatedAt()    { return createdAt;    }

    public void setDepartmentId(int departmentId)    { this.departmentId = departmentId; }
    public void setName(String name)                 { this.name         = name;         }
    public void setDescription(String description)   { this.description  = description;  }
    public void setHeadDoctorId(Integer headDoctorId){ this.headDoctorId = headDoctorId; }
    public void setFloorNumber(Integer floorNumber)  { this.floorNumber  = floorNumber;  }
    public void setPhone(String phone)               { this.phone        = phone;        }
    public void setActive(boolean active)            { this.isActive     = active;       }
    public void setCreatedAt(Timestamp createdAt)    { this.createdAt    = createdAt;    }

    @Override
    public String toString() {
        return "Department{departmentId=" + departmentId + ", name='" + name + "'}";
    }
}
