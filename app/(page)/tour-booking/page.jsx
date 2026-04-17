"use client";

import { useState, useEffect } from "react";
import { useSearchParams, redirect, useRouter } from "next/navigation";
import FareSummary from "@/components/Page/Visa/Application/FareSummary";
import TourBookingForm from "@/components/Page/TourPackage/Application/TourBookingForm";
import { jwtManager } from "@/lib/auth/jwt";

export default function TourBookingPage() {
  const searchParams = useSearchParams();
  const tourId = Number(searchParams.get("id"));
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tour_booking_data");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookingData(stored ? JSON.parse(stored) : null);
    setMounted(true); 
  }, []);

  const isAuthenticated = jwtManager.isUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      const currentUrl = `/tour-booking?${searchParams.toString()}`;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [isAuthenticated, router, searchParams]);

  if (!tourId) redirect("/");

  //  Return null on both server AND first client render — trees always match
  if (!mounted || !isAuthenticated) return null;

  if (!bookingData) {
    return <p className="p-5">No booking data found.</p>;
  }

  const { adults, children, infants, fareData } = bookingData;
  const totalPassengers = adults + children + infants;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Tour Booking</h1>
          <p className="text-sm text-gray-500">
            Fill in all required passenger details to complete your booking
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-500">
            Tour <strong className="text-gray-800">#{tourId}</strong>
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
          <TourBookingForm
            tourId={tourId}
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
