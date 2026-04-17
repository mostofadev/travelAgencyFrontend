"use client";


import { usePageFlights } from "@/hooks/Page/usePageFlight";
import FlightCard from "../Card/FlightCard";
import Pagination from "@/components/ui/Pagination/Pagination";

// ── Skeleton ──────────────────────────────────────────────────
function FlightCardSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f1f5f9",
        overflow: "hidden",
        animation: "shimmer 1.4s ease-in-out infinite",
      }}
    >
      {/* top strip */}
      <div
        style={{
          background: "#f8faff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#e2e8f0",
            }}
          />
          <div>
            <div
              style={{
                height: "13px",
                width: "80px",
                background: "#e2e8f0",
                borderRadius: "4px",
                marginBottom: "4px",
              }}
            />
            <div
              style={{
                height: "10px",
                width: "60px",
                background: "#f1f5f9",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: "20px",
            width: "70px",
            background: "#e2e8f0",
            borderRadius: "20px",
          }}
        />
      </div>

      {/* route */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              height: "32px",
              width: "80px",
              background: "#e2e8f0",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              height: "12px",
              width: "50px",
              background: "#f1f5f9",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        <div>
          <div
            style={{
              height: "32px",
              width: "80px",
              background: "#e2e8f0",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              height: "12px",
              width: "50px",
              background: "#f1f5f9",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* price row */}
      <div
        style={{
          padding: "0 20px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              height: "10px",
              width: "60px",
              background: "#f1f5f9",
              borderRadius: "4px",
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              height: "28px",
              width: "120px",
              background: "#e2e8f0",
              borderRadius: "6px",
            }}
          />
        </div>
        <div
          style={{
            height: "36px",
            width: "100px",
            background: "#e2e8f0",
            borderRadius: "10px",
          }}
        />
      </div>

      <style>{`@keyframes shimmer{0%,100%{opacity:1}50%{opacity:.45}}`}</style>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function FlightList({ filters = {}, onPageChange }) {
  const { flights, meta, isLoading, isFetching, isError, error } =
    usePageFlights(filters);

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
            background: "#dbeafe",
            color: "#1e40af",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "10px",
          }}
        >
          Flights
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
          Available Flights
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#64748b" }}>
          {isLoading
            ? "Searching flights…"
            : isError
              ? "Could not load flights"
              : `${meta?.total ?? flights.length} flights found — compare fares and book online`}
          {isFetching && !isLoading && (
            <span
              style={{ marginLeft: "8px", color: "#2563eb", fontSize: "11px" }}
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
          {error?.message || "Failed to load flights. Please try again."}
        </div>
      )}

      {/* Skeletons */}
      {isLoading && [1, 2, 3, 4, 5].map((i) => <FlightCardSkeleton key={i} />)}

      {/* Empty */}
      {!isLoading && !isError && flights.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#94a3b8",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>✈️</div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#64748b",
              margin: "0 0 4px",
            }}
          >
            No flights found
          </p>
          <p style={{ fontSize: "13px", margin: 0 }}>
            Try adjusting your search
          </p>
        </div>
      )}

      {/* Cards */}
      {!isLoading &&
        !isError &&
        flights.map((flight) => <FlightCard key={flight.id} flight={flight} />)}

      {/* Pagination */}
      {!isLoading && !isError && (
        <Pagination meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  );
}
