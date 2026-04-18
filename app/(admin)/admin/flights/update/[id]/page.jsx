"use client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import FlightsUpdateForm from "@/components/forms/Admin/Flights/Flights/FlightUpdateForm";
import { useParams } from "next/navigation";

function Content() {
  const { id } = useParams();
  return (
    <div>
      <FlightsUpdateForm id={id} />
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
      <Content />
    </Suspense>
  );
}
