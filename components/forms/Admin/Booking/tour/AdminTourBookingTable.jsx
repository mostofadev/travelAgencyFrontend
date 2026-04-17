// components/Page/User/TourBooking/TourBookingTable.jsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Banknote,
  CalendarDays,
  MapPin,
} from "lucide-react";
import DataTable from "@/components/ui/DataTable";
import { BookingStatusBadge, PaymentStatusBadge } from "@/components/Page/User/TourBooking/BookingStatusBadge";

const columns = [
  {
    key: "booking_code",
    label: "Booking Code",
    render: (val, row) => (
      <Link
        href={`/admin/booking/tour/${row.booking_code}`}
        className="font-mono text-xs font-bold text-green-600 hover:text-green-800 hover:underline"
      >
        {val}
      </Link>
    ),
  },
  {
    key: "tour_package",
    label: "Tour Package",
    render: (val) => (
      <div className="flex items-center gap-2 max-w-[200px]">
        {val?.image_url && (
          <img
            src={val.image_url}
            alt={val.package_title}
            className="w-8 h-8 rounded-md object-cover flex-shrink-0"
          />
        )}
        <span className="text-xs font-medium text-gray-700 line-clamp-2">
          {val?.package_title ?? "-"}
        </span>
      </div>
    ),
  },
  {
    key: "travel_dates",
    label: "Travel Dates",
    render: (val, row) => {
      const pkg = row.tour_package;
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <CalendarDays size={11} className="text-gray-400" />
            <span>
              {pkg?.start_date
                ? new Date(pkg.start_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span className="pl-3.5">→</span>
            <span>
              {pkg?.end_date
                ? new Date(pkg.end_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    key: "total_passengers",
    label: "Passengers",
    render: (val, row) => (
      <div className="inline-flex items-center gap-1.5 text-xs text-gray-600">
        <Users size={13} className="text-gray-400" />
        <span className="font-bold text-gray-800">{val}</span>
        <span className="text-gray-400">
          ({row.adults}A · {row.children}C · {row.infants}I)
        </span>
      </div>
    ),
  },
  {
    key: "total_price",
    label: "Total Price",
    render: (val, row) => (
      <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
        <Banknote size={14} className="text-gray-400" />
        {row.currency} {Number(val).toLocaleString()}
      </span>
    ),
  },
  {
    key: "booked_at",
    label: "Booked At",
    render: (val) => (
      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
        <CalendarDays size={12} className="text-gray-400" />
        {val
          ? new Date(val).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </span>
    ),
  },
  {
    key: "booking_status",
    label: "Status",
    sortable: false,
    render: (val) => <BookingStatusBadge status={val} />,
  },
  {
    key: "payment_status",
    label: "Payment",
    sortable: false,
    render: (val) => <PaymentStatusBadge status={val} />,
  },
  {
    key: "actions",
    label: "",
    sortable: false,
    render: (val, row) => (
      <Link
        href={`/admin/booking/tour/${row.id}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-800 transition-colors"
      >
        View <ArrowRight size={12} />
      </Link>
    ),
  },
];

export default function AdminTourBookingTable({ data = [], isLoading }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      config={{
        showSearch: true,
        searchPlaceholder: "Search by booking code or package...",
        emptyMessage: isLoading ? "Loading bookings..." : "No bookings found.",
      }}
    />
  );
}
