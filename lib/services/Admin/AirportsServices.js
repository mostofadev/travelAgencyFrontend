import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";
import { create } from "zustand";

export const AirportsServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response =await adminApi.get(
      API_ENDPOINTS.ADMIN_AIRPORTS_LIST({ page, perPage }),
    );
    console.log('airports',response);

    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_AIRPORTS_BY_ID(id));
    console.log('response',response);
    
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_AIRPORTS_CREATE,
      data,
    );
    return response;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_AIRPORTS_UPDATE(id),
      data,
    );
    return response;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_AIRPORTS_DELETE(id),
    );
    return response;
  },
};
