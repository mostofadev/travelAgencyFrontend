"use client";

import { Suspense } from "react";
import DashboardContent from "@/components/Page/User/Dashboard/DashboardContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded-lg" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-100 rounded-2xl" />
            ))}
          </div>
          <div className="h-48 bg-slate-100 rounded-2xl" />
          <div className="h-64 bg-slate-100 rounded-2xl" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
