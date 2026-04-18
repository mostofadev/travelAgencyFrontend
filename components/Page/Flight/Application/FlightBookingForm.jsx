"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import PassengerAccordion from "./PassengerAccordion";
import { useFlightBooking } from "@/hooks/Page/useFlightBooking";
import { flightBookingSchema } from "@/lib/validations/Page/flightBookingSchema";
import Button from "@/components/ui/Button";

export default function FlightBookingForm({
  flightClassId,
  adults,
  childrenCount,
  infants,
}) {
  const router = useRouter();
  const { submit, isLoading, error } = useFlightBooking();

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
    resolver: zodResolver(flightBookingSchema),
    defaultValues: {
      applicants: passengerTypes.map((type) => ({
        passenger_type: type,
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        nationality_id: "",
        ...(type === "adult" && {
          email: "",
          phone: "",
        }),
      })),
      fareRules: false,
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      flight_class_id: flightClassId,
      adults,
      children: childrenCount,
      infants,
      passengers: data.applicants.map((p) => ({
        passenger_type: p.passenger_type,
        first_name: p.first_name,
        last_name: p.last_name,
        gender: p.gender,
        date_of_birth: p.date_of_birth,
        nationality_id: Number(p.nationality_id) || null,
        ...(p.passenger_type === "adult" && {
          email: p.email || null,
          phone: p.phone || null,
        }),
      })),
    };

    try {
      const res = await submit(payload);
      const code = res?.booking_reference ?? res?.booking_code;

      const params = new URLSearchParams({
        flight_class_id: flightClassId,
        adults: adults,
        children: childrenCount,
        infants: infants,
      });

      router.push(`/flight/checkout/${code}?${params.toString()}`);
    } catch (e) {
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit, oninvalid)} className="space-y-3">
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

      {errors?.applicants?.root && (
        <p className="text-red-500 text-xs">{errors.applicants.root.message}</p>
      )}

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

      {/* Submit Button */}
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
