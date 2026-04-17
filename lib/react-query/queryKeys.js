// lib/react-query/queryKeys.js
/**
 * Query Keys - Centralized location for all query keys
 * এটি cache invalidation এবং query management সহজ করে
 */

export const QUERY_KEYS = {
  // Countries Keys
  COUNTRIES: {
    all: ["countries"],
    lists: () => [...QUERY_KEYS.COUNTRIES.all, "list"],
    list: (filters) => [...QUERY_KEYS.COUNTRIES.lists(), filters],
    details: () => [...QUERY_KEYS.COUNTRIES.all, "detail"],
    detail: (id) => [...QUERY_KEYS.COUNTRIES.details(), id],
  },
  // Visa Type Keys
  VISA_TYPES: {
    all: ["visa-types"], // Base key
    lists: () => [...QUERY_KEYS.VISA_TYPES.all, "list"], // List queries
    list: (filters) => [...QUERY_KEYS.VISA_TYPES.lists(), filters], // Specific list with filters
    details: () => [...QUERY_KEYS.VISA_TYPES.all, "detail"], // Detail queries
    detail: (id) => [...QUERY_KEYS.VISA_TYPES.details(), id], // Specific detail
  },

  // Visa Keys
  VISAS: {
    all: ["visas"],
    lists: () => [...QUERY_KEYS.VISAS.all, "list"],
    list: (filters) => [...QUERY_KEYS.VISAS.lists(), filters],
    details: () => [...QUERY_KEYS.VISAS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.VISAS.details(), id],
  },

  // Tour Packages Keys
  PACKAGES: {
    all: ["tour-packages"],
    lists: () => [...QUERY_KEYS.PACKAGES.all, "list"],
    list: (filters) => [...QUERY_KEYS.PACKAGES.lists(), filters],
    details: () => [...QUERY_KEYS.PACKAGES.all, "detail"],
    detail: (id) => [...QUERY_KEYS.PACKAGES.details(), id],
  },

  // airports
  AIRPORTS: {
    all: ["airports"],
    lists: () => [...QUERY_KEYS.AIRPORTS.all, "list"],
    list: (filters) => [...QUERY_KEYS.AIRPORTS.lists(), filters],
    details: () => [...QUERY_KEYS.AIRPORTS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.AIRPORTS.details(), id],
  },
  // aircrafts
  AIRCRAFTS: {
    all: ["aircrafts"],
    lists: () => [...QUERY_KEYS.AIRCRAFTS.all, "list"],
    list: (filters) => [...QUERY_KEYS.AIRCRAFTS.lists(), filters],
    details: () => [...QUERY_KEYS.AIRCRAFTS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.AIRCRAFTS.details(), id],
  },
  // route
  ROUTE: {
    all: ["route"],
    lists: () => [...QUERY_KEYS.ROUTE.all, "list"],
    list: (filters) => [...QUERY_KEYS.ROUTE.lists(), filters],
    details: () => [...QUERY_KEYS.ROUTE.all, "detail"],
    detail: (id) => [...QUERY_KEYS.ROUTE.details(), id],
  },

  // flights
  FLIGHTS: {
    all: ["flights"],
    lists: () => [...QUERY_KEYS.FLIGHTS.all, "list"],
    list: (filters) => [...QUERY_KEYS.FLIGHTS.lists(), filters],
    details: () => [...QUERY_KEYS.FLIGHTS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.FLIGHTS.details(), id],
  },
  // flights
  FLIGHTS_CLASS: {
    all: ["flights_class"],
    lists: () => [...QUERY_KEYS.FLIGHTS_CLASS.all, "list"],
    list: (filters) => [...QUERY_KEYS.FLIGHTS_CLASS.lists(), filters],
    details: () => [...QUERY_KEYS.FLIGHTS_CLASS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.FLIGHTS_CLASS.details(), id],
  },

  //bank
  BANK: {
    all: ["bank"],
    lists: () => [...QUERY_KEYS.BANK.all, "list"],
    list: (filters) => [...QUERY_KEYS.BANK.lists(), filters],
    details: () => [...QUERY_KEYS.BANK.all, "detail"],
    detail: (id) => [...QUERY_KEYS.BANK.details(), id],
  },
  //bank
  DEPOSIT: {
    all: ["deposit"],
    lists: () => [...QUERY_KEYS.DEPOSIT.all, "list"],
    list: (filters) => [...QUERY_KEYS.DEPOSIT.lists(), filters],
    details: () => [...QUERY_KEYS.DEPOSIT.all, "detail"],
    detail: (id) => [...QUERY_KEYS.DEPOSIT.details(), id],
  },
  // Admin Deposit
  ADMIN_DEPOSIT: {
    all: ["admin-deposit"],
    lists: () => [...QUERY_KEYS.ADMIN_DEPOSIT.all, "list"],
    list: (filters) => [...QUERY_KEYS.ADMIN_DEPOSIT.lists(), filters],
    details: () => [...QUERY_KEYS.ADMIN_DEPOSIT.all, "detail"],
    detail: (id) => [...QUERY_KEYS.ADMIN_DEPOSIT.details(), id],
  },
  WALLET: {
    all: ["wallet"],
    balance: () => [...QUERY_KEYS.WALLET.all, "balance"],
  },

  // Visa Bookings Keys

  VISA_BOOKINGS: {
    all: ["visa-bookings"],
    lists: () => ["visa-bookings", "list"],
    list: (page) => ["visa-bookings", "list", page],
    detail: (id) => ["visa-bookings", "detail", id],
  },
  // flight bookings

  FLIGHT_BOOKINGS: {
    all: ["flight_bookings"],
    lists: () => [...QUERY_KEYS.FLIGHT_BOOKINGS.all, "list"],
    list: (filters) => [...QUERY_KEYS.FLIGHT_BOOKINGS.lists(), filters],
    details: () => [...QUERY_KEYS.FLIGHT_BOOKINGS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.FLIGHT_BOOKINGS.details(), id],
  },
  // tour booking
  TOUR_APPLICATIONS: {
    all: ["tour-applications"],
    lists: () => [...QUERY_KEYS.TOUR_APPLICATIONS.all, "list"],
    list: (page) => [...QUERY_KEYS.TOUR_APPLICATIONS.lists(), page],
    details: () => [...QUERY_KEYS.TOUR_APPLICATIONS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.TOUR_APPLICATIONS.details(), id],
  },

  PAYMENT_QUERY_KEYS: {
    wallet: ["payment", "wallet"],
    all: ["payment"],
    booking: (type, reference) => ["payment", "booking", type, reference],
    status: (tranId) => ["payment", "status", tranId],
    wallet: ["payment", "wallet"],
  },

  USER_DASHBOARD: {
    dashboard: ["user", "dashboard"],
    walletBalance: ["user", "wallet", "balance"],
    walletTx: ["user", "wallet", "transactions"],
    flightBookings: ["user", "bookings", "flights"],
    tourBookings: ["user", "bookings", "tours"],
    visaApplications: ["user", "bookings", "visas"],
    deposits: ["user", "deposits"],
  },
};
