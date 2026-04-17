"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

// UI Components
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import FileUpload from "@/components/ui/FileUpload";
import Radio from "@/components/ui/Radio";
import Checkbox from "@/components/ui/Checkbox";

// Hooks & Utilities
import { useCreateVisa } from "@/hooks/Admin/useVisa";
import { useVisaFormCountries, useVisaFormTypes } from "@/hooks/Admin/useForm";
import visaValidationSchema from "@/lib/validations/Admin/visaValidation";
import { showCustomToast } from "@/lib/ShowCustomToast";

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  visa_title: "",
  country_id: "",
  destination_country_id: "",
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
};

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "BDT", label: "BDT - Bangladeshi Taka" },
  { value: "INR", label: "INR - Indian Rupee" },
];

const VISA_MODE_OPTIONS = [
  { value: "electronic", label: "Electronic", description: "E-Visa / Online application" },
  { value: "sticker",    label: "Sticker",    description: "Physical visa sticker" },
];

const ENTRY_TYPE_OPTIONS = [
  { value: "single",   label: "Single Entry",   description: "One-time entry only" },
  { value: "multiple", label: "Multiple Entry", description: "Multiple entries allowed" },
];

// Helpers 


const toInt = (val) => String(parseInt(val, 10));

/**
 * Builds a FormData object from validated form values + optional image file.
 */
function buildFormData(data, imageFile) {
  const fd = new FormData();

  // Scalar fields
  const scalars = {
    visa_title:              data.visa_title,
    country_id:              toInt(data.country_id),
    destination_country_id:  toInt(data.destination_country_id),
    visa_type_id:            toInt(data.visa_type_id),
    description:             data.description  ?? "",
    notes:                   data.notes        ?? "",
    visa_mode:               data.visa_mode,
    entry_type:              data.entry_type,
    processing_min_days:     data.processing_min_days,
    processing_max_days:     data.processing_max_days,
    validity_days:           data.validity_days,
    max_stay_days:           data.max_stay_days,
    max_stay_label:          data.max_stay_label ?? "",
    base_fee:                data.base_fee,
    currency:                data.currency,
    is_active:               data.is_active ? "1" : "0",
  };

  Object.entries(scalars).forEach(([key, val]) => fd.append(key, val));

  // Optional image
  if (imageFile) fd.append("image", imageFile);

  // Requirements
  data.requirements.forEach((req, i) => {
    fd.append(`requirements[${i}][title]`,       req.title);
    fd.append(`requirements[${i}][is_optional]`, req.is_optional ? "1" : "0");
  });

  // FAQs
  data.faqs.forEach((faq, i) => {
    fd.append(`faqs[${i}][question]`, faq.question);
    fd.append(`faqs[${i}][answer]`,   faq.answer);
  });

  return fd;
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, gradient, headerExtra, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-r ${gradient} px-6 py-4 border-b border-gray-100 flex items-center justify-between`}>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {headerExtra}
      </div>
      <div className="p-6 space-y-6">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VisaCreateForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);

  // Remote data
  const { data: countriesData, isLoading: countriesLoading } = useVisaFormCountries();
  const { data: visaTypesData,  isLoading: visaTypesLoading  } = useVisaFormTypes();

  // Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(visaValidationSchema),
    defaultValues: DEFAULT_VALUES,
  });

  // Field arrays
  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

  // Mutation
  const { mutate, isPending } = useCreateVisa();

  // ── Submit ──────────────────────────────────────────────────────────────────

  const onSubmit = (data) => {
    const formData = buildFormData(data, imageFile);

    mutate(formData, {
      onSuccess: () => {
        showCustomToast({ type: "success", message: "Visa created successfully!" });
        reset();
        setImageFile(null);
        router.push("/admin/visa");
      },
      onError: (error) => {
        const serverErrors = error?.response?.data?.errors;

        if (serverErrors) {
          Object.entries(serverErrors).forEach(([field, messages]) => {
            setError(field, { type: "server", message: messages[0] });
          });
          showCustomToast({ type: "error", message: "Please fix the errors below." });
        } else {
          showCustomToast({
            type: "error",
            message: error?.response?.data?.message ?? "Something went wrong. Please try again.",
          });
        }
      },
    });
  };

  // ── Derived options ─────────────────────────────────────────────────────────

  const countryOptions =
    countriesData?.data?.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  const visaTypeOptions =
    visaTypesData?.data?.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/visa"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Visas</span>
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">Create New Visa</h1>
        <p className="text-gray-500 mt-1">Add a new visa to the system with all details</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Basic Information ── */}
        <Section title="Basic Information" gradient="from-blue-50 to-indigo-50">
          <Input
            label="Visa Title"
            placeholder="e.g., Tourist Visa for Thailand"
            {...register("visa_title")}
            error={errors.visa_title?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Country"
              placeholder="Select country"
              options={countryOptions}
              disabled={countriesLoading}
              {...register("country_id")}
              error={errors.country_id?.message}
            />
            <Select
              label="Destination Country"
              placeholder="Select country"
              options={countryOptions}
              disabled={countriesLoading}
              {...register("destination_country_id")}
              error={errors.destination_country_id?.message}
            />
            <Select
              label="Visa Type"
              placeholder="Select visa type"
              options={visaTypeOptions}
              disabled={visaTypesLoading}
              {...register("visa_type_id")}
              error={errors.visa_type_id?.message}
            />
          </div>

          <FileUpload
            label="Visa Image"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            maxSize={2048}
            helpText="Upload visa image (max 2MB)"
            {...register("image")}
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            error={errors.image?.message}
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
        </Section>

        {/* ── Visa Details ── */}
        <Section title="Visa Details" gradient="from-green-50 to-teal-50">
          <Radio
            label="Visa Mode"
            options={VISA_MODE_OPTIONS}
            {...register("visa_mode")}
            error={errors.visa_mode?.message}
          />

          <Radio
            label="Entry Type"
            options={ENTRY_TYPE_OPTIONS}
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
        </Section>

        {/* ── Pricing ── */}
        <Section title="Pricing" gradient="from-purple-50 to-pink-50">
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
              options={CURRENCY_OPTIONS}
              {...register("currency")}
              error={errors.currency?.message}
            />
          </div>
        </Section>

        {/* ── Requirements ── */}
        <Section
          title="Requirements"
          gradient="from-orange-50 to-amber-50"
          headerExtra={
            <button
              type="button"
              onClick={() => appendRequirement({ title: "", is_optional: false })}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          }
        >
          {requirementFields.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No requirements added yet. Click &quot;Add&quot; to add requirements.
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
        </Section>

        {/* ── FAQs ── */}
        <Section
          title="FAQs"
          gradient="from-cyan-50 to-blue-50"
          headerExtra={
            <button
              type="button"
              onClick={() => appendFaq({ question: "", answer: "" })}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          }
        >
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
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700">FAQ #{index + 1}</h3>
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
        </Section>

        {/* ── Status ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <Checkbox
              label="Active Status"
              description="Enable this visa for booking"
              {...register("is_active")}
            />
          </div>
        </div>

        {/* ── Submit ── */}
        <Button
          type="submit"
          loading={isPending}
          disabled={isPending}
          size="lg"
          fullWidth
        >
          {isPending ? "Creating..." : "Create Visa"}
        </Button>
      </form>
    </div>
  );
}