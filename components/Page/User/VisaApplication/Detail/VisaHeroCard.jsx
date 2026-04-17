"use client";

import { Globe, CalendarDays, CreditCard, Users, Clock } from "lucide-react";

const formatDate = (dateStr, withTime = false) => {
  const opts = withTime
    ? {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-GB", opts);
};

const statusStyles = {
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
  approved: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  rejected: "bg-red-50 text-red-600 border border-red-200",
  processing: "bg-blue-50 text-blue-600 border border-blue-200",
};

const paymentStyles = {
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
  paid: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  failed: "bg-red-50 text-red-600 border border-red-200",
};

export default function VisaHeroCard({ application }) {
  const {
    application_reference,
    current_status,
    payment_status,
    total_fee,
    currency,
    adults,
    children,
    infants,
    expected_arrival,
    travel_city,
    created_at,
  } = application;

  const totalTravelers = adults + children + infants;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-primary px-6 py-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest mb-1">
              Visa Application
            </p>
            <h2 className="text-white text-2xl font-bold tracking-tight">
              {application_reference}
            </h2>
            <p className="text-emerald-100 text-xs mt-1.5 flex items-center gap-1">
              <Clock size={11} />
              Submitted {formatDate(created_at, true)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusStyles[current_status] ?? "bg-slate-100 text-slate-600"}`}
            >
              {current_status}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${paymentStyles[payment_status] ?? "bg-slate-100 text-slate-600"}`}
            >
              Payment: {payment_status}
            </span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-slate-100 border-t border-slate-100">
        <InfoCell
          icon={<CreditCard size={14} className="text-primary" />}
          label="Total Fee"
          value={`${currency} ${parseFloat(total_fee).toLocaleString()}`}
        />
        <InfoCell
          icon={<Users size={14} className="text-primary" />}
          label="Travelers"
          value={`${totalTravelers} (${adults}A ${children}C ${infants}I)`}
        />
        <InfoCell
          icon={<CalendarDays size={14} className="text-primary" />}
          label="Expected Arrival"
          value={formatDate(expected_arrival)}
        />
        <InfoCell
          icon={<Globe size={14} className="text-primary" />}
          label="Travel City"
          value={travel_city ?? "—"}
        />
      </div>
    </div>
  );
}

function InfoCell({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4">
      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
        {icon}
        {label}
      </div>
      <p className="text-slate-800 font-semibold text-sm">{value}</p>
    </div>
  );
}
