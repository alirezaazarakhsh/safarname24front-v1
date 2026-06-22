import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://cps.safarnameh24.com/api/v1',
  withCredentials: true,
});

let isRefreshing = false;

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error),
);

// axiosInstance.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         if (!isRefreshing) {
//           isRefreshing = true;

//           await axiosInstance.post(
//             '/token/refresh/',
//             {},
//             { withCredentials: true },
//           );
//           isRefreshing = false;
//         }

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         isRefreshing = false;

//         console.log('Refresh token expired → force logout');
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   },
// );
