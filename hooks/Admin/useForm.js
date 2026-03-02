// hooks/Admin/useVisaForm.js
import { useQuery } from "@tanstack/react-query";
import {
  AllAircraftsServices,
  AllCountriesServices,
  AllRouteServices,
  AllVisaTypesServices,
} from "@/lib/services/Admin/FormServices";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

// ================= Countries =================
export const useVisaFormCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: AllCountriesServices,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// ================= Visa Types =================
export const useVisaFormTypes = () => {
  return useQuery({
    queryKey: ["visa-types"],
    queryFn: AllVisaTypesServices,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAircraftForm = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AIRCRAFTS.lists(),
    queryFn: AllAircraftsServices,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRouteForm = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ROUTE.lists(),
    queryFn: AllRouteServices,
    staleTime: 1000 * 60 * 5,
  });
};
