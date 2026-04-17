"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/AuthUser";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const { resetPassword, isResetPasswordLoading } = useAuth();

  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTokenError("Invalid or missing reset token.");
    } else {
      setToken(t);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    resetPassword({
      token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">
        Set New Password
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Must be at least 8 characters.
      </p>

      {tokenError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4 text-center">
          {tokenError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="password"
          label="New Password"
          placeholder="Enter new password"
          {...register("password")}
          error={errors.password?.message}
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter new password"
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={isResetPasswordLoading}
          disabled={!token}
        >
          Reset Password
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
