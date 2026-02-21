// hooks/Admin/useVisaForm.js
import { useQuery } from "@tanstack/react-query";
import {
  AllCountriesServices,
  AllVisaTypesServices,
} from "@/lib/services/Admin/VisaFormServices";

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
