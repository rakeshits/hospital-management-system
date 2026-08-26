package com.hospital.model;

import java.sql.Timestamp;

/**
 * User — maps to the `users` table.
 *
 * DB column       → Java field
 * user_id         → userId
 * username        → username
 * email           → email
 * password_hash   → passwordHash   (BCrypt hash — never plain text)
 * role_id         → roleId
 * is_active       → isActive
 * last_login_at   → lastLoginAt
 * created_at      → createdAt
 * updated_at      → updatedAt
 */
public class User {

    private int       userId;
    private String    username;
    private String    email;
    private String    passwordHash;
    private int       roleId;
    private boolean   isActive;
    private Timestamp lastLoginAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public User() {}

    public User(int userId, String username, String email, String passwordHash,
                int roleId, boolean isActive, Timestamp lastLoginAt,
                Timestamp createdAt, Timestamp updatedAt) {
        this.userId       = userId;
        this.username     = username;
        this.email        = email;
        this.passwordHash = passwordHash;
        this.roleId       = roleId;
        this.isActive     = isActive;
        this.lastLoginAt  = lastLoginAt;
        this.createdAt    = createdAt;
        this.updatedAt    = updatedAt;
    }

    public int       getUserId()      { return userId;       }
    public String    getUsername()    { return username;     }
    public String    getEmail()       { return email;        }
    public String    getPasswordHash(){ return passwordHash; }
    public int       getRoleId()      { return roleId;       }
    public boolean   isActive()       { return isActive;     }
    public Timestamp getLastLoginAt() { return lastLoginAt;  }
    public Timestamp getCreatedAt()   { return createdAt;    }
    public Timestamp getUpdatedAt()   { return updatedAt;    }

    public void setUserId(int userId)              { this.userId       = userId;       }
    public void setUsername(String username)       { this.username     = username;     }
    public void setEmail(String email)             { this.email        = email;        }
    public void setPasswordHash(String hash)       { this.passwordHash = hash;         }
    public void setRoleId(int roleId)              { this.roleId       = roleId;       }
    public void setActive(boolean active)          { this.isActive     = active;       }
    public void setLastLoginAt(Timestamp t)        { this.lastLoginAt  = t;            }
    public void setCreatedAt(Timestamp createdAt)  { this.createdAt    = createdAt;    }
    public void setUpdatedAt(Timestamp updatedAt)  { this.updatedAt    = updatedAt;    }

    @Override
    public String toString() {
        return "User{userId=" + userId + ", username='" + username + "', email='" + email
               + "', roleId=" + roleId + ", isActive=" + isActive + "}";
    }
}
