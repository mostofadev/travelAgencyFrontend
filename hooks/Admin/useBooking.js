import { useQuery } from "@tanstack/react-query";
import {
  flightAdminApplicationService,
  tourAdminApplicationService,
  visaAdminApplicationService,
} from "@/lib/services/Admin/BookingServices";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

export const useAdminVisaApplications = (filters = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.VISA_BOOKINGS.list(filters),
    queryFn: () => visaAdminApplicationService.getAll(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminVisaApplicationDetail = (id) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.VISA_BOOKINGS.detail(id),
    queryFn: () => visaAdminApplicationService.getById(id),
    enabled: !!id,
  });

  return {
    booking: response?.data ?? null,
    isLoading,
    isError,
  };
};

// ==================== FLIGHT HOOKS ====================
export const useAdminFlightApplications = (filters = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.list(filters),
    queryFn: () => flightAdminApplicationService.getAll(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminFlightApplicationDetail = (id) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.detail(id),
    queryFn: () => flightAdminApplicationService.getById(id),
    enabled: !!id,
  });

  return {
    booking: response?.data ?? null,
    isLoading,
    isError,
  };
};

// ==================== TOUR HOOKS ====================
export const useAdminTourApplications = (filters = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.TOUR_APPLICATIONS.list(filters),
    queryFn: () => tourAdminApplicationService.getAll(filters),
    staleTime: 1000 * 60 * 5,
  });
};

export const useAdminTourApplicationDetail = (id) => {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.TOUR_APPLICATIONS.detail(id),
    queryFn: () => tourAdminApplicationService.getById(id),
    enabled: !!id,
  });
  return {
    booking: response?.data ?? null,
    isLoading,
    isError,
  };
};
