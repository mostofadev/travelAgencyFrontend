"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";
import { jwtManager } from "@/lib/auth/jwt";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AdminLoginServices } from "@/lib/services/AdminAuthServices";

export function useAdminAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ==================== LOGIN ====================
  const loginMutation = useMutation({

    mutationFn: async (credentials) => {
      const { data } = await AdminLoginServices(credentials);
      return data;
     
      
    },
    onSuccess: (data) => {
      const token = data.access_token || data.token;
      const admin = data.admin || data.user || data;

      jwtManager.setAdminToken(token);
      jwtManager.setAdminData(admin);

      toast.success("Admin login successful!", {
        duration: 2000,
      });

      queryClient.setQueryData(["admin"], admin);

      router.push("/admin/dashboard");
    },
    onError: (error) => {
      // Handle different error types
      if (error.response?.status === 401) {
        toast.error("Incorrect email or password");
      } else if (error.response?.status === 403) {
        toast.error("You do not have access");
      } else if (error.response?.data?.errors) {
        // Laravel validation errors
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed";
        toast.error(message);
      }
    },
  });

  // ==================== GET ADMIN DATA ====================
  const {
    data: admin,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      // First check localStorage for cached data
      const cachedAdmin = jwtManager.getAdminData();
      if (cachedAdmin) return cachedAdmin;

      // If not in cache, fetch from API
      try {
        const { data } = await adminApi.get(API_ENDPOINTS.ADMIN_ME);

        // Handle different response structures
        const adminData = data.admin || data.user || data;

        // Cache the data
        jwtManager.setAdminData(adminData);

        return adminData;
      } catch (error) {
        // If 401, clear token and redirect
        if (error.response?.status === 401) {
          jwtManager.removeAdminToken();
          throw error;
        }
        throw error;
      }
    },
    enabled: jwtManager.isAdminAuthenticated(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ==================== LOGOUT ====================
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await adminApi.post(API_ENDPOINTS.ADMIN_LOGOUT);
      } catch (error) {
      }
    },
    onSettled: () => {
      jwtManager.removeAdminToken();
      queryClient.clear();

      toast.success("Logout successful");
      router.push("/admin-login");
    },
  });

  // ==================== REFRESH TOKEN ====================
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const { data } = await adminApi.post(API_ENDPOINTS.ADMIN_REFRESH);
      return data;
    },
    onSuccess: (data) => {
      const newToken = data.access_token || data.token;
      jwtManager.setAdminToken(newToken);
      
      toast.success("Session refreshed", {
        duration: 1500,
      });
    },
    onError: (error) => {
      toast.error("Session refresh failed");
      
      // If refresh fails, logout
      jwtManager.removeAdminToken();
      queryClient.clear();
      router.push("/admin-login");
    },
  });

  // ==================== UPDATE PROFILE ====================
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const { data } = await adminApi.put(
        API_ENDPOINTS.ADMIN_PROFILE,
        profileData
      );
      return data;
    },
    onSuccess: (data) => {
      const updatedAdmin = data.admin || data.user || data;
      
      // Update cache
      jwtManager.setAdminData(updatedAdmin);
      queryClient.setQueryData(["admin"], updatedAdmin);
      
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Profile update failed");
      }
    },
  });

  // ==================== RETURN VALUES ====================
  return {
    // Admin data
    admin,
    isLoading,
    error,
    isAuthenticated: jwtManager.isAdminAuthenticated(),

    // Login
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    // Logout
    logout: () => logoutMutation.mutate(),
    isLogoutLoading: logoutMutation.isPending,

    // Refresh
    refreshToken: () => refreshTokenMutation.mutate(),
    isRefreshing: refreshTokenMutation.isPending,

    // Update Profile
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,

    // Refetch admin data
    refetchAdmin: refetch,
  };
}

export default useAdminAuth;
