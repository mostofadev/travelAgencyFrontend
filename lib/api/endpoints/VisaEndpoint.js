export const VISA_ENDPOINTS = {
  // admin - visa type endpoints
  ADMIN_VISA_TYPES: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/visa-types?page=${page}&per_page=${perPage}`,
  ADMIN_VISA_TYPE_BY_ID: (id) => `/admin/visa-types/${id}`,
  ADMIN_VISA_TYPE_CREATE: "/admin/visa-types",
  ADMIN_VISA_TYPE_UPDATE: (id) => `/admin/visa-types/${id}`,
  ADMIN_VISA_TYPE_DELETE: (id) => `/admin/visa-types/${id}`,

  // admin - visa type endpoints
  ADMIN_VISA: ({ page = 1, perPage = 10 } = {}) =>
    `/admin/visas?page=${page}&per_page=${perPage}`,
  ADMIN_VISA_BY_ID: (id) => `/admin/visas/${id}`,
  ADMIN_VISA_CREATE: "/admin/visas",
  ADMIN_VISA_UPDATE: (id) => `/admin/visas/${id}`,
  ADMIN_VISA_DELETE: (id) => `/admin/visas/${id}`,

  // admin - country endpoints
};
