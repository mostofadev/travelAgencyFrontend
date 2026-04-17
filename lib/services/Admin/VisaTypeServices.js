
import { adminApi } from "@/lib/api/axios";
import { VISA_ENDPOINTS } from "@/lib/api/endpoints/VisaEndpoint";



export const visaTypeService = {
  getAll: async ({ page = 1, perPage = 10 } = {}) => {
    const response = await adminApi.get(
      VISA_ENDPOINTS.ADMIN_VISA_TYPES({ page, perPage })
    );
    return response.data;
  },

  // Get single visa type by ID
  getById: async (id) => {
    const response = await adminApi.get(
      VISA_ENDPOINTS.ADMIN_VISA_TYPE_BY_ID(id)
    );
    return response.data;
  },

  // Create new visa type
  create: async (data) => {
    const response = await adminApi.post(
      VISA_ENDPOINTS.ADMIN_VISA_TYPE_CREATE,
      data
    );
    return response.data;
  },

  // Update visa type
  update: async ({ id, data }) => {
    const response = await adminApi.put(
      VISA_ENDPOINTS.ADMIN_VISA_TYPE_UPDATE(id),
      data
    );
    return response.data;
  },

  // Delete visa type
  delete: async (id) => {
    const response = await adminApi.delete(
      VISA_ENDPOINTS.ADMIN_VISA_TYPE_DELETE(id)
    );
    return response.data;
  },
};