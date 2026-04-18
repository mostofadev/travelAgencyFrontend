"use client";
import { Suspense } from "react";
import VisaTypeUpdateForm from "@/components/forms/Admin/Visa/VisaTypeUpdateForm";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen" />
      }
    >
      <div>
        <VisaTypeUpdateForm />
      </div>
    </Suspense>
  );
}
