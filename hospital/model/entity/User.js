/**
 * Entity: User
 * Maps to the `users` table.
 * Core authentication record — all roles (admin, doctor, patient) have a User record.
 */
export default class User {
  constructor({
    userId        = null,
    username      = '',
    email         = '',
    passwordHash  = '',   // never store plain text
    roleId        = null,
    isActive      = true,
    lastLoginAt   = null,
    createdAt     = null,
    updatedAt     = null,
  } = {}) {
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
}
