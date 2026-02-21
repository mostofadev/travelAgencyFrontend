import { z } from "zod";

export const FlightRouteCreateValidation = z
  .object({
    from_airport_id: z.string().min(1, "From airport is required"),

    to_airport_id: z.string().min(1, "To airport is required"),

    distance_km: z
      .string()
      .min(1, "Distance is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Distance must be a positive number",
      }),
  })
  .refine((data) => data.from_airport_id !== data.to_airport_id, {
    message: "From and To airport cannot be the same",
    path: ["to_airport_id"],
  });


  
export const flightRouteUpdateValidation = z
  .object({
    from_airport_id: z
      .string()
      .min(1, "From airport is required")
      .optional()
      .or(z.literal("")),

    to_airport_id: z
      .string()
      .min(1, "To airport is required")
      .optional()
      .or(z.literal("")),

    distance_km: z
      .string()
      .min(1, "Distance is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Distance must be a positive number",
      })
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      !data.from_airport_id ||
      !data.to_airport_id ||
      data.from_airport_id !== data.to_airport_id,
    {
      message: "From and To airport cannot be the same",
      path: ["to_airport_id"],
    }
  );