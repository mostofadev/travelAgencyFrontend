"use client";

import FlightRouteUpdateForm from "@/components/forms/Admin/Flights/FlightRoute/FlightRoutesUpdateForm";
import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const { id } = useParams();

  return (
    <div>
      <FlightRouteUpdateForm RouteId={id} />
    </div>
  );
}

export default Page;
