import { userApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

// ==================== LOGIN ====================
export const UserLoginServices = async (credentials) => {
  const { data } = await userApi.post(API_ENDPOINTS.USER_LOGIN, {
    email: credentials.email,
    password: credentials.password,
  });
  return { data };
};

// ==================== REGISTER ====================
export const UserRegisterServices = async (userData) => {
  const { data } = await userApi.post(API_ENDPOINTS.USER_REGISTER, userData);
  return { data };
};

// ==================== LOGOUT ====================
export const UserLogoutServices = async () => {
  const { data } = await userApi.post(API_ENDPOINTS.USER_LOGOUT);
  return { data };
};

// ==================== GET USER ====================
export const UserGetMeServices = async () => {
  const { data } = await userApi.get(API_ENDPOINTS.USER_ME);
  return { data };
};

// ==================== REFRESH TOKEN ====================
export const UserRefreshTokenServices = async () => {
  const { data } = await userApi.post(API_ENDPOINTS.USER_REFRESH);
  return { data };
};

// ==================== FORGOT PASSWORD ====================
export const UserForgotPasswordServices = async (email) => {
  const { data } = await userApi.post(API_ENDPOINTS.USER_FORGOT_PASSWORD, {
    email,
  });
  return { data };
};

// ==================== RESET PASSWORD ====================
export const UserResetPasswordServices = async (payload) => {
  const { data } = await userApi.post(
    API_ENDPOINTS.USER_RESET_PASSWORD,
    payload,
  );
  return { data };
};
