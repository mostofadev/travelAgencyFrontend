"use client";

import { Suspense } from "react";
import VisaApplicationContent from "@/components/Page/Visa/Application/VisaApplicationContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VisaApplicationContent />
    </Suspense>
  );
}
