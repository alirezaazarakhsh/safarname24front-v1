// Importing part
import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Defining axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://cps.safarnameh24.com/api/v1',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

// Attach access token to request
axiosInstance.interceptors.request.use(
  (config) => {
    const authCookie = Cookies.get('auth');
    const accessUID = authCookie && JSON.parse(authCookie)?.accessUID;

    if (accessUID) {
      config.headers.Authorization = `Bearer ${accessUID}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Refresh logic
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const authCookie = Cookies.get('auth');
        const refreshUID = authCookie && JSON.parse(authCookie)?.refreshUID;

        const response = await axios.post(
          'http://cps.safarnameh24.com/api/v1/token/refresh/',
          {
            refreshToken: refreshUID,
          },
        );

        const { accessToken, refreshToken } = response.data;

        Cookies.set(
          'auth',
          JSON.stringify({
            accessUID: accessToken,
            refreshUID: refreshToken,
          }),
        );

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
