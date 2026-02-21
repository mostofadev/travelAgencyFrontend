import { z } from "zod";

// File validation helper
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Requirement schema
const requirementSchema = z.object({
  title: z.string().optional(),
  is_optional: z.boolean().default(false),
});

// FAQ schemaconst 
const faqSchema = z.object({
  question: z.string().min(1, "FAQ question is required").optional(),
  answer: z.string().min(1, "FAQ answer is required").optional(),
});


// Main visa validation schema
export const visaValidationSchema = z
  .object({
    // Basic Information
    visa_title: z
      .string()
      .min(1, "Visa title is required")
      .max(255, "Visa title is too long"),

    visa_code: z
      .string()
      .regex(
        /^[A-Z0-9\-]*$/,
        "Only uppercase letters, numbers, and hyphens allowed",
      )
      .max(255, "Visa code is too long")
      .optional()
      .or(z.literal("")),

    country_id: z.string().min(1, "Country is required").or(z.number()),

    visa_type_id: z.string().min(1, "Visa type is required").or(z.number()),

    image: z
      .any()
      .optional()
      .refine((file) => {
        if (!file || file.length === 0) return true;
        return file[0]?.size <= MAX_FILE_SIZE;
      }, "Image size must not exceed 2MB")
      .refine((file) => {
        if (!file || file.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported"),

    description: z.string().optional().or(z.literal("")),

    notes: z.string().optional().or(z.literal("")),

    // Visa Details
    visa_mode: z.enum(["electronic", "sticker"], {
      required_error: "Visa mode is required",
    }),

    entry_type: z.enum(["single", "multiple"], {
      required_error: "Entry type is required",
    }),

    processing_min_days: z
      .number({
        required_error: "Minimum processing days is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Must be at least 1 day")
      .int("Must be a whole number"),

    processing_max_days: z
      .number({
        required_error: "Maximum processing days is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Must be at least 1 day")
      .int("Must be a whole number"),

    validity_days: z
      .number({
        required_error: "Validity days is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Must be at least 1 day")
      .int("Must be a whole number"),

    max_stay_days: z
      .number({
        required_error: "Max stay days is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Must be at least 1 day")
      .int("Must be a whole number"),

    max_stay_label: z
      .string()
      .max(255, "Label is too long")
      .optional()
      .or(z.literal("")),

    // Pricing
    base_fee: z
      .number({
        required_error: "Base fee is required",
        invalid_type_error: "Must be a number",
      })
      .min(0, "Cannot be negative")
      .max(9999999.99, "Amount too large"),

    currency: z
      .string()
      .length(3, "Currency code must be 3 characters")
      .regex(/^[A-Z]{3}$/, "Currency must be uppercase")
      .default("USD"),

    // Status
    is_active: z.boolean().default(true),

    // Dynamic Arrays
    requirements: z
      .array(requirementSchema)
      .optional()
      .default([{ title: "", is_optional: false }]),

    faqs: z
      .array(faqSchema)
      .optional()
      .default([{ question: "", answer: "" }]),
  })
  .refine((data) => data.processing_min_days <= data.processing_max_days, {
    message:
      "Minimum processing days must be less than or equal to maximum processing days",
    path: ["processing_min_days"],
  })
  .refine((data) => data.max_stay_days <= data.validity_days, {
    message: "Max stay days cannot exceed validity days",
    path: ["max_stay_days"],
  });

// Export type for TypeScript (optional)
export default visaValidationSchema;
