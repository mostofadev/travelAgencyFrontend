"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";
import { jwtManager } from "@/lib/auth/jwt";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  UserLoginServices,
  UserRegisterServices,
  UserLogoutServices,
  UserGetMeServices,
  UserRefreshTokenServices,
  UserForgotPasswordServices,
  UserResetPasswordServices,
} from "@/lib/services/AuthServices";
import { showCustomToast } from "@/lib/ShowCustomToast";

// ==================== LOGOUT (standalone) ====================
export const useUserLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await UserLogoutServices();
      } catch (error) {
      }
    },
    onSettled: () => {
      jwtManager.removeUserToken();
      queryClient.clear();
      showCustomToast({
        type: "error",
        title: "Success",
        message: "Logged out successfully.",
      });
      router.push("/login");
    },
  });
};

// ==================== MAIN AUTH HOOK ====================
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ==================== LOGIN ====================
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await UserLoginServices(credentials);
      return { data, redirect: credentials.redirect };
    },
    onSuccess: ({ data, redirect }) => {
      const token = data.access_token;
      const user = data.user;

      jwtManager.setUserToken(token);
      jwtManager.setUserData(user);
      queryClient.setQueryData(["user"], user);

      showCustomToast({
        title: "Login Successful",
        message: "You have been logged in successfully.",
        type: "success",
      });

      if (redirect?.startsWith("/")) {
        router.push(redirect);
      } else {
        router.push("/user/dashboard");
      }
    },
    onError: (error) => {
      const message =
        error.status === 401
          ? "Invalid credentials. Please check your email and password."
          : error.response?.data?.message ||
            error.response?.data?.error ||
            "Login failed. Please try again.";

      showCustomToast({
        title: "Login Failed",
        message,
        type: "error",
      });
    },
  });

  // ==================== REGISTER ====================
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const { data } = await UserRegisterServices(userData);
      return data;
    },
    onSuccess: (data) => {
      const token = data.access_token || data.token;
      const user = data.user;

      jwtManager.setUserToken(token);
      jwtManager.setUserData(user);
      queryClient.setQueryData(["user"], user);

      showCustomToast({
        title: "Register Successful",
        message: "You have been registered successfully.",
        type: "success",
      });

      router.push("/user/dashboard");
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error();
          showCustomToast({
            title: "Register Failed",
            message: errors[key][0],
            type: "error",
          });
        });
      } else {
        const message = error.response?.data?.message || "Registration failed";
        showCustomToast({
          title: "Register Failed",
          message: message,
          type: "error",
        });
      }
    },
  });

  // ==================== GET USER ====================
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const cachedUser = jwtManager.getUserData();
      if (cachedUser) return cachedUser;

      const { data } = await UserGetMeServices();
      const userData = data.user || data;
      jwtManager.setUserData(userData);
      return userData;
    },
    enabled: jwtManager.isUserAuthenticated(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // ==================== LOGOUT ====================
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await UserLogoutServices();
      } catch (error) {
      }
    },
    onSettled: () => {
      jwtManager.removeUserToken();
      queryClient.clear();
      showCustomToast({
        type: "error",
        title: "Success",
        message: "Logged out successfully.",
      });
      router.push("/login");
    },
  });

  // ==================== REFRESH TOKEN ====================
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const { data } = await UserRefreshTokenServices();
      return data;
    },
    onSuccess: (data) => {
      const newToken = data.access_token || data.token;
      jwtManager.setUserToken(newToken);
    },
  });

  // ==================== FORGOT PASSWORD ====================
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email) => {
      const { data } = await UserForgotPasswordServices(email);
      return data;
    },
    onSuccess: () => {
      showCustomToast({
        title: "Email Sent",
        message: "Password reset link sent to your email.",
        type: "success",
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.errors?.email?.[0] ||
        error.response?.data?.error ||
        "Failed to send reset link. Please try again.";

      showCustomToast({
        title: "Failed",
        message,
        type: "error",
      });
    },
  });

  // ==================== RESET PASSWORD ====================
  const resetPasswordMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await UserResetPasswordServices(payload);
      return data;
    },
    onSuccess: () => {
      showCustomToast({
        title: "Password Reset",
        message: "Your password has been reset successfully.",
        type: "success",
      });
      router.push("/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.errors?.password?.[0] ||
        error.response?.data?.error ||
        "Failed to reset password. Please try again.";

      showCustomToast({
        title: "Failed",
        message,
        type: "error",
      });
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: jwtManager.isUserAuthenticated(),

    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,

    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,

    logout: () => logoutMutation.mutate(),
    isLogoutLoading: logoutMutation.isPending,

    refreshToken: () => refreshTokenMutation.mutate(),

    forgotPassword: forgotPasswordMutation.mutate,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isForgotPasswordSuccess: forgotPasswordMutation.isSuccess,

    resetPassword: resetPasswordMutation.mutate,
    isResetPasswordLoading: resetPasswordMutation.isPending,
  };
}
