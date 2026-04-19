"use client";

// ─────────────────────────────────────────────
// 1. TourBookingHeroCardSkeleton
// ─────────────────────────────────────────────
export function TourBookingHeroCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-44 w-full bg-slate-200">
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="h-3 w-24 bg-slate-300 rounded mb-2" />
            <div className="h-6 w-48 bg-slate-300 rounded mb-2" />
            <div className="h-3 w-32 bg-slate-300 rounded" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-6 w-20 bg-slate-300 rounded-full" />
            <div className="h-6 w-16 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Booking Code Row */}
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-4 bg-slate-50">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-48 bg-slate-200 rounded" />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-slate-100 border-t border-slate-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 px-5 py-4">
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. PriceSummaryCardSkeleton
// ─────────────────────────────────────────────
export function PriceSummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-200 rounded" />
        <div className="h-4 w-28 bg-slate-200 rounded" />
      </div>

      <div className="px-5 py-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
          </div>
        ))}

        <div className="border-t border-dashed border-slate-200 pt-3">
          <div className="flex items-center justify-between">
            <div className="h-5 w-28 bg-slate-200 rounded" />
            <div className="h-5 w-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. TourApplicantsListSkeleton
// ─────────────────────────────────────────────
export function TourApplicantsListSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="h-4 w-20 bg-slate-200 rounded" />
        <div className="h-5 w-16 bg-slate-200 rounded-full" />
      </div>

      <div className="divide-y divide-slate-100">
        {[1, 2].map((i) => (
          <div key={i} className="px-5 py-5">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-slate-200" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-3 w-24 bg-slate-200 rounded" />
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded-full" />
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j}>
                  <div className="h-3 w-20 bg-slate-200 rounded mb-1" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <div className="h-3 w-32 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. TourBookingActionsSkeleton
// ─────────────────────────────────────────────
export function TourBookingActionsSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="h-4 w-16 bg-slate-200 rounded" />
      </div>
      <div className="px-5 py-4 flex flex-wrap gap-3">
        <div className="h-10 w-24 bg-slate-200 rounded-xl" />
        <div className="h-10 w-32 bg-slate-200 rounded-xl" />
        <div className="h-10 w-40 bg-slate-200 rounded-xl" />
        <div className="h-10 w-36 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. TourBookingDetailSkeleton  (default export)
// ─────────────────────────────────────────────
export default function TourBookingDetailSkeleton() {
  return (
    <div className="space-y-5">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-1 bg-slate-200 rounded" />
        <div className="h-4 w-24 bg-slate-200 rounded" />
      </div>

      <TourBookingHeroCardSkeleton />
      <PriceSummaryCardSkeleton />
      <TourApplicantsListSkeleton />
      <TourBookingActionsSkeleton />
    </div>
  );
}
