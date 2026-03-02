import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { FlightClassServices } from "@/lib/services/Admin/FlightClassServices";
import { FlightsServices } from "@/lib/services/Admin/FlightsServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFlightClass = ({
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
    queryKey: QUERY_KEYS.FLIGHTS_CLASS.list(params),
    queryFn: () => FlightClassServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

export const useFlightClassById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.FLIGHTS_CLASS.detail(id),
    queryFn: () => FlightClassServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateFlightClass = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => FlightClassServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.FLIGHTS_CLASS.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Flight Class created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to create Flight Class",
      });
      console.error("Create error:", error);
    },
    ...options,
  });
};

export const useUpdateFlightClass = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => FlightClassServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHTS_CLASS.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHTS_CLASS.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flight Class updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update Flight Class",
      });
      console.error("Update error:", error);
    },
    ...options,
  });
};

export const useDeleteFlightClass = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => FlightClassServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.FLIGHTS_CLASS.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flight Class deleted successfully",
      });
    },
    onError: (error) => {
      console.log("Full Error:", error.response);
      console.log("Backend Message:", error.response?.data);
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete Flight Class",
      });
    //  console.error("Delete error:", error);
    },
    ...options,
  });
};
