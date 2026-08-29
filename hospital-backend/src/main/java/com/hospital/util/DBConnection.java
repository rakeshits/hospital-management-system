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

    private static final String URL      = requireEnvironmentVariable("DB_URL");
    private static final String USERNAME = requireEnvironmentVariable("DB_USER");
    private static final String PASSWORD = requireEnvironmentVariable("DB_PASSWORD");

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

    private static String requireEnvironmentVariable(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(name + " environment variable is not set");
        }
        return value;
    }

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
