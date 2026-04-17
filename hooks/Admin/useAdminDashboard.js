import { AdminDashboardServices } from "@/lib/services/Admin/AdminDashboardServices";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => AdminDashboardServices(),
    keepPreviousData: true,
    staleTime: 30000,
  });
};
