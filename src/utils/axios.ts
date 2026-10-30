import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL:
    typeof window !== 'undefined'
      ? '/api/v1'
      : 'https://cps.zarvantrip.com/api/v1',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

// پاکسازی تمام ردپای توکن‌های منقضی‌شده از حافظه و کوکی‌ها
const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    Cookies.remove('auth');
    Cookies.remove('AUTH');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  }
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      if (prom.config?.headers) {
        prom.config.headers.Authorization = `Bearer ${token}`;
      }
      prom.resolve(axiosInstance(prom.config));
    } else {
      // اگر توکن تمدید نشد، هدر احراز هویت را حذف کرده و به عنوان مهمان ارسال می‌کنیم
      if (prom.config?.headers) {
        delete prom.config.headers.Authorization;
        delete prom.config.headers.authorization;
      }
      prom.resolve(axiosInstance(prom.config));
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    // الزامات APPEND_SLASH جنگو: اضافه کردن اسلش پایانی به آدرس‌ها
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

    // ارسال توکن فقط در صورت وجود در حافظه مرورگر
    if (typeof window !== 'undefined') {
      const access = localStorage.getItem('access_token');
      if (access) {
        config.headers.Authorization = `Bearer ${access}`;
      }
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
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', newAccess);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        isRefreshing = false;
        processQueue(null, newAccess);

        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;

        // توکن و رفرش‌توکن سوخته‌اند: پاکسازی کامل حافظه
        clearAuthData();
        console.warn('توکن منقضی شده بود → پاکسازی حافظه و انتقال به حالت کاربر مهمان');

        // پردازش درخواست‌های در صف به عنوان مهمان
        processQueue(err, null);

        // حذف هدر خراب از همین درخواست و اجرای دوباره آن به صورت مهمان (Guest)
        if (originalRequest.headers) {
          delete originalRequest.headers.Authorization;
          delete originalRequest.headers.authorization;
        }

        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);