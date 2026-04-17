import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  getVisaBookingById,
  getVisaBookingByReference,
  getVisaBookings,
  submitVisaApplication,
} from "@/lib/services/Page/visaApplicationService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { get } from "react-hook-form";
export const useVisaApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submit = async (payload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await submitVisaApplication(payload);
      setSuccess(response);
      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error, success };
};
// ─── All Visa Applications ───────────────────────────────────────────────────
export function useVisaBookings(page = 1) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.VISA_BOOKINGS.list(page),
    queryFn: () => getVisaBookings(page),
    keepPreviousData: true,
  });

  return {
    data: data,
    isLoading,
    isError,
  };
}

// ─── Single Visa Application ─────────────────────────────────────────────────
export function useVisaBookingByReference(reference) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.VISA_BOOKINGS.detail(reference),
    queryFn: () => getVisaBookingByReference(reference),
    enabled: !!reference,
  });

  return {
    application: data?.data ?? null,
    isLoading,
    isError,
  };
}
// ─── Single Booking ───────────────────────────────────────────────────────────
export function useVisaBookingById(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.VISA_BOOKINGS.detail(id),
    queryFn: () => getVisaBookingById(id),
    enabled: !!id,
  });

  return {
    booking: data?.data ?? null,
    isLoading,
    isError,
  };
}
