import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { AirportsServices } from "@/lib/services/Admin/AirportsServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAirports = ({
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
    queryKey: QUERY_KEYS.AIRPORTS.list(params),
    queryFn: () => AirportsServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

export const useAirportsById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.AIRPORTS.detail(id),
    queryFn: () => AirportsServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateAirports = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => AirportsServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.AIRPORTS.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Airports created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to create Airports",
      });
      console.error("Create error:", error);
    },
    ...options,
  });
};

export const useUpdateAirports = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => AirportsServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AIRPORTS.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AIRPORTS.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Airport updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update Airports",
      });
      console.error("Update error:", error);
    },
    ...options,
  });
};

export const useDeleteAirports = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => AirportsServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.AIRPORTS.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Airports deleted successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete Airports",
      });
      console.error("Delete error:", error);
    },
    ...options,
  });
};
