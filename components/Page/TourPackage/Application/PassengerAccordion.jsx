"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PassengerFormFields from "./PassengerFormFields";

const TYPE_BADGE = {
  adult: "bg-blue-50 text-blue-800 border border-blue-200",
  child: "bg-green-50 text-green-800 border border-green-200",
  infant: "bg-yellow-50 text-yellow-800 border border-yellow-200",
};

export default function PassengerAccordion({
  index,
  passengerType,
  isOpenDefault = false,
  register,
  errors,
}) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const isPrimary = passengerType === "adult" && index === 0;
  const label = passengerType.charAt(0).toUpperCase() + passengerType.slice(1);

  return (
    <div className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-800">
            Applicant {index + 1}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYPE_BADGE[passengerType]}`}
          >
            {label}
          </span>
          {isPrimary && (
            <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
              Primary
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-5 py-5">
          <PassengerFormFields
            index={index}
            passengerType={passengerType}
            register={register}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
}
