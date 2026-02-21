
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const AircraftServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response =await adminApi.get(
      API_ENDPOINTS.ADMIN_AIRCRAFTS_LIST({ page, perPage }),
    );
    console.log('AircraftServices',response);

    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_AIRCRAFTS_BY_ID(id));
    console.log('response',response);
    
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_AIRCRAFTS_CREATE,
      data,
    );
    return response;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_AIRCRAFTS_UPDATE(id),
      data,
    );
    return response;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_AIRCRAFTS_DELETE(id),
    );
    return response;
  },
};
