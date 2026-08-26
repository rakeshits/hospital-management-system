/**
 * AuthController
 *
 * Handles authentication: login, signup, logout, session validation.
 * Calls UserDAO and PatientDAO — never queries DB directly.
 *
 * In a real backend (Node/Express), these would be Express route handlers.
 * For a React SPA, these functions are called from view components via
 * an HTTP client (fetch/axios) hitting a REST API or Node server.
 */

// import UserDAO    from '../model/dao/UserDAO.js';
// import PatientDAO from '../model/dao/PatientDAO.js';
// import RoleDAO    from '../model/dao/RoleDAO.js';

export default class AuthController {
  /**
   * POST /api/auth/login
   * 1. Look up User by email via UserDAO.getByEmail()
   * 2. Verify password hash via UserDAO.verifyPassword()
   * 3. Load role via RoleDAO.getById()
   * 4. Return session token + role for client-side routing
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ token: string, role: string, userId: number }>}
   */
  static async login(email, password) {
    // TODO: wire to UserDAO + RoleDAO
    throw new Error('AuthController.login() — not yet implemented');
  }

  /**
   * POST /api/auth/signup
   * 1. Hash password
   * 2. Create User via UserDAO.create() with roleId = patient
   * 3. Create Patient record via PatientDAO.create() linked to userId
   * 4. Return new session
   *
   * @param {{ email, username, password, firstName, lastName, phone, dob, gender, bloodGroup }} data
   * @returns {Promise<{ token: string, role: 'patient', userId: number }>}
   */
  static async signup(data) {
    // TODO: wire to UserDAO + PatientDAO
    throw new Error('AuthController.signup() — not yet implemented');
  }

  /**
   * POST /api/auth/logout
   * Invalidates the session token server-side.
   */
  static async logout(token) {
    // TODO
    throw new Error('AuthController.logout() — not yet implemented');
  }

  /**
   * GET /api/auth/me
   * Validates token, returns current user + role.
   */
  static async me(token) {
    // TODO
    throw new Error('AuthController.me() — not yet implemented');
  }
}
