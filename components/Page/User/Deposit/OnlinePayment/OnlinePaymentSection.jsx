"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInitiatePayment } from "@/hooks/Page/usePayment";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useController } from "react-hook-form";

const PAYMENT_METHODS = [{ value: "bkash", label: "bKash" }];

const schema = z.object({
  method: z.string().min(1, "Payment method is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Enter a valid amount greater than 0",
    }),
});

export default function OnlinePaymentSection() {
  const { mutate: initiatePayment, isPending } = useInitiatePayment();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      method: "bkash",
      amount: "",
    },
  });

  const {
    field: { value: methodValue, onChange: methodOnChange },
  } = useController({ name: "method", control });

  const { ref: amountRef, ...amountRest } = register("amount");

 
const onSubmit = (data) => {
  const payload = {
    type: "deposit",
    amount: Number(data.amount),
  };

  initiatePayment(payload);
};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Payment Method Select */}
        <Select
          label="Payment Method"
          required
          options={PAYMENT_METHODS}
          value={methodValue}
          onChange={methodOnChange}
          error={errors?.method?.message}
        />

        {/* Amount */}
        <div className="relative">
          <span className="absolute left-4 top-[38px] text-sm font-medium text-gray-500 z-10">
            ৳
          </span>
          <Input
            type="number"
            label="Amount"
            required
            placeholder="0.00"
            className="[&_input]:pl-7"
            error={errors?.amount?.message}
            ref={amountRef}
            {...amountRest}
          />
        </div>


        <Button
          type="submit"
          className="w-full"
          loading={isPending}
          disabled={isPending}
        >
          Submit Deposit
        </Button>
      </div>
    </form>
  );
}
