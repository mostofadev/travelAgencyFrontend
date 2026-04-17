import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { homeTourServices } from "@/lib/services/Page/HomeServices";
import { useQuery } from "@tanstack/react-query";

export function useHomePageTour() {
  return useQuery({
    queryKey: QUERY_KEYS.PACKAGES.lists(),
    queryFn: () => homeTourServices(),
    staleTime: 30_000,
    keepPreviousData: true,
  });
}
