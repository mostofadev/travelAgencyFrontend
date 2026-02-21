import { z } from "zod";

export const airportsCreateValidation = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(5, "Code must be at most 5 characters")
    .regex(/^[A-Z]{3,5}$/, "Code must be 3-5 uppercase letters (e.g., DSASA)"),

  name: z
    .string()
    .min(3, "Airport name must be at least 3 characters")
    .max(100, "Airport name must be at most 100 characters"),

  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name must be at most 100 characters"),

  country_id: z
    .number({
      required_error: "Country is required",
      invalid_type_error: "Country must be a number",
    })
    .int("Country ID must be an integer")
    .positive("Country ID must be a positive number"),

  terminal: z
    .string()
    .min(1, "Terminal is required")
    .max(10, "Terminal must be at most 10 characters")
    .regex(/^[A-Z]\d+$/, "Terminal must follow format like D1, T2"),

  latitude: z
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be at least -90")
    .max(90, "Latitude must be at most 90"),

  longitude: z
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
    })
    .min(-180, "Longitude must be at least -180")
    .max(180, "Longitude must be at most 180"),

  timezone: z
    .string()
    .max(50, "Timezone must be at most 50 characters")
    .optional()
    .nullable(),

  is_active: z
    .number({
      required_error: "Status is required",
      invalid_type_error: "Status must be a number",
    })
    .int()
    .refine((val) => val === 0 || val === 1, {
      message: "Status must be either 0 or 1",
    }),
});
