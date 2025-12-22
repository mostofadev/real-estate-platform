import api from "@/lib/userAxios";

const UserAuthServices = {
  login: async (credentials) => {
      const response = await api.post("/login", credentials);
      return response;
  },

  logout: async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      return error;
    }
  },

  register: async (userData) => {
   // try {
      const response = await api.post("/register", userData);
      console.log(response);
      
      return response;
   // } catch (error) {
     // throw error;
  //  }
  },
  forgotPassword: async (email) => {
  try {
    const response = await api.post("/forgot-password", { email });
    return response;
  } catch (error) {
    throw error;
  }
},

  verifyOtp: async (data) => {
    try {
      const response = await api.post("/verify-otp", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};

export default UserAuthServices;
