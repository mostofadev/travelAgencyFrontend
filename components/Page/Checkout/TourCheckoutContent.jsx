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

export default function TourCheckoutContent() {
  const { reference } = useParams();
  const type = "tour";

  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [isLoading, setIsLoading] = useState(false);

  const { data: walletData } = useWalletBalance();
  const { data: paymentData, isLoading: pageLoading } = useBookingDetail(
    type,
    reference,
  );

  const bookingData = paymentData?.booking;
  const tourPackage = bookingData?.tour_package;

  const adults = bookingData?.adults || 0;
  const children = bookingData?.children || 0;
  const infants = bookingData?.infants || 0;

  const walletBalance = parseFloat(walletData?.balance ?? "0");
  const adultPrice = parseFloat(tourPackage?.adult_price ?? "0");
  const childPrice = parseFloat(tourPackage?.child_price ?? "0");
  const totalAmount = parseFloat(bookingData?.total_price ?? "0");
  const discountAmount = parseFloat(bookingData?.discount_amount ?? "0");
  const addonAmount = parseFloat(bookingData?.addon_amount ?? "0");

  const adultTotal = adultPrice * adults;
  const childTotal = childPrice * children;
  const infantTotal = 0;

  const tourSummaryData = useMemo(() => {
    if (!tourPackage) return null;

    const startDate = new Date(tourPackage.start_date);
    const endDate = new Date(tourPackage.end_date);

    const formattedStart = startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedEnd = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const totalPax = adults + children + infants;

    return {
      title: tourPackage.package_title,
      destination: tourPackage.slug,
      start_date: formattedStart,
      end_date: formattedEnd,
      duration: `${tourPackage.duration_days} days / ${tourPackage.duration_nights} nights`,
      group_size: totalPax,
    };
  }, [tourPackage, adults, children, infants]);

  const priceRows = useMemo(() => {
    const rows = [];
    if (adults > 0)
      rows.push({ label: `Adult × ${adults}`, amount: adultTotal });
    if (children > 0)
      rows.push({ label: `Child × ${children}`, amount: childTotal });
    if (infants > 0)
      rows.push({ label: `Infant × ${infants}`, amount: infantTotal });
    if (addonAmount > 0) rows.push({ label: "Add-ons", amount: addonAmount });
    if (discountAmount > 0)
      rows.push({ label: "Discount", amount: -discountAmount });
    return rows;
  }, [
    adults,
    children,
    infants,
    adultTotal,
    childTotal,
    infantTotal,
    addonAmount,
    discountAmount,
  ]);

  const summaryRows = useMemo(
    () => [
      {
        label: "Adult price",
        value: `৳ ${adultPrice.toLocaleString("en-BD")}`,
      },
      {
        label: "Child price",
        value: `৳ ${childPrice.toLocaleString("en-BD")}`,
      },
      ...priceRows.map((r) => ({
        label: r.label,
        value: `${r.amount < 0 ? "– " : ""}৳ ${Math.abs(r.amount).toLocaleString("en-BD")}`,
      })),
      { label: "Tax & fees", value: "Included" },
    ],
    [priceRows, adultPrice, childPrice],
  );

  const { mutate: initiatePayment, isPending: isBkashLoading } =
    useInitiatePayment();
  const { mutate: walletPayment, isPending: isWalletLoading } =
    useWalletPayment();

  const loading = isBkashLoading || isWalletLoading;

  const handlePay = () => {
    if (!selectedMethod) return;
    if (selectedMethod === "wallet") {
      walletPayment({ type: "tour", reference });
    }
    if (selectedMethod === "bkash") {
      initiatePayment({ type: "tour", reference });
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

  if (!tourSummaryData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400">No booking data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-20">
        <CheckoutHeader reference={reference} currentStep={3} />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <div className="flex flex-col gap-4">
          <CheckoutSummaryCard type="tour" data={tourSummaryData} />
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
