"use client";

import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
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

export default function FlightCheckoutContent() {
  const { reference } = useParams();
  const searchParams = useSearchParams();
  const type = "flight";

  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [isLoading, setIsLoading] = useState(false);

  const { data: walletData } = useWalletBalance();
  const { data: paymentData, isLoading: pageLoading } = useBookingDetail(
    type,
    reference,
  );

  const bookingData = paymentData?.booking;
  const flightClass = bookingData?.flight_class;
  const flight = flightClass?.flight;
  const route = flight?.route;
  const aircraft = flight?.aircraft;

  const adults = bookingData?.adults || 0;
  const children = bookingData?.children || 0;
  const infants = bookingData?.infants || 0;

  const walletBalance = parseFloat(walletData?.balance ?? "0");
  const baseFare = parseFloat(flightClass?.base_fare ?? "0");
  const totalAmount = parseFloat(bookingData?.total_amount ?? "0");

  const adultTotal = baseFare * adults;
  const childTotal = baseFare * 0.75 * children;
  const infantTotal = baseFare * 0.1 * infants;

  const flightSummaryData = useMemo(() => {
    if (!flight || !route) return null;

    const departureDate = new Date(flight.departure_datetime);
    const arrivalDate = new Date(flight.arrival_datetime);

    const departureTime = departureDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const arrivalTime = arrivalDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const formattedDate = departureDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const durationMinutes = flight.duration_minutes || 0;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationFormatted = `${hours}h ${minutes}m`;

    return {
      flight_number: flight.flight_number,
      departure_time: departureTime,
      arrival_time: arrivalTime,
      departure_date: formattedDate,
      duration_formatted: durationFormatted,
      from_airport: route.from_airport,
      to_airport: route.to_airport,
      aircraft: aircraft,
      class_name: flightClass?.class_name,
    };
  }, [flight, route, aircraft, flightClass]);

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

  const summaryRows = useMemo(
    () => [
      { label: "Base fare", value: `৳ ${baseFare.toLocaleString("en-BD")}` },
      ...priceRows.map((r) => ({
        label: r.label,
        value: `৳ ${Number(r.amount).toLocaleString("en-BD")}`,
      })),
      { label: "Tax & fees", value: "Included" },
    ],
    [priceRows, baseFare],
  );

  const { mutate: initiatePayment, isPending: isBkashLoading } =
    useInitiatePayment();
  const { mutate: walletPayment, isPending: isWalletLoading } =
    useWalletPayment();

  const loading = isBkashLoading || isWalletLoading;

  const handlePay = () => {
    if (!selectedMethod) return;
    if (selectedMethod === "wallet") {
      walletPayment({ type: "flight", reference });
    }
    if (selectedMethod === "bkash") {
      initiatePayment({ type: "flight", reference });
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

  if (!flightSummaryData) {
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
          <CheckoutSummaryCard type="flight" data={flightSummaryData} />
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
