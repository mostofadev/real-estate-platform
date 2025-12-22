import UserInstance from "@/lib/userAxios";

export const getPropertyBookingServices =async (page = 1) => {
  const response =await UserInstance.get(`/user/request/?page=${page}`);
  return response.data;
};
export const postPropertyBookingServices = async (data) => {
  const response = await UserInstance.post("/user/request", data);
  console.log(response);
  
  return response.data;
};

export const deletePropertyBookingServices = (id) => {
  const response = UserInstance.delete(`/user/request/${id}`);
  console.log(response);
  
  return response.data;
};
