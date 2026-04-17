
"use client";

import { useState } from "react";
import AirportField from "./AirportField";
import SwapButton from "./SwapButton";

export default function LocationInput({ from, to, onFromChange, onToChange }) {
  const [activeField, setActiveField] = useState("from"); 

  const handleSwap = () => {
    const tempFrom = from;
    onFromChange(to);
    onToChange(tempFrom);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-stretch w-full gap-0">
      <div className="flex-1 min-w-0">
        <AirportField
          id="airport-from"
          label="From"
          icon={
            <svg
              width="17"
              height="17"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          }
          value={from}
          onChange={onFromChange}
          isActive={activeField === "from"}
          onActivate={() => setActiveField("from")}
        />
      </div>

      <div className="flex justify-center items-center py-1 sm:py-0 sm:z-10 sm:-mx-3">
        <SwapButton onClick={handleSwap} />
      </div>

      <div className="flex-1 min-w-0">
        <AirportField
          id="airport-to"
          label="To"
          icon={
            <svg
              width="17"
              height="17"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 8 16 12 12 16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          }
          value={to}
          onChange={onToChange}
          isActive={activeField === "to"}
          onActivate={() => setActiveField("to")}
        />
      </div>
    </div>
  );
}
