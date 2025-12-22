import UserInstance from "@/lib/userAxios"


export const getHomePageProperty =async () => {
    const response = await UserInstance.get('/property');
    return response.data;
}

export const getSinglePropertyDetails = async (id) => {
  const response = await UserInstance.get(`/property/${id}`);
  return response.data.data;
}

export const getRelatedHomePageProperty = async (id) => {
  const response = await UserInstance.get(`/property/${id}/related`);
  return response.data;
}

export const getTestimonialHomePage = async ()=> {
  const response = await UserInstance.get('/testimonial');
  return response.data.data;
}

export const getBlogHomePage = async ()=> {
  const response = await UserInstance.get('/blog');
  return response.data.data;
}

export const getCityHomePage = async ()=> {
  const response = await UserInstance.get('/city');
  return response.data.data;
}