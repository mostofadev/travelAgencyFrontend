import userApi from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const DepositServices = {
  getAllBank: async () => {
    const response = await userApi.get(API_ENDPOINTS.USER_ALL_BANK());

    return response.data;
  },

  DepositRequest: async (data) => {
    const response = await userApi.post(API_ENDPOINTS.DEPOSIT_REQUEST(), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getAllDeposit: async () => {
    const response = await userApi.get(API_ENDPOINTS.DEPOSIT_REQUEST());
    return response.data;
  },
  
};
