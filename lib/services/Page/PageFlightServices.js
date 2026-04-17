import userApi from "@/lib/api/axios";

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );
}

export function normalizeFlight(f) {
  const classes = f.classes ?? [];

  const classMap = {};
  classes.forEach((c) => {
    const name = c.class_name;
    if (!classMap[name] || c.base_fare < classMap[name].base_fare) {
      classMap[name] = c;
    }
  });
  const uniqueClasses = Object.values(classMap);

  const cheapestFare =
    f.cheapest_fare ??
    (uniqueClasses.length > 0
      ? Math.min(...uniqueClasses.map((c) => c.base_fare))
      : null);

  return {
    id: f.id,
    flight_number: f.flight_number,
    status: f.status,

    // Departure
    departure_datetime: f.departure_datetime,
    departure_time: f.departure_time,
    departure_date: f.departure_date,

    // Arrival
    arrival_datetime: f.arrival_datetime,
    arrival_time: f.arrival_time,
    arrival_date: f.arrival_date,

    // Duration
    duration_minutes: f.duration_minutes ?? 0,
    duration_formatted: f.duration_formatted ?? "",

    // Aircraft
    aircraft: f.aircraft ?? null,

    // Route
    route: f.route ?? null,
    from_airport: f.route?.from_airport ?? null,
    to_airport: f.route?.to_airport ?? null,

    // Classes — unique per class_name (cheapest)
    classes: uniqueClasses,
    all_classes: classes, // raw সব classes
    cheapest_fare: cheapestFare,
    economy_fare: f.economy_fare ?? null,
  };
}

// ─────────────────────────────────────────────────────────────
// API Calls
// ─────────────────────────────────────────────────────────────

export async function fetchFlights(filters = {}) {
  const params = new URLSearchParams(cleanFilters(filters));
  const { data } = await userApi.get(`/flights?${params.toString()}`);

  // response: { success, data: [...], meta: {...} }
  const rows = Array.isArray(data.data) ? data.data : [];

  return {
    flights: rows.map(normalizeFlight),
    meta: data.meta ?? {},
  };
}

export async function fetchFlightById(id) {
  const { data } = await userApi.get(`/flights/${id}`);

  return {
    flight: normalizeFlight(data.data ?? {}),
  };
}

// aircraft
export const pageAirportServices = () => {
  const res = userApi.get("/flights/airports");
  return res;
};
