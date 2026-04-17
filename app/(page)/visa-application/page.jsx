"use client";

import VisaApplicationForm from "@/components/Page/Visa/Application/VisaApplicationForm";
import FareSummary from "@/components/Page/Visa/Application/FareSummary";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtManager } from "@/lib/auth/jwt";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();

  const adults = Number(params.get("num_adults")) || 0;
  const children = Number(params.get("num_children")) || 0;
  const infants = Number(params.get("num_infant")) || 0;
  const visaId = params.get("id");

  const [isReady, setIsReady] = useState(false); // ← was missing

  // Single source of truth — removed the duplicate useState + derived variable
  const [fareData, setFareData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("visa_fare_data");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFareData(stored ? JSON.parse(stored) : null);
  }, []);

  useEffect(() => {
    if (!jwtManager.isUserAuthenticated()) {
      const currentUrl = `/visa-application?${params.toString()}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true); // ← now defined above
    }
  }, [router, params]);

  // Derive the structured fare shape from fareData (formerly bookingData)
  const structuredFare = fareData
    ? {
        adult: { visa_fee: fareData.adult || 0, service_charge: 0 },
        child: { visa_fee: fareData.child || 0, service_charge: 0 },
        infant: { visa_fee: fareData.infant || 0, service_charge: 0 },
      }
    : {};

  if (!isReady) return null; // ← prevent rendering until auth is confirmed

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <VisaApplicationForm
            adults={adults}
            childCount={children}
            infants={infants}
            visaId={visaId}
          />
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <FareSummary
              adults={adults}
              childCount={children}
              infants={infants}
              fareData={structuredFare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
