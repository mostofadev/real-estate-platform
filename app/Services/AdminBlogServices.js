import adminInstance from "@/lib/axiosAdmin";

export const getAdminBlogServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/blog/?page=${page}`);
  return res.data;
};

export const postAdminBlogServices = async (data) => {
  const res = await adminInstance.post("/admin/blog", data);
  return res.data;
};

export const singleAdminBlogServices = async (id) => {
  const res = await adminInstance.get(`/admin/blog/${id}`);
  console.log('single blog update',res);
  
  return res;
};

export const updateAdminBlogServices = async (id, data) => {
  const res = await adminInstance.put(`/admin/blog/${id}`, data);
  console.log('blog update services',res);
  
  return res.data;
};

export const deleteAdminBlogServices = async (id) => {
  const res = await adminInstance.delete(`/admin/blog/${id}`);
  console.log(res);
  
  return res.data;
};
