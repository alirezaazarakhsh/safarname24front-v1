import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

// Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://cps.safarnameh24.com/api/v1',
  withCredentials: true,
});

// Refresh token logic
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve(token);
  });
  failedQueue = [];
};

// REQUEST Interceptor
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

const forceLogout = () => {
  Cookies.remove('AUTH');
  Cookies.remove('UPN');
  Cookies.remove('auth');

  window.location.href = '/?auth_open=true';
};

// RESPONSE Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

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
        const authCookie = Cookies.get('auth');
        const refreshUID = authCookie && JSON.parse(authCookie)?.refreshUID;

        if (!refreshUID) throw new Error('No refresh token');

        const { data } = await axios.post(
          'https://cps.safarnameh24.com/api/v1/token/refresh/',
          { refreshToken: refreshUID },
          { withCredentials: true },
        );

        const { accessToken, refreshToken } = data;

        Cookies.set(
          'auth',
          JSON.stringify({
            accessUID: accessToken,
            refreshUID: refreshToken,
          }),
          { path: '/' },
        );

        axiosInstance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        forceLogout(); // 🚨 Force logout on refresh fail
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
