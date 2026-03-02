// FlightCard.jsx
import { useState } from "react";
import { Plane, Luggage, ChevronDown, ChevronUp, Clock } from "lucide-react";

export default function FlightCard({ flight }) {
  const [expanded, setExpanded] = useState(false);

  const discount = Math.round(
    ((flight.originalPrice - flight.price) / flight.originalPrice) * 100
  );

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden">
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          -{discount}% OFF
        </div>
      )}

      {/* Class badge */}
      <div className="absolute top-4 left-4">
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            flight.class === "Business"
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {flight.class}
        </span>
      </div>

      <div className="px-5 pt-10 pb-4">
        {/* Airline Info */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML = `<span class="text-xs font-bold text-slate-500">${flight.airlineCode}</span>`;
              }}
            />
          </div>
          <span className="text-sm font-semibold text-slate-700">
            {flight.airline}
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between gap-4">
          {/* Departure */}
          <div className="text-left flex-1">
            <p className="text-3xl font-black text-slate-800 tracking-tight">
              {flight.from.time}
            </p>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              {flight.from.code}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 leading-tight">
              {flight.from.city}
            </p>
          </div>

          {/* Duration + line */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Clock size={10} />
              <span>{flight.duration}</span>
            </div>
            <div className="relative w-28 flex items-center">
              <div className="h-px w-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
              <Plane
                size={14}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-px text-blue-500 fill-blue-500"
              />
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                flight.stops === 0
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-orange-600 bg-orange-50"
              }`}
            >
              {flight.stopLabel}
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right flex-1">
            <p className="text-3xl font-black text-slate-800 tracking-tight">
              {flight.to.time}
            </p>
            <p className="text-sm font-bold text-slate-600 mt-0.5">
              {flight.to.code}
            </p>
            <p className="text-xs text-slate-400 mt-0.5 leading-tight">
              {flight.to.city}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-2">
          {flight.from.date}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-dashed border-t border-dashed border-slate-200"></div>
          <Luggage size={14} className="text-slate-300" />
          <span className="text-xs text-slate-400">{flight.baggage}</span>
          <div className="flex-1 h-px border-t border-dashed border-slate-200"></div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 line-through">
              ৳ {flight.originalPrice.toLocaleString()}
            </p>
            <p className="text-2xl font-black text-blue-600">
              ৳ {flight.price.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">per person</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200">
            Book Now
          </button>
        </div>
      </div>

      {/* Expandable section */}
      <div className="border-t border-slate-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-xs text-blue-500 hover:text-blue-700 py-2.5 transition-colors font-medium"
        >
          {expanded ? "Hide Details" : "Flight Details"}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="px-5 pb-4 bg-slate-50 text-xs text-slate-600 space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Departure Airport</span>
              <span className="font-medium text-right max-w-[55%]">
                {flight.from.airport}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Arrival Airport</span>
              <span className="font-medium text-right max-w-[55%]">
                {flight.to.airport}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-400">Stops</span>
              <span className="font-medium">{flight.stopLabel}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Checked Baggage</span>
              <span className="font-medium">{flight.baggage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}