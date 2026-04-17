import userApi from "@/lib/api/axios";

export const homeTourServices = () => {
  const res = userApi.get("/home/tour");
  return res;
};
