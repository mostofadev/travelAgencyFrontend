// Laravel JWT API Endpoints
export const API_ENDPOINTS = {
  // ==================== USER AUTH ====================
  USER_LOGIN: "/auth/login",
  USER_REGISTER: "/auth/register",
  USER_LOGOUT: "/auth/logout",
  USER_ME: "/auth/me",
  USER_REFRESH: "/auth/refresh",
  USER_FORGOT_PASSWORD: "/auth/forgot-password",
  USER_RESET_PASSWORD: "/auth/reset-password",
  USER_UPDATE_PROFILE: "/user/profile/update",
  // ==================== ADMIN AUTH ====================
  ADMIN_LOGIN: "/admin/login",
  ADMIN_LOGOUT: "/admin/logout",
  ADMIN_REFRESH: "/admin/refresh",
  ADMIN_PROFILE: "/admin/profile",

  // ==================== ADMIN - USER MANAGEMENT ====================
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_BY_ID: (id) => `/admin/users/${id}`,
  ADMIN_USER_CREATE: "/admin/users",
  ADMIN_USER_UPDATE: (id) => `/admin/users/${id}`,
  ADMIN_USER_DELETE: (id) => `/admin/users/${id}`,

  // ==================== ADMIN - VISA TYPE MANAGEMENT ====================
  ADMIN_VISA_TYPES: "/admin/visa-types",
  ADMIN_VISA_TYPE_BY_ID: (id) => `/admin/visa-types/${id}`,
  ADMIN_VISA_TYPE_CREATE: "/admin/visa-types",
  ADMIN_VISA_TYPE_UPDATE: (id) => `/admin/visa-types/${id}`,
  ADMIN_VISA_TYPE_DELETE: (id) => `/admin/visa-types/${id}`,

  // ==================== ADMIN - TOUR PACKAGE MANAGEMENT ====================
  ADMIN_TOUR_PACKAGES_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/tour-packages?page=${page}&per_page=${perPage}`,
  ADMIN_TOUR_PACKAGE_BY_ID: (id) => `/admin/tour-packages/${id}`,
  ADMIN_TOUR_PACKAGE_CREATE: "/admin/tour-packages",
  ADMIN_TOUR_PACKAGE_UPDATE: (id) => `/admin/tour-packages/${id}`,
  ADMIN_TOUR_PACKAGE_DELETE: (id) => `/admin/tour-packages/${id}`,

  // ==================== ADMIN - AIRPORTS MANAGEMENT ====================
  ADMIN_AIRPORTS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/airports?page=${page}&per_page=${perPage}`,
  ADMIN_AIRPORTS_BY_ID: (id) => `/admin/airports/${id}`,
  ADMIN_AIRPORTS_CREATE: "/admin/airports",
  ADMIN_AIRPORTS_UPDATE: (id) => `/admin/airports/${id}`,
  ADMIN_AIRPORTS_DELETE: (id) => `/admin/airports/${id}`,

  // ==================== ADMIN - AIRCRAFTS MANAGEMENT ====================
  ADMIN_AIRCRAFTS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/aircrafts?page=${page}&per_page=${perPage}`,
  ADMIN_AIRCRAFTS_BY_ID: (id) => `/admin/aircrafts/${id}`,
  ADMIN_AIRCRAFTS_CREATE: "/admin/aircrafts",
  ADMIN_AIRCRAFTS_UPDATE: (id) => `/admin/aircrafts/${id}`,
  ADMIN_AIRCRAFTS_DELETE: (id) => `/admin/aircrafts/${id}`,

  // ==================== ADMIN - FLIGHT-ROUTE MANAGEMENT ====================
  ADMIN_ROUTE_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flight-route?page=${page}&per_page=${perPage}`,
  ADMIN_ROUTE_BY_ID: (id) => `/admin/flight-route/${id}`,
  ADMIN_ROUTE_CREATE: "/admin/flight-route",
  ADMIN_ROUTE_UPDATE: (id) => `/admin/flight-route/${id}`,
  ADMIN_ROUTE_DELETE: (id) => `/admin/flight-route/${id}`,
  ADMIN_FORM_AIRPORT_LIST: () => `/admin/flight-route-list`,

  // ==================== ADMIN - FLIGHT MANAGEMENT ====================
  ADMIN_FLIGHTS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flights?page=${page}&per_page=${perPage}`,
  ADMIN_FLIGHTS_BY_ID: (id) => `/admin/flights/${id}`,
  ADMIN_FLIGHTS_CREATE: "/admin/flights",
  ADMIN_FLIGHTS_UPDATE: (id) => `/admin/flights/${id}`,
  ADMIN_FLIGHTS_DELETE: (id) => `/admin/flights/${id}`,

  // ==================== ADMIN - FLIGHT CLASS MANAGEMENT ====================
  ADMIN_FLIGHTS_CLASS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flight-classes?page=${page}&per_page=${perPage}`,
  ADMIN_FLIGHTS_CLASS_BY_ID: (id) => `/admin/flight-classes/${id}`,
  ADMIN_FLIGHTS_CLASS_CREATE: "/admin/flight-classes",
  ADMIN_FLIGHTS_CLASS_UPDATE: (id) => `/admin/flight-classes/${id}`,
  ADMIN_FLIGHTS_CLASS_DELETE: (id) => `/admin/flight-classes/${id}`,

  // ==================== ADMIN - BANK MANAGEMENT ====================
  ADMIN_BANK_LIST: () => `/admin/banks`,
  ADMIN_BANK_BY_ID: (id) => `/admin/banks/${id}`,
  ADMIN_BANK_CREATE: "/admin/banks",
  ADMIN_BANK_UPDATE: (id) => `/admin/banks/${id}`,
  ADMIN_BANK_DELETE: (id) => `/admin/banks/${id}`,

  // ==================== USER DEPOSIT ======================
  USER_ALL_BANK: () => `/auth/deposits/banks`,
  DEPOSIT_REQUEST: () => `/auth/deposits`,

  // ==================== ADMIN - DEPOSIT MANAGEMENT ====================
  ADMIN_DEPOSIT_LIST: ({ page = 1, perPage = 10, ...filters } = {}) => {
    const params = new URLSearchParams({ page, per_page: perPage, ...filters });
    return `/admin/deposits?${params.toString()}`;
  },
  ADMIN_DEPOSIT_BY_ID: (id) => `/admin/deposits/${id}`,
  ADMIN_DEPOSIT_APPROVE: (id) => `/admin/deposits/${id}/approve`,
  ADMIN_DEPOSIT_REJECT: (id) => `/admin/deposits/${id}/reject`,

  // ==================== USER WALLET ====================
  USER_WALLET: "/auth/wallet",

  // ==================== USER - FLIGHT BOOKINGS ====================
  USER_FLIGHT_BOOKINGS: "/auth/bookings/flights",
  USER_FLIGHT_BOOKING_BY_ID: (id) => `/auth/bookings/flights/${id}`,
  USER_FLIGHT_BOOKING_BY_REFERENCE: (ref) =>
    `/auth/bookings/flights/reference/${ref}`,
  USER_FLIGHT_BOOKING_CANCEL: (id) => `/auth/bookings/flights/${id}/cancel`,

  // ==================== USER - VISA BOOKINGS ====================
  USER_VISA_BOOKINGS: "/auth/visa-applications",
  USER_VISA_BOOKING_BY_ID: (id) => `/auth/visa-applications/${id}`,
  USER_VISA_BOOKING_BY_REFERENCE: (ref) => `/auth/visa-applications/${ref}`,

  // admin booking history

  VISA_APPLICATIONS: "/admin/visa-applications",
  VISA_APPLICATION_DETAIL: (id) => `/admin/visa-applications/${id}`,

  // Flight Applications
  FLIGHT_APPLICATIONS: "/admin/flight-applications",
  FLIGHT_APPLICATION_DETAIL: (id) => `/admin/flight-applications/${id}`,

  // Tour Applications
  TOUR_APPLICATIONS: "/admin/tour-applications",
  TOUR_APPLICATION_DETAIL: (id) => `/admin/tour-applications/${id}`,

  // payment ssl
  PAYMENT_STATUS: (tranId) => `/auth/payment/status/${tranId}`,

  // GET /auth/wallet
  WALLET: "/auth/wallet",
  PAYMENT_BOOKING_DETAIL: (type, reference) =>
    `/auth/payment/booking/${type}/${reference}`,

  PAYMENT_INITIATE: "/auth/payment/initiate",
  PAYMENT_WALLET: "/auth/payment/wallet",

  USER_DASHBOARD : "/auth/user/dashboard",
};
