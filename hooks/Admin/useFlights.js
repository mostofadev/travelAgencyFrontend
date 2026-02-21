import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { FlightsServices } from "@/lib/services/Admin/FlightsServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFlights = ({
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
    queryKey: QUERY_KEYS.FLIGHTS.list(params),
    queryFn: () => FlightsServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

export const useFlightsById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.FLIGHTS.detail(id),
    queryFn: () => FlightsServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateFlights = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => FlightsServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.FLIGHTS.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Flights created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to create Flights",
      });
      console.error("Create error:", error);
    },
    ...options,
  });
};

export const useUpdateFlights = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => FlightsServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHTS.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHTS.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flights updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update Flights",
      });
      console.error("Update error:", error);
    },
    ...options,
  });
};

export const useDeleteFlights = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => FlightsServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.FLIGHTS.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Flights deleted successfully",
      });
    },
    onError: (error) => {
      console.log("Full Error:", error.response);
      console.log("Backend Message:", error.response?.data);
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete Flights",
      });
    //  console.error("Delete error:", error);
    },
    ...options,
  });
};
