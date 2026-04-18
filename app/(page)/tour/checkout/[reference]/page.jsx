"use client";

import TourCheckoutContent from "@/components/Page/Checkout/TourCheckoutContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TourCheckoutContent />
    </Suspense>
  );
}
