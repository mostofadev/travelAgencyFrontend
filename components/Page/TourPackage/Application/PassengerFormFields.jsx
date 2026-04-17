"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useVisaFormCountries } from "@/hooks/Admin/useForm";

const LOADING_OPTION = [{ value: "", label: "Loading..." }];
const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function PassengerFormFields({
  index,
  passengerType,
  register,
  errors,
}) {
  const isAdult = passengerType === "adult";
  const p = `applicants.${index}`;

  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();

  const countryOptions = countriesLoading
    ? LOADING_OPTION
    : [
        { value: "", label: "Select nationality" },
        ...(countriesData?.data ?? []).map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
      ];

  return (
    <div className="space-y-5">
      {/* ── Personal Information ── */}
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Personal information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="First name"
            placeholder="First name"
            error={errors?.first_name?.message}
            {...register(`${p}.first_name`)}
          />
          <Input
            label="Last name"
            placeholder="Last name"
            error={errors?.last_name?.message}
            {...register(`${p}.last_name`)}
          />
          <Select
            label="Gender"
            options={GENDER_OPTIONS}
            error={errors?.gender?.message}
            {...register(`${p}.gender`)}
          />
          <Input
            label="Date of birth"
            type="date"
            error={errors?.date_of_birth?.message}
            {...register(`${p}.date_of_birth`)}
          />
          <Select
            label="Nationality"
            options={countryOptions}
            error={errors?.nationality_id?.message}
            {...register(`${p}.nationality_id`)}
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* ── Passport Information ── */}
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Passport information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Passport number"
            placeholder="e.g. A12345678"
            error={errors?.passport_no?.message}
            {...register(`${p}.passport_no`)}
          />
          <Input
            label="Issue date"
            type="date"
            error={errors?.passport_issue_date?.message}
            {...register(`${p}.passport_issue_date`)}
          />
          <Input
            label="Expiry date"
            type="date"
            error={errors?.passport_expiry?.message}
            {...register(`${p}.passport_expiry`)}
          />
        </div>
      </div>

      {/* ── Contact & Emergency (Adult only) ── */}
      {isAdult && (
        <>
          <hr className="border-gray-100" />
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-3">
              Contact & emergency information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                error={errors?.email?.message}
                {...register(`${p}.email`)}
              />
              <Input
                label="Mobile number"
                type="number"
                placeholder="01XXXXXXXXX"
                error={errors?.mobile_number?.message}
                {...register(`${p}.mobile_number`)}
              />
            </div>
           
          </div>
        </>
      )}
    </div>
  );
}
