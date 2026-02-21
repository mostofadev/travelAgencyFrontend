
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const FlightRouteServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response =await adminApi.get(
      API_ENDPOINTS.ADMIN_ROUTE_LIST({ page, perPage }),
    );
    console.log('ROUTEServices',response);

    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(API_ENDPOINTS.ADMIN_ROUTE_BY_ID(id));
    console.log('response',response);
    
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_ROUTE_CREATE,
      data,
    );
    return response;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_ROUTE_UPDATE(id),
      data,
    );
    return response;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_ROUTE_DELETE(id),
    );
    return response;
  },

  airportList: async () => {
    const response = await adminApi.get(
      API_ENDPOINTS.ADMIN_FORM_AIRPORT_LIST()
    );
    console.log('services airport list',response);
    
    return response;
  }
};
