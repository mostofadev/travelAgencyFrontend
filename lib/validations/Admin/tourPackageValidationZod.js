import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const itinerarySchema = z.object({
  day_number: z.coerce
    .number({ required_error: "Day number is required" })
    .int("Day number must be a whole number")
    .min(1, "Day number must be at least 1"),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .trim()
    .optional()
    .or(z.literal("")), 

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .trim()
    .optional()
    .or(z.literal("")), 

  accommodation: z
    .string()
    .max(200, "Accommodation cannot exceed 200 characters")
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),

  meals: z
    .string()
    .max(200, "Meals info cannot exceed 200 characters")
    .trim()
    .optional()
    .nullable()
    .or(z.literal("")),
}).refine(
  (data) => {
    if (data.title && data.title.trim().length > 0) {
      return data.title.trim().length >= 3;
    }
    return true;
  },
  {
    message: "Title must be at least 3 characters",
    path: ["title"],
  }
).refine(
  (data) => {
    if (data.description && data.description.trim().length > 0) {
      return data.description.trim().length >= 10;
    }
    return true;
  },
  {
    message: "Description must be at least 10 characters",
    path: ["description"],
  }
);

const baseTourPackageSchema = z.object({
  // Basic Info
  package_title: z
    .string({ required_error: "Tour Package title is required" })
    .min(3, "Tour Package title must be at least 3 characters")
    .max(255, "Tour Package title is too long")
    .trim(),

  package_type: z.enum(
    ["domestic", "international", "adventure", "religious"],
    {
      required_error: "Package type is required",
      invalid_type_error: "Invalid package type",
    }
  ),

  // Duration
  duration_days: z.coerce
    .number({ required_error: "Duration days is required" })
    .int("Duration days must be a whole number")
    .min(1, "Minimum 1 day required")
    .max(365, "Maximum 365 days allowed"),

  duration_nights: z.coerce
    .number({ required_error: "Duration nights is required" })
    .int("Duration nights must be a whole number")
    .min(0, "Nights cannot be negative")
    .max(365, "Maximum 365 nights allowed"),

  // Dates
  start_date: z
    .string({ required_error: "Start date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .refine(
      (date) => {
        const startDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return startDate >= today;
      },
      { message: "Start date cannot be in the past" }
    ),

  end_date: z
    .string({ required_error: "End date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),

  // Pricing
  prices: z.coerce
    .number({ required_error: "Price is required" })
    .min(0, "Price must be 0 or greater")
    .positive("Price must be greater than 0"),

  adult_price: z.coerce
    .number({ required_error: "Adult price is required" })
    .min(0, "Adult price cannot be negative")
    .positive("Adult price must be greater than 0"),

  child_price: z.coerce
    .number({ required_error: "Child price is required" })
    .min(0, "Child price cannot be negative"),

  currency: z
    .string({ required_error: "Currency is required" })
    .min(1, "Currency is required")
    .default("BDT"),

  // Location
  origin_country_id: z.coerce
    .number({ required_error: "Origin country is required" })
    .int("Origin country ID must be a whole number")
    .positive("Invalid origin country ID"),

  destination_country_id: z.coerce
    .number({ required_error: "Destination country is required" })
    .int("Destination country ID must be a whole number")
    .positive("Invalid destination country ID"),

  // Seats
  total_seats: z.coerce
    .number({ required_error: "Total seats is required" })
    .int("Total seats must be a whole number")
    .positive("Total seats must be greater than 0")
    .min(1, "At least 1 seat is required"),

  booked_seats: z.coerce
    .number()
    .int("Booked seats must be a whole number")
    .min(0, "Booked seats cannot be negative")
    .default(0),

  // Description & Details
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters long")
    .max(5000, "Description cannot exceed 5000 characters")
    .trim(),

  highlights: z
    .string({ required_error: "Highlights are required" })
    .min(5, "Highlights must be at least 5 characters")
    .max(1000, "Highlights cannot exceed 1000 characters")
    .trim(),

  inclusions: z
    .string({ required_error: "Inclusions are required" })
    .min(5, "Inclusions must be at least 5 characters")
    .max(1000, "Inclusions cannot exceed 1000 characters")
    .trim(),

  exclusions: z
    .string({ required_error: "Exclusions are required" })
    .min(5, "Exclusions must be at least 5 characters")
    .max(1000, "Exclusions cannot exceed 1000 characters")
    .trim(),

  cancellation_policy: z
    .string({ required_error: "Cancellation policy is required" })
    .min(10, "Cancellation policy must be at least 10 characters")
    .max(2000, "Cancellation policy cannot exceed 2000 characters")
    .trim(),

  // Status Flags
  status: z.boolean().default(true),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),

  itineraries: z.array(itinerarySchema).optional().default([]),
});

export const tourPackageCreateValidation = baseTourPackageSchema
  .extend({
    image: z
      .custom(
        (file) => file instanceof File,
        { message: "Image file is required" }
      )
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        { message: "File size must be less than 2MB" }
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        { message: "Only .jpg, .jpeg, .png, .webp files are accepted" }
      ),
  })
  .refine(
    (data) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      return data.duration_nights <= data.duration_days;
    },
    {
      message: "Nights cannot exceed days",
      path: ["duration_nights"],
    }
  )
  .refine(
    (data) => {
      return data.booked_seats <= data.total_seats;
    },
    {
      message: "Booked seats cannot exceed total seats",
      path: ["booked_seats"],
    }
  )
  .refine(
    (data) => {
      return data.child_price <= data.adult_price;
    },
    {
      message: "Child price cannot exceed adult price",
      path: ["child_price"],
    }
  )
  .refine(
    (data) => {
      return data.origin_country_id !== data.destination_country_id;
    },
    {
      message: "Origin and destination countries must be different",
      path: ["destination_country_id"],
    }
  );

export const tourPackageUpdateValidation = baseTourPackageSchema
  .extend({
    image: z
      .custom(
        (file) => {
          if (!file) return true;
          return file instanceof File;
        },
        { message: "Invalid file format" }
      )
      .refine(
        (file) => {
          if (!file) return true;
          return file.size <= MAX_FILE_SIZE;
        },
        { message: "File size must be less than 2MB" }
      )
      .refine(
        (file) => {
          if (!file) return true;
          return ACCEPTED_IMAGE_TYPES.includes(file.type);
        },
        { message: "Only .jpg, .jpeg, .png, .webp files are accepted" }
      )
      .optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      return data.duration_nights <= data.duration_days;
    },
    {
      message: "Nights cannot exceed days",
      path: ["duration_nights"],
    }
  )
  .refine(
    (data) => {
      return data.booked_seats <= data.total_seats;
    },
    {
      message: "Booked seats cannot exceed total seats",
      path: ["booked_seats"],
    }
  )
  .refine(
    (data) => {
      return data.child_price <= data.adult_price;
    },
    {
      message: "Child price cannot exceed adult price",
      path: ["child_price"],
    }
  )
  .refine(
    (data) => {
      return data.origin_country_id !== data.destination_country_id;
    },
    {
      message: "Origin and destination countries must be different",
      path: ["destination_country_id"],
    }
  );

export const tourPackageValidation = tourPackageCreateValidation;