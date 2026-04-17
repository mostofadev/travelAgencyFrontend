import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { TourPackageServices } from "@/lib/services/Admin/TourPackageServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTourPackages = ({
  page = 1,
  perPage = 10,
  filters = {},
  options = {},
}) => {
  const params = {
    page,
    per_page: perPage,
    ...filters,
  };

  return useQuery({
    queryKey: QUERY_KEYS.PACKAGES.list(params),
    queryFn: () => TourPackageServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

// Get single tour package by ID
export const useTourPackagesById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.PACKAGES.detail(id),
    queryFn: () => TourPackageServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

// Create tour package

// Create tour package
export const useCreateTourPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => TourPackageServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Tour Package created successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to create tour package",
      });
    },
    ...options,
  });
};

// Update tour package
export const useUpdateTourPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => TourPackageServices.update({ id, data }), 
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.list());
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.detail(variables.id));
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Tour Package updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to update tour package",
      });
    },
    ...options,
  });
};

// Delete tour package
export const useDeleteTourPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => TourPackageServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Tour Package deleted successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to delete tour package",
      });
    },
    ...options,
  });
};

// Toggle active status
export const useToggleActiveTourPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => TourPackageServices.toggleActive({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Status updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update status",
      });
    },
    ...options,
  });
};

// Toggle featured status
export const useToggleFeaturedTourPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => TourPackageServices.toggleFeatured({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.PACKAGES.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Featured status updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to update featured status",
      });
    },
    ...options,
  });
};

// Get featured tours
export const useFeaturedTourPackages = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.PACKAGES.featured(),
    queryFn: () => TourPackageServices.getFeatured(),
    staleTime: 60000,
    ...options,
  });
};

// Get upcoming tours
export const useUpcomingTourPackages = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.PACKAGES.upcoming(),
    queryFn: () => TourPackageServices.getUpcoming(),
    staleTime: 60000,
    ...options,
  });
};
