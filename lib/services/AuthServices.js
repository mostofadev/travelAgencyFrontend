import { API_ENDPOINTS } from "../api/endpoints/endpoints";
import { userApi } from "../api/axios";

export const UserLoginServices = async (credentials) => {
  const response = await userApi.post(API_ENDPOINTS.USER_LOGIN, credentials);
  return response;
};
