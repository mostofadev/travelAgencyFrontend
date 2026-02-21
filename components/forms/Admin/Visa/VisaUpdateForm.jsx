"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash2, Loader2, X } from "lucide-react";
import Link from "next/link";

// Import reusable components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import FileUpload from "@/components/ui/FileUpload";
import Radio from "@/components/ui/Radio";
import Checkbox from "@/components/ui/Checkbox";

// Import hooks
import { useVisa, useUpdateVisa } from "@/hooks/Admin/useVisa";
import {
  useVisaFormCountries,
  useVisaFormTypes,
} from "@/hooks/Admin/useVisaFormServices";
import visaValidationSchema from "@/lib/validations/Admin/visaValidation";

function VisaUpdateForm({ visaId }) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch visa data
  const { data: visaData, isLoading: visaLoading } = useVisa(visaId);

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

  const { mutateAsync, isPending } = useUpdateVisa();

  // Get existing image URL directly from visaData
  const existingImage =
    visaData?.data?.image_url || visaData?.data?.image || null;
  useEffect(() => {
    if (visaData?.data) {
      const visa = visaData.data;

      const descriptionValue =
        visa.description !== null && visa.description !== undefined
          ? String(visa.description)
          : "";

      const notesValue =
        visa.notes !== null && visa.notes !== undefined
          ? String(visa.notes)
          : "";

      // Small delay to ensure form is mounted
      setTimeout(() => {
        reset({
          visa_title: visa.visa_title || "",
          country_id: String(visa.country?.id || visa.country_id || ""),
          visa_type_id: String(visa.visa_type?.id || visa.visa_type_id || ""),
          description: descriptionValue,
          notes: notesValue,
          visa_mode: visa.visa_mode || "electronic",
          entry_type: visa.entry_type || "single",
          processing_min_days:
            visa.processing?.min_days || visa.processing_min_days || 1,
          processing_max_days:
            visa.processing?.max_days || visa.processing_max_days || 7,
          validity_days: visa.validity?.days || visa.validity_days || 30,
          max_stay_days: visa.max_stay?.days || visa.max_stay_days || 30,
          max_stay_label: visa.max_stay?.label || visa.max_stay_label || "",
          base_fee: visa.fee?.amount || visa.base_fee || "",
          currency: visa.fee?.currency || visa.currency || "USD",
          is_active: visa.is_active === 1 || visa.is_active === true,
          requirements:
            visa.requirements?.map((req) => ({
              title: req.title || "",
              is_optional:
                req.is_optional === 1 || req.is_optional === true || false,
            })) || [],
          faqs:
            visa.faqs?.map((faq) => ({
              question: faq.question || "",
              answer: faq.answer || "",
            })) || [],
        });
      }, 100);
    }
  }, [visaData, reset]);
  // Handle image file change and preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove new image preview
  const removeImagePreview = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("_method", "PUT");

      // Basic fields
      formData.append("visa_title", data.visa_title);
      formData.append("country_id", data.country_id);
      formData.append("visa_type_id", data.visa_type_id);
      formData.append("description", data.description || "");
      formData.append("notes", data.notes || "");
      formData.append("visa_mode", data.visa_mode);
      formData.append("entry_type", data.entry_type);
      formData.append("processing_min_days", data.processing_min_days);
      formData.append("processing_max_days", data.processing_max_days);
      formData.append("validity_days", data.validity_days);
      formData.append("max_stay_days", data.max_stay_days);
      formData.append("max_stay_label", data.max_stay_label || "");
      formData.append("base_fee", data.base_fee);
      formData.append("currency", data.currency);
      formData.append("is_active", data.is_active ? "1" : "0");

      // Image (only if new file is selected)
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Requirements
      if (data.requirements && data.requirements.length > 0) {
        data.requirements.forEach((req, index) => {
          if (req.title && req.title.trim() !== "") {
            formData.append(`requirements[${index}][title]`, req.title);
            formData.append(
              `requirements[${index}][is_optional]`,
              req.is_optional ? "1" : "0",
            );
          }
        });
      }

      // FAQs
      if (data.faqs && data.faqs.length > 0) {
        data.faqs.forEach((faq, index) => {
          if (
            faq.question &&
            faq.question.trim() !== "" &&
            faq.answer &&
            faq.answer.trim() !== ""
          ) {
            formData.append(`faqs[${index}][question]`, faq.question);
            formData.append(`faqs[${index}][answer]`, faq.answer);
          }
        });
      }
      await mutateAsync({ id: visaId, data: formData });
      router.push("/admin/visa");
    } catch (error) {
      // Validation errors
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

  // Loading state
  if (visaLoading) {
    return (
      <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading visa data...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Update Visa</h1>
            <p className="text-gray-500 mt-1">
              Update visa details and information
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

              {/* Image Display and Upload */}
              <div className="space-y-4">
                {existingImage && !imagePreview && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Current Image
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={existingImage}
                        alt="Current visa"
                        className="w-48 h-48 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {imagePreview && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      New Image Preview
                    </label>
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="New visa preview"
                        className="w-48 h-48 object-cover rounded-xl border-2 border-blue-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={removeImagePreview}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <FileUpload
                  label={
                    existingImage
                      ? "Update Visa Image (Optional)"
                      : "Visa Image"
                  }
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  maxSize={2048}
                  onChange={handleImageChange}
                  error={errors.image?.message}
                  helpText={
                    existingImage
                      ? "Upload new image to replace current one (max 2MB)"
                      : "Upload visa image (max 2MB)"
                  }
                />
              </div>

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
            Update Visa
          </Button>
        </form>
      </div>
    </div>
  );
}

export default VisaUpdateForm;
