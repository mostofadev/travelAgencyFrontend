import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { AdminDepositServices } from "@/lib/services/Admin/AdminDepositServices";
import { showCustomToast } from "@/lib/ShowCustomToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Deposits List ───────────────────────────────────────────
export const useAdminDeposits = ({
  page = 1,
  perPage = 10,
  filters = {},
  options = {},
} = {}) => {
  const params = { page, perPage, ...filters };

  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_DEPOSIT.list(params),
    queryFn: () => AdminDepositServices.getAll(params),
    keepPreviousData: true,
    staleTime: 30000,
    ...options,
  });
};

// ─── Single Deposit by ID ────────────────────────────────────────
export const useAdminDepositById = ({ id, options = {} } = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.ADMIN_DEPOSIT.detail(id),
    queryFn: () => AdminDepositServices.getById({ id }),
    enabled: !!id,
    ...options,
  });
};

// ─── Deposit Approve ─────────────────────────────────────────────
export const useApproveDeposit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => AdminDepositServices.approve({ id, data }),
    onSuccess: (_, variables) => {
      // List refresh
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_DEPOSIT.lists(),
      });
      // Detail refresh
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_DEPOSIT.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Approved",
        message: "Deposit approved successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to approve deposit",
      });
    },
    ...options,
  });
};

// ─── Deposit Reject ──────────────────────────────────────────────
export const useRejectDeposit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => AdminDepositServices.reject({ id, data }),
    onSuccess: (_, variables) => {
      // List refresh
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_DEPOSIT.lists(),
      });
      // Detail refresh
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ADMIN_DEPOSIT.detail(variables.id),
      });

      showCustomToast({
        type: "success",
        title: "Rejected",
        message: "Deposit rejected successfully",
      });
    },
    onError: (error) => {
      showCustomToast({
        type: "error",
        title: "Error",
        message: error?.response?.data?.message || "Failed to reject deposit",
      });
    },
    ...options,
  });
};
