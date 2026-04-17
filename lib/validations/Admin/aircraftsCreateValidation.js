import { z } from "zod";

export const aircraftsCreateValidation = z.object({
  model: z
    .string()
    .min(1, "Model is required")
    .max(255, "Model must be less than 255 characters"),

  manufacturer: z
    .string()
    .min(1, "Manufacturer is required")
    .max(255, "Manufacturer must be less than 255 characters"),

  capacity: z.coerce
    .number()
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1")
    .max(1000, "Capacity cannot exceed 1000"),


});
