
import { adminApi } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const TourPackageServices = {
  getAll: async ({ page = 1, perPage = 10 }) => {
    const response = await adminApi.get(
      API_ENDPOINTS.ADMIN_TOUR_PACKAGES_LIST({ page, perPage }),
    );
    return response.data;
  },

  getById: async ({ id }) => {
    const response = await adminApi.get(
      API_ENDPOINTS.ADMIN_TOUR_PACKAGE_BY_ID(id),
    );
    return response.data;
  },

  create: async (data) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_TOUR_PACKAGE_CREATE,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  update: async ({ id, data }) => {
    const response = await adminApi.post(
      API_ENDPOINTS.ADMIN_TOUR_PACKAGE_UPDATE(id),
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  delete: async ({ id }) => {
    const response = await adminApi.delete(
      API_ENDPOINTS.ADMIN_TOUR_PACKAGE_DELETE(id),
    );
    return response.data;
  },
};
