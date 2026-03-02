
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const FlightClassServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response =await adminApi.get(
      API_ENDPOINTS.ADMIN_FLIGHTS_CLASS_LIST({ page, perPage }),
    );
    console.log('FLIGHTSServices',response);

    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_FLIGHTS_CLASS_BY_ID(id));
    console.log('response',response);
    
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_FLIGHTS_CLASS_CREATE,
      data,
    );
    return response;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_FLIGHTS_CLASS_UPDATE(id),
      data,
    );
    return response;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_FLIGHTS_CLASS_DELETE(id),
    );
    return response;
  },

  
};
