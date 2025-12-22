import adminInstance from "@/lib/axiosAdmin";

const AdminAuthServices = {
  login: async (credentials) => {
      const response = await adminInstance.post("/admin/login", credentials);
      return response;
  },

  logout: async () => {
      const response = await adminInstance.post("/admin/logout");
      return response;
  },

  
};

export default AdminAuthServices;
