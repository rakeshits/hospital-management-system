package com.hospital.util;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

/**
 * SessionUtil
 *
 * Provides helper methods for reading and validating the authenticated user's
 * session attributes set by LoginServlet on successful login:
 *
 *   session.setAttribute("userId",   int)
 *   session.setAttribute("userRole", String)   // "admin" | "doctor" | "patient" | "staff"
 *   session.setAttribute("userName", String)
 *
 * Usage in a servlet:
 *
 *   if (!SessionUtil.isLoggedIn(req, resp)) return;          // sends 401 and returns
 *   if (!SessionUtil.hasRole(req, resp, "admin")) return;    // sends 403 and returns
 *   int userId = SessionUtil.getUserId(req);
 */
public class SessionUtil {

    // Session attribute keys — keep in sync with LoginServlet
    public static final String ATTR_USER_ID   = "userId";
    public static final String ATTR_USER_ROLE = "userRole";
    public static final String ATTR_USER_NAME = "userName";

    private SessionUtil() { /* utility class */ }

    // ── Session readers ──────────────────────────────────────────────────────

    /** Returns the current HttpSession, or null if none exists. */
    public static HttpSession getSession(HttpServletRequest req) {
        return req.getSession(false);
    }

    /**
     * Returns true if a valid session with a userId attribute exists.
     * Does NOT write any response — use {@link #isLoggedIn(HttpServletRequest, HttpServletResponse)}
     * when you also want to send a 401 automatically.
     */
    public static boolean isAuthenticated(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        return session != null && session.getAttribute(ATTR_USER_ID) != null;
    }

    /**
     * Checks authentication. If not authenticated, writes a 401 JSON error and
     * returns false so the caller can immediately {@code return}.
     */
    public static boolean isLoggedIn(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {
        if (!isAuthenticated(req)) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_UNAUTHORIZED,
                    "Not authenticated. Please log in.");
            return false;
        }
        return true;
    }

    /**
     * Returns the logged-in user's role string, or null if no session.
     * Values: "admin", "doctor", "patient", "staff"
     */
    public static String getRole(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return null;
        Object role = session.getAttribute(ATTR_USER_ROLE);
        return role != null ? role.toString() : null;
    }

    /**
     * Returns the logged-in user's userId (int), or -1 if no session.
     */
    public static int getUserId(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return -1;
        Object id = session.getAttribute(ATTR_USER_ID);
        return id != null ? (int) id : -1;
    }

    /**
     * Returns the logged-in user's display name, or null if no session.
     */
    public static String getUserName(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return null;
        Object name = session.getAttribute(ATTR_USER_NAME);
        return name != null ? name.toString() : null;
    }

    // ── Role checks ──────────────────────────────────────────────────────────

    /** Returns true if the session role exactly matches the given role. */
    public static boolean isRole(HttpServletRequest req, String role) {
        return role != null && role.equalsIgnoreCase(getRole(req));
    }

    /** Returns true if the session role is one of the given roles. */
    public static boolean isAnyRole(HttpServletRequest req, String... roles) {
        String current = getRole(req);
        if (current == null) return false;
        for (String r : roles) {
            if (current.equalsIgnoreCase(r)) return true;
        }
        return false;
    }

    /**
     * Checks that the session role matches at least one of the allowed roles.
     * If not, writes a 403 JSON error and returns false.
     */
    public static boolean hasRole(HttpServletRequest req, HttpServletResponse resp,
                                   String... allowedRoles) throws IOException {
        if (!isAnyRole(req, allowedRoles)) {
            JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                    "Access denied. Insufficient privileges.");
            return false;
        }
        return true;
    }

    /**
     * Convenience: checks that the logged-in userId matches the given resourceOwnerId,
     * OR that the session role is admin or doctor (who have elevated access).
     * Writes 403 and returns false if neither condition is met.
     *
     * Use this to guard endpoints like GET /api/bills/{id} where a patient
     * should only see their own bills.
     */
    public static boolean isOwnerOrElevated(HttpServletRequest req, HttpServletResponse resp,
                                             int resourceOwnerId) throws IOException {
        int sessionUserId = getUserId(req);
        if (sessionUserId == resourceOwnerId || isAnyRole(req, "admin", "doctor", "staff")) {
            return true;
        }
        JsonUtil.writeError(resp, HttpServletResponse.SC_FORBIDDEN,
                "Access denied. You can only access your own data.");
        return false;
    }

    // ── Session lifecycle ────────────────────────────────────────────────────

    /**
     * Creates (or retrieves) a session and stores the authenticated user's
     * attributes. Called by LoginServlet after credential verification.
     */
    public static void createSession(HttpServletRequest req, int userId,
                                      String role, String name) {
        HttpSession session = req.getSession(true);
        session.setAttribute(ATTR_USER_ID,   userId);
        session.setAttribute(ATTR_USER_ROLE, role.toLowerCase());
        session.setAttribute(ATTR_USER_NAME, name);
        session.setMaxInactiveInterval(60 * 60); // 1 hour
    }

    /** Invalidates the current session (logout). */
    public static void invalidateSession(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null) session.invalidate();
    }
}
