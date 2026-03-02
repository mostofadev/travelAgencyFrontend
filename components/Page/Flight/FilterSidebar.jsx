// FilterSidebar.jsx
import { useState } from "react";
import {
  SlidersHorizontal,
  Plane,
  Clock,
  Luggage,
  BadgeDollarSign,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { timeSlots , airlines} from "./FlightData";

function SectionHeader({ icon: Icon, title, open, toggle }) {
  return (
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between mb-3 group"
    >
      <span className="flex items-center gap-2 text-sm font-bold text-primary">
        <Icon size={15} className="text-primary" />
        {title}
      </span>
      {open ? (
        <ChevronUp size={14} className="text-primary" />
      ) : (
        <ChevronDown size={14} className="text-primary" />
      )}
    </button>
  );
}

export default function FilterSidebar({ filters, onChange, onReset }) {
  const [openSections, setOpenSections] = useState({
    price: true,
    stops: true,
    baggage: true,
    departure: true,
    arrival: true,
    airlines: true,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleArrayItem = (key, value) => {
    const arr = filters[key];
    const updated = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: updated });
  };

  const hasActiveFilters =
    filters.stops.length > 0 ||
    filters.baggage.length > 0 ||
    filters.departureSlots.length > 0 ||
    filters.arrivalSlots.length > 0 ||
    filters.selectedAirlines.length > 0 ||
    filters.minPrice > filters.absoluteMin ||
    filters.maxPrice < filters.absoluteMax;

  return (
    <aside className="w-full bg-white  shadow-sm border border-gray-100 overflow-hidden sticky top-5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-white" />
          <span className="text-sm font-bold text-primary">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark  px-2 py-1 rounded-lg transition-all"
          >
            <X size={11} />
            Reset
          </button>
        )}
      </div>

      <div className="px-2 py-4 space-y-5 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
        {/* Price Range */}
        <div>
          <SectionHeader
            icon={BadgeDollarSign}
            title="Price Range"
            open={openSections.price}
            toggle={() => toggleSection("price")}
          />
          {openSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min={filters.absoluteMin}
                max={filters.absoluteMax}
                value={filters.maxPrice}
                onChange={(e) =>
                  onChange({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="w-full price-range"
              />
              <div className="flex justify-between text-xs text-primary font-medium">
                <span>৳ {filters.absoluteMin.toLocaleString()}</span>
                <span className="text-primary font-bold">
                  ৳ {filters.maxPrice.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Stops */}
        <div>
          <SectionHeader
            icon={Plane}
            title="Stops"
            open={openSections.stops}
            toggle={() => toggleSection("stops")}
          />
          {openSections.stops && (
            <div className="space-y-2">
              {[
                { value: "direct", label: "Direct Flight", sub: "Non-stop" },
                { value: "1stop", label: "1 Stop", sub: "Via connecting" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                    filters.stops.includes(item.value)
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-100 hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400">{item.sub}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4"
                    checked={filters.stops.includes(item.value)}
                    onChange={() => toggleArrayItem("stops", item.value)}
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Baggage */}
        <div>
          <SectionHeader
            icon={Luggage}
            title="Baggage"
            open={openSections.baggage}
            toggle={() => toggleSection("baggage")}
          />
          {openSections.baggage && (
            <div className="space-y-2">
              {["20 kg", "30 kg"].map((kg) => (
                <label
                  key={kg}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                    filters.baggage.includes(kg)
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-100 hover:border-blue-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4"
                    checked={filters.baggage.includes(kg)}
                    onChange={() => toggleArrayItem("baggage", kg)}
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {kg}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Departure Timing */}
        <div>
          <SectionHeader
            icon={Clock}
            title="Departure Time"
            open={openSections.departure}
            toggle={() => toggleSection("departure")}
          />
          {openSections.departure && (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => toggleArrayItem("departureSlots", slot.value)}
                  className={`text-left px-2.5 py-2 rounded-xl border text-[10px] transition-all ${
                    filters.departureSlots.includes(slot.value)
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-slate-100 hover:border-blue-200 text-slate-600"
                  }`}
                >
                  <p className="font-bold leading-tight">{slot.label}</p>
                  <p className="text-slate-400 mt-0.5">{slot.range}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Arrival Timing */}
        <div>
          <SectionHeader
            icon={Clock}
            title="Arrival Time"
            open={openSections.arrival}
            toggle={() => toggleSection("arrival")}
          />
          {openSections.arrival && (
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => toggleArrayItem("arrivalSlots", slot.value)}
                  className={`text-left px-2.5 py-2 rounded-xl border text-[10px] transition-all ${
                    filters.arrivalSlots.includes(slot.value)
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-slate-100 hover:border-blue-200 text-slate-600"
                  }`}
                >
                  <p className="font-bold leading-tight">{slot.label}</p>
                  <p className="text-slate-400 mt-0.5">{slot.range}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Airlines */}
        <div>
          <SectionHeader
            icon={Plane}
            title="Airlines"
            open={openSections.airlines}
            toggle={() => toggleSection("airlines")}
          />
          {openSections.airlines && (
            <div className="space-y-2">
              {airlines.map((airline) => (
                <label
                  key={airline.value}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                    filters.selectedAirlines.includes(airline.value)
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-100 hover:border-blue-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500 w-4 h-4"
                    checked={filters.selectedAirlines.includes(airline.value)}
                    onChange={() =>
                      toggleArrayItem("selectedAirlines", airline.value)
                    }
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {airline.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}