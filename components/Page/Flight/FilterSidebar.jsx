"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Plane,
  Clock,
  BadgeDollarSign,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const TIME_SLOTS = [
  { value: "morning", label: "Morning", range: "06:00 – 11:59" },
  { value: "afternoon", label: "Afternoon", range: "12:00 – 17:59" },
  { value: "evening", label: "Evening", range: "18:00 – 21:59" },
  { value: "night", label: "Night", range: "22:00 – 05:59" },
];

export function getTimeSlot(timeStr) {
  if (!timeStr) return null;
  const [h] = timeStr.split(":").map(Number);
  if (h >= 6 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  if (h >= 18 && h < 22) return "evening";
  return "night";
}

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

// ── Main FilterSidebar ─────────────────────────────────────────
/**
 * Props:
 *  @param {Object}   filters      — current filter state
 *  @param {Function} onChange     — (newFilters) => void
 *  @param {Function} onReset      — reset to defaults
 *  @param {Array}    flights      — all flights from API (for dynamic options)
 *  @param {number}   absoluteMin  — min price from API
 *  @param {number}   absoluteMax  — max price from API
 */
export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  flights = [],
  absoluteMin = 0,
  absoluteMax = 100000,
}) {
  const [openSections, setOpenSections] = useState({
    price: true,
    departure: true,
    arrival: true,
    aircraft: true,
    status: false,
  });

  const toggle = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleArray = (key, value) => {
    const arr = filters[key] ?? [];
    onChange({
      ...filters,
      [key]: arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value],
    });
  };

  // Dynamic options from API flights
  const aircraftModels = [
    ...new Set(flights.map((f) => f.aircraft?.model).filter(Boolean)),
  ].sort();

  const statuses = [
    ...new Set(flights.map((f) => f.status).filter(Boolean)),
  ].sort();

  const hasActiveFilters =
    filters.departureSlots?.length > 0 ||
    filters.arrivalSlots?.length > 0 ||
    filters.aircraftModels?.length > 0 ||
    filters.statuses?.length > 0 ||
    (filters.maxPrice !== undefined && filters.maxPrice < absoluteMax);

  return (
    <aside className="w-full bg-white shadow-sm border border-gray-100 overflow-hidden sticky top-5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-primary" />
          <span className="text-sm font-bold text-primary">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark px-2 py-1 rounded-lg transition-all"
          >
            <X size={11} /> Reset
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
            toggle={() => toggle("price")}
          />
          {openSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min={absoluteMin}
                max={absoluteMax}
                value={filters.maxPrice ?? absoluteMax}
                onChange={(e) =>
                  onChange({ ...filters, maxPrice: Number(e.target.value) })
                }
                className="w-full price-range"
              />
              <div className="flex justify-between text-xs text-primary font-medium">
                <span>৳ {absoluteMin.toLocaleString()}</span>
                <span className="text-primary font-bold">
                  ৳ {(filters.maxPrice ?? absoluteMax).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Departure Time */}
        <div>
          <SectionHeader
            icon={Clock}
            title="Departure Time"
            open={openSections.departure}
            toggle={() => toggle("departure")}
          />
          {openSections.departure && (
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const active = (filters.departureSlots ?? []).includes(
                  slot.value,
                );
                return (
                  <button
                    key={slot.value}
                    onClick={() => toggleArray("departureSlots", slot.value)}
                    className={`text-left px-2.5 py-2 rounded-xl border text-[10px] transition-all ${
                      active
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-100 hover:border-blue-200 text-slate-600"
                    }`}
                  >
                    <p className="font-bold leading-tight">{slot.label}</p>
                    <p className="text-slate-400 mt-0.5">{slot.range}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Arrival Time */}
        <div>
          <SectionHeader
            icon={Clock}
            title="Arrival Time"
            open={openSections.arrival}
            toggle={() => toggle("arrival")}
          />
          {openSections.arrival && (
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => {
                const active = (filters.arrivalSlots ?? []).includes(
                  slot.value,
                );
                return (
                  <button
                    key={slot.value}
                    onClick={() => toggleArray("arrivalSlots", slot.value)}
                    className={`text-left px-2.5 py-2 rounded-xl border text-[10px] transition-all ${
                      active
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-100 hover:border-blue-200 text-slate-600"
                    }`}
                  >
                    <p className="font-bold leading-tight">{slot.label}</p>
                    <p className="text-slate-400 mt-0.5">{slot.range}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Aircraft */}
        {aircraftModels.length > 0 && (
          <>
            <div>
              <SectionHeader
                icon={Plane}
                title="Aircraft"
                open={openSections.aircraft}
                toggle={() => toggle("aircraft")}
              />
              {openSections.aircraft && (
                <div className="space-y-2">
                  {aircraftModels.map((model) => {
                    const active = (filters.aircraftModels ?? []).includes(
                      model,
                    );
                    return (
                      <label
                        key={model}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                          active
                            ? "border-blue-400 bg-blue-50"
                            : "border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="accent-blue-500 w-4 h-4"
                          checked={active}
                          onChange={() => toggleArray("aircraftModels", model)}
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {model}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="h-px bg-slate-100" />
          </>
        )}

        {/* Status */}
        {statuses.length > 0 && (
          <div>
            <SectionHeader
              icon={Plane}
              title="Flight Status"
              open={openSections.status}
              toggle={() => toggle("status")}
            />
            {openSections.status && (
              <div className="space-y-2">
                {statuses.map((s) => {
                  const active = (filters.statuses ?? []).includes(s);
                  return (
                    <label
                      key={s}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer transition-all capitalize ${
                        active
                          ? "border-blue-400 bg-blue-50"
                          : "border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-blue-500 w-4 h-4"
                        checked={active}
                        onChange={() => toggleArray("statuses", s)}
                      />
                      <span className="text-xs font-semibold text-slate-700 capitalize">
                        {s}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
