import { z } from "zod";

export const aircraftsUpdateValidation = z.object({
  model: z
    .string()
    .min(1, "Model is required")
    .max(255, "Model must be less than 255 characters")
    .optional()
    .or(z.literal("")),

  manufacturer: z
    .string()
    .min(1, "Manufacturer is required")
    .max(255, "Manufacturer must be less than 255 characters")
    .optional()
    .or(z.literal("")),

  capacity: z.coerce
    .number()
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1")
    .max(1000, "Capacity cannot exceed 1000")
    .optional(),

//   is_active: z
//     .union([z.string(), z.boolean()])
//     .transform((val) => {
//       if (val === "true" || val === "1" || val === true) return "1";
//       return "0";
//     })
//     .optional(),
});