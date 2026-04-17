import { adminApi } from "@/lib/api/axios"


export const AdminDashboardServices = ()=>{
    const res = adminApi.get('/admin/dashboard');
    return res;
}