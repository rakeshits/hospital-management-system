/**
 * Entity: Admin
 * Represents an administrator user in the HMS.
 * Maps to the `admins` table in the database.
 */
export default class Admin {
  constructor({
    adminId   = null,
    userId    = null,
    firstName = '',
    lastName  = '',
    email     = '',
    phone     = '',
    createdAt = null,
    updatedAt = null,
  } = {}) {
    this.adminId   = adminId;
    this.userId    = userId;
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
