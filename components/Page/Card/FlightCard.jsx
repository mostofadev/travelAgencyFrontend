"use client";

// components/Page/Card/FlightCard.jsx
import { jwtManager } from "@/lib/auth/jwt";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plane,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  X,
  Baby,
  User,
  UserCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";

// ── Status colours 
const STATUS_COLORS = {
  scheduled: "bg-emerald-100 text-emerald-800",
  delayed: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-indigo-100 text-indigo-800",
  boarding: "bg-blue-100 text-blue-800",
  default: "bg-slate-100 text-slate-600",
};

// ── Class tab colours 
const CLASS_TAB = {
  Economy: {
    active: "bg-blue-600 text-white border-blue-600",
    inactive: "bg-white text-slate-600 border-slate-200 hover:border-blue-300",
  },
  Business: {
    active: "bg-amber-500 text-white border-amber-500",
    inactive: "bg-white text-slate-600 border-slate-200 hover:border-amber-300",
  },
  First: {
    active: "bg-purple-600 text-white border-purple-600",
    inactive:
      "bg-white text-slate-600 border-slate-200 hover:border-purple-300",
  },
  default: {
    active: "bg-slate-700 text-white border-slate-700",
    inactive: "bg-white text-slate-600 border-slate-200",
  },
};

const CLASS_BADGE = {
  Economy: "bg-blue-50 text-blue-700",
  Business: "bg-amber-50 text-amber-700",
  First: "bg-purple-50 text-purple-700",
  default: "bg-slate-50 text-slate-600",
};

function fmtPrice(amount) {
  if (amount === null || amount === undefined) return "—";
  return `৳ ${Number(amount).toLocaleString("en-BD")}`;
}

