import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const AdminDepositServices = {
  //  deposits list with filters + pagination
  getAll: async (params = {}) => {
    const response = await adminApi.get(
      API_ENDPOINTS.ADMIN_DEPOSIT_LIST(params),
    );
    return response.data;
  },

  //  deposit details
  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_DEPOSIT_BY_ID(id));
    return response.data;
  },

  // Deposit approve
  approve: async ({ id, data = {} }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_DEPOSIT_APPROVE(id),
      data,
    );
    return response.data;
  },

  // Deposit reject
  reject: async ({ id, data = {} }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_DEPOSIT_REJECT(id),
      data,
    );
    return response.data;
  },
};
