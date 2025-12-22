import adminInstance from "@/lib/axiosAdmin";

export const getAdminTestimonialServices = async (page = 1) => {
  const res = await adminInstance.get(`/admin/testimonial/?page=${page}`);
  return res.data;
};

export const postAdminTestimonialServices = async (data) => {
  const res = await adminInstance.post("/admin/testimonial", data);
  console.log('testimonial create',res);
  return res.data;
};

export const singleAdminTestimonialServices = async (id) => {
  console.log('servoces id ',id);
  
  const res = await adminInstance.get(`/admin/testimonial/${id}`);
  console.log(res);
  
  return res.data.data;
};

export const updateAdminTestimonialServices = async (id, data) => {
  console.log('testimonial update  id', id.id);
  const res = await adminInstance.put(`/admin/testimonial/${id}`, data);
  console.log('testimonial update error', res);
  
  return res.data;
};

export const deleteAdminTestimonialServices = async (id) => {
  const res = await adminInstance.delete(`/admin/testimonial/${id}`);
  
  return res.data;
};