// ── Passenger counter row 
function PassengerRow({
  icon: Icon,
  label,
  sublabel,
  value,
  onDec,
  onInc,
  min = 0,
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-50">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
          <Icon size={14} className="text-slate-500" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-800 m-0">
            {label}
          </p>
          <p className="text-[11px] text-slate-400 m-0">{sublabel}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onDec}
          disabled={value <= min}
          className={`w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-base font-light transition-all
            ${
              value <= min
                ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                : "text-slate-500 bg-white cursor-pointer hover:border-slate-400 hover:bg-slate-50"
            }`}
        >
          −
        </button>
        <span className="text-[15px] font-bold text-slate-900 min-w-[18px] text-center">
          {value}
        </span>
        <button
          onClick={onInc}
          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-base font-light text-slate-500 bg-white cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ── Main component 
export default function FlightCard({ flight }) {
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const modalRef = useRef(null);

  useEffect(() => {
    if (!showModal) return;
    function handler(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showModal]);

  const {
    flight_number,
    status,
    departure_time,
    departure_date,
    arrival_time,
    arrival_date,
    duration_formatted,
    aircraft,
    from_airport,
    to_airport,
    classes = [],
    cheapest_fare,
  } = flight;

  const statusColor = STATUS_COLORS[status] ?? STATUS_COLORS.default;
  const activeClass = selectedClass ?? classes[0] ?? null;
  const totalPassengers = adults + children + infants;

  function handleContinue() {
    if (!activeClass?.id) return;

    const params = new URLSearchParams({
      flight_class_id: activeClass.id,
      adults,
      children,
      infants,
    });

    const targetUrl = `/flight-booking?${params.toString()}`;

    setShowModal(false);

    if (jwtManager.isUserAuthenticated()) {
      router.push(targetUrl);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        {/* ── Top strip ── */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-2.5 flex items-center justify-between border-b border-blue-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Plane size={15} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-800 m-0">
                {flight_number}
              </p>
              <p className="text-[11px] text-slate-400 m-0">
                {aircraft?.model ?? ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-3 py-0.5 rounded-full capitalize ${statusColor}`}
            >
              {status}
            </span>
            <span className="text-[11px] text-slate-400">
              {departure_date ?? ""}
            </span>
          </div>
        </div>

        <div className="px-5 py-4">
          {/* ── Route ── */}
          <div className="flex items-center justify-between gap-3">
            {/* Departure */}
            <div className="text-left flex-1">
              <p className="text-[32px] font-black text-slate-900 tracking-tight leading-none m-0">
                {departure_time ?? "—"}
              </p>
              <p className="text-[13px] font-bold text-slate-500 mt-1 m-0">
                {from_airport?.code ?? "—"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight m-0">
                {from_airport?.city ?? ""}
              </p>
            </div>

            {/* Duration + path */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <Clock size={11} />
                <span>{duration_formatted ?? "—"}</span>
              </div>
              <div className="relative w-28 flex items-center">
                <div className="h-px w-full bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200" />
                <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                <Plane
                  size={15}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-px text-blue-500 fill-blue-500"
                />
                <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Direct
              </span>
            </div>

            {/* Arrival */}
            <div className="text-right flex-1">
              <p className="text-[32px] font-black text-slate-900 tracking-tight leading-none m-0">
                {arrival_time ?? "—"}
              </p>
              <p className="text-[13px] font-bold text-slate-500 mt-1 m-0">
                {to_airport?.code ?? "—"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-tight m-0">
                {to_airport?.city ?? ""}
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-3.5 flex items-center gap-2">
            <div className="flex-1 border-t border-dashed border-slate-200" />
            <span className="text-[10px] text-slate-300">
              ✈ Checked baggage included
            </span>
            <div className="flex-1 border-t border-dashed border-slate-200" />
          </div>

          {/* ── Class tabs ── */}
          {classes.length > 0 && (
            <div className="flex gap-1.5 mb-3 flex-wrap">
              {classes.map((cls) => {
                const isActive = activeClass?.class_name === cls.class_name;
                const colors = CLASS_TAB[cls.class_name] ?? CLASS_TAB.default;
                return (
                  <button
                    key={cls.class_name}
                    onClick={() => setSelectedClass(cls)}
                    className="outline-none cursor-pointer bg-transparent border-none p-0"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        isActive ? colors.active : colors.inactive
                      }`}
                    >
                      {cls.class_name}
                      <span
                        className={`font-medium ${isActive ? "opacity-85" : "opacity-60"}`}
                      >
                        {fmtPrice(cls.base_fare)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Price + CTA ── */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5 m-0">
                {activeClass?.class_name ?? "Best"} fare
              </p>
              <p className="text-[26px] font-black tracking-tight leading-none text-primary m-0">
                {activeClass
                  ? fmtPrice(activeClass.base_fare)
                  : cheapest_fare
                    ? fmtPrice(cheapest_fare)
                    : "—"}
              </p>
              {activeClass && (
                <p className="flex items-center gap-1 text-[11px] text-emerald-500 mt-1 m-0">
                  <Users size={11} />
                  {activeClass.seats_available} seats left
                </p>
              )}
              <p className="text-[10px] text-slate-400 mt-0.5 m-0">
                per person
              </p>
            </div>

            <Button onClick={() => setShowModal(true)}>Book Now</Button>
          </div>
        </div>

        {/* ── Expandable details ── */}
        <div className="border-t border-slate-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1 py-2.5 text-[12px] font-semibold text-primary hover:text-primary-dark transition-colors bg-transparent border-none cursor-pointer outline-none"
          >
            {expanded ? "Hide Details" : "Flight Details"}
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {expanded && (
            <div className="px-5 pb-4 bg-slate-50 text-[12px] text-slate-500">
              <div className="grid gap-1.5">
                {[
                  ["Flight No.", flight_number],
                  ["Aircraft", aircraft?.model],
                  [
                    "Departure Airport",
                    from_airport
                      ? `${from_airport.name} (${from_airport.code})`
                      : null,
                  ],
                  [
                    "Arrival Airport",
                    to_airport
                      ? `${to_airport.name} (${to_airport.code})`
                      : null,
                  ],
                  ["Duration", duration_formatted],
                  ["Arrival Date", arrival_date],
                ].map(([label, value]) =>
                  value ? (
                    <div
                      key={label}
                      className="flex justify-between py-1.5 border-b border-blue-50"
                    >
                      <span className="text-slate-400">{label}</span>
                      <span className="font-semibold text-right max-w-[60%]">
                        {value}
                      </span>
                    </div>
                  ) : null,
                )}
              </div>

              {classes.length > 0 && (
                <div className="mt-2.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Available Classes
                  </p>
                  {classes.map((c) => (
                    <div
                      key={c.class_name}
                      className="flex justify-between items-center py-1.5 border-b border-blue-50"
                    >
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CLASS_BADGE[c.class_name] ?? CLASS_BADGE.default}`}
                      >
                        {c.class_name}
                      </span>
                      <span className="text-[12px] font-bold text-slate-800">
                        {fmtPrice(c.base_fare)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1.5">
                          · {c.seats_available} seats
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Passenger selector modal (fixed center overlay) ── */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-xs bg-white rounded-2xl border border-blue-50 shadow-2xl overflow-hidden"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-slate-100">
              <div>
                <p className="text-[13px] font-bold text-slate-900 m-0">
                  Select Passengers
                </p>
                <p className="text-[11px] text-slate-400 m-0">
                  {activeClass?.class_name ?? "Economy"} class
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-none outline-none hover:bg-slate-200 transition-colors"
              >
                <X size={13} className="text-slate-500" />
              </button>
            </div>

            {/* Counters */}
            <div className="px-4">
              <PassengerRow
                icon={UserCheck}
                label="Adults"
                sublabel="Age 12+"
                value={adults}
                min={1}
                onDec={() => setAdults((v) => Math.max(1, v - 1))}
                onInc={() => setAdults((v) => v + 1)}
              />
              <PassengerRow
                icon={User}
                label="Children"
                sublabel="Age 2–11"
                value={children}
                min={0}
                onDec={() => setChildren((v) => Math.max(0, v - 1))}
                onInc={() => setChildren((v) => v + 1)}
              />
              <PassengerRow
                icon={Baby}
                label="Infants"
                sublabel="Under 2"
                value={infants}
                min={0}
                onDec={() => setInfants((v) => Math.max(0, v - 1))}
                onInc={() => setInfants((v) => v + 1)}
              />
            </div>

            {/* Summary + Continue */}
            <div className="px-4 pt-3 pb-3.5">
              <div className="flex justify-between items-center mb-2.5 px-2.5 py-2 rounded-lg bg-slate-50">
                <span className="text-[12px] text-slate-500">
                  {totalPassengers} passenger{totalPassengers !== 1 ? "s" : ""}
                </span>
                <span className="text-[13px] font-bold text-slate-900">
                  {activeClass
                    ? fmtPrice(activeClass.base_fare * totalPassengers)
                    : "—"}
                </span>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!activeClass?.id}
                className="w-full"
              >
                Continue to Booking →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
