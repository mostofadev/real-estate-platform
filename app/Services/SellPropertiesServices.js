import userAxios from "@/lib/userAxios";



const SellPropertiesServices = {
  getAll: async (page = 1) => {
    const response = await userAxios.get(`/user/property?page=${page}`);
    return response.data.data;
  },

  getById: async (id) => {
    const response =await userAxios.post(`/user/property/${id}`);
    return response;
  },

   create: async (data) => {
    const response =await userAxios.post('/user/property',data);
    return response;
  },

  update: async (data,id) => {
    const response =await userAxios.post(`/user/property/${id}`,data);
    return response;
  },

  delete: async (id) => {
    const response =await userAxios.post(`/user/property/${id}`);
    return response;
  }
};

export default SellPropertiesServices;