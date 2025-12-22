import adminInstance from "@/lib/axiosAdmin";

export const getAdminCategoryServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/category?page=${page}`);
  return res.data.data;
};

export const singleAdminCategoryServices = async (id) => {
  const res = await adminInstance.get(`/admin/category/${id}`);
  return res.data.data;
};

export const postAdminCategoryServices = async (data) => {
  const res = await adminInstance.post("/admin/category", data);
  return res.data;
};

export const updateAdminCategoryServices = async (id, data) => {
  const res = await adminInstance.put(`/admin/category/${id}`, data);
  return res.data;
};

export const deleteAdminCategoryServices = async (id) => {
  const res = await adminInstance.delete(`/admin/category/${id}`);
  return res.data;
};
