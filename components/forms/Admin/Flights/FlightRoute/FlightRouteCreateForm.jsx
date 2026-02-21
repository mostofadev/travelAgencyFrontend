"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useCreateFlightRoute, useFlightRouteAirportList } from "@/hooks/Admin/useFlightRoute";

import { FlightRouteCreateValidation } from "@/lib/validations/Admin/flightRouteCreateValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function FlightRouteCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateFlightRoute();
  
  const { data: airportsData, isLoading: airportsLoading } =
    useFlightRouteAirportList();
  
  const airportOptions =
    airportsData?.data?.map((airport) => ({
      value: String(airport.id),
      label: `${airport.name} (${airport.code})`,
    })) || [];
   console.log('data',airportsData);
   
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(FlightRouteCreateValidation),
    defaultValues: {
      from_airport_id: "",
      to_airport_id: "",
      distance_km: "",
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("from_airport_id", data.from_airport_id);
    formData.append("to_airport_id", data.to_airport_id);
    formData.append("distance_km", data.distance_km);

    mutate(formData, {
      onSuccess: () => {
        router.push("/admin/flights/flight-route");
      },
      onError: (error) => {
        if (error?.response?.status === 422) {
          const serverErrors = error.response?.data?.errors || {};
          Object.entries(serverErrors).forEach(([field, messages]) => {
            const message = Array.isArray(messages) ? messages[0] : messages;
            setError(field, { type: "server", message });
          });
        }
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/flights/routes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Routes</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Route</h1>
          <p className="text-gray-500 mt-1">
            Add a new flight route to the system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* From & To Airport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="From Airport *"
                placeholder="Select departure airport"
                options={airportOptions}
                {...register("from_airport_id")}
                error={errors.from_airport_id?.message}
                disabled={airportsLoading}
              />
              <Select
                label="To Airport *"
                placeholder="Select arrival airport"
                options={airportOptions}
                {...register("to_airport_id")}
                error={errors.to_airport_id?.message}
                disabled={airportsLoading}
              />
            </div>

            {/* Distance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Distance (km) *"
                placeholder="e.g. 300"
                {...register("distance_km")}
                error={errors.distance_km?.message}
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
                {isPending ? "Creating..." : "Create Route"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightRouteCreateForm;
