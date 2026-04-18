"use client";

import { Suspense } from "react";
import TourBookingContent from "@/components/Page/TourPackage/Application/TourBookingContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TourBookingContent />
    </Suspense>
  );
}
