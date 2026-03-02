"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useUpdateFlights, useFlightsById } from "@/hooks/Admin/useFlights";
import { useAircraftForm, useRouteForm } from "@/hooks/Admin/useForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const flightsUpdateValidation = z.object({
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
  { value: "completed", label: "completed" },
  { value: "arrived", label: "Arrived" },
  { value: "delayed", label: "Delayed" },
  { value: "cancelled", label: "Cancelled" },
];
const toLocalDatetime = (isoString) => {
  if (!isoString) return "";
  return isoString.slice(0, 16);
};

function FlightsUpdateForm({ id }) {
  const router = useRouter();

  const { data: flightData, isLoading: flightLoading } = useFlightsById({ id });
  const { data: aircraftData, isLoading: aircraftLoading } = useAircraftForm();
  const { data: routeData, isLoading: routeLoading } = useRouteForm();
  const { mutate, isPending } = useUpdateFlights();

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
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(flightsUpdateValidation),
    defaultValues: {
      flight_number: "",
      aircraft_id: "",
      route_id: "",
      departure_datetime: "",
      arrival_datetime: "",
      duration_minutes: "",
      status: "",
    },
  });

  useEffect(() => {
    const flight = flightData?.data;
    if (flight) {
      reset({
        flight_number: flight.flight_number || "",
        aircraft_id: String(flight.aircraft_id) || "",
        route_id: String(flight.route_id) || "",
        departure_datetime: toLocalDatetime(flight.departure_datetime),
        arrival_datetime: toLocalDatetime(flight.arrival_datetime),
        duration_minutes: flight.duration_minutes
          ? String(flight.duration_minutes)
          : "",
        status: flight.status || "",
      });
    }
  }, [flightData, reset]);

  const onSubmit = async (data) => {
    console.log("submit data", data);
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
      formData.append("_method", "PUT");

      mutate(
        { id, data: formData },
        {
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
        }
      );
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  if (flightLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-gray-500">Loading flight data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <Link
          href="/admin/flights"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Flights</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Update Flight</h1>
          <p className="text-gray-500 mt-1">
            Edit flight details and save your changes
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
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Status *"
                    placeholder="Select status"
                    options={STATUS_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.status?.message}
                  />
                )}
              />
            </div>

            {/* Aircraft & Route */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="aircraft_id"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Aircraft *"
                    placeholder="Select aircraft"
                    options={aircraftOptions}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.aircraft_id?.message}
                    disabled={aircraftLoading}
                  />
                )}
              />
              <Controller
                name="route_id"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Route *"
                    placeholder="Select route"
                    options={routeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.route_id?.message}
                    disabled={routeLoading}
                  />
                )}
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
                {isPending ? "Updating..." : "Update Flight"}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightsUpdateForm;