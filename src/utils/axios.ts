import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://cps.safarnameh24.com/api/v1',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];
let logoutCalled = false;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token),
  );
  failedQueue = [];
};

const clearAuth = () => {
  Cookies.remove('auth');
  Cookies.remove('AUTH');
  Cookies.remove('UPN');
};

const forceLogout = () => {
  clearAuth();
  if (logoutCalled) return;
  logoutCalled = true;
  if (window.location.pathname !== '/') {
    window.location.href = '/';
  }
};

// REQUEST interceptor → attach token if exists
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authCookie = Cookies.get('auth');
    const accessUID = authCookie && JSON.parse(authCookie)?.accessUID;
    if (accessUID && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessUID}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE interceptor → refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // If unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      const authCookie = Cookies.get('auth');
      const refreshUID = authCookie && JSON.parse(authCookie)?.refreshUID;

      // If no refresh token → logout
      if (!refreshUID) {
        forceLogout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // If already refreshing → wait in queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            forceLogout();
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Attempt token refresh
        const { data } = await axios.post(
          'https://cps.safarnameh24.com/api/v1/token/refresh/',
          { refreshToken: refreshUID },
          { withCredentials: true },
        );

        const { accessToken, refreshToken } = data;

        // Save new tokens
        Cookies.set(
          'auth',
          JSON.stringify({ accessUID: accessToken, refreshUID: refreshToken }),
          { path: '/' },
        );

        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        // Retry original request
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        forceLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
