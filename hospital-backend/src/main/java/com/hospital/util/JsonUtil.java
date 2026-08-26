package com.hospital.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * JsonUtil
 *
 * Centralises all Gson-based JSON operations used by servlets:
 *   - Serialise any object → JSON string
 *   - Deserialise request body → typed object
 *   - Write a JSON response with the correct Content-Type header
 *   - Write a simple {"message":"..."} or {"error":"..."} envelope
 */
public class JsonUtil {

    /** Shared Gson instance — serialises null fields, formats dates as ISO-8601. */
    private static final Gson GSON = new GsonBuilder()
            .serializeNulls()
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
            .create();

    private JsonUtil() { /* utility class */ }

    // ── Serialisation ────────────────────────────────────────────────────────

    /** Converts any object to a JSON string. */
    public static String toJson(Object obj) {
        return GSON.toJson(obj);
    }

    /** Deserialises the request body JSON into the given class. */
    public static <T> T fromJson(HttpServletRequest req, Class<T> clazz) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = req.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) sb.append(line);
        }
        return GSON.fromJson(sb.toString(), clazz);
    }

    /** Deserialises a raw JSON string into the given class. */
    public static <T> T fromJson(String json, Class<T> clazz) {
        return GSON.fromJson(json, clazz);
    }

    // ── Response writers ─────────────────────────────────────────────────────

    /**
     * Writes a JSON-serialised object to the response with the given HTTP status.
     * Sets Content-Type: application/json; charset=UTF-8.
     */
    public static void writeJson(HttpServletResponse resp, int status, Object data)
            throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json;charset=UTF-8");
        try (PrintWriter out = resp.getWriter()) {
            out.print(GSON.toJson(data));
        }
    }

    /**
     * Writes a {"message": "..."} envelope — used for success responses that
     * don't return a body (e.g. DELETE 200, PUT 200).
     */
    public static void writeMessage(HttpServletResponse resp, int status, String message)
            throws IOException {
        JsonObject obj = new JsonObject();
        obj.addProperty("message", message);
        writeJson(resp, status, obj);
    }

    /**
     * Writes a {"error": "..."} envelope — used for 4xx / 5xx responses.
     */
    public static void writeError(HttpServletResponse resp, int status, String error)
            throws IOException {
        JsonObject obj = new JsonObject();
        obj.addProperty("error", error);
        writeJson(resp, status, obj);
    }

    /** Exposes the shared Gson instance for advanced use. */
    public static Gson getGson() {
        return GSON;
    }
}
