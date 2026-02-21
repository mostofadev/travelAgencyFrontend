"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";
import { jwtManager } from "@/lib/auth/jwt";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserLoginServices } from "@/lib/services/AuthServices";
import CustomToast from "@/components/ui/CustomToast";
import { showCustomToast } from "@/lib/ShowCustomToast";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ==================== LOGIN ====================
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await UserLoginServices(credentials);
      return data;
    },
    onSuccess: (data) => {
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
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log("error dd", error);
      if (error.status === 401) {
         showCustomToast({
          title: "Login Failed",
          message: "Invalid credentials. Please check your email and password.",
          type: "error",
        });
      }
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
      showCustomToast({
        title: "Login Failed",
        message: message,
        type: "error",
      });
      //toast.error(message);
    },
  });

  // ==================== REGISTER ====================
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const { data } = await userApi.post(
        API_ENDPOINTS.USER_REGISTER,
        userData,
      );
      return data;
    },
    onSuccess: (data) => {
      const token = data.access_token || data.token;
      const user = data.user;

      jwtManager.setUserToken(token);
      jwtManager.setUserData(user);

      toast.success("রেজিস্ট্রেশন সফল হয়েছে! 🎉");
      queryClient.setQueryData(["user"], user);

      router.push("/dashboard");
    },
    onError: (error) => {
      // Laravel validation errors
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        const message =
          error.response?.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে";
        toast.error(message);
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
      // প্রথমে localStorage থেকে দেখা
      const cachedUser = jwtManager.getUserData();
      if (cachedUser) return cachedUser;

      // না থাকলে API call
      const { data } = await userApi.get(API_ENDPOINTS.USER_ME);

      // Laravel JWT response এ সাধারণত direct user object থাকে
      const userData = data.user || data;
      jwtManager.setUserData(userData);

      return userData;
    },
    enabled: jwtManager.isUserAuthenticated(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ==================== LOGOUT ====================
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        // Laravel JWT logout endpoint call (optional)
        await userApi.post(API_ENDPOINTS.USER_LOGOUT);
      } catch (error) {
        // Ignore errors on logout
        console.log("Logout error:", error);
      }
    },
    onSettled: () => {
      // সব data clear করা
      jwtManager.removeUserToken();
      queryClient.clear();

      toast.success("লগআউট সফল হয়েছে");
      router.push("/login");
    },
  });

  // ==================== REFRESH TOKEN ====================
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const { data } = await userApi.post(API_ENDPOINTS.USER_REFRESH);
      return data;
    },
    onSuccess: (data) => {
      const newToken = data.access_token || data.token;
      jwtManager.setUserToken(newToken);
      toast.success("সেশন রিফ্রেশ হয়েছে");
    },
  });

  return {
    // User data
    user,
    isLoading,
    error,
    isAuthenticated: jwtManager.isUserAuthenticated(),

    // Mutations
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,

    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,

    logout: () => logoutMutation.mutate(),
    isLogoutLoading: logoutMutation.isPending,

    refreshToken: () => refreshTokenMutation.mutate(),
  };
}
