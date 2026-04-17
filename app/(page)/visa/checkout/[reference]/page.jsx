"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useWalletBalance } from "@/hooks/Page/useWallet";
import CheckoutHeader from "@/components/Page/Checkout/CheckoutHeader";
import CheckoutSummaryCard from "@/components/Page/Checkout/CheckoutSummaryCard";
import CheckoutPassengerCard from "@/components/Page/Checkout/CheckoutPassengerCard";
import CheckoutPriceBreakdown from "@/components/Page/Checkout/CheckoutPriceBreakdown";
import CheckoutPaymentSelector from "@/components/Page/Checkout/CheckoutPaymentSelector";
import CheckoutOrderSummary from "@/components/Page/Checkout/CheckoutOrderSummary";
import {
  useBookingDetail,
  useInitiatePayment,
  useWalletPayment,
} from "@/hooks/Page/usePayment";

export default function VisaCheckoutPage() {
  const { reference } = useParams();
  const type = "visa";

  const [selectedMethod, setSelectedMethod] = useState("bkash");

  const { data: walletData } = useWalletBalance();
  const { data: paymentData, isLoading: pageLoading } = useBookingDetail(
    type,
    reference,
  );
  
  //  Extract data from nested structure
  const bookingData = paymentData?.booking;
  const visa = bookingData?.visa;

  //  Passenger counts
  const adults = bookingData?.adults || 0;
  const children = bookingData?.children || 0;
  const infants = bookingData?.infants || 0;

  //  Pricing
  const walletBalance = parseFloat(walletData?.balance ?? "0");
  const totalAmount = parseFloat(bookingData?.total_fee ?? "0");
  const baseFee = parseFloat(visa?.base_fee ?? "0");

  const adultTotal = baseFee * adults;
  const childTotal = baseFee * 0.75 * children;
  const infantTotal = baseFee * 0.1 * infants;

  //  Format visa data for CheckoutSummaryCard
  const visaSummaryData = useMemo(() => {
    if (!visa || !bookingData) return null;

    return {
      visa_code: visa.visa_code,
      visa_title: visa.visa_title,
      visa_mode: visa.visa_mode,
      entry_type: visa.entry_type,
      validity_days: visa.validity_days,
      max_stay_days: visa.max_stay_days,
      max_stay_label: visa.max_stay_label,
      processing_min_days: visa.processing_min_days,
      processing_max_days: visa.processing_max_days,
      image_url: visa.image_url,
      expected_arrival: bookingData.expected_arrival
        ? new Date(bookingData.expected_arrival).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : null,
    };
  }, [visa, bookingData]);

  //  Price breakdown rows
  const priceRows = useMemo(() => {
    const rows = [];
    if (adults > 0)
      rows.push({ label: `Adult × ${adults}`, amount: adultTotal });
    if (children > 0)
      rows.push({ label: `Child × ${children} (75%)`, amount: childTotal });
    if (infants > 0)
      rows.push({ label: `Infant × ${infants} (10%)`, amount: infantTotal });
    return rows;
  }, [adults, children, infants, adultTotal, childTotal, infantTotal]);

  //  Order summary rows
  const summaryRows = useMemo(
    () => [
      { label: "Base fee", value: `৳ ${baseFee.toLocaleString("en-BD")}` },
      ...priceRows.map((r) => ({
        label: r.label,
        value: `৳ ${Number(r.amount).toLocaleString("en-BD")}`,
      })),
      { label: "Tax & fees", value: "Included" },
    ],
    [priceRows, baseFee],
  );

  //  Hooks
  const { mutate: initiatePayment, isPending: isBkashLoading } =
    useInitiatePayment();
  const { mutate: walletPayment, isPending: isWalletLoading } =
    useWalletPayment();

  const loading = isBkashLoading || isWalletLoading;

  const handlePay = () => {
    if (!selectedMethod) return;

    if (selectedMethod === "wallet") {
      walletPayment({ type, reference });
    }

    if (selectedMethod === "bkash") {
      initiatePayment({ type, reference });
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-slate-400">Loading booking details…</p>
        </div>
      </div>
    );
  }

  if (!visaSummaryData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400">No booking data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header + Steps */}
      <div className="sticky top-0 z-20">
        <CheckoutHeader reference={reference} currentStep={3} />
      </div>

      {/* Body — 2 column layout */}
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          <CheckoutSummaryCard type="visa" data={visaSummaryData} />
          <CheckoutPassengerCard
            adults={adults}
            // eslint-disable-next-line react/no-children-prop
            children={children}
            infants={infants}
          />
          <CheckoutPriceBreakdown rows={priceRows} total={totalAmount} />
          <CheckoutPaymentSelector
            selected={selectedMethod}
            onSelect={setSelectedMethod}
            walletBalance={walletBalance}
            totalAmount={totalAmount}
          />
        </div>

        {/* Right column — sticky */}
        <div className="lg:sticky lg:top-[88px] self-start">
          <CheckoutOrderSummary
            rows={summaryRows}
            total={totalAmount}
            onPay={handlePay}
            isLoading={loading}
            selectedMethod={selectedMethod}
          />
        </div>
      </div>
    </div>
  );
}
