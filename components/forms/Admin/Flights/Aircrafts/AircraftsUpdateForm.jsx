"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useAircraftsById, useUpdateAircrafts } from "@/hooks/Admin/useAircrafts";
import { aircraftsUpdateValidation } from "@/lib/validations/Admin/Aircraftsupdatevalidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function AircraftsUpdateForm({ Id }) {
  const router = useRouter();
  const { data: aircraftData, isLoading: aircraftLoading } = useAircraftsById({ id: Id });
  const { mutate, isPending } = useUpdateAircrafts();

  const aircraft = aircraftData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(aircraftsUpdateValidation),
    defaultValues: {
      model: "",
      manufacturer: "",
      capacity: "",
      // is_active: "1",
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (aircraft) {
      reset({
        model: aircraft.model ?? "",
        manufacturer: aircraft.manufacturer ?? "",
        capacity: aircraft.capacity ?? "",
        // is_active: String(aircraft.is_active ?? "1"),
      });
    }
  }, [aircraft, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("_method", "PUT"); 
    formData.append("model", data.model);
    formData.append("manufacturer", data.manufacturer);
    formData.append("capacity", data.capacity);
    // formData.append("is_active", data.is_active);

    mutate(
      { id:Id, data: formData },
      {
        onSuccess: () => {
          router.push("/admin/flights/aircrafts");
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
      }
    );
  };

  if (aircraftLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading aircraft data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/flights/aircrafts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Aircrafts</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Aircraft</h1>
          <p className="text-gray-500 mt-1">Update aircraft information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 space-y-6">

            {/* Model & Manufacturer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="text"
                label="Model *"
                placeholder="e.g. Boeing 737"
                {...register("model")}
                error={errors.model?.message}
              />
              <Input
                type="text"
                label="Manufacturer *"
                placeholder="e.g. Boeing"
                {...register("manufacturer")}
                error={errors.manufacturer?.message}
              />
            </div>

            {/* Capacity & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Capacity *"
                placeholder="e.g. 180"
                {...register("capacity")}
                error={errors.capacity?.message}
              />
              {/* <Select
                label="Status *"
                placeholder="Select status"
                options={[
                  { value: "1", label: "Active" },
                  { value: "0", label: "Inactive" },
                ]}
                {...register("is_active")}
                error={errors.is_active?.message}
              /> */}
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
                {isPending ? "Updating..." : "Update Aircraft"}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default AircraftsUpdateForm;