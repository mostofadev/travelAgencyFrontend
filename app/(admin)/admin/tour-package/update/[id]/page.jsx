"use client";
import TourPackageUpdateForm from "@/components/forms/Admin/TourPackage/TourPackageUpdateForm";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { id } = useParams();
  return (
    <div>
      <TourPackageUpdateForm packageId={id} />
    </div>
  );
}

export default Page;
