// lib/services/Page/TourBookingService.js
import userApi from "@/lib/api/axios";

export const createTourBooking = async (payload) => {
  try {
    const response = await userApi.post("/auth/bookings/tours", payload);
    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }
};
export const getTourBookings = async (page = 1) => {
  try {
    const response = await userApi.get(`/auth/bookings/tours?page=${page}`);
    return response.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to fetch tour bookings.";
    throw new Error(message);
  }
};

// Get single tour booking by ID
export const getTourBookingById = async (id) => {
  const response = await userApi.get(`/auth/bookings/tours/${id}`);
  return response.data;
};

// Get single tour booking by booking code
export const getTourBookingByCode = async (code) => {
  const response = await userApi.get(`/tour-bookings/code/${code}`);
  return response.data;
};
