"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/AuthUser";

// Validation Schema 
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

//  ForgotPasswordPage Component 
export default function ForgotPasswordPage() {
  const { forgotPassword, isForgotPasswordLoading, isForgotPasswordSuccess } =
    useAuth();

  //  React Hook Form 
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  //  Submit Handler 
  const onSubmit = (data) => {
    forgotPassword(data.email);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">
        Forgot Password?
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      {/*  Success State  */}
      {isForgotPasswordSuccess ? (
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-7 h-7 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Reset link sent to{" "}
            <span className="font-semibold text-gray-800">
              {getValues("email")}
            </span>
          </p>
          <p className="text-xs text-gray-400">
            Check your inbox and follow the link to reset your password.
          </p>
        </div>
      ) : (
        //  Form 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          {/* Submit */}
          <Button type="submit" fullWidth loading={isForgotPasswordLoading}>
            Send Reset Link
          </Button>
        </form>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
