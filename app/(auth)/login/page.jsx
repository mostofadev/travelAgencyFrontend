"use client";
import UserLoginForm from "@/components/forms/Auth/UserLoginForm";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserLoginForm />
      </Suspense>
    </div>
  );
}

export default page;
