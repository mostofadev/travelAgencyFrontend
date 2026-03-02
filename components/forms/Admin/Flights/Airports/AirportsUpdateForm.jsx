"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useAirportsById, useUpdateAirports } from "@/hooks/Admin/useAirports";
import { useVisaFormCountries } from "@/hooks/Admin/useFormServices";
import { airportsUpdateValidation } from "@/lib/validations/Admin/apiportsUpdateValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function AirportsUpdateForm({ airportsId }) {
  console.log('aip',airportsId);
  
  const router = useRouter();

const { data: airportData, isLoading: airportLoading } = useAirportsById({ id: airportsId });
  const { data: countriesData, isLoading: countriesLoading } = useVisaFormCountries();
  const { mutate, isPending } = useUpdateAirports();

  const airport = airportData?.data;
  console.log('air data',airport);
  
  const countryOptions =
    countriesData?.data?.map((country) => ({
      value: String(country.id),
      label: country.name,
    })) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(airportsUpdateValidation),
    defaultValues: {
      code: "",
      name: "",
      country_id: "",
      city: "",
      terminal: "",
      timezone: "",
      latitude: "",
      longitude: "",
   //   is_active: "1",
    },
  });

  // Populate form when airport data loads
  useEffect(() => {
    if (airport) {
      reset({
        code: airport.code ?? "",
        name: airport.name ?? "",
        country_id: String(airport.country_id ?? ""),
        city: airport.city ?? "",
        terminal: airport.terminal ?? "",
        timezone: airport.timezone ?? "",
        latitude: airport.latitude ?? "",
        longitude: airport.longitude ?? "",
        // is_active: String(airport.is_active ?? "1"),
      });
    }
  }, [airport, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT"); 
    formData.append("code", data.code);
    formData.append("name", data.name);
    formData.append("country_id", data.country_id);
    formData.append("city", data.city);
    formData.append("terminal", data.terminal);
    if (data.timezone) formData.append("timezone", data.timezone);
    if (data.latitude) formData.append("latitude", data.latitude);
    if (data.longitude) formData.append("longitude", data.longitude);
   // formData.append("is_active", data.is_active);

    mutate(
      { id: airportsId, data: formData },
      {
        onSuccess: () => {
          router.push("/admin/flights/airports");
        },
        onError: (error) => {
          // Handle server-side 422 validation errors
          if (error?.response?.status === 422) {
            const serverErrors = error.response?.data?.errors || {};
            Object.entries(serverErrors).forEach(([field, messages]) => {
              const message = Array.isArray(messages) ? messages[0] : messages;
              setError(field, { type: "server", message });
            });
          }
        },
      }
    );
  };

  if (airportLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading airport data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/flights/airports"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Airports</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Airport</h1>
          <p className="text-gray-500 mt-1">Update airport information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">

            {/* Code & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Code *"
                placeholder="DSASA"
                {...register("code")}
                error={errors.code?.message}
              />
              <Input
                type="text"
                label="Name *"
                placeholder="Dhaka Airport"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>

            {/* Country & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Country *"
                placeholder="Select country"
                options={countryOptions}
                {...register("country_id")}
                error={errors.country_id?.message}
                disabled={countriesLoading}
              />
              <Input
                type="text"
                label="City *"
                placeholder="Dhaka"
                {...register("city")}
                error={errors.city?.message}
              />
            </div>

            {/* Terminal & Timezone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Terminal *"
                placeholder="D1"
                {...register("terminal")}
                error={errors.terminal?.message}
              />
              <Input
                type="text"
                label="Timezone (optional)"
                placeholder="Asia/Dhaka"
                {...register("timezone")}
                error={errors.timezone?.message}
              />
            </div>

            {/* Latitude & Longitude */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Latitude (optional)"
                placeholder="23.8103"
                {...register("latitude")}
                error={errors.latitude?.message}
              />
              <Input
                type="text"
                label="Longitude (optional)"
                placeholder="90.4125"
                {...register("longitude")}
                error={errors.longitude?.message}
              />
            </div>

            {/* Status */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Status *"
                placeholder="Select status"
                options={[
                  { value: "1", label: "Active" },
                  { value: "0", label: "Inactive" },
                ]}
                {...register("is_active")}
                error={errors.is_active?.message}
              />
            </div> */}

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
                {isPending ? "Updating..." : "Update Airport"}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default AirportsUpdateForm;