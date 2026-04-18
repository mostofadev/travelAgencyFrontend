"use client";

import { Suspense } from "react";
import VisaDetailRoute from "@/components/Page/Visa/VisaDetailRoute";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse">
          <div className="h-[360px] bg-slate-200" />
          <div className="max-w-[1180px] mx-auto px-5 pt-7 flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
                ))}
              </div>
              <div className="h-36 bg-slate-100 rounded-2xl" />
              <div className="h-52 bg-slate-100 rounded-2xl" />
            </div>
            <div className="w-[300px] shrink-0">
              <div className="h-96 bg-slate-100 rounded-2xl" />
            </div>
          </div>
        </div>
      }
    >
      <VisaDetailRoute />
    </Suspense>
  );
}
