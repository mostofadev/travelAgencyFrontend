import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import dashboardService from "@/lib/services/Page/UserDashboardServices";
import { useQuery } from "@tanstack/react-query";


export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.USER_DASHBOARD.dashboard,
    queryFn: dashboardService.getDashboard,
    staleTime: 1000 * 60 * 2,
  });
}
