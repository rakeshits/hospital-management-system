package com.hospital.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection
 *
 * Provides a single static factory method to obtain a JDBC Connection to the
 * hospital_management_system MySQL database.
 *
 * Usage:
 *   try (Connection conn = DBConnection.getConnection()) { ... }
 *
 * NOTE: For production, replace with a connection pool (e.g. HikariCP or
 *       Tomcat JDBC Pool) to avoid opening a new connection per request.
 */
public class DBConnection {

    private static final String URL      = "jdbc:mysql://localhost:3306/hospital_management_system";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "root1234@";

    // Register driver once when the class is loaded
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new ExceptionInInitializerError(
                "MySQL JDBC Driver not found on classpath: " + e.getMessage());
        }
    }

    private DBConnection() { /* utility class — no instantiation */ }

    /**
     * Opens and returns a new JDBC Connection.
     * Callers are responsible for closing it (use try-with-resources).
     *
     * @return a live {@link Connection}
     * @throws SQLException if the connection cannot be established
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
}
