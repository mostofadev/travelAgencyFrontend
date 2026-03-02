import { adminApi } from "@/lib/api/axios";

export const AllCountriesServices = async () => {
  const response = await adminApi.get("/admin/visa-form-data/countries");
  return response.data;
};

export const AllVisaTypesServices = async () => {
  const response = await adminApi.get("/admin/visa-form-data/visa-types");
  return response.data;
};

export const AllAircraftsServices = async () => {
  const response = await adminApi.get("/admin/aircraft/from");
  return response.data
};

export const AllRouteServices = async () => {
  const response = await adminApi.get("/admin/route/from");
  console.log("services route form", response);

  return response.data;
};
