// lib/services/Page/FlightBookingService.js

import userApi from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const createFlightBooking = async (payload) => {
  try {
    const response = await userApi.post(
      API_ENDPOINTS.USER_FLIGHT_BOOKINGS,
      payload,
    );
    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }
};

export const getFlightBookings = async (page = 1) => {
  const { data } = await userApi.get(
    `${API_ENDPOINTS.USER_FLIGHT_BOOKINGS}?page=${page}`,
  );
  return data;
};

export const getFlightBookingById = async (id) => {
  const response = await userApi.get(
    API_ENDPOINTS.USER_FLIGHT_BOOKING_BY_ID(id),
  );
  return response.data;
};

export const getFlightBookingByReference = async (ref) => {
  const response = await userApi.get(
    API_ENDPOINTS.USER_FLIGHT_BOOKING_BY_REFERENCE(ref),
  );
  return response.data;
};

export const cancelFlightBooking = async (id) => {
  const response = await userApi.post(
    API_ENDPOINTS.USER_FLIGHT_BOOKING_CANCEL(id),
  );
  return response.data;
};
