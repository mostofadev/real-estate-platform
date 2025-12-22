import adminInstance from "@/lib/axiosAdmin";

export const getAdminFeaturesServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/features?page=${page}`);
  return res.data.data;
};

export const singleAdminFeaturesServices = async (id) => {
  const res = await adminInstance.get(`/admin/features/${id}`);
  return res.data.data;
};

export const postAdminFeaturesServices = async (data) => {
  const res = await adminInstance.post("/admin/features", data);
  return res.data;
};

export const updateAdminFeaturesServices = async (id, data) => {
  const res = await adminInstance.put(`/admin/features/${id}`, data);
  return res.data;
};

export const deleteAdminFeaturesServices = async (id) => {
  const res = await adminInstance.delete(`/admin/features/${id}`);
  return res.data;
};
