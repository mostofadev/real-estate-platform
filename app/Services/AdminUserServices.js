import adminInstance from "@/lib/axiosAdmin";

export const AdminGetAllUserServices = async (page = 1) => {
  const response = await adminInstance.get(`/admin/user?page=${page}`);
  return response.data;
};
