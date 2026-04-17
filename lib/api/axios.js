import axios from "axios";
import { jwtManager } from "@/lib/auth/jwt";
import { handleApiError } from "./errorHandler";
import { showCustomToast } from "../ShowCustomToast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ==================== USER API ====================
export const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// User Request Interceptor - Attach JWT Token
userApi.interceptors.request.use(
  (config) => {
    const token = jwtManager.getUserToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// User Response Interceptor
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register");

    if (isAuthRequest) return Promise.reject(error);

    const token = jwtManager.getUserToken();
    if (!token) {
      showCustomToast({
        type: "error",
        title: "Unauthorized",
        message: "Please log in to continue.",
      });
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const newToken = data.access_token || data.token;
        jwtManager.setUserToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return userApi(originalRequest);
      } catch (refreshError) {
        jwtManager.removeUserToken();
        showCustomToast({
          type: "error",
          title: "Session Expired",
          message: "Your session has expired. Please log in again.",
        });
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    handleApiError(error);
    return Promise.reject(error);
  },
);

// ==================== ADMIN API ====================
export const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Admin Request Interceptor - Attach JWT Token
adminApi.interceptors.request.use(
  (config) => {
    const token = jwtManager.getAdminToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Admin Response Interceptor
adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = jwtManager.getAdminToken();

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_URL}/admin/auth/refresh`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );

          const newToken = data.access_token || data.token;
          jwtManager.setAdminToken(newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return adminApi(originalRequest);
        } catch (refreshError) {
          jwtManager.removeAdminToken();
          showCustomToast({
            type: "error",
            title: "Session Expired",
            message: "Your session has expired. Please log in again.",
          });
          window.location.href = "/admin-login";
          return Promise.reject(refreshError);
        }
      } else {
        jwtManager.removeAdminToken();
        showCustomToast({
          type: "error",
          title: "Unauthorized",
          message: "Your session has expired. Please log in again.",
        });
        window.location.href = "/admin-login";
      }
    }

    // Handle other errors (422, 500, etc.)
    handleApiError(error);

    return Promise.reject(error);
  },
);

export default userApi;
