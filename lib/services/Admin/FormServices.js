import { userApi, adminApi } from "@/lib/api/axios";

export const AllCountriesServices = async () => {
  const response = await userApi.get("/visa-form-data/countries");
  return response.data;
};

export const AllVisaTypesServices = async () => {
  const response = await userApi.get("/visa-form-data/visa-types");
  return response.data;
};

export const AllAircraftsServices = async () => {
  const response = await adminApi.get("/admin/aircraft/from");
  return response.data;
};

export const AllRouteServices = async () => {
  const response = await adminApi.get("/admin/route/from");

  return response.data;
};
