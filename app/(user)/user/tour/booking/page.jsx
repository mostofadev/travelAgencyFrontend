"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { useTourBookings } from "@/hooks/Page/useTourBooking";
import TourBookingStatsBar from "@/components/Page/User/TourBooking/TourBookingStatsBar";
import TourBookingTable from "@/components/Page/User/TourBooking/TourBookingTable";
import BookingTabMenu from "@/components/ui/booking/BookingTabMenu";

export default function TourBookingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useTourBookings(page);

  const bookings = Array.isArray(response?.data?.data)
    ? response.data.data 
    : Array.isArray(response?.data)
      ? response.data 
      : [];

  const meta = response?.data?.current_page
    ? response.data 
    : (response?.meta ?? null); 

  const filtered =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.booking_status === activeTab);

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

      <TourBookingStatsBar bookings={bookings} />

      <BookingTabMenu
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      <TourBookingTable
        data={filtered}
        isLoading={isLoading}
        meta={meta}
        onPageChange={setPage}
      />
    </div>
  );
}
