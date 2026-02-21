import { z } from "zod";

// Itinerary schema (optional for update)
const itinerarySchema = z.object({
  day_number: z.number().min(1, "Day number must be at least 1"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  accommodation: z.string().optional().nullable(),
  meals: z.string().optional().nullable(),
});

// Main tour package update validation
export const tourPackageUpdateValidation = z.object({
  package_title: z
    .string()
    .min(3, "Package title must be at least 3 characters")
    .max(255, "Package title must not exceed 255 characters"),

  package_type: z.enum(["domestic", "international", "adventure", "religious"], {
    errorMap: () => ({ message: "Please select a valid package type" }),
  }),

  duration_days: z
    .number()
    .min(1, "Duration must be at least 1 day")
    .or(z.string().transform(Number)),

  duration_nights: z
    .number()
    .min(0, "Duration nights cannot be negative")
    .or(z.string().transform(Number)),

  start_date: z.string().min(1, "Start date is required"),

  end_date: z.string().min(1, "End date is required"),

  prices: z
    .number()
    .min(0, "Base price must be positive")
    .or(z.string().transform(Number)),

  adult_price: z
    .number()
    .min(0, "Adult price must be positive")
    .or(z.string().transform(Number)),

  child_price: z
    .number()
    .min(0, "Child price must be positive")
    .or(z.string().transform(Number)),

  currency: z.string().min(1, "Currency is required"),

  origin_country_id: z.string().min(1, "Origin country is required"),

  destination_country_id: z.string().min(1, "Destination country is required"),

  total_seats: z
    .number()
    .min(1, "Total seats must be at least 1")
    .or(z.string().transform(Number)),

  booked_seats: z
    .number()
    .min(0, "Booked seats cannot be negative")
    .or(z.string().transform(Number)),

  description: z.string().min(10, "Description must be at least 10 characters"),

  highlights: z.string().min(5, "Highlights must be at least 5 characters"),

  inclusions: z.string().min(5, "Inclusions must be at least 5 characters"),

  exclusions: z.string().min(5, "Exclusions must be at least 5 characters"),

  cancellation_policy: z
    .string()
    .min(10, "Cancellation policy must be at least 10 characters"),

  status: z.boolean().default(true),

  is_active: z.boolean().default(true),

  is_featured: z.boolean().default(false),

  image: z.any().optional().nullable(),

  itineraries: z.array(itinerarySchema).optional().default([]),
});