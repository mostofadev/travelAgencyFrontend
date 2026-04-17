// hooks/Page/usePageTourPackage.js
"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  fetchTourPackages,
  fetchTourPackageById,
  fetchTourPackageBySlug,
  fetchFeaturedTourPackages,
  fetchUpcomingTourPackages,
} from "@/lib/services/Page/PageTourPackageServices";


/**
 * @param {Object} filters 
 * @param {Object} options 
 *
 * @returns {{
 *   tourPackages: Array,
 *   meta:         Object,
 *   isLoading:    boolean,
 *   isFetching:   boolean,
 *   isError:      boolean,
 *   error:        Error|null,
 *   refetch:      Function,
 * }}
 */
export function usePageTourPackages(filters = {}, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.PACKAGES.list(filters),
    queryFn: () => fetchTourPackages(filters),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
    ...options,
  });

  return {
    tourPackages: query.data?.tourPackages ?? [],
    meta: query.data?.meta ?? {},
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

// ─────────────────────────────────────────────────────────────
// usePageTourPackage — single by ID
// ─────────────────────────────────────────────────────────────

/**
 * @param {string|number} id
 * @param {Object}        options
 *
 * @returns {{
 *   tourPackage: Object|null,
 *   related:     Array,
 *   isLoading:   boolean,
 *   isError:     boolean,
 *   error:       Error|null,
 * }}
 */
export function usePageTourPackageById(id, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.PACKAGES.detail(id),
    queryFn: () => fetchTourPackageById(id),
    enabled: !!id,
    staleTime: 60_000,
    ...options,
  });

  return {
    tourPackage: query.data?.tourPackage ?? null,
    related: query.data?.related ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// ─────────────────────────────────────────────────────────────
// usePageTourPackageBySlug — single by slug
// ─────────────────────────────────────────────────────────────

/**
 * @param {string} slug
 * @param {Object} options
 *
 * @returns {{
 *   tourPackage: Object|null,
 *   related:     Array,
 *   isLoading:   boolean,
 *   isError:     boolean,
 *   error:       Error|null,
 * }}
 */
export function usePageTourPackageBySlug(slug, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.PACKAGES.slug(slug),
    queryFn: () => fetchTourPackageBySlug(slug),
    enabled: !!slug,
    staleTime: 60_000,
    ...options,
  });

  return {
    tourPackage: query.data?.tourPackage ?? null,
    related: query.data?.related ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

// ─────────────────────────────────────────────────────────────
// usePageFeaturedTourPackages
// ─────────────────────────────────────────────────────────────

export function usePageFeaturedTourPackages(limit = 6, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.PACKAGES.featured(limit),
    queryFn: () => fetchFeaturedTourPackages(limit),
    staleTime: 60_000,
    ...options,
  });

  return {
    tourPackages: query.data?.tourPackages ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// ─────────────────────────────────────────────────────────────
// usePageUpcomingTourPackages
// ─────────────────────────────────────────────────────────────

export function usePageUpcomingTourPackages(limit = 10, options = {}) {
  const query = useQuery({
    queryKey: QUERY_KEYS.PACKAGES.upcoming(limit),
    queryFn: () => fetchUpcomingTourPackages(limit),
    staleTime: 60_000,
    ...options,
  });

  return {
    tourPackages: query.data?.tourPackages ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
