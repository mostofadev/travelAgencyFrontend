"use client";

import { useEffect, useState } from "react";
import { useSearchParams, redirect, useRouter } from "next/navigation";
import FareSummary from "@/components/Page/Visa/Application/FareSummary";
import FlightBookingForm from "@/components/Page/Flight/Application/FlightBookingForm";
import { jwtManager } from "@/lib/auth/jwt";

export default function FlightBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [bookingData] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("flight_booking_data");
    return stored ? JSON.parse(stored) : null;
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!jwtManager.isUserAuthenticated()) {
      const currentUrl = `/flight-booking?${searchParams.toString()}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }
  }, [router, searchParams]);

  if (!isReady) return null;

  const flightClassId = Number(searchParams.get("flight_class_id"));
  const adults = Number(searchParams.get("adults")) || 1;
  const children = Number(searchParams.get("children")) || 0;
  const infants = Number(searchParams.get("infants")) || 0;

  if (!flightClassId) redirect("/flight");

  const fareData = bookingData?.fareData
    ? {
        adult: { price: bookingData.fareData.adult || 0 },
        child: { price: bookingData.fareData.child || 0 },
        infant: { price: bookingData.fareData.infant || 0 },
      }
    : {};

  const totalPassengers = adults + children + infants;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            Flight Booking
          </h1>
          <p className="text-sm text-gray-500">
            Fill in all required passenger details to complete your booking
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500">
            Class <strong className="text-gray-800">#{flightClassId}</strong>
          </span>
          {adults > 0 && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium">
              Adults {adults}
            </span>
          )}
          {children > 0 && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-medium">
              Children {children}
            </span>
          )}
          {infants > 0 && (
            <span className="text-xs px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 font-medium">
              Infants {infants}
            </span>
          )}
          <span className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500">
            Total <strong className="text-gray-800">{totalPassengers}</strong>{" "}
            passengers
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">
          <FlightBookingForm
            flightClassId={flightClassId}
            adults={adults}
            childrenCount={children}
            infants={infants}
          />
          <FareSummary
            adults={adults}
            childCount={children}
            infants={infants}
            fareData={fareData}
          />
        </div>
      </div>
    </div>
  );
}
