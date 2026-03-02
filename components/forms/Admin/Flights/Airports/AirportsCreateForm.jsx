"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useCreateAirports } from "@/hooks/Admin/useAirports";
import { useVisaFormCountries } from "@/hooks/Admin/useForm";
import { airportsCreateValidation } from "@/lib/validations/Admin/airportsCreateValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resolve } from "styled-jsx/css";

function AirportsCreateForm() {
  const router = useRouter();
  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();
    const {mutate,isPending} = useCreateAirports();
  // const [isPending,setIsPending] = useState(false)
  const countryOptions =
    countriesData?.data?.map((country) => ({
      value: String(country.id),
      label: country.name,
    })) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm({
    resolve: zodResolver(airportsCreateValidation),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("country_id", data.country_id);
      formData.append("city", data.city);
      formData.append("terminal", data.terminal);
      formData.append("timezone", data.timezone);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);
      // Submit
      mutate(formData, {
        onSuccess: (response) => {
          console.log("Success response:", response);
          router.push("/admin/flights/airports");
        },
        onError: (error) => {
          console.error("Error response:", error);
          console.error("Error details:", error?.response?.data);

          // Handle validation errors
          if (error.response?.status === 422) {
            const serverErrors = error.response?.data?.errors || {};

            Object.keys(serverErrors).forEach((field) => {
              const message = Array.isArray(serverErrors[field])
                ? serverErrors[field][0]
                : serverErrors[field];

              if (field.includes(".")) {
                const parts = field.split(".");

                if (parts.length === 3) {
                  const [arrayName, index, fieldName] = parts;
                  setError(`${arrayName}.${index}.${fieldName}`, {
                    type: "server",
                    message: message,
                  });
                }
              } else {
                setError(field, {
                  type: "server",
                  message: message,
                });
              }
            });
          }
        },
      });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/flights/airports"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Tour Airports</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Airports
            </h1>
            <p className="text-gray-500 mt-1">
              Add a new Airports to the system with all details
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Code *"
                  placeholder="DAS"
                  {...register("code")}
                  error={errors.code?.message}
                />
                <Input
                  type="text"
                  label="Name *"
                  placeholder="Name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </div>
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
                  placeholder="City"
                  {...register("city")}
                  error={errors.city?.message}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Terminal *"
                  placeholder="Terminal"
                  {...register("terminal")}
                  error={errors.terminal?.message}
                />
                <Input
                  type="text"
                  label="Timezone (optional)"
                  placeholder="Timezone"
                  {...register("timezone")}
                  error={errors.timezone?.message}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Latitude (optional)"
                  placeholder="latitude"
                  {...register("latitude")}
                  error={errors.latitude?.message}
                />
                <Input
                  type="text"
                  label="Longitude (optional)"
                  placeholder="longitude"
                  {...register("longitude")}
                  error={errors.longitude?.message}
                />
              </div>
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
                  {isPending ? "Creating..." : "Create Tour Package"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AirportsCreateForm;
