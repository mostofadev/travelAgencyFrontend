
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const FlightsServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response =await adminApi.get(
      API_ENDPOINTS.ADMIN_FLIGHTS_LIST({ page, perPage }),
    );

    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_FLIGHTS_BY_ID(id));
    
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_FLIGHTS_CREATE,
      data,
    );
    return response;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_FLIGHTS_UPDATE(id),
      data,
    );
    return response;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_FLIGHTS_DELETE(id),
    );
    return response;
  },

  
};
