"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import {
  useAllFlight,
  useCreateFlightClass,
} from "@/hooks/Admin/useFlightClass";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//  Validation Schema 
const flightClassCreateValidation = z.object({
  // Flight Class fields
  flight_id: z.string().min(1, "Flight is required"),
  class_name: z.string().min(1, "Class name is required"),
  fare_code: z.string().min(1, "Fare code is required"),
  base_fare: z.string().min(1, "Base fare is required"),
  currency: z.string().min(1, "Currency is required"),
  total_seats: z.string().min(1, "Total seats is required"),
  seats_available: z.string().min(1, "Available seats is required"),
  seats_booked: z.string().min(1, "Booked seats is required"),
  is_active: z.string().min(1, "Status is required"),

  // Fare Rule fields
  is_refundable: z.string().min(1, "Refundable status is required"),
  is_partially_refundable: z
    .string()
    .min(1, "Partial refund status is required"),
  cancellation_penalty: z.string().min(1, "Cancellation penalty is required"),
  change_penalty: z.string().min(1, "Change penalty is required"),
  cabin_baggage_kg: z.string().min(1, "Cabin baggage limit is required"),
  checkin_baggage_kg: z.string().min(1, "Check-in baggage limit is required"),
  extra_baggage_fee_per_kg: z.string().min(1, "Extra baggage fee is required"),
  notes: z.string().optional(),
});

// ─── Options ─────────────────────────────────────────────────
const CLASS_OPTIONS = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First", label: "First Class" },
  { value: "Premium Economy", label: "Premium Economy" },
];

const CURRENCY_OPTIONS = [
  { value: "BDT", label: "BDT - Bangladeshi Taka" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
];

const BOOLEAN_OPTIONS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const ACTIVE_OPTIONS = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

// ─── Section Heading ─────────────────────────────────────────
function SectionHeading({ title, description }) {
  return (
    <div className="pb-4 border-b border-gray-100">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      {description && (
        <p className="text-sm text-gray-400 mt-0.5">{description}</p>
      )}
    </div>
  );
}

// ─── Main Form ───────────────────────────────────────────────
function FlightClassCreateForm() {
  const router = useRouter();

  const { data: flightData, isLoading: flightLoading } = useAllFlight();
  const { mutate, isPending } = useCreateFlightClass();

  const flightOptions =
    flightData?.map((flight) => ({
      value: String(flight.id),
      label: `${flight.flight_number} — ${flight.route?.from_airport?.code ?? ""} → ${flight.route?.to_airport?.code ?? ""}`,
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(flightClassCreateValidation),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        flight_id: Number(data.flight_id),
        class_name: data.class_name,
        fare_code: data.fare_code,
        base_fare: Number(data.base_fare),
        currency: data.currency,
        total_seats: Number(data.total_seats),
        seats_available: Number(data.seats_available),
        seats_booked: Number(data.seats_booked),
        is_active: data.is_active === "true",
        fare_rule: {
          is_refundable: data.is_refundable === "true",
          is_partially_refundable: data.is_partially_refundable === "true",
          cancellation_penalty: Number(data.cancellation_penalty),
          change_penalty: Number(data.change_penalty),
          cabin_baggage_kg: Number(data.cabin_baggage_kg),
          checkin_baggage_kg: Number(data.checkin_baggage_kg),
          extra_baggage_fee_per_kg: Number(data.extra_baggage_fee_per_kg),
          notes: data.notes || "",
        },
      };

      mutate(payload, {
        onSuccess: (response) => {
          router.push("/admin/flights/flight-class");
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
    } catch (error) {

    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/flight-classes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Flight Classes</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Flight Class
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new seating class and fare rules for a flight
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* ── Section 1: Class Info ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <SectionHeading
                title="Class Information"
                description="Basic details about the flight class"
              />

              {/* Flight & Class Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Flight *"
                  placeholder="Select flight"
                  options={flightOptions}
                  {...register("flight_id")}
                  error={errors.flight_id?.message}
                  disabled={flightLoading}
                />
                <Select
                  label="Class Name *"
                  placeholder="Select class"
                  options={CLASS_OPTIONS}
                  {...register("class_name")}
                  error={errors.class_name?.message}
                />
              </div>

              {/* Fare Code & Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Fare Code *"
                  placeholder="e.g. ECO123"
                  {...register("fare_code")}
                  error={errors.fare_code?.message}
                />
                <Select
                  label="Currency *"
                  placeholder="Select currency"
                  options={CURRENCY_OPTIONS}
                  {...register("currency")}
                  error={errors.currency?.message}
                />
              </div>

              {/* Base Fare & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Base Fare *"
                  placeholder="e.g. 5500"
                  {...register("base_fare")}
                  error={errors.base_fare?.message}
                />
                <Select
                  label="Status *"
                  placeholder="Select status"
                  options={ACTIVE_OPTIONS}
                  {...register("is_active")}
                  error={errors.is_active?.message}
                />
              </div>

              {/* Seat Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  type="number"
                  label="Total Seats *"
                  placeholder="e.g. 100"
                  {...register("total_seats")}
                  error={errors.total_seats?.message}
                />
                <Input
                  type="number"
                  label="Seats Available *"
                  placeholder="e.g. 90"
                  {...register("seats_available")}
                  error={errors.seats_available?.message}
                />
                <Input
                  type="number"
                  label="Seats Booked *"
                  placeholder="e.g. 10"
                  {...register("seats_booked")}
                  error={errors.seats_booked?.message}
                />
              </div>
            </div>
          </div>

          {/* ── Section 2: Fare Rules ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <SectionHeading
                title="Fare Rules"
                description="Refund, cancellation, and baggage policies"
              />

              {/* Refund Policy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Refundable *"
                  placeholder="Is this fare refundable?"
                  options={BOOLEAN_OPTIONS}
                  {...register("is_refundable")}
                  error={errors.is_refundable?.message}
                />
                <Select
                  label="Partially Refundable *"
                  placeholder="Is partial refund allowed?"
                  options={BOOLEAN_OPTIONS}
                  {...register("is_partially_refundable")}
                  error={errors.is_partially_refundable?.message}
                />
              </div>

              {/* Penalties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Cancellation Penalty *"
                  placeholder="e.g. 500"
                  {...register("cancellation_penalty")}
                  error={errors.cancellation_penalty?.message}
                />
                <Input
                  type="number"
                  label="Change Penalty *"
                  placeholder="e.g. 300"
                  {...register("change_penalty")}
                  error={errors.change_penalty?.message}
                />
              </div>

              {/* Baggage */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  type="number"
                  label="Cabin Baggage (kg) *"
                  placeholder="e.g. 7"
                  {...register("cabin_baggage_kg")}
                  error={errors.cabin_baggage_kg?.message}
                />
                <Input
                  type="number"
                  label="Check-in Baggage (kg) *"
                  placeholder="e.g. 20"
                  {...register("checkin_baggage_kg")}
                  error={errors.checkin_baggage_kg?.message}
                />
                <Input
                  type="number"
                  label="Extra Baggage Fee / kg *"
                  placeholder="e.g. 200"
                  {...register("extra_baggage_fee_per_kg")}
                  error={errors.extra_baggage_fee_per_kg?.message}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Refund allowed with small penalty. Free date change within 24 hours."
                  {...register("notes")}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition"
                />
                {errors.notes?.message && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.notes.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  loading={isPending}
                  disabled={isPending}
                >
                  {isPending ? "Creating..." : "Create Flight Class"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightClassCreateForm;
