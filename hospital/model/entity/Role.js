/**
 * Entity: Role
 * Maps to the `roles` table.
 * Defines the available system roles.
 */
export default class Role {
  /**
   * Static role constants for type safety throughout the app.
   */
  static ADMIN   = 'admin';
  static DOCTOR  = 'doctor';
  static PATIENT = 'patient';

  constructor({
    roleId      = null,
    name        = '',        // 'admin' | 'doctor' | 'patient'
    description = '',
    createdAt   = null,
  } = {}) {
    this.roleId      = roleId;
    this.name        = name;
    this.description = description;
    this.createdAt   = createdAt;
  }
}
