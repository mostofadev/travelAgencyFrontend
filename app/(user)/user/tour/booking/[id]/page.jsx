"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, MapPin, Loader2, SearchX } from "lucide-react";
import { useTourBookingById } from "@/hooks/Page/useTourBooking";
import TourBookingHeroCard from "@/components/Page/User/TourBooking/Detail/TourBookingHeroCard";
import PriceSummaryCard from "@/components/Page/User/TourBooking/Detail/PriceSummaryCard";
import TourApplicantsList from "@/components/Page/User/TourBooking/Detail/TourApplicantsList";
import CancellationCard from "@/components/Page/User/TourBooking/Detail/CancellationCard";
import TourBookingActions from "@/components/Page/User/TourBooking/Detail/TourBookingActions";

export default function TourBookingDetailPage() {
  const { id } = useParams();
  const { booking, isLoading, isError } = useTourBookingById(id);

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
          href="/user/tour/bookings"
          className="inline-flex items-center gap-1 text-primary text-sm hover:underline mt-2"
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
          href="/user/tour/bookings"
          className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={14} /> All Bookings
        </Link>
        <span className="text-slate-300">/</span>
        <span className="inline-flex items-center gap-1.5 text-slate-800 font-bold">
          <MapPin size={14} className="text-primary" />
          {booking.booking_code}
        </span>
      </div>

      <TourBookingHeroCard booking={booking} />
      <CancellationCard booking={booking} />
      <PriceSummaryCard booking={booking} />
      <TourApplicantsList applicants={booking.applicants ?? []} />
      <TourBookingActions booking={booking} />
    </div>
  );
}
