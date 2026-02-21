"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// Import reusable components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import FileUpload from "@/components/ui/FileUpload";
import Radio from "@/components/ui/Radio";
import Checkbox from "@/components/ui/Checkbox";

// Import hooks
import { useCreateVisa } from "@/hooks/Admin/useVisa";
import {
  useVisaFormCountries,
  useVisaFormTypes,
} from "@/hooks/Admin/useVisaFormServices";
import visaValidationSchema from "@/lib/validations/Admin/visaValidation";
import { showCustomToast } from "@/lib/ShowCustomToast";

function VisaCreateForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);

  // Fetch countries and visa types
  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();
  const { data: visaTypesData, isLoading: visaTypesLoading } =
    useVisaFormTypes();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control,
  } = useForm({
    resolver: zodResolver(visaValidationSchema),
    defaultValues: {
      visa_title: "",
      //visa_code: "",
      country_id: "",
      visa_type_id: "",
      description: "",
      notes: "",
      visa_mode: "electronic",
      entry_type: "single",
      processing_min_days: 1,
      processing_max_days: 7,
      validity_days: 30,
      max_stay_days: 30,
      max_stay_label: "",
      base_fee: "",
      currency: "USD",
      is_active: true,
      requirements: [],
      faqs: [],
    },
  });

  // Field arrays
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faqs",
  });

  const { mutateAsync, isPending } = useCreateVisa();

  // Data cleaning function
  const cleanFormData = (data) => {
    return {
      ...data,
      // Remove empty requirements
      requirements: (data.requirements || []).filter(
        (req) => req.title && req.title.trim() !== "",
      ),
      // Remove empty FAQs
      faqs: (data.faqs || []).filter(
        (faq) =>
          faq.question &&
          faq.question.trim() !== "" &&
          faq.answer &&
          faq.answer.trim() !== "",
      ),
      // Ensure numbers are valid
      processing_min_days: Number(data.processing_min_days) || 1,
      processing_max_days: Number(data.processing_max_days) || 7,
      validity_days: Number(data.validity_days) || 30,
      max_stay_days: Number(data.max_stay_days) || 30,
      base_fee: Number(data.base_fee) || 0,
    };
  };

  const onSubmit = async (data) => {
    console.log("=== Form Submission ===");
    console.log("Form Data:", data);
    console.log("Itineraries from data:", data.itineraries);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("package_title", data.package_title);
      formData.append("package_type", data.package_type);
      formData.append("duration_days", data.duration_days);
      formData.append("duration_nights", data.duration_nights);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("prices", data.prices);
      formData.append("adult_price", data.adult_price);
      formData.append("child_price", data.child_price);
      formData.append("currency", data.currency);
      formData.append("origin_country_id", data.origin_country_id);
      formData.append("destination_country_id", data.destination_country_id);
      formData.append("total_seats", data.total_seats);
      formData.append("booked_seats", data.booked_seats);
      formData.append("description", data.description || "");
      formData.append("highlights", data.highlights || "");
      formData.append("inclusions", data.inclusions || "");
      formData.append("exclusions", data.exclusions || "");
      formData.append("cancellation_policy", data.cancellation_policy || "");

      // Boolean fields - convert to "1" or "0"
      formData.append("status", data.status ? "1" : "0");
      formData.append("is_active", data.is_active ? "1" : "0");
      formData.append("is_featured", data.is_featured ? "1" : "0");

      // Image
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        console.error("No image file selected");
        alert("Please select an image");
        return;
      }

      // Itineraries - send as indexed array items
      if (data.itineraries && data.itineraries.length > 0) {
        data.itineraries.forEach((itinerary, index) => {
          formData.append(
            `itineraries[${index}][day_number]`,
            itinerary.day_number,
          );
          formData.append(
            `itineraries[${index}][title]`,
            itinerary.title || "",
          );
          formData.append(
            `itineraries[${index}][description]`,
            itinerary.description || "",
          );
          formData.append(
            `itineraries[${index}][accommodation]`,
            itinerary.accommodation || "",
          );
          formData.append(
            `itineraries[${index}][meals]`,
            itinerary.meals || "",
          );
        });
      }

      // Debug: Log FormData
      console.log("=== FormData Contents ===");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      // Submit
      mutate(formData, {
        onSuccess: (response) => {
          console.log("Success response:", response);
          router.push("/admin/tour-packages");
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
                // For normal fields
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

  // Options
  const countryOptions =
    countriesData?.data?.map((country) => ({
      value: String(country.id),
      label: country.name,
    })) || [];

  const visaTypeOptions =
    visaTypesData?.data?.map((type) => ({
      value: String(type.id),
      label: type.name,
    })) || [];

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "BDT", label: "BDT - Bangladeshi Taka" },
    { value: "INR", label: "INR - Indian Rupee" },
  ];

  const visaModeOptions = [
    {
      value: "electronic",
      label: "Electronic",
      description: "E-Visa / Online application",
    },
    {
      value: "sticker",
      label: "Sticker",
      description: "Physical visa sticker",
    },
  ];

  const entryTypeOptions = [
    {
      value: "single",
      label: "Single Entry",
      description: "One-time entry only",
    },
    {
      value: "multiple",
      label: "Multiple Entry",
      description: "Multiple entries allowed",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/visa"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Visas</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Visa
            </h1>
            <p className="text-gray-500 mt-1">
              Add a new visa to the system with all details
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div className="">
                <Input
                  label="Visa Title"
                  placeholder="e.g., Tourist Visa for Thailand"
                  {...register("visa_title")}
                  error={errors.visa_title?.message}
                />

                {/* <Input
                  label="Visa Code (Optional)"
                  placeholder="e.g., VISA-TH-001"
                  {...register("visa_code")}
                  error={errors.visa_code?.message}
                  helpText="Leave empty for auto-generation"
                /> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Country"
                  placeholder="Select country"
                  options={countryOptions}
                  {...register("country_id")}
                  error={errors.country_id?.message}
                  disabled={countriesLoading}
                />

                <Select
                  label="Visa Type"
                  placeholder="Select visa type"
                  options={visaTypeOptions}
                  {...register("visa_type_id")}
                  error={errors.visa_type_id?.message}
                  disabled={visaTypesLoading}
                />
              </div>

              <FileUpload
                label="Visa Image"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                maxSize={2048}
                {...register("image")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                error={errors.image?.message}
                helpText="Upload visa image (max 2MB)"
              />

              <Textarea
                label="Description"
                rows={4}
                placeholder="Enter visa description..."
                {...register("description")}
                error={errors.description?.message}
              />

              <Textarea
                label="Notes"
                rows={3}
                placeholder="Any additional notes..."
                {...register("notes")}
                error={errors.notes?.message}
              />
            </div>
          </div>

          {/* Visa Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Visa Details
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <Radio
                label="Visa Mode"
                options={visaModeOptions}
                {...register("visa_mode")}
                error={errors.visa_mode?.message}
              />

              <Radio
                label="Entry Type"
                options={entryTypeOptions}
                {...register("entry_type")}
                error={errors.entry_type?.message}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Processing Time (Min Days)"
                  placeholder="1"
                  {...register("processing_min_days", { valueAsNumber: true })}
                  error={errors.processing_min_days?.message}
                />

                <Input
                  type="number"
                  label="Processing Time (Max Days)"
                  placeholder="7"
                  {...register("processing_max_days", { valueAsNumber: true })}
                  error={errors.processing_max_days?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Validity (Days)"
                  placeholder="30"
                  {...register("validity_days", { valueAsNumber: true })}
                  error={errors.validity_days?.message}
                />

                <Input
                  type="number"
                  label="Max Stay (Days)"
                  placeholder="30"
                  {...register("max_stay_days", { valueAsNumber: true })}
                  error={errors.max_stay_days?.message}
                />
              </div>

              <Input
                label="Max Stay Label (Optional)"
                placeholder="e.g., 30 Days From Entry"
                {...register("max_stay_label")}
                error={errors.max_stay_label?.message}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="number"
                  label="Base Fee"
                  placeholder="100.00"
                  step="0.01"
                  {...register("base_fee", { valueAsNumber: true })}
                  error={errors.base_fee?.message}
                />

                <Select
                  label="Currency"
                  options={currencyOptions}
                  {...register("currency")}
                  error={errors.currency?.message}
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Requirements
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    appendRequirement({ title: "", is_optional: false })
                  }
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {requirementFields.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No requirements added yet. Click &quot;Add&quot; to add
                  requirements.
                </p>
              ) : (
                requirementFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex-1 space-y-4">
                      <Input
                        placeholder="e.g., Valid Passport"
                        {...register(`requirements.${index}.title`)}
                        error={errors.requirements?.[index]?.title?.message}
                      />

                      <Checkbox
                        label="This is optional"
                        {...register(`requirements.${index}.is_optional`)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
                <button
                  type="button"
                  onClick={() => appendFaq({ question: "", answer: "" })}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {faqFields.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">
                  No FAQs added yet. Click &quot;Add&quot; to add FAQs.
                </p>
              ) : (
                faqFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm font-semibold text-gray-700">
                        FAQ #{index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFaq(index)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Input
                      placeholder="Question"
                      {...register(`faqs.${index}.question`)}
                      error={errors.faqs?.[index]?.question?.message}
                    />

                    <Textarea
                      rows={3}
                      placeholder="Answer"
                      {...register(`faqs.${index}.answer`)}
                      error={errors.faqs?.[index]?.answer?.message}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <Checkbox
                label="Active Status"
                description="Enable this visa for booking"
                {...register("is_active")}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            size="lg"
            fullWidth
          >
            Create Visa
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VisaCreateForm;
