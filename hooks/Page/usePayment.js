import userApi from "@/lib/api/axios";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { PaymentService } from "@/lib/services/Page/PaymentServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePaymentStatus = (tranId) => {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENT_QUERY_KEYS.status(tranId),
    queryFn: () => PaymentService.getPaymentStatus(tranId),
    enabled: !!tranId,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};

// ── useBookingDetail ──────────────────────────────────────────

export const useBookingDetail = (type, reference) => {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENT_QUERY_KEYS.booking(type, reference),
    queryFn: () => PaymentService.getBookingDetail(type, reference),
    enabled: !!type && !!reference,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// ── useWalletBalance ──────────────────────────────────────────

export const useWalletBalance = () => {
  return useQuery({
    queryKey: PAYMENT_QUERY_KEYS.wallet,
    queryFn: () => PaymentService.getWallet(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

// ── useInitiatePayment ────────────────────────────────────────

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: ({ type, reference ,amount}) =>
      PaymentService.initiatePayment({ type, reference,amount }),

    onSuccess: (data) => {
      if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      }
    },

    onError: (error) => {
    },
  });
};

export const useWalletPayment = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.PAYMENT_QUERY_KEYS.wallet,
    mutationFn: ({ type, reference }) =>
      PaymentService.walletPayment({ type, reference }),

    onSuccess: (data) => {
      if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      }
    },

    onError: (error) => {
    },
  });
};


export function usePaymentHistory(page = 1) {
  return useQuery({
    queryKey: ["payment-history", page],
    queryFn: () => PaymentService.getPaymentHistory(page),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
  });
}