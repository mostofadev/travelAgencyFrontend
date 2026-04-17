"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import PassengerAccordion from "./PassengerAccordion";
import { useTourBooking } from "@/hooks/Page/useTourBooking";
import { tourBookingSchema } from "@/lib/validations/Page/tourBookingSchema";
import Button from "@/components/ui/Button";

export default function TourBookingForm({
  tourId,
  adults,
  childrenCount,
  infants,
}) {
  const router = useRouter();
  const { submit, isLoading, error } = useTourBooking();

  const passengerTypes = [
    ...Array(adults).fill("adult"),
    ...Array(childrenCount).fill("child"),
    ...Array(infants).fill("infant"),
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tourBookingSchema),
    defaultValues: {
      applicants: passengerTypes.map((type) => ({
        passenger_type: type,
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        passport_no: "",
        passport_issue_date: "",
        passport_expiry: "",
        nationality_id: "",
        ...(type === "adult" && {
          email: "",
          mobile_number: "",
          emergency_contact: "",
          emergency_contact_relation: "",
          special_needs: "",
        }),
      })),
      fareRules: false,
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      tour_id: tourId,
      adults: Number(adults),
      children: Number(childrenCount),
      infants: Number(infants),
      applicants: data.applicants.map((p) => ({
        passenger_type: p.passenger_type,
        first_name: p.first_name,
        last_name: p.last_name,
        gender: p.gender,
        date_of_birth: p.date_of_birth,
        passport_no: p.passport_no,
        passport_issue_date: p.passport_issue_date,
        passport_expiry: p.passport_expiry,
        nationality_id: Number(p.nationality_id) || null,
        ...(p.passenger_type === "adult" && {
          email: p.email,
          mobile_number: p.mobile_number,
        }),
      })),
    };

    console.log("✅ Payload being sent:", JSON.stringify(payload, null, 2));

    try {
      const res = await submit(payload);
      router.push(`/tour/checkout/${res.booking_code}`);
    } catch {
      // error is handled by useTourBooking hook — shown in UI
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {/* Passenger Accordions */}
      {passengerTypes.map((type, index) => (
        <PassengerAccordion
          key={index}
          index={index}
          passengerType={type}
          isOpenDefault={index === 0}
          register={register}
          errors={errors?.applicants?.[index] ?? {}}
        />
      ))}

      {/* API Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Terms & Conditions */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 space-y-2">
        <div>
          <Checkbox
            label="I have read and understand the Fare Rules"
            {...register("fareRules")}
          />
          {errors?.fareRules && (
            <p className="text-red-500 text-xs mt-1 ml-6">
              {errors.fareRules.message}
            </p>
          )}
        </div>
        <div>
          <Checkbox
            label="I have read and agree to the Terms and Conditions"
            {...register("terms")}
          />
          {errors?.terms && (
            <p className="text-red-500 text-xs mt-1 ml-6">
              {errors.terms.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        Confirm Booking
      </Button>
    </form>
  );
}
