import userApi from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const PaymentService = {
  getPaymentStatus: async (tranId) => {
    const { data } = await userApi.get(API_ENDPOINTS.PAYMENT_STATUS(tranId));
    return data;
  },

  getBookingDetail: async (type, reference) => {
    const { data } = await userApi.get(
      API_ENDPOINTS.PAYMENT_BOOKING_DETAIL(type, reference),
    );
    return data;
  },

  initiatePayment: async ({ type, reference, amount }) => {
    const { data } = await userApi.post(API_ENDPOINTS.PAYMENT_INITIATE, {
      type,
      reference,
      amount,
    });
    return data;
  },

  // wallet payment
  walletPayment: async ({ type, reference }) => {
    const { data } = await userApi.post(API_ENDPOINTS.PAYMENT_WALLET, {
      type,
      reference,
    });
    return data;
  },

  // GET /auth/wallet
  getWallet: async () => {
    const { data } = await userApi.get(API_ENDPOINTS.USER_WALLET);
    return data;
  },

  getPaymentHistory: async (page = 1) => {
    const { data } = await userApi.get(`/auth/payments/history?page=${page}`);
    return data;
  },
};
