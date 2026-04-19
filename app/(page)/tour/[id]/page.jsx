// app/tours/[id]/page.jsx
"use client";

import TourDetailPage from "@/components/Page/TourPackage/TourDetailPage";
import Section from "@/components/ui/Section";
import TourDetailSkeleton from "@/components/ui/Skeleton/TourDetailSkeleton";
import {
  usePageTourPackageById,
  useTourPackageById,
} from "@/hooks/Page/usePageTourPackage";
import { useParams } from "next/navigation";

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function TourSkeleton() {
  return (
    <div className="animate-pulse bg-[#faf6ef] min-h-screen">
      {/* Hero skeleton */}
      <div className="h-[420px] bg-[#e8dcc8] w-full" />

      <div className="  px-4 pt-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left */}
          <div className="flex flex-col gap-4">
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-[#ede4d0] rounded-2xl" />
              ))}
            </div>
            {/* Seat bar */}
            <div className="h-20 bg-[#ede4d0] rounded-2xl" />
            {/* Description */}
            <div className="h-40 bg-[#ede4d0] rounded-2xl" />
            {/* Highlights */}
            <div className="h-28 bg-[#ede4d0] rounded-2xl" />
            {/* Inclusions/Exclusions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-[#ede4d0] rounded-2xl" />
              <div className="h-32 bg-[#ede4d0] rounded-2xl" />
            </div>
            {/* Itinerary */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-[#ede4d0] rounded-2xl" />
            ))}
          </div>
          {/* Right sidebar */}
          <div className="h-[500px] bg-[#ede4d0] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Error State ──────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center p-6">
      <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          ✈️
        </div>
        <h2 className="text-base font-bold text-[#2a1f0e] mb-2">
          Could not load tour
        </h2>
        <p className="text-sm text-[#7a6a4a] mb-5">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-[#c8973a] hover:bg-[#b07d28] text-white font-bold rounded-xl px-6 py-2.5 text-sm transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TourDetailClientPage() {
  const { id } = useParams();
  const { tourPackage, related, isLoading, error, refetch } =
    usePageTourPackageById(id);

  if (isLoading)
    return (
      <Section>
        <TourDetailSkeleton />
      </Section>
    );
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!tourPackage) return <ErrorState message="Tour package not found." />;

  return (
    <Section>
      <TourDetailPage tour={tourPackage} related={related} />
    </Section>
  );
}
