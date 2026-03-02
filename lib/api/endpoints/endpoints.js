// Laravel JWT API Endpoints
export const API_ENDPOINTS = {
  // ==================== USER AUTH ====================
  USER_REGISTER: "/auth/register",
  USER_LOGIN: "/auth/login",
  USER_LOGOUT: "/auth/logout",
  USER_REFRESH: "/auth/refresh",
  USER_ME: "/auth/me",
  USER_PROFILE: "/user/profile",
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

  // ==================== ADMIN - flight-route MANAGEMENT ====================
  ADMIN_ROUTE_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flight-route?page=${page}&per_page=${perPage}`,
  ADMIN_ROUTE_BY_ID: (id) => `/admin/flight-route/${id}`,
  ADMIN_ROUTE_CREATE: "/admin/flight-route",
  ADMIN_ROUTE_UPDATE: (id) => `/admin/flight-route/${id}`,
  ADMIN_ROUTE_DELETE: (id) => `/admin/flight-route/${id}`,
  ADMIN_FORM_AIRPORT_LIST: () => `/admin/flight-route-list`,

  // ==================== ADMIN - flight MANAGEMENT ====================
  ADMIN_FLIGHTS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flights?page=${page}&per_page=${perPage}`,
  ADMIN_FLIGHTS_BY_ID: (id) => `/admin/flights/${id}`,
  ADMIN_FLIGHTS_CREATE: "/admin/flights",
  ADMIN_FLIGHTS_UPDATE: (id) => `/admin/flights/${id}`,
  ADMIN_FLIGHTS_DELETE: (id) => `/admin/flights/${id}`,

  // ==================== ADMIN - flight MANAGEMENT ====================
  ADMIN_FLIGHTS_CLASS_LIST: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/flight-classes?page=${page}&per_page=${perPage}`,
  ADMIN_FLIGHTS_CLASS_BY_ID: (id) => `/admin/flight-classes/${id}`,
  ADMIN_FLIGHTS_CLASS_CREATE: "/admin/flight-classes",
  ADMIN_FLIGHTS_CLASS_UPDATE: (id) => `/admin/flight-classes/${id}`,
  ADMIN_FLIGHTS_CLASS_DELETE: (id) => `/admin/flight-classes/${id}`,
};
