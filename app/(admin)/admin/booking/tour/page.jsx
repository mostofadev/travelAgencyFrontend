"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import TourBookingStatsBar from "@/components/Page/User/TourBooking/TourBookingStatsBar";
import TourBookingTabMenu from "@/components/Page/User/TourBooking/TourBookingTabMenu";
import AdminTourBookingTable from "@/components/forms/Admin/Booking/tour/AdminTourBookingTable";
import { useAdminTourApplications } from "@/hooks/Admin/useBooking";

export default function TourBookingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: bookings, isLoading } = useAdminTourApplications();

  const validBookings = bookings?.data?.data ?? [];

  const filtered =
    activeTab === "all"
      ? validBookings
      : validBookings.filter((b) => b.booking_status === activeTab);

  return (
    <div className="space-y-5 w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <MapPin size={20} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Tour Bookings</h1>
            <p className="text-sm text-slate-400">Your All Tour Bookings</p>
          </div>
        </div>
      </div>

      <TourBookingStatsBar bookings={validBookings} />
      <TourBookingTabMenu activeTab={activeTab} onChange={setActiveTab} />
      <AdminTourBookingTable data={filtered} isLoading={isLoading} />
    </div>
  );
}
