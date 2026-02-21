"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateVisaType } from "@/hooks/Admin/useVisaType";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function VisaTypeCreateForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const { mutateAsync, isPending } = useCreateVisaType();

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      reset();
      router.push("/admin/visa/visa-type");
    } catch (error) {
      // 422 validation errors কে form fields এ show করা
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        
        Object.keys(serverErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: Array.isArray(serverErrors[field]) 
              ? serverErrors[field][0] 
              : serverErrors[field],
          });
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-8">
      <div>
        <div className="mb-8">
          <Link
            href="/admin/visa/visa-type"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Visa Type
              </h1>
              <p className="text-gray-500 mt-1">
                Add a new visa type to the system
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  type="text"
                  label="Visa Type Name"
                  placeholder="e.g., Tourist Visa, Work Visa"
                  {...register("name", {
                    required: "Visa type name is required",
                  })}
                  error={errors.name?.message}
                />
              </div>

              <div className="my-6">
                <Button type="submit" fullWidth loading={isPending}>
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaTypeCreateForm;