"use client";


import { usePageTourPackages } from "@/hooks/Page/usePageTourPackage";
import TourPackageCard from "../Card/TourpackageCard";
import Pagination from "@/components/ui/Pagination/Pagination";
import TourPackageCardSkeleton from "@/components/ui/Skeleton/TourPackageCardSkeleton";

export default function TourPackageList({ filters = {}, onPageChange }) {
  const { tourPackages, meta, isLoading, isFetching, isError, error } =
    usePageTourPackages(filters);

  return (
    <div
      style={{
        padding: "32px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            background: "#ede9fe",
            color: "#6d28d9",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Tour Packages
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-0.02em",
          }}
        >
          Explore Our Packages
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#64748b" }}>
          {isLoading
            ? "Loading packages…"
            : isError
              ? "Could not load packages"
              : `${meta?.total ?? tourPackages.length} packages available — compare prices and book online`}
          {isFetching && !isLoading && (
            <span
              style={{ marginLeft: "8px", color: "#6d28d9", fontSize: "11px" }}
            >
              Updating…
            </span>
          )}
        </p>
      </div>

      {/* Error */}
      {isError && (
        <div
          style={{
            padding: "16px 20px",
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: "10px",
            color: "#991b1b",
            fontSize: "13px",
          }}
        >
          {error?.message || "Failed to load packages. Please try again."}
        </div>
      )}

      {/* Skeletons */}
      {isLoading &&
        [1, 2, 3, 4, 5, 6].map((i) => <TourPackageCardSkeleton key={i} />)}

      {/* Empty */}
      {!isLoading && !isError && tourPackages.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          No packages found for the selected filters.
        </div>
      )}

      {/* Cards */}
      {!isLoading &&
        tourPackages.map((pkg) => <TourPackageCard key={pkg.id} pkg={pkg} />)}

      {/* Pagination */}
      {!isLoading && !isError && (
        <Pagination meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  );
}
