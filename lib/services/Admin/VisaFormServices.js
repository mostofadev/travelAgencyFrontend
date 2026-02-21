import { adminApi } from "@/lib/api/axios";

export const AllCountriesServices = async () => {
    const response = await adminApi.get('/admin/visa-form-data/countries');
    return response.data;
}

export const AllVisaTypesServices = async () => {
    const response = await adminApi.get('/admin/visa-form-data/visa-types');
    return response.data;
}