"use client";

import { Download, MessageCircle, XCircle } from "lucide-react";

export default function TourBookingActions({ booking }) {
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
        {/* Pay Now — only if unpaid & active */}
        {isUnpaid && isActive && (
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            Pay Now
          </button>
        )}

        {/* Cancel — only if active */}
        {isActive && (
          <button className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            <XCircle size={14} />
            Cancel Booking
          </button>
        )}

        {/* Download */}
        <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Download size={14} />
          Download Summary
        </button>

        {/* Support */}
        <button className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <MessageCircle size={14} />
          Contact Support
        </button>
      </div>
    </div>
  );
}
