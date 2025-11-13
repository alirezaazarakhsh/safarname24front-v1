import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

// ===========================================================
// AXIOS INSTANCES
// ===========================================================
export const axiosInstance = axios.create({
  baseURL: 'https://cps.safarnameh24.com/api/v1',
  withCredentials: true,
});

const refreshInstance = axios.create({
  baseURL: '',
  withCredentials: true,
});

// ===========================================================
// STATE
// ===========================================================
let isRefreshing = false;
let isLoggingOut = false;
let refreshAttempted = false; // ✅ New guard: only try refresh once per session

type QueueItem = {
  resolve: () => void;
  reject: (reason: any) => void;
};
let failedQueue: QueueItem[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

// ===========================================================
// REQUEST INTERCEPTOR
// ===========================================================
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url?.includes('/token/refresh/')) return config;
    return config;
  },
  (err) => Promise.reject(err),
);

// ===========================================================
// RESPONSE INTERCEPTOR
// ===========================================================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalReq = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      retryCount?: number;
    };

    const status = error.response?.status;

    // Only handle 401 (Unauthorized)
    if (status === 401 && !originalReq.url?.includes('/token/refresh/')) {
      // If already tried refresh once and failed → don't reload again
      if (refreshAttempted) {
        console.log('Already attempted refresh – user is logged out.');
        return Promise.reject(error);
      }

      // Skip logout for public routes
      const publicRoutes = ['/login', '/register', '/forgot-password'];
      const isPublic = publicRoutes.some((path) =>
        originalReq.url?.includes(path),
      );
      if (isPublic) return Promise.reject(error);

      // Retry logic
      if (!originalReq._retry) {
        originalReq._retry = true;

        if (isRefreshing) {
          return new Promise<void>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => axiosInstance(originalReq))
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        refreshAttempted = true; // ✅ Mark that we tried once

        try {
          console.log('Attempting token refresh...');
          const refreshRes = await refreshInstance.post(
            'https://cps.safarnameh24.com/api/v1/token/refresh/',
            {},
            { withCredentials: true },
          );

          if (!refreshRes || refreshRes.status !== 200) {
            throw new Error('Refresh failed');
          }

          console.log('Token refreshed successfully.');
          processQueue(null);
          return await axiosInstance(originalReq);
        } catch (refreshErr) {
          console.error('Refresh failed:', refreshErr);
          processQueue(refreshErr);
          // ❌ DO NOT reload — just reject and let app show login UI
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

// ===========================================================
// LOGOUT (manual only, no auto-loop)
// ===========================================================
export const performLogout = async () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  console.log('Performing logout...');
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.warn('Logout API failed (non-critical):', e);
  } finally {
    if (typeof window !== 'undefined') {
      // Only reload when logout is explicitly called by user
      window.location.reload();
    }
  }
};
