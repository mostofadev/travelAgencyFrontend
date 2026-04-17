// lib/validations/Page/flightBookingSchema.js
import { z } from "zod";

const passengerSchema = z.object({
  passenger_type: z.enum(["adult", "child", "infant"]),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  nationality_id: z
    .string()
    .min(1, "Nationality is required")
    .or(z.number().min(1, "Nationality is required")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

export const flightBookingSchema = z.object({
  applicants: z.array(passengerSchema).min(1), // ✅ passengers → applicants
  fareRules: z.literal(true, {
    errorMap: () => ({ message: "You must accept the fare rules" }),
  }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});
