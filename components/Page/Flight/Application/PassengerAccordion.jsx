"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, User, AlertCircle } from "lucide-react";
import PassengerFormFields from "./PassengerFormFields";

const TYPE_LABELS = {
  adult: { label: "Adult", color: "bg-blue-100 text-blue-700" },
  child: { label: "Child", color: "bg-green-100 text-green-700" },
  infant: { label: "Infant", color: "bg-yellow-100 text-yellow-700" },
};

export default function PassengerAccordion({
  index,
  passengerType,
  isOpenDefault = false,
  register,
  errors,
}) {
  const [manualOpen, setManualOpen] = useState(isOpenDefault);
  const typeInfo = TYPE_LABELS[passengerType];

  const hasError = errors && Object.keys(errors).length > 0;

  const isOpen = hasError || manualOpen;

  return (
    <div
      className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-colors ${
        hasError ? "border-red-300" : "border-gray-100"
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setManualOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              hasError ? "bg-red-50" : "bg-blue-50"
            }`}
          >
            <User
              size={15}
              className={hasError ? "text-red-500" : "text-blue-600"}
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800">
                Passenger {index + 1}
              </p>
              {hasError && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                  <AlertCircle size={11} />
                  Incomplete
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeInfo.color}`}
            >
              {typeInfo.label}
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>

      {/* Body */}
      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          <input
            type="hidden"
            {...register(`applicants.${index}.passenger_type`)}
          />
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
