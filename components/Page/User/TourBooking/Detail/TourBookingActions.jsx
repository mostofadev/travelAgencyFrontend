"use client";

import { useRouter } from "next/navigation";

export default function TourBookingActions({ booking }) {
  const router = useRouter();

  const isActive =
    booking.booking_status === "confirmed" ||
    booking.booking_status === "pending";

  const isUnpaid = booking.payment_status === "unpaid";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Actions</h3>
      </div>
      <div className="px-5 py-4 flex flex-wrap gap-3">
        {isUnpaid && isActive && (
          <button
            onClick={() => router.push(`/tour/checkout/${booking.booking_code}`)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}