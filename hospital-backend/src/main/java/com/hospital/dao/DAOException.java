package com.hospital.dao;

/**
 * DAOException
 *
 * Unchecked runtime exception thrown by all DAOImpl classes when a
 * SQLException (or any other DB-layer error) occurs.
 *
 * Wrapping SQLException in a RuntimeException means:
 *   - DAO interfaces don't need to declare checked exceptions
 *   - Servlets catch DAOException in a single try/catch and return HTTP 500
 *   - The original cause is preserved for logging
 *
 * Usage in a DAOImpl:
 *   catch (SQLException e) {
 *       throw new DAOException("Failed to fetch patient with id=" + id, e);
 *   }
 *
 * Usage in a Servlet:
 *   catch (DAOException e) {
 *       JsonUtil.writeError(resp, 500, "Database error: " + e.getMessage());
 *   }
 */
public class DAOException extends RuntimeException {

    public DAOException(String message) {
        super(message);
    }

    public DAOException(String message, Throwable cause) {
        super(message, cause);
    }

    public DAOException(Throwable cause) {
        super(cause);
    }
}
