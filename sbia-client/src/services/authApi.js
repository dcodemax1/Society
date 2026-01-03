import axios from "axios";
import { tokenService } from "./tokenService";

const API_BASE_URL = "http://localhost:8000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow cookies to be sent/received
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint (backend will use refreshToken from cookie)
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (response?.data?.success && response?.data?.data?.accessToken) {
          const { accessToken } = response.data.data;
          tokenService.setToken(accessToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        tokenService.clearTokens();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authApi = {
  requestOTP: (email) => {
    return api.post("/auth/request-otp", { email });
  },

  verifyOTP: (email, otp) => {
    return api.post("/auth/verify-otp", { email, otp });
  },

  setPassword: (email, password) => {
    return api.post("/auth/set-password", { email, password });
  },

  login: (email, password) => {
    return api.post("/auth/login", { email, password });
  },

  getMe: () => {
    return api.get("/auth/me");
  },

  logout: () => {
    return api.post("/auth/logout");
  },
};

export default api;
