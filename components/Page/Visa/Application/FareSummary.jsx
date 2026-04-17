"use client";

import { useState } from "react";
import FareItem from "./FareItem";

export default function FareSummary({
  adults,
  childCount,
  infants,
  fareData = {},
}) {
  const [open, setOpen] = useState(true);

  const types = [
    {
      label: "Adult",
      key: "adult",
      count: adults,
    },
    {
      label: "Child",
      key: "child",
      count: childCount,
    },
    {
      label: "Infant",
      key: "infant",
      count: infants,
    },
  ];

  // ✅ total calculation (dynamic)
  const total = types.reduce((sum, type) => {
    const price =
      (fareData[type.key]?.visa_fee || 0) +
      (fareData[type.key]?.service_charge || 0);

    return sum + type.count * price;
  }, 0);

  return (
    <div className="border border-gray-100 rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center p-4 cursor-pointer border-b border-gray-300"
      >
        <div className="flex items-center gap-2">
          <p className="font-semibold">Fare Summary</p>
        </div>

        <span className="text-xl text-gray-400">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="p-4 space-y-6">
          {types.map((type, index) => {
            if (type.count <= 0) return null;

            const visaFee = fareData[type.key]?.visa_fee || 0;
            const serviceFee = fareData[type.key]?.service_charge || 0;

            return (
              <FareItem
                key={index}
                label={type.label}
                count={type.count}
                visaFee={visaFee}
                serviceFee={serviceFee}
              />
            );
          })}

          {/* Total */}
          <div className="border-t border-gray-300 pt-4 flex justify-between font-semibold">
            <p>Total Amount to Pay</p>

            <div className="flex gap-2">
              <span>BDT</span>
              <span>{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
