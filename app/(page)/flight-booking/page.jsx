"use client";

import { Suspense } from "react";
import FlightBookingContent from "@/components/Page/Flight/Application/FlightBookingContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightBookingContent />
    </Suspense>
  );
}
