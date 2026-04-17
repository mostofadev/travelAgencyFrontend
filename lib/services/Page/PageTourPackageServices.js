
import userApi from "@/lib/api/axios";

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );
}

export function normalizeTourPackage(p) {
  const adultPrice = parseFloat(p.adult_price ?? 0);
  const childPrice = p.child_price ? parseFloat(p.child_price) : null;
  const currency = p.currency ?? "BDT";

  const fmt = (amount) =>
    `${currency} ${amount.toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  return {
    id: p.id,
    package_code: p.package_code,
    package_title: p.package_title,
    slug: p.slug,
    package_type: p.package_type,
    status: p.status,
    is_active: p.is_active,
    is_featured: p.is_featured,
    image_url: p.image_url,
    view_count: p.view_count ?? 0,
    booking_count: p.booking_count ?? 0,

    total_seats: p.total_seats ?? 0,
    booked_seats: p.booked_seats ?? 0,
    available_seats:
      p.available_seats ?? (p.total_seats ?? 0) - (p.booked_seats ?? 0),

    duration_days: p.duration_days ?? 0,
    duration_nights: p.duration_nights ?? 0,
    start_date: p.start_date ?? null,
    end_date: p.end_date ?? null,

    adult_price: adultPrice,
    child_price: childPrice,
    currency,
    prices: {
      adult: { amount: adultPrice, currency, formatted: fmt(adultPrice) },
      child: childPrice
        ? { amount: childPrice, currency, formatted: fmt(childPrice) }
        : null,
    },

    origin_country_id: p.origin_country_id,
    destination_country_id: p.destination_country_id,
    origin_country: p.origin_country ?? null,
    destination_country: p.destination_country ?? null,

    description: p.description ?? "",
    highlights: p.highlights ?? "",
    inclusions: p.inclusions ?? "",
    exclusions: p.exclusions ?? "",
    terms_conditions: p.terms_conditions ?? "",
    cancellation_policy: p.cancellation_policy ?? "",
    itineraries: p.itineraries ?? [],

    created_at: p.created_at ?? null,
    updated_at: p.updated_at ?? null,
  };
}

// ─────────────────────────────────────────────────────────────
// API Calls
// ─────────────────────────────────────────────────────────────

export async function fetchTourPackages(filters = {}) {
  const params = new URLSearchParams(cleanFilters(filters));
  const { data } = await userApi.get(`/tour-packages?${params.toString()}`);


  const rows = Array.isArray(data.data) ? data.data : [];

  return {
    tourPackages: rows.map(normalizeTourPackage),
    meta: data.meta ?? {},
  };
}

export async function fetchTourPackageById(id) {
  const { data } = await userApi.get(`/tour-packages/${id}`);

  return {
    tourPackage: normalizeTourPackage(data.data ?? {}),
    related: (data.related ?? []).map(normalizeTourPackage),
  };
}

export async function fetchTourPackageBySlug(slug) {
  const { data } = await userApi.get(`/tour-packages/slug/${slug}`);

  return {
    tourPackage: normalizeTourPackage(data.data ?? {}),
    related: (data.related ?? []).map(normalizeTourPackage),
  };
}

export async function fetchFeaturedTourPackages(limit = 6) {
  const { data } = await userApi.get(`/tour-packages/featured?limit=${limit}`);

  return {
    tourPackages: (data.data ?? []).map(normalizeTourPackage),
  };
}

export async function fetchUpcomingTourPackages(limit = 10) {
  const { data } = await userApi.get(`/tour-packages/upcoming?limit=${limit}`);

  return {
    tourPackages: (data.data ?? []).map(normalizeTourPackage),
  };
}
