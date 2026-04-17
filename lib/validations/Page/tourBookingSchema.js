import { z } from "zod";

const adultSchema = z.object({
  passenger_type: z.literal("adult"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  passport_no: z.string().min(1, "Passport number is required"),
  passport_issue_date: z.string().min(1, "Issue date is required"),
  passport_expiry: z.string().min(1, "Expiry date is required"),
  nationality_id: z.string().min(1, "Nationality is required"),
  email: z.string().email("Enter a valid email"),
  mobile_number: z.string().min(1, "Mobile number is required"),
});

const childSchema = z.object({
  passenger_type: z.enum(["child", "infant"]),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  passport_no: z.string().min(1, "Passport number is required"),
  passport_issue_date: z.string().min(1, "Issue date is required"),
  passport_expiry: z.string().min(1, "Expiry date is required"),
  nationality_id: z.string().min(1, "Nationality is required"),
});

export const tourBookingSchema = z.object({
  applicants: z.array(
    z.discriminatedUnion("passenger_type", [adultSchema, childSchema]),
  ),
  fareRules: z.boolean().refine((v) => v === true, {
    message: "You must agree to the fare rules",
  }),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the terms and conditions",
  }),
});
