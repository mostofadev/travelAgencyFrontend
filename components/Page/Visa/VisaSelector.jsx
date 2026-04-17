"use client";

import { useState } from "react";
import VisaInfoCards from "./VisaInfoCards";
import PriceBreakdown from "./PriceBreakdown";
import CounterRow from "@/components/ui/CounterRow";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { jwtManager } from "@/lib/auth/jwt";

export default function VisaSelector({ visaId, data }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const router = useRouter();

  const safePrice = parseFloat(data?.base_fee) || 0;

  const total = (adults + children + infants) * safePrice;

  const handleApply = () => {
    // ✅ bookingData বানাও এখানেই
    const bookingData = {
      adults,
      children,
      infants,
      fareData: {
        adult: safePrice,
        child: safePrice,
        infant: safePrice,
        total,
      },
    };

    localStorage.setItem("visa_booking_data", JSON.stringify(bookingData));

    const params = new URLSearchParams({
      num_adults: adults,
      num_children: children,
      num_infant: infants,
      id: visaId,
    });

    const targetUrl = `/visa-application?${params.toString()}`;

    if (jwtManager.isUserAuthenticated()) {
      router.push(targetUrl);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="bg-white/5 backdrop-blur-xl border border-gray-200 rounded-2xl p-7 shadow-2xl">
          <VisaInfoCards />

          <p className="text-xs uppercase text-[#7a6a55] mb-2 tracking-widest">
            Passengers
          </p>

          <CounterRow
            label="Adult"
            subtitle="Age 12 and above"
            count={adults}
            price={safePrice}
            onIncrement={() => setAdults((a) => Math.min(a + 1, 9))}
            onDecrement={() => setAdults((a) => Math.max(a - 1, 1))}
          />

          <CounterRow
            label="Child"
            subtitle="Age 2 – 12 years"
            count={children}
            price={safePrice}
            onIncrement={() => setChildren((c) => Math.min(c + 1, 9))}
            onDecrement={() => setChildren((c) => Math.max(c - 1, 0))}
          />

          <CounterRow
            label="Infant"
            subtitle="Below 24 months"
            count={infants}
            price={safePrice}
            onIncrement={() => setInfants((i) => Math.min(i + 1, 9))}
            onDecrement={() => setInfants((i) => Math.max(i - 1, 0))}
          />

          <PriceBreakdown
            adults={adults}
            childCount={children}
            infants={infants}
            prices={{
              adult: safePrice,
              child: safePrice,
              infant: safePrice,
            }}
            total={total}
          />

          <Button className="w-full mt-4" onClick={handleApply}>
            Start Application →
          </Button>

          <p className="text-center text-xs text-[#4a3f30] mt-3">
            {adults + children + infants} passenger
          </p>
        </div>
      </div>
    </div>
  );
}
