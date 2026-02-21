'use client';
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/AuthUser";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function UserLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {login,isPending} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit =async (data) => {
   // console.log("Form Submitted:", data);
   const res = await login(data);
   console.log(res);
   
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        User Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
          required
        />

        {/* Password Input */}
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          required
          icon={null}
          inputProps={{
            autoComplete: "current-password",
          }}
        />
        
        {/* Submit Button */}
        <Button type="submit" fullWidth loading={isPending}>
          Log In
        </Button>
      </form>
      <div className="text-right text-[12px] my-3">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      {/* Register Link */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
