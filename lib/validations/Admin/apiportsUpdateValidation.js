import { z } from "zod";

export const airportsUpdateValidation = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .max(10, "Code must be at most 5 characters")
  
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  country_id: z
    .string()
    .min(1, "Country is required")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters")
    .optional()
    .or(z.literal("")),

  terminal: z
    .string()
    .min(1, "Terminal is required")
    .max(10, "Terminal must be at most 10 characters")
    .optional()
    .or(z.literal("")),

  timezone: z
    .string()
    .max(50, "Timezone must be at most 50 characters")
    .optional()
    .or(z.literal("")),

  latitude: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) =>
        !val ||
        (!isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90),
      { message: "Latitude must be between -90 and 90" },
    ),

  longitude: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) =>
        !val ||
        (!isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180),
      { message: "Longitude must be between -180 and 180" },
    ),
});
