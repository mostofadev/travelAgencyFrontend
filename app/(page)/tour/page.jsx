"use client";

import { Suspense } from "react";
import TourPackagePageContent from "@/components/Page/TourPackage/TourPackagePageContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TourPackagePageContent />
    </Suspense>
  );
}
