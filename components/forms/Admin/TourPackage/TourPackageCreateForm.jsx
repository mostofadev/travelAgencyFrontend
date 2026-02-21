"use client";
import { useState } from "react"; // ✅ useEffect সরানো হয়েছে
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import FileUpload from "@/components/ui/FileUpload";
import { useVisaFormCountries } from "@/hooks/Admin/useVisaFormServices";
import { tourPackageCreateValidation } from "@/lib/validations/Admin/tourPackageValidationZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ItineraryFields from "./ItineraryFields";
import { useCreateTourPackage } from "@/hooks/Admin/useTourPackage";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";

function TourPackageCreateForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);

  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();
  const { mutate, isPending } = useCreateTourPackage();

  const [itineraries, setItineraries] = useState([]); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(tourPackageCreateValidation),
    defaultValues: {
      duration_days: 1,
      duration_nights: 0,
      booked_seats: 0,
      status: true,
      is_active: true,
      is_featured: false,
      currency: "BDT",
      itineraries: [],
    },
  });

  const packageType = [
    { value: "domestic", label: "Domestic" },
    { value: "international", label: "International" },
    { value: "adventure", label: "Adventure" },
    { value: "religious", label: "Religious" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "BDT", label: "BDT - Bangladeshi Taka" },
    { value: "INR", label: "INR - Indian Rupee" },
  ];

  const countryOptions =
    countriesData?.data?.map((country) => ({
      value: String(country.id),
      label: country.name,
    })) || [];

  

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

      // Boolean fields
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

      // Itineraries - only send if there are any
      if (data.itineraries && data.itineraries.length > 0) {
        const validItineraries = data.itineraries.filter(
          (itinerary) => itinerary.title && itinerary.description
        );

        if (validItineraries.length > 0) {
          validItineraries.forEach((itinerary, index) => {
            formData.append(`itineraries[${index}][day_number]`, itinerary.day_number);
            formData.append(`itineraries[${index}][title]`, itinerary.title || "");
            formData.append(`itineraries[${index}][description]`, itinerary.description || "");
            formData.append(`itineraries[${index}][accommodation]`, itinerary.accommodation || "");
            formData.append(`itineraries[${index}][meals]`, itinerary.meals || "");
          });
        }
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
          router.push("/admin/tour-package");
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
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/tour-packages"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Tour Packages</span>
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Tour Package
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new tour package to the system with all details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <Input
              label="Tour Package Title *"
              placeholder="e.g., Thailand Premium Tour 2025"
              {...register("package_title")}
              error={errors.package_title?.message}
            />

            <Select
              label="Package Type *"
              placeholder="Select package type"
              options={packageType}
              {...register("package_type")}
              error={errors.package_type?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Duration (Days) *"
                placeholder="e.g., 5"
                {...register("duration_days")}
                error={errors.duration_days?.message}
              />
              <Input
                type="number"
                label="Duration (Nights) *"
                placeholder="e.g., 4"
                {...register("duration_nights")}
                error={errors.duration_nights?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="date"
                label="Start Date *"
                {...register("start_date")}
                error={errors.start_date?.message}
              />
              <Input
                type="date"
                label="End Date *"
                {...register("end_date")}
                error={errors.end_date?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Base Price *"
                placeholder="e.g., 50000"
                {...register("prices")}
                error={errors.prices?.message}
              />
              <Input
                type="number"
                label="Adult Price *"
                placeholder="e.g., 50000"
                {...register("adult_price")}
                error={errors.adult_price?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Child Price *"
                placeholder="e.g., 25000"
                {...register("child_price")}
                error={errors.child_price?.message}
              />
              <Select
                label="Currency *"
                options={currencyOptions}
                {...register("currency")}
                error={errors.currency?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Origin Country *"
                placeholder="Select origin country"
                options={countryOptions}
                {...register("origin_country_id")}
                error={errors.origin_country_id?.message}
                disabled={countriesLoading}
              />
              <Select
                label="Destination Country *"
                placeholder="Select destination country"
                options={countryOptions}
                {...register("destination_country_id")}
                error={errors.destination_country_id?.message}
                disabled={countriesLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Total Seats *"
                placeholder="e.g., 20"
                {...register("total_seats")}
                error={errors.total_seats?.message}
              />
              <Input
                type="number"
                label="Booked Seats"
                placeholder="e.g., 0"
                {...register("booked_seats")}
                error={errors.booked_seats?.message}
              />
            </div>

            <div>
              <FileUpload
                label="Package Image *"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                maxSize={2048}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                    setValue("image", e.target.files[0], {
                      shouldValidate: true,
                    });
                  }
                }}
                error={errors.image?.message}
                helpText="Upload package image (max 2MB, JPG/PNG/WEBP)"
              />
              {imageFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Selected: {imageFile.name}
                </p>
              )}
            </div>

            <Textarea
              label="Description *"
              rows={4}
              placeholder="Enter detailed package description..."
              {...register("description")}
              error={errors.description?.message}
            />

            <Textarea
              label="Highlights *"
              rows={3}
              placeholder="Enter package highlights..."
              {...register("highlights")}
              error={errors.highlights?.message}
            />

            <Textarea
              label="Inclusions *"
              rows={3}
              placeholder="What's included in the package..."
              {...register("inclusions")}
              error={errors.inclusions?.message}
            />

            <Textarea
              label="Exclusions *"
              rows={3}
              placeholder="What's not included..."
              {...register("exclusions")}
              error={errors.exclusions?.message}
            />

            <Textarea
              label="Cancellation Policy *"
              rows={4}
              placeholder="Enter cancellation policy..."
              {...register("cancellation_policy")}
              error={errors.cancellation_policy?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Checkbox label="Status" {...register("status")} />
              <Checkbox label="Active" {...register("is_active")} />
              <Checkbox label="Featured" {...register("is_featured")} />
            </div>
          </div>
        </div>

        {/* Itineraries Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Day-wise Itinerary (Optional)
            </h2>
            <p className="text-sm text-gray-600 mt-1">
             
              {itineraries.length > 0
                ? `${itineraries.length} day${itineraries.length > 1 ? "s" : ""} added`
                : "Click 'Add Day' to create itinerary"}
            </p>
          </div>

          <div className="p-6">
            <ItineraryFields
              itineraries={itineraries}
              setItineraries={setItineraries}
              errors={errors}
              setValue={setValue}
            />
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
          <Button type="submit" size="lg" loading={isPending} disabled={isPending}>
            {isPending ? "Creating..." : "Create Tour Package"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TourPackageCreateForm;