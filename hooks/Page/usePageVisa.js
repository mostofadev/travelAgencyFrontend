// hooks/useVisas.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  fetchVisaById,
  fetchVisas,
} from "@/lib/services/Page/PageVisaServices";

// ─────────────────────────────────────────────────────────────
// useVisas — paginated list with filters
// ─────────────────────────────────────────────────────────────

/**
 * @param {Object} filters  — see fetchVisas() for accepted keys
 * @param {Object} options  — extra TanStack Query options
 *
 * @returns {{
 *   visas:      Array,
 *   meta:       Object,
 *   isLoading:  boolean,
 *   isFetching: boolean,
 *   isError:    boolean,
 *   error:      Error|null,
 *   refetch:    Function,
 * }}
 */
export function useVisas(filters = {}, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.VISAS.list(filters),
    queryFn: () => fetchVisas(filters),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
    ...options,
  });

  return {
    visas: query.data?.visas ?? [],
    meta: query.data?.meta ?? {},
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

// ─────────────────────────────────────────────────────────────
// useVisa — single visa detail
// ─────────────────────────────────────────────────────────────

/**
 * @param {string|number} id
 * @param {Object}        options
 *
 * @returns {{
 *   visa:       Object|null,
 *   isLoading:  boolean,
 *   isError:    boolean,
 *   error:      Error|null,
 * }}
 */
export function useVisa(id, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.VISAS.detail(id),
    queryFn: () => fetchVisaById(id),
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });

  return {
    visa: query.data?.visa ?? null,
    related: query.data?.related ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
