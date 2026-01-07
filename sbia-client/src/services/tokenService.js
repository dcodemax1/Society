// Token management service for handling access tokens

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ROLE_KEY = "userRole";

export const tokenService = {
  // Store tokens
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  setRefreshToken: (token) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  // Store user role
  setUserRole: (role) => {
    localStorage.setItem(USER_ROLE_KEY, role);
  },

  // Retrieve tokens
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Get user role
  getUserRole: () => {
    return localStorage.getItem(USER_ROLE_KEY);
  },

  // Check if token exists
  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Clear tokens and user data
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
  },

  // Get authorization header
  getAuthHeader: () => {
    const token = tokenService.getToken();
    return token ? `Bearer ${token}` : null;
  },
};
