"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/AuthUser";
import { useSearchParams } from "next/navigation";

//  Validation Schema 
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//  Captcha Generator 
function makeCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b };
}

//  UserLoginForm Component 
export default function UserLoginForm() {
  const { login, isLoginLoading } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  //  State 
  const [captcha, setCaptcha] = useState(makeCaptcha());
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    if (parseInt(captchaAnswer) !== captcha.a + captcha.b) {
      setCaptchaError("Incorrect answer, please try again.");
      setCaptcha(makeCaptcha());
      setCaptchaAnswer("");
      return;
    }

    login({
      email: data.email,
      password: data.password,
      redirect: redirect || null, 
    });
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
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
          required
        />

        {/* Captcha */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Verify:{" "}
            {isClient && (
              <span className="font-bold text-blue-600">
                {captcha.a} + {captcha.b}
              </span>
            )}{" "}
            = ?
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => {
                setCaptchaAnswer(e.target.value);
                setCaptchaError("");
              }}
              placeholder="Enter answer"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => {
                setCaptcha(makeCaptcha());
                setCaptchaAnswer("");
                setCaptchaError("");
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              ↻
            </button>
          </div>
          {captchaError && (
            <p className="text-xs text-red-500">{captchaError}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth loading={isLoginLoading}>
          Log In
        </Button>
      </form>

      {/* Forgot Password */}
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
