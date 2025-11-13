import { axiosInstance } from './axios'; // Import your axios for API calls

/**
 * Client-side: Set HttpOnly cookies via API call to login/refresh endpoint.
 * @param credentials - e.g., { email, password } for login.
 */
export const setAuthCookies = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login', credentials);
    // API sets HttpOnly cookies via Set-Cookie header
    return data; // e.g., { success: true }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Client-side: Refresh tokens via API.
 */
export const refreshAuth = async () => {
  try {
    const { data } = await axiosInstance.post('/api/auth/refresh');
    return data; // e.g., { success: true }
  } catch (error) {
    console.error('Refresh failed:', error);
    throw error;
  }
};

/**
 * Client-side: Clear HttpOnly cookies via API.
 */
export const clearAuthCookies = async () => {
  try {
    await axiosInstance.post('/api/auth/logout');
    // API clears cookies via Set-Cookie
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
