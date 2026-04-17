"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useCreateAircrafts } from "@/hooks/Admin/useAircrafts";
import { aircraftsCreateValidation } from "@/lib/validations/Admin/aircraftsCreateValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function AircraftsCreateForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateAircrafts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(aircraftsCreateValidation),
    defaultValues: {
      model: "",
      manufacturer: "",
      capacity: "",
  //    is_active: "1",
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("model", data.model);
    formData.append("manufacturer", data.manufacturer);
    formData.append("capacity", data.capacity);

    mutate(formData, {
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
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Create New Aircraft</h1>
          <p className="text-gray-500 mt-1">Add a new aircraft to the system with all details</p>
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
                {isPending ? "Creating..." : "Create Aircraft"}
              </Button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default AircraftsCreateForm;