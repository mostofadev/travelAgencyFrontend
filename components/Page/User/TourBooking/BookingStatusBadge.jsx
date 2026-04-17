

export function BookingStatusBadge({ status }) {
  const map = {
    pending: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-green-50 text-green-700 ring-1 ring-green-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-600 ring-1 ring-red-200",
    },
    completed: {
      label: "Completed",
      className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    },
  };

  const config = map[status] ?? {
    label: status ?? "Unknown",
    className: "bg-gray-50 text-gray-500 ring-1 ring-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }) {
  const map = {
    unpaid: {
      label: "Unpaid",
      className: "bg-red-50 text-red-600 ring-1 ring-red-200",
    },
    paid: {
      label: "Paid",
      className: "bg-green-50 text-green-700 ring-1 ring-green-200",
    },
    partial: {
      label: "Partial",
      className: "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
    },
    refunded: {
      label: "Refunded",
      className: "bg-purple-50 text-purple-600 ring-1 ring-purple-200",
    },
  };

  const config = map[status] ?? {
    label: status ?? "Unknown",
    className: "bg-gray-50 text-gray-500 ring-1 ring-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
