import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { FlightRouteServices } from "@/lib/services/Admin/flightRouteServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFlightRoute = ({
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
    queryKey: QUERY_KEYS.ROUTE.list(params),
    queryFn: () => FlightRouteServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

export const useFlightRouteById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.ROUTE.detail(id),
    queryFn: () => FlightRouteServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateFlightRoute = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => FlightRouteServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROUTE.list() }),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Flight Route created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to create Flight Route",
      });
    },
    ...options,
  });
};

export const useUpdateFlightRoute = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => FlightRouteServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROUTE.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROUTE.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flight Route updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to update Flight Route",
      });
    },
    ...options,
  });
};

export const useDeleteFlightRoute = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => FlightRouteServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROUTE.list() });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flight Route deleted successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to delete Flight Route",
      });
    },
    ...options,
  });
};

export const useFlightRouteAirportList = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.AIRPORTS.list(),
    queryFn: async () => {
      return FlightRouteServices.airportList();
    },
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};
