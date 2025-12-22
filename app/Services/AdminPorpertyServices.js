import adminInstance from "@/lib/axiosAdmin";

export const getAdminPropertyServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/properties?page=${page}`);
  return res.data.data;
};

export const singleAdminPropertyServices = async (id) => {
  const res = await adminInstance.get(`/admin/properties/${id}`);
  return res.data.data;
};

export const postAdminPropertyServices = async (data) => {
  const res = await adminInstance.post("/admin/properties", data);
  console.log("property post test", res);

  return res.data;
};

export const updateAdminPropertyServices = async (id, data) => {
  data.append("_method", "PUT");
  const res = await adminInstance.post(`/admin/properties/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteAdminPropertyServices = async (id) => {
  const res = await adminInstance.delete(`/admin/properties/${id}`);
  return res.data;
};
