"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import VisaApplicationDetailContent from "@/components/Page/User/VisaApplication/Detail/VisaApplicationDetailContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center gap-2 py-32 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading application...</span>
        </div>
      }
    >
      <VisaApplicationDetailContent />
    </Suspense>
  );
}
