
"use client";

import {
  Hash,
  Banknote,
  PlaneTakeoff,
  Tag,
  Users,
  CalendarDays,
} from "lucide-react";
import { PaymentStatusBadge, BookingStatusBadge } from "../BookingStatusBadge";

export default function BookingHeroCard({ booking }) {
  const infoItems = [
    {
      Icon: PlaneTakeoff,
      label: "Class",
      value: booking.flight_class?.class_name,
    },
    { Icon: Tag, label: "Fare Code", value: booking.flight_class?.fare_code },
    {
      Icon: Users,
      label: "Passengers",
      value: `${booking.passengers_count?.total} total`,
    },
    {
      Icon: CalendarDays,
      label: "Booked At",
      value: new Date(booking.booked_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative">
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-slate-400 text-xs mb-1 flex items-center gap-1">
              <Hash size={11} /> Booking Reference
            </p>
            <p className="text-3xl font-black tracking-widest">
              {booking.booking_reference}
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs mb-1 flex items-center justify-end gap-1">
              <Banknote size={11} /> Total Amount
            </p>
            <p className="text-2xl font-bold">
              {booking.currency} {Number(booking.total_amount).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-6">
          <BookingStatusBadge status={booking.booking_status} />
          <PaymentStatusBadge status={booking.payment_status} />
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {infoItems.map(({ Icon, label, value }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-3">
              <p className="text-slate-400 text-[10px] mb-1 flex items-center gap-1">
                <Icon size={10} /> {label}
              </p>
              <p className="text-sm font-bold capitalize">{value ?? "-"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
