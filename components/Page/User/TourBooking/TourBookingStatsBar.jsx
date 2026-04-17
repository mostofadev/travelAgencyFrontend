"use client";

import { CheckCircle2, Clock, XCircle, Wallet } from "lucide-react";

export default function TourBookingStatsBar({ bookings = [] }) {
  const total = bookings.length;
  const pending = bookings.filter((b) => b.booking_status === "pending").length;
  const confirmed = bookings.filter(
    (b) => b.booking_status === "confirmed",
  ).length;
  const cancelled = bookings.filter(
    (b) => b.booking_status === "cancelled",
  ).length;

  const stats = [
    {
      label: "Total Bookings",
      value: total,
      icon: Wallet,
      color: "text-slate-600",
      bg: "bg-slate-50",
      ring: "ring-slate-200",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      ring: "ring-amber-200",
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      ring: "ring-green-200",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      ring: "ring-red-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon: Icon, color, bg, ring }) => (
        <div
          key={label}
          className={`flex items-center gap-3 rounded-xl p-3 ${bg} ring-1 ${ring}`}
        >
          <div className={`rounded-lg p-2 bg-white shadow-sm`}>
            <Icon size={16} className={color} />
          </div>
          <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
