import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { AircraftServices } from "@/lib/services/Admin/AircraftServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAircrafts = ({
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
    queryKey: QUERY_KEYS.AIRCRAFTS.list(params),
    queryFn: () => AircraftServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

export const useAircraftsById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.AIRCRAFTS.detail(id),
    queryFn: () => AircraftServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateAircrafts = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => AircraftServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.AIRCRAFTS.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Aircraft created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to create Airports",
      });
    },
    ...options,
  });
};

export const useUpdateAircrafts = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => AircraftServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AIRCRAFTS.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AIRCRAFTS.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Aircraft updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update Aircraft",
      });
    },
    ...options,
  });
};

export const useDeleteAircrafts = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => AircraftServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.AIRCRAFTS.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Aircraft deleted successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete Aircraft",
      });
    },
    ...options,
  });
};
