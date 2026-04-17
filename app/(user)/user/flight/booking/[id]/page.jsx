"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, PlaneTakeoff, Loader2, SearchX } from "lucide-react";
import { useFlightBookingById } from "@/hooks/Page/useFlightBooking";
import BookingHeroCard from "@/components/Page/User/FlightBooking/Detail/BookingHeroCard";
import FlightClassInfoCard from "@/components/Page/User/FlightBooking/Detail/FlightClassInfoCard";
import PassengersList from "@/components/Page/User/FlightBooking/Detail/PassengersList";
import BookingActions from "@/components/Page/User/FlightBooking/Detail/BookingActions";

export default function FlightBookingDetailPage() {
  const { id } = useParams();
  const { booking, isLoading, isError } = useFlightBookingById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-32 text-slate-400">
        <Loader2 size={20} className="animate-spin" />
        <span>Loading booking...</span>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="text-center py-32 text-slate-400">
        <SearchX size={40} className="mx-auto mb-3 text-slate-300" />
        <p className="font-medium text-slate-600">Booking not found</p>
        <Link
          href="/user/flight/booking"
          className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline mt-2"
        >
          <ChevronLeft size={14} /> Back to bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/user/flight/booking"
          className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={14} /> All Bookings
        </Link>
        <span className="text-slate-300">/</span>
        <span className="inline-flex items-center gap-1.5 text-slate-800 font-bold">
          <PlaneTakeoff size={14} className="text-blue-500" />
          {booking.booking_reference}
        </span>
      </div>

      <BookingHeroCard booking={booking} />
      <FlightClassInfoCard flightClass={booking.flight_class} />
      <PassengersList
        passengersCount={booking.passengers_count}
        passengers={booking.passengers ?? []}
      />
      <BookingActions booking={booking} />
    </div>
  );
}
