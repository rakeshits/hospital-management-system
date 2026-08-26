package com.hospital.util;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * CORSFilter
 *
 * Adds the necessary CORS headers to every response so the React dev server
 * (http://localhost:5173) can make credentialed requests (cookies / sessions)
 * to this Tomcat backend (http://localhost:8080).
 *
 * Mapped to "/*" via @WebFilter — runs before every servlet.
 *
 * Key headers:
 *   Access-Control-Allow-Origin      → exact origin (required when Allow-Credentials: true)
 *   Access-Control-Allow-Credentials → true  (allows cookies / session)
 *   Access-Control-Allow-Methods     → GET, POST, PUT, DELETE, OPTIONS
 *   Access-Control-Allow-Headers     → Content-Type, Authorization
 *
 * Pre-flight (OPTIONS) requests are short-circuited with 200 OK so the browser
 * doesn't wait for the actual servlet to respond.
 */
@WebFilter(filterName = "CORSFilter", urlPatterns = "/*")
public class CORSFilter implements Filter {

    /**
     * Allowed origin — the React Vite dev server.
     * In production, replace with your actual frontend domain.
     */
    private static final String ALLOWED_ORIGIN = "http://localhost:5173";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialisation needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest  req  = (HttpServletRequest)  request;
        HttpServletResponse resp = (HttpServletResponse) response;

        // ── CORS headers ─────────────────────────────────────────────────────
        resp.setHeader("Access-Control-Allow-Origin",      ALLOWED_ORIGIN);
        resp.setHeader("Access-Control-Allow-Credentials", "true");
        resp.setHeader("Access-Control-Allow-Methods",     "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        resp.setHeader("Access-Control-Allow-Headers",
                       "Content-Type, Authorization, X-Requested-With, Accept");
        resp.setHeader("Access-Control-Max-Age",           "3600");

        // ── Short-circuit pre-flight OPTIONS requests ─────────────────────────
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;   // do NOT call chain.doFilter — no servlet needed for pre-flight
        }

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // No cleanup needed
    }
}
