
"use client";

import DataTable from "@/components/ui/DataTable";

const TYPE_LABELS = {
  "App\\Models\\TourBooking": {
    label: "Tour Booking",
    color: "bg-blue-100 text-blue-700",
  },
  "App\\Models\\VisaApplication": {
    label: "Visa Application",
    color: "bg-purple-100 text-purple-700",
  },
  "App\\Models\\Wallet": {
    label: "Wallet Deposit",
    color: "bg-teal-100 text-teal-700",
  },
};

const STATUS_STYLES = {
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
  pending: "bg-yellow-100 text-yellow-700",
};

const columns = [
  {
    key: "id",
    label: "ID",
    width: "60px",
    render: (val) => (
      <span className="text-xs font-bold text-gray-400">#{val}</span>
    ),
  },
  {
    key: "gateway_tran_id",
    label: "Transaction ID",
    render: (val) => (
      <span className="text-xs font-mono text-gray-600">{val ?? "-"}</span>
    ),
  },
  {
    key: "payable_type",
    label: "Type",
    render: (val) => {
      const type = TYPE_LABELS[val] ?? {
        label: val?.split("\\").pop() ?? "-",
        color: "bg-gray-100 text-gray-600",
      };
      return (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${type.color}`}
        >
          {type.label}
        </span>
      );
    },
  },
  {
    key: "amount",
    label: "Amount",
    render: (val) => (
      <span className="text-sm font-bold text-gray-900">
        ৳{Number(val).toLocaleString()}
      </span>
    ),
  },
  {
    key: "payment_method",
    label: "Method",
    render: (val) => (
      <span className="text-xs text-gray-600">{val ?? "-"}</span>
    ),
  },
  {
    key: "paid_at",
    label: "Paid At",
    render: (val) => (
      <span className="text-sm text-gray-600">
        {val ? new Date(val).toLocaleString() : "-"}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    sortable: false,
    render: (val) => (
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
          STATUS_STYLES[val] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {val}
      </span>
    ),
  },
];

export default function PaymentHistoryTable({ data, isLoading, onPageChange }) {
  const meta = data?.meta;

  return (
    <DataTable
      data={data?.data ?? []}
      columns={columns}
      config={{
        showSearch: true,
        searchPlaceholder: "Search by transaction ID, type...",
        emptyMessage: isLoading ? "Loading..." : "No payment history found",
      }}
      pagination={
        meta
          ? {
              enabled: true,
              currentPage: meta.current_page,
              totalPages: meta.last_page,
              totalItems: meta.total,
              perPage: meta.per_page,
              onPageChange: onPageChange,
            }
          : null
      }
    />
  );
}
