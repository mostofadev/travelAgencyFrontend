"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import AircraftsUpdateForm from "@/components/forms/Admin/Flights/Aircrafts/AircraftsUpdateForm";
import { useParams } from "next/navigation";

function AircraftsUpdateContent() {
  const { id } = useParams();
  return (
    <div>
      <AircraftsUpdateForm Id={id} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 size={20} className="animate-spin text-slate-400" />
        </div>
      }
    >
      <AircraftsUpdateContent />
    </Suspense>
  );
}
