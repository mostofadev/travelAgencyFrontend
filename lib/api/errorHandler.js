// lib/axios/errorHandler.js
import NetworkOfflineModal from "@/components/ui/NetworkOfflineModal";
import { toast } from "react-hot-toast";

export const handleApiError = (error) => {
  // Network error
  if (!error.response) {
    return {
      message: "Network error",
      status: null,
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      toast.error(data?.message || "Invalid request data.");
      break;

    case 401:
      // Auth / token refresh handled in interceptor
      toast.error("Your session has expired. Please log in again.");
      break;

    case 403:
      toast.error("You do not have permission to perform this action.");
      break;

    case 404:
      toast.error(data?.message || "Requested resource not found.");
      break;

    // case 422:
    //   // Laravel validation errors
    //   if (data?.errors) {
    //     const errorMessages = Object.values(data.errors).flat();
    //     errorMessages.forEach((msg) => {
    //      // toast.error(msg);
    //     });
    //   } else {
    //     toast.error("Validation failed. Please check your input.");
    //   }
    //   break;

    case 500:
      toast.error("Server error occurred. Please try again later.");
      break;

    default:
      toast.error(data?.message || "An unexpected error occurred.");
  }

  return {
    message: data?.message || "An error occurred",
    errors: data?.errors || null,
    status,
  };
};
