"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useCreateFlights } from "@/hooks/Admin/useFlights";
import { useAircraftForm, useRouteForm } from "@/hooks/Admin/useForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const flightsCreateValidation = z.object({
  flight_number: z.string().min(1, "Flight number is required"),
  aircraft_id: z.string().min(1, "Aircraft is required"),
  route_id: z.string().min(1, "Route is required"),
  departure_datetime: z.string().min(1, "Departure datetime is required"),
  arrival_datetime: z.string().min(1, "Arrival datetime is required"),
  duration_minutes: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "departed", label: "Departed" },
  { value: "arrived", label: "Arrived" },
  { value: "delayed", label: "Delayed" },
  { value: "cancelled", label: "Cancelled" },
];

function FlightsCreateForm() {
  const router = useRouter();

  const { data: routeData, isLoading: routeLoading } = useRouteForm();

  const { data: aircraftData, isLoading: aircraftLoading } = useAircraftForm();

  const { mutate, isPending } = useCreateFlights();

  const aircraftOptions =
    aircraftData?.map((aircraft) => ({
      value: String(aircraft.id),
      label: `${aircraft.model} (${aircraft.manufacturer})`,
    })) || [];

  const routeOptions =
    routeData?.map((route) => ({
      value: String(route.id),
      label: `${route.from_airport.code} → ${route.to_airport.code}`,
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(flightsCreateValidation),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("flight_number", data.flight_number);
      formData.append("aircraft_id", data.aircraft_id);
      formData.append("route_id", data.route_id);
      formData.append("departure_datetime", data.departure_datetime);
      formData.append("arrival_datetime", data.arrival_datetime);
      if (data.duration_minutes) {
        formData.append("duration_minutes", data.duration_minutes);
      }
      formData.append("status", data.status);

      mutate(formData, {
        onSuccess: (response) => {
          console.log("Success response:", response);
          router.push("/admin/flights");
        },
        onError: (error) => {
          console.error("Error response:", error);
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
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/flights"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Flights</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Flight
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new flight to the system with all details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Flight Number & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Flight Number *"
                placeholder="e.g. EK-725"
                {...register("flight_number")}
                error={errors.flight_number?.message}
              />
              <Select
                label="Status *"
                placeholder="Select status"
                options={STATUS_OPTIONS}
                {...register("status")}
                error={errors.status?.message}
              />
            </div>

            {/* Aircraft & Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Aircraft *"
                placeholder="Select aircraft"
                options={aircraftOptions}
                {...register("aircraft_id")}
                error={errors.aircraft_id?.message}
                disabled={aircraftLoading}
              />
              <Select
                label="Route *"
                placeholder="Select route"
                options={routeOptions}
                {...register("route_id")}
                error={errors.route_id?.message}
                disabled={routeLoading}
              />
            </div>

            {/* Departure & Arrival */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="datetime-local"
                label="Departure Date & Time *"
                {...register("departure_datetime")}
                error={errors.departure_datetime?.message}
              />
              <Input
                type="datetime-local"
                label="Arrival Date & Time *"
                {...register("arrival_datetime")}
                error={errors.arrival_datetime?.message}
              />
            </div>

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Duration (minutes, optional)"
                placeholder="e.g. 125"
                {...register("duration_minutes")}
                error={errors.duration_minutes?.message}
              />
            </div>

            {/* Actions */}
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
                {isPending ? "Creating..." : "Create Flight"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightsCreateForm;
