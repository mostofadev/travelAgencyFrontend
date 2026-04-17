// components/Page/User/VisaApplication/VisaApplicationTable.jsx
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Banknote,
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";
import DataTable from "@/components/ui/DataTable";
import { ApplicationStatusBadge, PaymentStatusBadge } from "@/components/Page/User/VisaApplication/ApplicationStatusBadge";


const columns = [
  {
    key: "id",
    label: "Reference",
    render: (val, row) => (
      <Link
        href={`/admin/booking/visa/${row.id}`}
        className="font-mono text-xs font-bold text-green-600 hover:text-green-800 hover:underline"
      >
        {val}
      </Link>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    render: (val) => (
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Mail size={12} className="text-gray-400" />
          <span>{val?.email ?? "-"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Phone size={12} className="text-gray-400" />
          <span>{val?.phone_number ?? "-"}</span>
        </div>
      </div>
    ),
  },
  {
    key: "applicants",
    label: "Applicants",
    render: (val, row) => {
      const total =
        (row.adults || 0) + (row.children || 0) + (row.infants || 0);
      return (
        <div className="inline-flex items-center gap-1.5 text-xs text-gray-600">
          <Users size={13} className="text-gray-400" />
          <span className="font-bold text-gray-800">{total}</span>
          <span className="text-gray-400">
            ({row.adults}A · {row.children}C · {row.infants}I)
          </span>
        </div>
      );
    },
  },
  {
    key: "total_fee",
    label: "Fee",
    render: (val, row) => (
      <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
        <Banknote size={14} className="text-gray-400" />
        {row.currency} {Number(val).toLocaleString()}
      </span>
    ),
  },
  {
    key: "expected_arrival",
    label: "Arrival Date",
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
    key: "created_at",
    label: "Applied At",
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
    key: "current_status",
    label: "Status",
    sortable: false,
    render: (val) => <ApplicationStatusBadge status={val} />,
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
        href={`/admin/booking/visa/${row.id}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-800 transition-colors"
      >
        View <ArrowRight size={12} />
      </Link>
    ),
  },
];

export default function AdminVisaApplicationTable({ data = [], isLoading }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      config={{
        showSearch: true,
        searchPlaceholder: "Search by reference or email...",
        emptyMessage: isLoading
          ? "Loading applications..."
          : "No applications found.",
      }}
    />
  );
}
