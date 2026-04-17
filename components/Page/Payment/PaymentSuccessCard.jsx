import Link from "next/link";
import { PaymentDetailTable } from "./PaymentDetailTable";

export function PaymentSuccessCard({ payment, type }) {
  if (!payment) return null;

  const typeLabel = {
    visa: "Visa Application",
    flight: "Flight Booking",
    tour: "Tour Package",
    deposit: "Wallet Deposit",
  };

  const redirectLink = {
    visa: { href: "/visa/applications", label: "My Visa Applications" },
    flight: { href: "/flights/bookings", label: "My Flight Bookings" },
    tour: { href: "/tours/bookings", label: "My Tour Bookings" },
    deposit: { href: "/wallet", label: "My Wallet" },
  }[type] ?? { href: "/dashboard", label: "Go to Dashboard" };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Payment Successful
        </h1>
        <p className="text-sm text-gray-500">
          Your {typeLabel[type] ?? "payment"} has been confirmed
        </p>
      </div>

      {/* Details */}
      <PaymentDetailTable payment={payment} />

      {/* Actions */}
      <div className="space-y-3 mt-6">
        <Link
          href={redirectLink.href}
          className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
        >
          {redirectLink.label}
        </Link>
        <Link
          href="/dashboard"
          className="block w-full text-center text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
