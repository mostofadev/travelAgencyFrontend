// hooks/useVisaType.js
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { toast } from "react-hot-toast"; // or your toast library
import { visaTypeService } from "@/lib/services/Admin/VisaTypeServices";

/**
 * useVisaTypes - Get all visa types with pagination
 *
 * @param {Object} params - { page, perPage }
 * @param {Object} options - React Query options
 */
export function useVisaTypes(params = {}, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.VISA_TYPES.list(params),
    queryFn: () => visaTypeService.getAll(params),
    ...options,
  });
}

/**
 * useVisaType - Get single visa type by ID
 *
 * @param {number} id - Visa type ID
 * @param {Object} options - React Query options
 */
export function useVisaType(id, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.VISA_TYPES.detail(id),
    queryFn: () => visaTypeService.getById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * useCreateVisaType - Create new visa type
 */
export function useCreateVisaType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaTypeService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISA_TYPES.lists(),
      });

      showCustomToast({
        title: "Visa Type Created",
        message: "The visa type has been created successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to create visa type";

      ShowCustomToast({
        title: "Visa Type Created",
        message: message,
        type: "error",
      });
    },
  });
}

/**
 * useUpdateVisaType - Update visa type
 */
export function useUpdateVisaType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaTypeService.update,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISA_TYPES.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISA_TYPES.detail(variables.id),
      });

      toast.success("Visa type updated successfully!");
      showCustomToast({
        title: "Visa Type Updated",
        message: "The visa type has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to update visa type";

      ShowCustomToast({
        title: "Visa Type Updated",
        message: message,
        type: "error",
      });
    },
  });
}

/**
 * useDeleteVisaType - Delete visa type
 */
export function useDeleteVisaType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaTypeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISA_TYPES.all,
      });
      showCustomToast({
        title: "Visa Type Deleted",
        message: "The visa type has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Failed to delete visa type";

      ShowCustomToast({
        title: "Visa Type Deleted",
        message: message,
        type: "error",
      });
    },
  });
}

/**
 * useVisaTypePrefetch - Prefetch visa type for better UX
 */
export function useVisaTypePrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchVisaType: (id) => {
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.VISA_TYPES.detail(id),
        queryFn: () => visaTypeService.getById(id),
      });
    },
  };
}
