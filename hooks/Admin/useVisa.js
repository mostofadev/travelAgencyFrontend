// hooks/useVisaType.js
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { visaService } from "@/lib/services/Admin/VisaServices";
import { showCustomToast } from "@/lib/ShowCustomToast";

/**
 * useVisaTypes - Get all visa types with pagination
 *
 * @param {Object} params - { page, perPage }
 * @param {Object} options - React Query options
 */
export function useVisas(params = {}, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.VISAS.list(params),
    queryFn: () => visaService.getAll(params),
    ...options,
  });
}

/**
 * useVisa - Get single visa by ID
 *
 * @param {number} id - Visa ID
 * @param {Object} options - React Query options
 */
export function useVisa(id, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.VISAS.detail(id),
    queryFn: () => visaService.getById(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * useCreateVisa - Create new visa
 */
export function useCreateVisa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISAS.lists(),
      });

      showCustomToast({
        title: "Visa Created",
        message: "The visa has been created successfully.",
        type: "success",
      });
    },
  });
}

/**
 * useUpdateVisa - Update visa
 */
export function useUpdateVisa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaService.update,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISAS.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISAS.detail(variables.id),
      });

      showCustomToast({
        title: "Visa Updated",
        message: "The visa has been updated successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to update visa";

      showCustomToast({
        title: "Visa Updated",
        message: message,
        type: "error",
      });
    },
  });
}

/**
 * useDeleteVisa - Delete visa
 */
export function useDeleteVisa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: visaService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VISAS.all,
      });

      showCustomToast({
        title: "Visa Deleted",
        message: "The visa has been deleted successfully.",
        type: "success",
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Failed to delete visa";

      showCustomToast({
        title: "Visa Deleted",
        message: message,
        type: "error",
      });
    },
  });
}

/**
 * useVisaPrefetch - Prefetch visa for better UX
 */
export function useVisaPrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchVisa: (id) => {
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.VISAS.detail(id),
        queryFn: () => visaService.getById(id),
      });
    },
  };
}
