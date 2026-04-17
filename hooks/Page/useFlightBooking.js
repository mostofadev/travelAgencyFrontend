// hooks/Page/useFlightBooking.js
"use client";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createFlightBooking,
  getFlightBookings,
  getFlightBookingById,
  cancelFlightBooking,
} from "@/lib/services/Page/FlightBookingService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useFlightBooking() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (payload) => createFlightBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.lists(),
      });
      setError(null);
    },
    onError: (err) => {
      setError(err.message ?? "Something went wrong. Please try again.");
    },
  });

  const submit = async (payload) => {
    setError(null);
    const result = await mutation.mutateAsync(payload);
    return result.data;
  };

  return {
    submit,
    isLoading: mutation.isPending,
    error,
  };
}

// ─── All Bookings ─────────────────────────────────────────────────────────────
// ─── All Bookings ─────────────────────────────────────────────────────────────
export const useFlightBookings = (page = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.list(page),
    queryFn: () => getFlightBookings(page),
    keepPreviousData: true,
  });
};

// ─── Single Booking ───────────────────────────────────────────────────────────
export function useFlightBookingById(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.detail(id),
    queryFn: () => getFlightBookingById(id),
    enabled: !!id,
  });

  return {
    booking: data?.data ?? null,
    isLoading,
    isError,
  };
}

// ─── Cancel Booking ───────────────────────────────────────────────────────────
export function useCancelFlightBooking() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => cancelFlightBooking(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FLIGHT_BOOKINGS.detail(id),
      });
    },
  });

  return {
    cancel: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}
