import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const BankServices = {
  getAll: async () => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_BANK_LIST());
    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_BANK_BY_ID(id));
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_BANK_CREATE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_BANK_UPDATE(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(API_ENDPOINTS.ADMIN_BANK_DELETE(id));
    return response.data;
  },
};
