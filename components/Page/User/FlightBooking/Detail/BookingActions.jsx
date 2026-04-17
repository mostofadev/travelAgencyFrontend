
"use client";

import { useRouter } from "next/navigation";
import { CreditCard, Printer, X, Loader2 } from "lucide-react";
import { useCancelFlightBooking } from "@/hooks/Page/useFlightBooking";

export default function BookingActions({ booking }) {
  const router = useRouter();
  const { cancel, isLoading } = useCancelFlightBooking();

  const isPaid = booking.payment_status === "paid";
  const isCancelled = booking.booking_status === "cancelled";

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    await cancel(booking.id);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-3">
      {!isPaid && !isCancelled && (
        <button className="inline-flex items-center gap-2 flex-1 sm:flex-none justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm">
          <CreditCard size={16} />
          Pay Now
        </button>
      )}

      <button className="inline-flex items-center gap-2 flex-1 sm:flex-none justify-center bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-2xl border border-slate-200 transition-colors text-sm">
        <Printer size={16} />
        Print Ticket
      </button>

    
    </div>
  );
}
