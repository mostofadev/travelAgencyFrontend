export function PaymentDetailTable({ payment }) {

  if (!payment) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <DetailRow label="Transaction ID" value={payment.tran_id} mono />
      <DetailRow
        label="Amount"
        value={`${parseFloat(payment.amount).toLocaleString("en-BD")} ${payment.currency}`}
        highlight
      />
      <DetailRow
        label="Payment Method"
        value={payment.payment_method ?? "bKash"}
      />
      <DetailRow
        label="Status"
        value={
          <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Paid
          </span>
        }
      />
      {payment.paid_at && (
        <DetailRow
          label="Paid At"
          value={new Date(payment.paid_at).toLocaleString("en-BD", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        />
      )}
    </div>
  );
}

function DetailRow({ label, value, mono = false, highlight = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-500 shrink-0">{label}</span>
      <span
        className={`text-xs text-right break-all
                ${mono ? "font-mono text-gray-600" : ""}
                ${highlight ? "font-semibold text-gray-900 text-sm" : "text-gray-700"}
            `}
      >
        {value}
      </span>
    </div>
  );
}
