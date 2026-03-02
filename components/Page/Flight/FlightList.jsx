"use client"
// FlightList.jsx - Main page component
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import FlightCard from "../Card/FlightCard";
import { flightData } from "./FlightData";


const ABSOLUTE_MIN = Math.min(...flightData.map((f) => f.price));
const ABSOLUTE_MAX = Math.max(...flightData.map((f) => f.price));

const defaultFilters = {
  minPrice: ABSOLUTE_MIN,
  maxPrice: ABSOLUTE_MAX,
  absoluteMin: ABSOLUTE_MIN,
  absoluteMax: ABSOLUTE_MAX,
  stops: [],
  baggage: [],
  departureSlots: [],
  arrivalSlots: [],
  selectedAirlines: [],
};

export default function FlightList() {
  const [filters, setFilters] = useState(defaultFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  const filtered = useMemo(() => {
    let result = flightData.filter((flight) => {
      if (flight.price > filters.maxPrice) return false;
      if (
        filters.stops.length > 0 &&
        !filters.stops.includes(flight.stops === 0 ? "direct" : "1stop")
      )
        return false;
      if (
        filters.baggage.length > 0 &&
        !filters.baggage.includes(flight.baggage)
      )
        return false;
      if (
        filters.departureSlots.length > 0 &&
        !filters.departureSlots.includes(flight.departureSlot)
      )
        return false;
      if (
        filters.arrivalSlots.length > 0 &&
        !filters.arrivalSlots.includes(flight.arrivalSlot)
      )
        return false;
      if (
        filters.selectedAirlines.length > 0 &&
        !filters.selectedAirlines.includes(flight.airline)
      )
        return false;
      return true;
    });

    if (sortBy === "price") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "departure")
      result.sort((a, b) =>
        a.from.time.localeCompare(b.from.time)
      );
    else if (sortBy === "duration")
      result.sort((a, b) => a.duration.localeCompare(b.duration));

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Search size={14} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Dhaka → Cox&apos;s Bazar</p>
              <p className="text-sm font-bold text-slate-700">
                Sun, 08 Mar 2026 · 1 Passenger
              </p>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 hidden sm:block">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:border-blue-400"
            >
              <option value="price">Cheapest</option>
              <option value="departure">Earliest</option>
              <option value="duration">Shortest</option>
            </select>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl"
            >
              <SlidersHorizontal size={13} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
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
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(defaultFilters)}
              />
            </div>
          </div>
        )}

        {/* Flight Results */}
        <div className="flex-1 min-w-0">
          {/* Result count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-500">
              <span className="font-bold text-slate-800">{filtered.length}</span>{" "}
              flights found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">✈️</div>
              <p className="font-semibold text-slate-600">No flights found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {filtered.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 999px; }
      `}</style>
    </div>
  );
}