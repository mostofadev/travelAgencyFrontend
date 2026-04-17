import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { BankServices } from "@/lib/services/Admin/BankServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBank = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BANK.list(),
    queryFn: () => BankServices.getAll(),
    keepPreviousData: true,
    staleTime: 30000,
  });
};

export const useBankById = ({ id, options = {} }) => {
  return useQuery({
    queryKey: QUERY_KEYS.BANK.detail(id),
    queryFn: () => BankServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

export const useCreateBank = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => BankServices.create(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.BANK.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Bank created successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to create Bank",
      });
    },
    ...options,
  });
};

export const useUpdateBank = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => BankServices.update({ id, data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK.list(),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Success",
        message: "Bank updated successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to update Bank",
      });
    },
    ...options,
  });
};

export const useDeleteBank = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => BankServices.delete({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BANK.list());
      showCustomToast({
        type: "success",
        title: "Success",
        message: "Bank deleted successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete Bank",
      });
    },
    ...options,
  });
};
