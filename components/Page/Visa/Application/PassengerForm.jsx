import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useVisaFormCountries } from "@/hooks/Admin/useForm";

const LOADING_OPTION = [{ value: "", label: "Loading...", disabled: true }];

const ALL_COUNTRIES = { value: "", label: "Select Nationality" };

export default function PassengerForm({ index, field, register, errors }) {
  const { data: countriesData, isLoading: countriesLoading } =
    useVisaFormCountries();

  const countryOptions = countriesLoading
    ? LOADING_OPTION
    : [
        ALL_COUNTRIES,
        ...(countriesData?.data ?? []).map(({ id, name }) => ({
          value: String(id),
          label: name,
        })),
      ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const passportTypeOptions = [
    { value: "regular", label: "Regular" },
    { value: "official", label: "Official" },
    { value: "diplomatic", label: "Diplomatic" },
    { value: "service", label: "Service" },
    { value: "emergency", label: "Emergency" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* First Name */}
        <div>
          <Input
            label="First Name"
            placeholder="First Name"
            error={errors?.passengers?.[index]?.first_name?.message}
            {...register(`passengers.${index}.first_name`, {
              required: "First name is required",
            })}
          />
        </div>

        {/* Last Name */}
        <div>
          <Input
            label="Last Name"
            placeholder="Last Name"
            error={errors?.passengers?.[index]?.last_name?.message}
            {...register(`passengers.${index}.last_name`, {
              required: "Last name is required",
            })}
          />
        </div>

        {/* Gender */}
        <div>
          <Select
            label="Gender"
            placeholder="Select Gender"
            options={genderOptions}
            error={errors?.passengers?.[index]?.gender?.message}
            {...register(`passengers.${index}.gender`, {
              required: "Gender is required",
            })}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <Input
            label="Date of Birth"
            type="date"
            error={errors?.passengers?.[index]?.date_of_birth?.message}
            {...register(`passengers.${index}.date_of_birth`, {
              required: "Date of birth is required",
            })}
          />
        </div>

        {/* Passport Type */}
        <div>
          <Select
            label="Passport Type"
            placeholder="Select Passport Type"
            options={passportTypeOptions}
            error={errors?.passengers?.[index]?.passport_type?.message}
            {...register(`passengers.${index}.passport_type`, {
              required: "Passport type is required",
            })}
          />
        </div>

        {/* Passport Number */}
        <div>
          <Input
            label="Passport Number"
            placeholder="Passport Number"
            error={errors?.passengers?.[index]?.passport_no?.message}
            {...register(`passengers.${index}.passport_no`, {
              required: "Passport number is required",
            })}
          />
        </div>

        {/* Passport Expiry */}
        <div>
          <Input
            label="Passport Expiry"
            type="date"
            error={errors?.passengers?.[index]?.passport_expiry?.message}
            {...register(`passengers.${index}.passport_expiry`, {
              required: "Passport expiry is required",
            })}
          />
        </div>

        {/* Nationality */}
        <div>
          <Select
            label="Nationality"
            placeholder="Select Nationality"
            options={countryOptions}
            error={errors?.passengers?.[index]?.nationality_id?.message}
            {...register(`passengers.${index}.nationality_id`, {
              required: "Nationality is required",
            })}
          />
        </div>

        {/* Profession */}
        <div>
          <Input
            label="Profession"
            placeholder="Profession (Optional)"
            {...register(`passengers.${index}.profession`)}
          />
        </div>

        {/* City */}
        <div>
          <Input
            label="City"
            placeholder="City (Optional)"
            {...register(`passengers.${index}.city`)}
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-3">
          <Input
            label="Address"
            placeholder="Address (Optional)"
            {...register(`passengers.${index}.address`)}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="p-4 border border-gray-100 rounded-lg bg-gray-50 space-y-4">
        <h4 className="font-semibold text-sm text-gray-700">
          Required Documents
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Passport Scan"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            error={errors?.passengers?.[index]?.passport_file?.message}
            {...register(`passengers.${index}.passport_file`)}
          />

          <Input
            label="Passport Size Photo"
            type="file"
            accept=".jpg,.jpeg,.png"
            error={errors?.passengers?.[index]?.passport_photo?.message}
            {...register(`passengers.${index}.passport_photo`)}
          />
        </div>
      </div>

      <input
        type="hidden"
        {...register(`passengers.${index}.type`)}
        defaultValue={field.type}
      />
    </div>
  );
}
