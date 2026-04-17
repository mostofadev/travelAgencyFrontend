// hooks/Page/usePageFlight.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  fetchFlights,
  fetchFlightById,
  pageAirportServices,
} from "@/lib/services/Page/PageFlightServices";

/**
 * usePageFlights — paginated list with filters
 *
 * @param {Object} filters
 * @param {number} [filters.from_airport_id]
 * @param {number} [filters.to_airport_id]
 * @param {string} [filters.departure_date]
 * @param {string} [filters.class_name]      
 * @param {string} [filters.status]
 * @param {string} [filters.search]
 * @param {number} [filters.per_page]
 * @param {number} [filters.page]
 */
export function usePageFlights(filters = {}, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.FLIGHTS.list(filters),
    queryFn: () => fetchFlights(filters),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
    ...options,
  });

  return {
    flights: query.data?.flights ?? [],
    meta: query.data?.meta ?? {},
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * usePageFlight — single flight by ID
 */
export function usePageFlight(id, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.FLIGHTS.detail(id),
    queryFn: () => fetchFlightById(id),
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });

  return {
    flight: query.data?.flight ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}


export function usePageAirport() {
  return useQuery({
    queryKey: QUERY_KEYS.AIRCRAFTS.lists(),
    queryFn: () => pageAirportServices(),
    staleTime: 30_000,
    keepPreviousData: true,
  });
}