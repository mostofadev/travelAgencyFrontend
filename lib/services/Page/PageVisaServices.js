import userApi from "@/lib/api/axios";

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );
}

export function normalizeVisa(v) {
  const amount = parseFloat(v.base_fee ?? v.fee?.amount ?? 0);
  const currency = v.currency ?? v.fee?.currency ?? "BDT";

  return {
    id: v.id,
    visa_code: v.visa_code,
    visa_title: v.visa_title,
    image_url: v.image_url,

    country: v.country ?? { id: v.country_id, name: v.country_name ?? "" },
    visa_type: v.visa_type ?? { id: v.visa_type_id, name: "" },

    processing: v.processing ?? { range: v.processing_range ?? "" },
    visa_mode: v.visa_mode,
    entry_type: v.entry_type,

    validity: v.validity ?? {
      days: v.validity_days,
      formatted: v.validity_formatted ?? `${v.validity_days} days`,
    },

    max_stay: v.max_stay ?? {
      days: v.max_stay_days,
      label: v.max_stay_label ?? `${v.max_stay_days} Days`,
    },

    fee: {
      amount,
      currency,
      formatted:
        v.fee?.formatted ??
        `${currency} ${amount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`,
    },

    description: v.description ?? "",
  };
}

// ─────────────────────────────────────────────────────────────
// API Calls
// ─────────────────────────────────────────────────────────────

export async function fetchVisas(filters = {}) {
  const params = new URLSearchParams(cleanFilters(filters));
  const { data } = await userApi.get(`/visas?${params.toString()}`);

  const raw = data.data;
  const rows = raw?.data ?? [];

  return {
    visas: rows.map(normalizeVisa),
    meta: data.meta ?? {
      current_page: raw?.current_page,
      last_page: raw?.last_page,
      per_page: raw?.per_page,
      total: raw?.total,
      from: raw?.from,
      to: raw?.to,
    },
  };
}

/**
 * Fetch a single visa by ID.
 *
 * @param   {string|number} id
 * @returns {Object} normalized visa
 */
export async function fetchVisaById(id) {
  const { data } = await userApi.get(`/visas/${id}`);
  const visa = data.data ?? {};
  const related = data.related ?? [];

  return { visa, related };
}
