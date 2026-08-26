import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token when available
axiosClient.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('hms_session');
    if (session) {
      try {
        const { token } = JSON.parse(session);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch { /* ignore */ }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('hms_session');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
