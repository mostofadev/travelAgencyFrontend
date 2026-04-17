import { userApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const WalletServices = {
  getBalance: async () => {
    const response = await userApi.get(API_ENDPOINTS.USER_WALLET);
    
    return response.data;
  },
};
