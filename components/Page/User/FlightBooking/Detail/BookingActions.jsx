"use client";

import { useRouter } from "next/navigation";
import { CreditCard, Printer, X, Loader2 } from "lucide-react";
import { useCancelFlightBooking } from "@/hooks/Page/useFlightBooking";
import Button from "@/components/ui/Button";

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
        <Button
          href={`/flight/checkout/${booking.booking_reference}?flight_class_id=${booking.flight_class?.id}&adults=${booking.passengers_count?.adults ?? 1}&children=${booking.passengers_count?.children ?? 0}&infants=${booking.passengers_count?.infants ?? 0}`}
        >
          Pay Now
        </Button>
      )}
    </div>
  );
}
