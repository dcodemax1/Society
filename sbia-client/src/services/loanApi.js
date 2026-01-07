import axios from "axios";
import { tokenService } from "./tokenService";

const API_BASE_URL = "http://localhost:8000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      "Request to:",
      config.baseURL + config.url,
      "Headers:",
      config.headers
    );
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  async (error) => {
    console.error("Response error:", error);
    const originalRequest = error.config;

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
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
        console.error("Token refresh failed:", refreshError);
        tokenService.clearTokens();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Loan API calls
export const loanApi = {
  /**
   * Submit a new loan application
   */
  submitLoan: (loanData) => {
    console.log("Submitting loan data:", loanData);
    return api.post("/loans/submit", loanData);
  },

  /**
   * Get all loans (admin only)
   */
  getAllLoans: (filters = {}) => {
    return api.get("/loans", { params: filters });
  },

  /**
   * Get loan by ID
   */
  getLoanById: (loanId) => {
    return api.get(`/loans/details/${loanId}`);
  },

  /**
   * Get loans by member ID
   */
  getLoansByMemberId: (memberId) => {
    return api.get(`/loans/member/${memberId}`);
  },

  /**
   * Update loan status (admin only)
   */
  updateLoanStatus: (loanId, status, adminNotes = null) => {
    return api.put(`/loans/${loanId}/status`, { status, adminNotes });
  },

  /**
   * Get loan statistics (admin only)
   */
  getLoanStatistics: () => {
    return api.get("/loans/statistics/dashboard");
  },
};

export default api;
