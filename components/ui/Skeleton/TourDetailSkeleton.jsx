"use client";

// ─── Pulse Box helper ─────────────────────────────────────────────────────────
function PBox({ className = "" }) {
  return <div className={`bg-slate-200 rounded-2xl ${className}`} />;
}

// ─── Stat Card Skeleton ───────────────────────────────────────────────────────
function StatCardSkeleton({ accent = false }) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col gap-3 ${
        accent ? "bg-primary/20" : "bg-white border border-slate-200 shadow-sm"
      }`}
    >
      <div className="w-9 h-9 rounded-xl bg-slate-200" />
      <div className="h-2.5 w-16 bg-slate-200 rounded-full" />
      <div className="h-4 w-24 bg-slate-200 rounded" />
    </div>
  );
}

// ─── Itinerary Row Skeleton ───────────────────────────────────────────────────
function ItineraryRowSkeleton() {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-2.5 w-14 bg-slate-200 rounded-full" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block h-5 w-24 bg-slate-200 rounded-full" />
          <div className="hidden sm:block h-5 w-20 bg-slate-200 rounded-full" />
          <div className="w-4 h-4 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Related Card Skeleton ────────────────────────────────────────────────────
function RelatedCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="h-32 bg-slate-200 w-full" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-4 w-16 bg-slate-200 rounded-full" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-3 w-3/4 bg-slate-200 rounded" />
        <div className="flex justify-between mt-1">
          <div className="h-3 w-14 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SKELETON ────────────────────────────────────────────────────────────
export default function TourDetailSkeleton() {
  return (
    <div className="animate-pulse bg-slate-50 pb-20">
      {/* ── Hero ── */}
      <div className="relative h-[400px] bg-slate-300 overflow-hidden">
        {/* Back button ghost */}
        <div className="absolute top-5 left-5 h-8 w-32 bg-white/20 rounded-xl" />

        {/* Top-right badges */}
        <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
          <div className="h-6 w-20 bg-white/20 rounded-full" />
          <div className="h-6 w-20 bg-white/20 rounded-full" />
        </div>

        {/* Bottom overlay: title + meta */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-5 pb-7 pt-16">
          <div className="flex gap-2 mb-3">
            <div className="h-5 w-20 bg-white/25 rounded-full" />
            <div className="h-5 w-24 bg-white/25 rounded-full" />
            <div className="h-5 w-16 bg-white/25 rounded-full" />
          </div>
          <div className="h-8 w-3/4 bg-white/30 rounded-lg mb-3" />
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-white/20 rounded" />
            <div className="h-3 w-24 bg-white/20 rounded" />
            <div className="h-3 w-16 bg-white/20 rounded" />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...Array(5)].map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
              <StatCardSkeleton accent />
            </div>

            {/* Seat Availability */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-200 rounded" />
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-14 bg-slate-200 rounded-full" />
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                <div className="bg-slate-300 h-1.5 rounded-full w-[60%]" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-3 w-24 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2.5">
              <div className="h-4 w-36 bg-slate-200 rounded mb-1" />
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-5/6 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-4/6 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-3/4 bg-slate-200 rounded" />
            </div>

            {/* Highlights */}
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-slate-200 rounded" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-5/6 bg-slate-200 rounded" />
              <div className="h-3 w-3/4 bg-slate-200 rounded" />
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200 shrink-0" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Itinerary */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-slate-200 rounded" />
                <div className="h-4 w-40 bg-slate-200 rounded" />
              </div>
              {[...Array(4)].map((_, i) => (
                <ItineraryRowSkeleton key={i} />
              ))}
            </div>

            {/* Terms & Cancellation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-slate-200 rounded" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded" />
                  <div className="h-3 w-5/6 bg-slate-200 rounded" />
                  <div className="h-3 w-4/6 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Booking Sidebar ── */}
          <div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md sticky top-5 flex flex-col gap-4">
              {/* Price header */}
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-24 bg-slate-200 rounded-full" />
                <div className="h-9 w-40 bg-slate-200 rounded" />
                <div className="h-3 w-32 bg-slate-200 rounded-full" />
              </div>

              <div className="h-px bg-slate-100" />

              {/* Passengers label */}
              <div className="h-3 w-24 bg-slate-200 rounded-full" />

              {/* Counter rows */}
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-14 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="w-5 h-5 bg-slate-200 rounded" />
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                  </div>
                </div>
              ))}

              {/* Price breakdown */}
              <div className="bg-slate-100 rounded-xl p-4 flex flex-col gap-2.5">
                <div className="h-3 w-28 bg-slate-200 rounded-full mb-1" />
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-32 bg-slate-200 rounded" />
                    <div className="h-3 w-20 bg-slate-200 rounded" />
                  </div>
                ))}
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <div className="h-4 w-12 bg-slate-200 rounded" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              </div>

              {/* Book button */}
              <div className="h-11 w-full bg-slate-200 rounded-xl" />

              <div className="h-3 w-24 bg-slate-200 rounded-full mx-auto" />

              {/* Quick info strip */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Tours ── */}
        <div className="mt-12">
          <div className="flex items-end justify-between mb-4">
            <div className="flex flex-col gap-2">
              <div className="h-5 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-48 bg-slate-200 rounded" />
            </div>
            <div className="h-4 w-16 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <RelatedCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
