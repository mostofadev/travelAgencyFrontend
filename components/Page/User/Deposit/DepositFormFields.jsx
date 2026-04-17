"use client";

import { forwardRef } from "react";
import { useController } from "react-hook-form";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

const ForwardedInput = forwardRef((props, ref) => (
  <Input {...props} ref={ref} />
));
ForwardedInput.displayName = "ForwardedInput";

export default function DepositFormFields({
  register,
  errors,
  control,
  DepositType = [],
  type = true,
}) {
  const {
    field: { value: paymentTypeValue, onChange: paymentTypeOnChange },
  } = useController({
    name: "paymentType",
    control,
  });

  const { ref: depositDateRef, ...depositDateRest } = register("depositDate");
  const { ref: depositAmountRef, ...depositAmountRest } =
    register("depositAmount");
  const { ref: transactionRef, ...transactionRest } = register(
    "transactionReference",
  );
  const { ref: notesRef, ...notesRest } = register("userNotes");

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
        Bank Account Deposit
      </h3>

      {/* Deposit Type + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Deposit Type"
          required
          options={DepositType}
          value={paymentTypeValue}
          onChange={paymentTypeOnChange}
          placeholder="Select type"
          disabled={true}
          error={errors?.paymentType?.message}
        />

        <Input
          type="date"
          label="Deposit Date"
          required
          max={new Date().toISOString().split("T")[0]}
          error={errors?.depositDate?.message}
          ref={depositDateRef}
          {...depositDateRest}
        />
      </div>

      {/* Amount */}
      <div className="relative">
        <span className="absolute left-4 top-[38px] text-sm font-medium text-gray-500 z-10">
          ৳
        </span>
        <Input
          type="number"
          label="Deposit Amount"
          required
          placeholder="0.00"
          error={errors?.depositAmount?.message}
          className="[&_input]:pl-7"
          ref={depositAmountRef}
          {...depositAmountRest}
        />
      </div>

      {type && (
        <Input
          type="text"
          label="Reference ID"
          required
          placeholder="Enter transaction reference"
          error={errors?.transactionReference?.message}
          ref={transactionRef}
          {...transactionRest}
        />
      )}

      {type && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="text-red-500 mr-1">*</span>Attachment
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photoFile")}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 border border-gray-200 rounded-lg cursor-pointer transition-all"
          />
          {errors?.photoFile && (
            <p className="mt-1 text-sm text-red-500">
              {errors.photoFile.message}
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all placeholder:text-gray-400"
          placeholder="Optional notes..."
          ref={notesRef}
          {...notesRest}
        />
      </div>
    </div>
  );
}
