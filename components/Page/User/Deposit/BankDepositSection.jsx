"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DepositSummary from "./DepositSummary";
import DepositFormFields from "./DepositFormFields";
import BankAccountList from "./BankAccountList";
import { useDepositAllBank, useDepositRequest } from "@/hooks/Page/useDeposit";

const DEPOSIT_TYPES = [{ value: "bank_transfer", label: "Bank Transfer" }];

const depositSchema = z.object({
  paymentType: z.string().min(1, "Deposit type is required"),
  depositDate: z.string().min(1, "Deposit date is required"),
  depositAmount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Enter a valid amount greater than 0",
    }),
  transactionReference: z.string().min(1, "Reference ID is required"),
  photoFile: z
    .any()
    .refine((files) => files?.length > 0, "Attachment is required"),
  userNotes: z.string().optional(),
});

export default function BankDepositSection() {
  const [selectedBank, setSelectedBank] = useState(null);

  const { data: banksData, isLoading: banksLoading } = useDepositAllBank();
  const banks = banksData?.data || [];

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
      paymentType: "bank_transfer",
      depositDate: "",
      depositAmount: "",
      transactionReference: "",
      userNotes: "",
    },
  });

  const depositAmount = watch("depositAmount");

  const onSubmit = (data) => {
    if (!selectedBank) return;

    const formData = new FormData();
    formData.append("bank_id", selectedBank.id);
    formData.append("deposit_type", data.paymentType);
    formData.append("deposit_date", data.depositDate);
    formData.append("amount", data.depositAmount);
    formData.append("reference_id", data.transactionReference);
    formData.append("notes", data.userNotes || "");
    if (data.photoFile?.[0]) {
      formData.append("attachment", data.photoFile[0]);
    }

    createDeposit(formData, {
      onSuccess: () => {
        reset();
        setSelectedBank(null);
      },
      onError: (error) => {
        if (error.response?.status === 422) {
          const serverErrors = error.response?.data?.errors || {};
          Object.keys(serverErrors).forEach((field) => {
            const message = Array.isArray(serverErrors[field])
              ? serverErrors[field][0]
              : serverErrors[field];
            setError(field, { type: "server", message });
          });
        }
      },
    });
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left — Bank List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Select a Bank Account
          </p>
          <BankAccountList
            banks={banks}
            isLoading={banksLoading}
            selectedBank={selectedBank}
            onSelectBank={setSelectedBank}
          />
        </div>

        {/* Right — Form + Summary */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 md:p-6 h-full">
            <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
              {/* Form Fields */}
              <div className="w-full xl:w-3/5">
                <DepositFormFields
                  register={register}
                  errors={errors}
                  control={control}
                  DepositType={DEPOSIT_TYPES}
                  type={true}
                />
              </div>

              {/* Divider */}
              <div className="block xl:hidden h-px bg-gray-100" />
              <div className="hidden xl:block w-px bg-gray-100 self-stretch" />

              {/* Summary */}
              <div className="w-full xl:w-2/5">
                <DepositSummary
                  selectedBank={selectedBank}
                  amount={depositAmount}
                  gatewayFee={0}
                  isPending={isPending}
                  type={true}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
