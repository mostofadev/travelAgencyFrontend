"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PassengerForm from "./PassengerForm";
import ContactForm from "./ContactForm";
import Checkbox from "@/components/ui/Checkbox";
import { visaApplicationSchema } from "@/lib/validations/Page/passengerSchema";
import { useVisaApplication } from "@/hooks/Page/useVisaApplication";
import Button from "@/components/ui/Button";

export default function VisaApplicationForm({
  adults,
  childCount,
  infants,
  visaId,
}) {
  const router = useRouter();
  const { submit, isLoading, error } = useVisaApplication();
  const [openIndex, setOpenIndex] = useState(0);

  const totalPassengers = [
    ...Array(adults).fill("adult"),
    ...Array(childCount).fill("child"),
    ...Array(infants).fill("infant"),
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(visaApplicationSchema),
    defaultValues: {
      passengers: totalPassengers.map((type) => ({
        type,
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        passport_type: "regular",
        passport_no: "",
        passport_expiry: "",
        nationality_id: "",
        profession: "",
        city: "",
        address: "",
        passport_file: null,
        passport_photo: null,
      })),
      contact: {
        email: "",
        phone_number: "",
      },
      fareRules: false,
      terms: false,
    },
  });

  const { fields } = useFieldArray({ control, name: "passengers" });

  const onSubmit = async (data) => {
    const today = new Date();
    const expectedArrival = new Date(today.setDate(today.getDate() + 30))
      .toISOString()
      .split("T")[0];

    const payload = {
      visa_id: visaId,
      expected_arrival: expectedArrival,
      adults,
      children: childCount,
      infants,
      terms_accepted: data.terms,
      contact: {
        email: data.contact.email,
        phone_number: data.contact.phone_number ?? "",
      },
      applicants: data.passengers.map((p) => ({
        first_name: p.first_name,
        last_name: p.last_name,
        gender: p.gender,
        date_of_birth: p.date_of_birth,
        passport_type: p.passport_type,
        passport_no: p.passport_no,
        passport_expiry: p.passport_expiry,
        nationality_id: p.nationality_id,
        profession: p.profession ?? "",
        city: p.city ?? "",
        address: p.address ?? "",
        passport_file:
          p.passport_file instanceof FileList
            ? p.passport_file[0]
            : p.passport_file,
        passport_photo:
          p.passport_photo instanceof FileList
            ? p.passport_photo[0]
            : p.passport_photo,
      })),
    };

    try {
      const response = await submit(payload);

      router.push(`/visa/checkout/${response.application_reference}`);
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto space-y-6 p-6"
    >
      {/* Passenger Forms */}
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-100 rounded-xl shadow bg-white overflow-hidden"
        >
          {/* Accordion Header */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <h2 className="font-semibold">
              Applicant {index + 1}{" "}
              <span className="text-gray-500 font-normal capitalize">
                ({field.type})
              </span>
            </h2>
            <span className="text-xl text-gray-400">
              {openIndex === index ? "▲" : "▼"}
            </span>
          </div>

          {/* Accordion Body */}
          {openIndex === index && (
            <div className="p-6">
              <PassengerForm
                index={index}
                field={field}
                register={register}
                errors={errors?.passengers?.[index]}
              />
            </div>
          )}
        </div>
      ))}

      {/* Contact Form */}
      <ContactForm register={register} errors={errors?.contact} />

      {/* API Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Checkboxes */}
      <div className="space-y-3">
        <div>
          <Checkbox
            label="I have read and understand the Fare Rules"
            {...register("fareRules")}
          />
          {errors?.fareRules && (
            <p className="text-red-500 text-xs mt-1">
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
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
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
