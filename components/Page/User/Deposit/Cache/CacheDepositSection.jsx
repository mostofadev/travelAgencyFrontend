"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDepositAllBank, useDepositRequest } from "@/hooks/Page/useDeposit";
import DepositSummary from "../DepositSummary";
import DepositFormFields from "../DepositFormFields";

const DEPOSIT_TYPES = [{ value: "cache", label: "Cache" }];

const depositSchema = z.object({
  paymentType: z.string().min(1, "Deposit type is required"),
  depositDate: z.string().min(1, "Deposit date is required"),
  depositAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Enter a valid amount greater than 0",
    }),
  userNotes: z.string().optional(),
});

export default function CacheDepositSection() {
  const { mutate: createDeposit, isPending } = useDepositRequest();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      paymentType: "cache",
      depositDate: "",
      depositAmount: "",
      userNotes: "",
    },
  });

  const depositAmount = watch("depositAmount");
  const onSubmit = (data) => {
    const formData = new FormData();
   formData.append("bank_id", 1);
    formData.append("deposit_type", data.paymentType);
    formData.append("deposit_date", data.depositDate);
    formData.append("amount", data.depositAmount);
    formData.append("notes", data.userNotes || "");
    formData.append("transaction_reference", "Cache Deposit");
    formData.append("photo", "");

    createDeposit(formData, {
      onSuccess: () => reset(),
      onError: (error) => {
        
      },
    });
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 md:p-6">
          <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
            {/* Form Fields */}
            <div className="w-full xl:w-3/5">
              <DepositFormFields
                register={register}
                errors={errors}
                control={control}
                DepositType={DEPOSIT_TYPES}
                type={false}
              />
            </div>

            {/* Divider */}
            <div className="block xl:hidden h-px bg-gray-100" />
            <div className="hidden xl:block w-px bg-gray-100 self-stretch" />

            {/* Summary */}
            <div className="w-full xl:w-2/5">
              <DepositSummary
                type={false}
                amount={depositAmount}
                gatewayFee={0}
                isPending={isPending}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
