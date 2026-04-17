"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useVisaType, useUpdateVisaType } from "@/hooks/Admin/useVisaType";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function VisaTypeUpdateForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm();

  const { data: visaType, isLoading } = useVisaType(id);

  const { mutateAsync, isPending } = useUpdateVisaType();

  useEffect(() => {
    if (visaType?.data) {
      setValue("name", visaType.data.name);
    }
  }, [visaType, setValue]);

  const onSubmit = async (data) => {
    try {
      await mutateAsync({
        id: id,
        data,
      });
      reset();
      router.push("/admin/visa/visa-type");
    } catch (error) {
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
                Edit Visa Type
              </h1>
              <p className="text-gray-500 mt-1">
                Update visa type information
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Visa Type Name */}
              <div>
                <Input
                  disabled={isLoading}
                  type="text"
                  label="Visa Type Name"
                  placeholder="e.g., Tourist Visa, Work Visa"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </div>

          

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6">
                <Button type="submit" fullWidth loading={isPending}>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaTypeUpdateForm;