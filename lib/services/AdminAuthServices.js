import { adminApi } from "../api/axios";
import { API_ENDPOINTS } from "../api/endpoints/endpoints";

export const AdminLoginServices = async(credentials) => {
    const response = await adminApi.post(
        API_ENDPOINTS.ADMIN_LOGIN,
        credentials
      );
      return response;
}