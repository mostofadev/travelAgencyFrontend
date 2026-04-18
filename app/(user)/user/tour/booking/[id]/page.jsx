"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TourBookingDetailContent from "@/components/Page/User/TourBooking/Detail/TourBookingDetailContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center gap-2 py-32 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading booking...</span>
        </div>
      }
    >
      <TourBookingDetailContent />
    </Suspense>
  );
}
