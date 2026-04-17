import userApi from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints/endpoints";

export const submitVisaApplication = async (payload) => {
  const formData = new FormData();

  formData.append("visa_id", payload.visa_id);
  formData.append("expected_arrival", payload.expected_arrival);
  formData.append("travel_city", payload.travel_city ?? "");
  formData.append("travel_address", payload.travel_address ?? "");
  formData.append("adults", payload.adults);
  formData.append("children", payload.children);
  formData.append("infants", payload.infants);
  formData.append("terms_accepted", payload.terms_accepted ? "1" : "0");

  formData.append("contact[email]", payload.contact.email);
  formData.append("contact[phone_number]", payload.contact.phone_number ?? "");

  payload.applicants.forEach((applicant, index) => {
    formData.append(`applicants[${index}][first_name]`, applicant.first_name);
    formData.append(`applicants[${index}][last_name]`, applicant.last_name);
    formData.append(`applicants[${index}][gender]`, applicant.gender);
    formData.append(
      `applicants[${index}][date_of_birth]`,
      applicant.date_of_birth,
    );
    formData.append(
      `applicants[${index}][passport_type]`,
      applicant.passport_type ?? "regular",
    );
    formData.append(`applicants[${index}][passport_no]`, applicant.passport_no);
    formData.append(
      `applicants[${index}][passport_expiry]`,
      applicant.passport_expiry,
    );
    formData.append(
      `applicants[${index}][nationality_id]`,
      applicant.nationality_id,
    );
    formData.append(
      `applicants[${index}][profession]`,
      applicant.profession ?? "",
    );
    formData.append(`applicants[${index}][city]`, applicant.city ?? "");
    formData.append(`applicants[${index}][address]`, applicant.address ?? "");

    // Document 1 — Passport Scan
    formData.append(
      `applicants[${index}][documents][0][document_type_id]`,
      "1",
    );
    formData.append(
      `applicants[${index}][documents][0][file]`,
      applicant.passport_file,
    );

    // Document 2 — Passport Size Photo
    formData.append(
      `applicants[${index}][documents][1][document_type_id]`,
      "2",
    );
    formData.append(
      `applicants[${index}][documents][1][file]`,
      applicant.passport_photo,
    );
  });

  const response = await userApi.post("/auth/visa-applications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getVisaBookings = async (page = 1) => {
  const response = await userApi.get(
    `${API_ENDPOINTS.USER_VISA_BOOKINGS}?page=${page}`,
  );
  return response.data;
};

export const getVisaBookingById = async (id) => {
  const response = await userApi.get(API_ENDPOINTS.USER_VISA_BOOKING_BY_ID(id));
  return response.data;
};

export const getVisaBookingByReference = async (ref) => {
  const response = await userApi.get(
    API_ENDPOINTS.USER_VISA_BOOKING_BY_REFERENCE(ref),
  );
  return response.data;
};
