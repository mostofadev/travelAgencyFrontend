import { z } from "zod";

const fileRequired = (message) =>
  z.any().refine(
    (file) => {
      if (file instanceof FileList) return file.length > 0;
      return file instanceof File;
    },
    { message },
  );

const passengerSchema = z.object({
  type: z.string(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  passport_type: z.string().min(1, "Passport type is required"),
  passport_no: z.string().min(1, "Passport number is required"),
  passport_expiry: z.string().min(1, "Passport expiry is required"),
  nationality_id: z.string().min(1, "Nationality is required"),
  profession: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  passport_file: fileRequired("Passport scan is required"),
  passport_photo: fileRequired("Passport size photo is required"),
});

export const visaApplicationSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
  contact: z.object({
    email: z.string().email("Valid email is required"),
    phone_number: z.string().optional(),
  }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to Terms & Conditions" }),
  }),
  fareRules: z.literal(true, {
    errorMap: () => ({ message: "You must agree to Fare Rules" }),
  }),
});
