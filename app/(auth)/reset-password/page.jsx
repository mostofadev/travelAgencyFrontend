"use client";

import { Suspense } from "react";
import ResetPasswordForm from "@/components/forms/Auth/ResetPasswordForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
