import adminInstance from "@/lib/axiosAdmin";

export const getAdminPropertyTypeServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/property-type?page=${page}`);
  return res.data.data;
};

export const singleAdminPropertyTypeServices = async (id) => {
  const res = await adminInstance.get(`/admin/property-type/${id}`);
  return res.data.data;
};

export const postAdminPropertyTypeServices = async (data) => {
  const res = await adminInstance.post("/admin/property-type", data);
  return res.data;
};

export const updateAdminPropertyTypeServices = async (id, data) => {
  const res = await adminInstance.put(`/admin/property-type/${id}`, data);
  return res.data;
};

export const deleteAdminPropertyTypeServices = async (id) => {
  const res = await adminInstance.delete(`/admin/property-type/${id}`);
  return res.data;
};
