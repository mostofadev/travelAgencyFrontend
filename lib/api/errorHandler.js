// lib/axios/errorHandler.js

import { showCustomToast } from "../ShowCustomToast";

const TOAST_IDS = {
  400: "error-400",
  401: "error-401",
  403: "error-403",
  404: "error-404",
  500: "error-500",
  network: "error-network",
  default: "error-default",
};

const showError = (title, message, id) => {
  showCustomToast({ type: "error", title, message, id });
};

export const handleApiError = (error, showToast = true) => {
  // Network error
  if (!error.response) {
    if (showToast) {
      showError(
        "Network Error",
        "Network error. Please check your connection.",
        TOAST_IDS.network,
      );
    }
    return { message: "Network error", status: null };
  }

  const { status, data } = error.response;

  if (showToast) {
    switch (status) {
      case 400:
        showError(
          "Bad Request",
          data?.message || "Invalid request data.",
          TOAST_IDS[400],
        );
        break;

      case 401:
        showError(
          "Session Expired",
          "Your session has expired. Please log in again.",
          TOAST_IDS[401],
        );
        break;

      case 403:
        showError(
          "Access Denied",
          "You do not have permission to perform this action.",
          TOAST_IDS[403],
        );
        break;

      case 404:
        showError(
          "Not Found",
          data?.message || "Requested resource not found.",
          TOAST_IDS[404],
        );
        break;

      case 500:
        showError(
          "Server Error",
          "Server error occurred. Please try again later.",
          TOAST_IDS[500],
        );
        break;

      default:
        showError(
          "Error",
          data?.message || "An unexpected error occurred.",
          TOAST_IDS.default,
        );
    }
  }

  return {
    message: data?.message || "An error occurred",
    errors: data?.errors || null,
    status,
  };
};
