import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    typeof window !== 'undefined'
      ? '/api/v1'
      : 'https://cps.zarvantrip.com/api/v1',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(axiosInstance(prom.config));
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    // Django APPEND_SLASH requirement: Ensure request URL path ends with a trailing slash '/'
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

    const access = localStorage.getItem('access_token');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          typeof window !== 'undefined'
            ? '/api/v1/token/refresh/'
            : 'https://cps.zarvantrip.com/api/v1/token/refresh/',
          {},
          { withCredentials: true },
        );

        const newAccess = refreshResponse.data.access;
        localStorage.setItem('access_token', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        isRefreshing = false;
        processQueue(null, newAccess);

        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        processQueue(err, null);

        localStorage.removeItem('access_token');
        console.log('Refresh token expired → force logout');

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
