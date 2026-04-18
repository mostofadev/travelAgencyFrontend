"use client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TourPackageUpdateForm from "@/components/forms/Admin/TourPackage/TourPackageUpdateForm";
import { useParams } from "next/navigation";

function Content() {
  const { id } = useParams();
  return (
    <div>
      <TourPackageUpdateForm packageId={id} />
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
