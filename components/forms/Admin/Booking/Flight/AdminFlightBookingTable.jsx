"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Banknote,
  CalendarDays,
  PlaneTakeoff,
} from "lucide-react";
import DataTable from "@/components/ui/DataTable";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/Page/User/FlightBooking/BookingStatusBadge";

const CLASS_COLORS = {
  Economy: "bg-sky-50    text-sky-700    border-sky-200",
  Business: "bg-violet-50 text-violet-700 border-violet-200",
  First: "bg-amber-50  text-amber-700  border-amber-200",
};

const columns = [
  {
    key: "booking_reference",
    label: "Reference",
    render: (val, row) => (
      <Link
        href={`/admin/booking/flight/${row.id}`}
        className="font-mono text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
      >
        {val}
      </Link>
    ),
  },
  {
    key: "primary_passenger",
    label: "Passenger",
    render: (val, row) => (
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {val ? `${val.first_name} ${val.last_name}` : "-"}
        </p>
        <p className="text-xs text-gray-400">{row?.user?.email ?? ""}</p>
      </div>
    ),
  },
  {
    key: "flight_class",
    label: "Class",
    render: (val) => {
      const cls =
        CLASS_COLORS[val?.class_name] ??
        "bg-gray-100 text-gray-600 border-gray-200";
      return (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cls}`}
        >
          <PlaneTakeoff size={11} strokeWidth={2.5} />
          {val?.class_name ?? "-"}
        </span>
      );
    },
  },
  {
    key: "adults",
    label: "Passengers",
    render: (val, row) => (
      <div className="inline-flex items-center gap-1.5 text-xs text-gray-600">
        <Users size={13} className="text-gray-400" />
        <span className="font-bold text-gray-800">
          {row?.total_passengers ?? 0}
        </span>
        <span className="text-gray-400">
          ({row?.adults}A · {row?.children}C · {row?.infants}I)
        </span>
      </div>
    ),
  },
  {
    key: "total_amount",
    label: "Amount",
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
    key: "id",
    label: "",
    sortable: false,
    render: (val) => (
      <Link
        href={`/admin/booking/flight/${val}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
      >
        View <ArrowRight size={12} />
      </Link>
    ),
  },
];

export default function AdminFlightBookingTable({ data = [], isLoading }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      config={{
        showSearch: true,
        searchPlaceholder: "Search by reference or passenger name...",
        emptyMessage: isLoading ? "Loading bookings..." : "No bookings found.",
      }}
    />
  );
}
