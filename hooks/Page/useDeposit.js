import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { DepositServices } from "@/lib/services/Page/DepositServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDepositAllBank = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BANK.list(),
    queryFn: () => DepositServices.getAllBank(),
    keepPreviousData: true,
    staleTime: 30000,
  });
};

export const useDepositRequest = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => DepositServices.DepositRequest(data),
    onSuccess: () => {
      (queryClient.invalidateQueries(QUERY_KEYS.DEPOSIT.list()),
        showCustomToast({
          type: "success",
          title: "Success",
          message: "Deposit Request successfully",
        }));
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message:
          error?.response?.data?.message || "Failed to create Deposit Request",
      });
    },
    ...options,
  });
};

export const useAdminDeposit = () => {
  return useQuery({
    queryKey: QUERY_KEYS.DEPOSIT.list(),
    queryFn: () => DepositServices.getAllDeposit(),
    keepPreviousData: true,
    staleTime: 30000,
  });
};
