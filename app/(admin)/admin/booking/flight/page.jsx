"use client";

import { useState } from "react";
import Link from "next/link";
import { PlaneTakeoff, Plus } from "lucide-react";
import FlightBookingStatsBar from "@/components/Page/User/FlightBooking/FlightBookingStatsBar";
import FlightBookingTabMenu from "@/components/Page/User/FlightBooking/FlightBookingTabMenu";
import AdminFlightBookingTable from "@/components/forms/Admin/Booking/Flight/AdminFlightBookingTable";
import { useAdminFlightApplications } from "@/hooks/Admin/useBooking";

export default function FlightBookingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: response, isLoading } = useAdminFlightApplications();
 
  const bookings = response?.data?.data ?? [];
  const filtered =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.booking_status === activeTab);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <PlaneTakeoff size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Flight Bookings
            </h1>
            <p className="text-sm text-slate-400">Your All Flight Bookings</p>
          </div>
        </div>
        <Link
          href="/flight"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={16} strokeWidth={2.5} />
          New Booking
        </Link>
      </div>

      <FlightBookingStatsBar bookings={bookings} />
      <FlightBookingTabMenu activeTab={activeTab} onChange={setActiveTab} />
      <AdminFlightBookingTable data={filtered} isLoading={isLoading} />
    </div>
  );
}
