
import { adminApi } from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints/endpoints';

// ==================== VISA APPLICATIONS ====================
export const visaAdminApplicationService = {
    getAll: async (filters = {}) => {
        const { data } = await adminApi.get(API_ENDPOINTS.VISA_APPLICATIONS, {
            params: filters,
        });
        return data;
    },

    getById: async (id) => {
        const { data } = await adminApi.get(API_ENDPOINTS.VISA_APPLICATION_DETAIL(id));
        return data;
    },
};

// ==================== FLIGHT APPLICATIONS ====================
export const flightAdminApplicationService = {
    getAll: async (filters = {}) => {
        const { data } = await adminApi.get(API_ENDPOINTS.FLIGHT_APPLICATIONS, {
            params: filters,
        });
        return data;
    },

    getById: async (id) => {
        const { data } = await adminApi.get(API_ENDPOINTS.FLIGHT_APPLICATION_DETAIL(id));
        
        return data;
    },
};

// ==================== TOUR APPLICATIONS ====================
export const tourAdminApplicationService = {
    getAll: async (filters = {}) => {
        const { data } = await adminApi.get(API_ENDPOINTS.TOUR_APPLICATIONS, {
            params: filters,
        });
        return data;
    },

    getById: async (id) => {
        const { data } = await adminApi.get(API_ENDPOINTS.TOUR_APPLICATION_DETAIL(id));
        return data;
    },
};