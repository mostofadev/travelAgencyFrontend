"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useCreateBank } from "@/hooks/Admin/useBank";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { z } from "zod";

//  Zod Validation 
const bankCreateValidation = z.object({
  name: z
    .string()
    .min(1, "Bank name is required")
    .max(255, "Bank name must be less than 255 characters"),
  account_name: z
    .string()
    .min(1, "Account name is required")
    .max(255, "Account name must be less than 255 characters"),
  account_number: z
    .string()
    .min(1, "Account number is required")
    .max(50, "Account number must be less than 50 characters"),
  branch: z
    .string()
    .min(1, "Branch name is required")
    .max(255, "Branch name must be less than 255 characters"),
  routing_number: z
    .string()
    .min(1, "Routing number is required")
    .max(50, "Routing number must be less than 50 characters"),
  status: z.boolean().default(true),
});


function BankCreateForm() {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState(null);
  const { mutate, isPending } = useCreateBank();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: zodResolver(bankCreateValidation),
    defaultValues: {
      name: "",
      account_name: "",
      account_number: "",
      branch: "",
      routing_number: "",
      status: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("account_name", data.account_name);
      formData.append("account_number", data.account_number);
      formData.append("branch", data.branch);
      formData.append("routing_number", data.routing_number);
      formData.append("status", data.status ? "1" : "0");

      if (logoFile) {
        formData.append("logo", logoFile);
      } else {
        setError("logo", {
          type: "manual",
          message: "Bank logo is required",
        });
        return;
      }

      mutate(formData, {
        onSuccess: () => {
          router.push("/admin/bank");
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
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/bank"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Banks</span>
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Bank</h1>
          <p className="text-gray-500 mt-1">
            Add a new bank account to the system
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Bank Information
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <Input
              label="Bank Name *"
              placeholder="e.g., Dutch Bangla Bank"
              {...register("name")}
              error={errors.name?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Account Name *"
                placeholder="e.g., Mostofa Kamal"
                {...register("account_name")}
                error={errors.account_name?.message}
              />
              <Input
                label="Account Number *"
                placeholder="e.g., 123456789012"
                {...register("account_number")}
                error={errors.account_number?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Branch *"
                placeholder="e.g., Kaliganj Branch"
                {...register("branch")}
                error={errors.branch?.message}
              />
              <Input
                label="Routing Number *"
                placeholder="e.g., 090123456"
                {...register("routing_number")}
                error={errors.routing_number?.message}
              />
            </div>

            <div>
              <FileUpload
                label="Bank Logo *"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                maxSize={2048}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setLogoFile(e.target.files[0]);
                    setValue("logo", e.target.files[0], {
                      shouldValidate: true,
                    });
                  }
                }}
                error={errors.logo?.message}
                helpText="Upload bank logo (max 2MB, JPG/PNG/WEBP)"
              />
              {logoFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Selected: {logoFile.name}
                </p>
              )}
            </div>

            <Checkbox label="Active" {...register("status")} />
          </div>
        </div>

        {/* Submit Buttons */}
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
            {isPending ? "Creating..." : "Create Bank"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BankCreateForm;
