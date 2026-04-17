"use client";

import { Plane, FileText, MapPin, Clock, Calendar } from "lucide-react";

function FlightSummary({ data }) {
  const {
    flight_number,
    departure_time,
    arrival_time,
    departure_date,
    duration_formatted,
    from_airport,
    to_airport,
    aircraft,
  } = data;

  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[28px] font-black text-primary leading-none m-0">
            {departure_time ?? "—"}
          </p>
          <p className="text-[13px] font-bold text-slate-500 mt-1 m-0">
            {from_airport?.code ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 m-0">
            {from_airport?.city ?? ""}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 flex-1">
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock size={10} />
            {duration_formatted ?? "—"}
          </span>
          <div className="relative w-full flex items-center">
            <div className="h-px w-full bg-slate-200" />
            <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-primary" />
            <Plane
              size={12}
              className="absolute left-1/2 -translate-x-1/2 text-primary fill-primary"
            />
            <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
            Direct
          </span>
        </div>
        <div className="text-right">
          <p className="text-[28px] font-black text-primary leading-none m-0">
            {arrival_time ?? "—"}
          </p>
          <p className="text-[13px] font-bold text-slate-500 mt-1 m-0">
            {to_airport?.code ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 m-0">
            {to_airport?.city ?? ""}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {departure_date && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Calendar size={10} />
            <b className="text-primary">{departure_date}</b>
          </span>
        )}
        {flight_number && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Plane size={10} />
            <b className="text-primary">{flight_number}</b>
          </span>
        )}
        {aircraft?.model && (
          <span className="text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            {aircraft.model}
          </span>
        )}
        <span className="text-[11px] bg-emerald-50 border border-emerald-100 rounded-md px-2.5 py-1 text-emerald-700">
          Baggage included
        </span>
      </div>
    </>
  );
}

function VisaSummary({ data }) {
  const {
    visa_title,
    visa_code,
    visa_mode,
    entry_type,
    validity_days,
    max_stay_label,
    processing_min_days,
    processing_max_days,
    expected_arrival,
    application_reference,
  } = data;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <FileText size={18} className="text-primary" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-primary m-0">
            {visa_title ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 m-0">
            {visa_code ?? ""} · {application_reference ?? ""}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {visa_mode && (
          <span className="text-[11px] bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 text-blue-700 capitalize">
            {visa_mode}
          </span>
        )}
        {entry_type && (
          <span className="text-[11px] bg-teal-50 border border-teal-100 rounded-md px-2.5 py-1 text-teal-700 capitalize">
            {entry_type} entry
          </span>
        )}
        {processing_min_days && processing_max_days && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Clock size={10} />
            Processing:{" "}
            <b className="text-primary ml-1">
              {processing_min_days}–{processing_max_days} days
            </b>
          </span>
        )}
        {validity_days && (
          <span className="text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            Validity: <b className="text-primary">{validity_days} days</b>
          </span>
        )}
        {max_stay_label && (
          <span className="text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            Stay: <b className="text-primary">{max_stay_label}</b>
          </span>
        )}
        {expected_arrival && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Calendar size={10} />
            Arrival: <b className="text-primary ml-1">{expected_arrival}</b>
          </span>
        )}
      </div>
    </div>
  );
}

function TourSummary({ data }) {
  const { title, destination, start_date, end_date, duration, group_size } =
    data;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <MapPin size={18} className="text-primary" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-primary m-0">
            {title ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 m-0">{destination ?? ""}</p>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {start_date && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Calendar size={10} />
            <b className="text-primary">{start_date}</b>
            {end_date ? ` → ${end_date}` : ""}
          </span>
        )}
        {duration && (
          <span className="flex items-center gap-1 text-[11px] bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-slate-600">
            <Clock size={10} />
            {duration}
          </span>
        )}
        {group_size && (
          <span className="text-[11px] bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 text-blue-700">
            {group_size} pax
          </span>
        )}
      </div>
    </div>
  );
}

const CLASS_BADGE = {
  Economy: "bg-blue-50 text-blue-700",
  Business: "bg-amber-50 text-amber-700",
  First: "bg-purple-50 text-purple-700",
};

export default function CheckoutSummaryCard({
  type = "flight",
  data,
  className = "",
}) {
  if (!data) return null;

  const icons = { flight: Plane, visa: FileText, tour: MapPin };
  const titles = {
    flight: "Flight details",
    visa: "Visa details",
    tour: "Tour details",
  };
  const Icon = icons[type] ?? Plane;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 overflow-hidden ${className}`}
    >
      <div className="bg-slate-50 px-5 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon size={13} className="text-primary" />
          </div>
          <span className="text-[13px] font-bold text-primary">
            {titles[type]}
          </span>
        </div>
        {type === "flight" && data.class_name && (
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${CLASS_BADGE[data.class_name] ?? "bg-slate-100 text-slate-600"}`}
          >
            {data.class_name}
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        {type === "flight" && <FlightSummary data={data} />}
        {type === "visa" && <VisaSummary data={data} />}
        {type === "tour" && <TourSummary data={data} />}
      </div>
    </div>
  );
}
