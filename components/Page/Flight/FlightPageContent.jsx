"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import FlightFilterPanel from "@/components/ui/filter/Plan/FlightFilterPanel";
import FilterSidebar, {
  getTimeSlot,
} from "@/components/Page/Flight/FilterSidebar";
import FlightCard from "@/components/Page/Card/FlightCard";
import Pagination from "@/components/ui/Pagination/Pagination";
import Section from "@/components/ui/Section";
import { usePageFlights } from "@/hooks/Page/usePageFlight";

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
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            height: "32px",
            width: "80px",
            background: "#e2e8f0",
            borderRadius: "6px",
          }}
        />
        <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        <div
          style={{
            height: "32px",
            width: "80px",
            background: "#e2e8f0",
            borderRadius: "6px",
          }}
        />
      </div>
      <div
        style={{
          padding: "0 20px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "28px",
            width: "120px",
            background: "#e2e8f0",
            borderRadius: "6px",
          }}
        />
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

export default function FlightPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [overrideFilters, setOverrideFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const urlFilters = useMemo(
    () => ({
      from_airport_id: searchParams.get("from_airport_id") || undefined,
      to_airport_id: searchParams.get("to_airport_id") || undefined,
      departure_date: searchParams.get("departure_date") || undefined,
      class_name: searchParams.get("class_name") || undefined,
    }),
    [searchParams],
  );

  const apiFilters = useMemo(
    () => ({
      ...(overrideFilters ?? urlFilters),
      per_page: 50,
      page,
    }),
    [overrideFilters, urlFilters, page],
  );

  const { flights, meta, isLoading, isFetching, isError, error } =
    usePageFlights(apiFilters);

  const absoluteMin = useMemo(() => {
    const fares = flights
      .map((f) => Number(f.cheapest_fare))
      .filter((n) => !isNaN(n) && n > 0);
    return fares.length > 0 ? Math.min(...fares) : 0;
  }, [flights]);

  const absoluteMax = useMemo(() => {
    const fares = flights
      .map((f) => Number(f.cheapest_fare))
      .filter((n) => !isNaN(n) && n > 0);
    return fares.length > 0 ? Math.max(...fares) : 100000;
  }, [flights]);

  const [sidebarFilters, setSidebarFilters] = useState({
    maxPrice: null,
    departureSlots: [],
    arrivalSlots: [],
    aircraftModels: [],
    statuses: [],
  });

  const effectiveMaxPrice = sidebarFilters.maxPrice ?? absoluteMax;

  const filtered = useMemo(() => {
    if (isLoading || !flights.length) return flights;

    return flights.filter((f) => {
      const fare = Number(f.cheapest_fare);
      if (!isNaN(fare) && fare > 0) {
        if (fare > effectiveMaxPrice) return false;
      }
      if (sidebarFilters.departureSlots.length > 0) {
        const slot = getTimeSlot(f.departure_time);
        if (!sidebarFilters.departureSlots.includes(slot)) return false;
      }
      if (sidebarFilters.arrivalSlots.length > 0) {
        const slot = getTimeSlot(f.arrival_time);
        if (!sidebarFilters.arrivalSlots.includes(slot)) return false;
      }
      if (sidebarFilters.aircraftModels.length > 0) {
        if (!sidebarFilters.aircraftModels.includes(f.aircraft?.model))
          return false;
      }
      if (sidebarFilters.statuses.length > 0) {
        if (!sidebarFilters.statuses.includes(f.status)) return false;
      }
      return true;
    });
  }, [flights, sidebarFilters, effectiveMaxPrice, isLoading]);

  const handleSearch = (newFilters) => {
    
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(newFilters).filter(([, v]) => v !== undefined),
      ),
    );
    router.replace(
      `/flight${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false },
    );
    setOverrideFilters(newFilters);
    setPage(1);
    setSidebarFilters({
      maxPrice: null,
      departureSlots: [],
      arrivalSlots: [],
      aircraftModels: [],
      statuses: [],
    });
  };

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSidebarReset = () => {
    setSidebarFilters({
      maxPrice: null,
      departureSlots: [],
      arrivalSlots: [],
      aircraftModels: [],
      statuses: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <Section>
              <FlightFilterPanel onSearch={handleSearch} />
            </Section>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex-shrink-0"
          >
            <SlidersHorizontal size={13} />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="hidden lg:block w-72 flex-shrink-0">
          <FilterSidebar
            filters={{ ...sidebarFilters, maxPrice: effectiveMaxPrice }}
            onChange={setSidebarFilters}
            onReset={handleSidebarReset}
            flights={flights}
            absoluteMin={absoluteMin}
            absoluteMax={absoluteMax}
          />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-80 bg-white shadow-2xl h-full overflow-auto animate-slide-in">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-full w-7 h-7 flex items-center justify-center transition-colors z-10"
              >
                <X size={14} />
              </button>
              <FilterSidebar
                filters={{ ...sidebarFilters, maxPrice: effectiveMaxPrice }}
                onChange={setSidebarFilters}
                onReset={handleSidebarReset}
                flights={flights}
                absoluteMin={absoluteMin}
                absoluteMax={absoluteMax}
              />
            </div>
          </div>
        )}

        <div
          className="flex-1 min-w-0"
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span style={{ fontSize: "13px", color: "#64748b" }}>
                <span style={{ fontWeight: 700, color: "#0f172a" }}>
                  {filtered.length}
                </span>{" "}
                flights found
              </span>
              {isFetching && !isLoading && (
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "11px",
                    color: "#2563eb",
                  }}
                >
                  Updating…
                </span>
              )}
            </div>
          </div>

          {isError && (
            <div
              style={{
                padding: "16px",
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                borderRadius: "10px",
                color: "#991b1b",
                fontSize: "13px",
              }}
            >
              {error?.message || "Failed to load flights."}
            </div>
          )}

          {isLoading &&
            [1, 2, 3, 4, 5].map((i) => <FlightCardSkeleton key={i} />)}

          {!isLoading && !isError && filtered.length === 0 && (
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
                Try adjusting your filters
              </p>
              <button
                onClick={handleSidebarReset}
                style={{
                  marginTop: "12px",
                  fontSize: "13px",
                  color: "#2563eb",
                  fontWeight: 600,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {!isLoading &&
            !isError &&
            filtered.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}

          {!isLoading && !isError && (
            <Pagination meta={meta} onPageChange={handlePageChange} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in { from{transform:translateX(-100%)} to{transform:translateX(0)} }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
      `}</style>
    </div>
  );
}
