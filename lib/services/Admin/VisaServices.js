// services/visaTypeService.js
import { adminApi } from "@/lib/api/axios";
import { VISA_ENDPOINTS } from "@/lib/api/endpoints/VisaEndpoint";



export const visaService = {
  getAll: async ({ page = 1, perPage = 10 } = {}) => {
    const response = await adminApi.get(
      VISA_ENDPOINTS.ADMIN_VISA({ page, perPage }),
    );
    return response.data;
  },

  // Get single visa by ID
  getById: async (id) => {
    const response = await adminApi.get(VISA_ENDPOINTS.ADMIN_VISA_BY_ID(id));
    return response.data;
  },

  create: async (data) => {
    try {
      const response = await adminApi.post(
        VISA_ENDPOINTS.ADMIN_VISA_CREATE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
     
      throw error;
    }
  },

  // Update visa type
  update: async ({ id, data }) => {
    // Debug FormData
    for (let [key, value] of data.entries()) {
      if (value instanceof File) {
        
      } else {
      }
    }
    const response = await adminApi.post(
      VISA_ENDPOINTS.ADMIN_VISA_UPDATE(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  // Delete visa type
  delete: async (id) => {
    const response = await adminApi.delete(
      VISA_ENDPOINTS.ADMIN_VISA_DELETE(id),
    );
    return response.data;
  },
};
