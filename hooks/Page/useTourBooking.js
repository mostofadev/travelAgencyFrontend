"use client";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createTourBooking,
  getTourBookingByCode,
  getTourBookingById,
  getTourBookings,
} from "@/lib/services/Page/TourBookingService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useTourBooking() {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: (payload) => createTourBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TOUR_APPLICATIONS.lists(),
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

// ─── List Hook ────────────────────────────────────────────────────────────────
export function useTourBookings(page = 1) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEYS.TOUR_APPLICATIONS.list(page),
    queryFn: () => getTourBookings(page),
    keepPreviousData: true,
  });

  return { data, isLoading, isError, error };
}

// ─── Single Tour Booking by ID ────────────────────────────────────────────────
export function useTourBookingById(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tour-bookings", "detail", id],
    queryFn: () => getTourBookingById(id),
    enabled: !!id,
  });

  return {
    booking: data?.data ?? null,
    isLoading,
    isError,
  };
}

// ─── Single Tour Booking by Code ─────────────────────────────────────────────
export function useTourBookingByCode(code) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tour-bookings", "code", code],
    queryFn: () => getTourBookingByCode(code),
    enabled: !!code,
  });

  return {
    booking: data?.data ?? null,
    isLoading,
    isError,
  };
}
