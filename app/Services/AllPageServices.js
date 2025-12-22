import UserInstance from "@/lib/userAxios";

export const getPageBlogServices = async (page = 1) => {
  const response = await UserInstance.get(`/page/blog/?page=${page}`);
  return response?.data;
};
