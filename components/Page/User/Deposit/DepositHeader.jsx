"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function DepositHeader({
  title,
  description,
  linkHref,
  linkLabel,
  linkIcon,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {linkHref && linkLabel && (
        
        <Button href={linkHref}>{linkLabel}</Button>
      )}
    </div>
  );
}
