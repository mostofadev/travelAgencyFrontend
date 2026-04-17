"use client";

import { AlertTriangle } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function CancellationCard({ booking }) {
  const { booking_status, cancellation_reason, cancelled_at } = booking;

  if (booking_status !== "cancelled" || !cancellation_reason) return null;

  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 shadow-sm overflow-hidden">
      <div className="px-5 py-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle size={14} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-600 mb-0.5">
            Booking Cancelled
          </p>
          {cancelled_at && (
            <p className="text-xs text-red-400 mb-2">
              Cancelled on {formatDate(cancelled_at)}
            </p>
          )}
          <p className="text-sm text-red-500">{cancellation_reason}</p>
        </div>
      </div>
    </div>
  );
}
