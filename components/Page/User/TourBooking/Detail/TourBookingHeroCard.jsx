"use client";

import Image from "next/image";
import {
  CalendarDays,
  CreditCard,
  Users,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";

const formatDate = (dateStr, withTime = false) => {
  if (!dateStr) return "—";
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

const bookingStatusStyles = {
  confirmed: "bg-primary/10 text-primary border border-primary/20",
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
  completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
};

const paymentStatusStyles = {
  paid: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  unpaid: "bg-red-50 text-red-500 border border-red-200",
  partial: "bg-amber-50 text-amber-600 border border-amber-200",
  refunded: "bg-slate-100 text-slate-500 border border-slate-200",
};

export default function TourBookingHeroCard({ booking }) {
  const {
    booking_code,
    booking_status,
    payment_status,
    total_price,
    currency,
    total_passengers,
    adults,
    children,
    infants,
    booked_at,
    tour_package,
  } = booking;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Package Image + Overlay Header */}
      <div className="relative h-44 w-full">
        <Image
          src={tour_package?.image_url ?? "/placeholder.jpg"}
          alt={tour_package?.package_title ?? "Tour Package"}
          fill
          className="object-cover"
          unoptimized
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content on image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5">
              Tour Booking
            </p>
            <h2 className="text-white text-xl font-bold leading-tight">
              {tour_package?.package_title ?? "—"}
            </h2>
            <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
              <Clock size={11} />
              Booked {formatDate(booked_at, true)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize backdrop-blur-sm ${bookingStatusStyles[booking_status] ?? "bg-slate-100 text-slate-600"}`}
            >
              {booking_status}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full capitalize backdrop-blur-sm ${paymentStatusStyles[payment_status] ?? "bg-slate-100 text-slate-600"}`}
            >
              {payment_status}
            </span>
          </div>
        </div>
      </div>

      {/* Booking Code + Dates row */}
      <div className="px-5 py-3 border-b border-slate-100 flex flex-wrap items-center gap-4 bg-primary/5">
        <div className="flex items-center gap-1.5 text-primary font-semibold text-sm">
          <Tag size={13} />
          {booking_code}
        </div>
        {tour_package?.start_date && (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <CalendarDays size={12} className="text-primary" />
            {formatDate(tour_package.start_date)} →{" "}
            {formatDate(tour_package.end_date)}
          </div>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-slate-100 border-t border-slate-100">
        <InfoCell
          icon={<CreditCard size={14} className="text-primary" />}
          label="Total Price"
          value={`${currency} ${parseFloat(total_price).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`}
        />
        <InfoCell
          icon={<Users size={14} className="text-primary" />}
          label="Passengers"
          value={`${total_passengers} (${adults}A ${children}C ${infants}I)`}
        />
        <InfoCell
          icon={<MapPin size={14} className="text-primary" />}
          label="Tour Package ID"
          value={`#${tour_package?.id ?? "—"}`}
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
