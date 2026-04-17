import userApi from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

const dashboardService = {
    getDashboard: async () => {
        const res = await userApi.get(API_ENDPOINTS.USER_DASHBOARD);
        return res.data;
    },
};
export default dashboardService;
