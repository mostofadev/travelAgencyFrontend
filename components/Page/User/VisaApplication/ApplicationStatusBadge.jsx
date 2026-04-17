

export function ApplicationStatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      class: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    processing: {
      label: "Processing",
      class: "bg-blue-50 text-blue-700 border-blue-200",
    },
    confirmed: {
      label: "Confirmed",
      class: "bg-green-50 text-green-700 border-green-200",
    },
    rejected: {
      label: "Rejected",
      class: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const style = config[status] ?? config.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${style.class}`}
    >
      {style.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      class: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    paid: {
      label: "Paid",
      class: "bg-green-50 text-green-700 border-green-200",
    },
    failed: {
      label: "Failed",
      class: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const style = config[status] ?? config.pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${style.class}`}
    >
      {style.label}
    </span>
  );
}
