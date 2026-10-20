import axios from 'axios';
import { BASE_URL } from '@/constants/base-url';

/**
 * Axios API client instance with central configuration,
 * automatic trailing slash formatting for Django backend compatibility,
 * and auth token interceptor.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Django backend compliance: Ensure URL paths end with a trailing slash '/'
    if (config.url) {
      if (config.url.includes('?')) {
        const [path, query] = config.url.split('?');
        if (path && !path.endsWith('/')) {
          config.url = `${path}/?${query}`;
        }
      } else if (!config.url.endsWith('/')) {
        config.url = `${config.url}/`;
      }
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
