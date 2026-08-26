package com.hospital.model;

import java.sql.Timestamp;

/**
 * Role — maps to the `roles` table.
 *
 * DB column      → Java field
 * role_id        → roleId
 * name           → name        ('admin' | 'doctor' | 'patient' | 'staff')
 * description    → description
 * created_at     → createdAt
 */
public class Role {

    private int       roleId;
    private String    name;
    private String    description;
    private Timestamp createdAt;

    public Role() {}

    public Role(int roleId, String name, String description, Timestamp createdAt) {
        this.roleId      = roleId;
        this.name        = name;
        this.description = description;
        this.createdAt   = createdAt;
    }

    public int       getRoleId()      { return roleId;      }
    public String    getName()        { return name;        }
    public String    getDescription() { return description; }
    public Timestamp getCreatedAt()   { return createdAt;   }

    public void setRoleId(int roleId)           { this.roleId      = roleId;      }
    public void setName(String name)            { this.name        = name;        }
    public void setDescription(String desc)     { this.description = desc;        }
    public void setCreatedAt(Timestamp createdAt){ this.createdAt  = createdAt;   }

    @Override
    public String toString() {
        return "Role{roleId=" + roleId + ", name='" + name + "'}";
    }
}
