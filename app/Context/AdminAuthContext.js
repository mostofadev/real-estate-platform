"use client";
import { createContext, useContext, useState } from "react";
import AdminAuthServices from "../Services/AdminAuthServices";
import toast from "react-hot-toast";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const adminData = await AdminAuthServices.login(credentials);
      console.log();
      setAdmin(adminData.data.token);
      localStorage.setItem("admin_token", JSON.stringify(adminData.data.token));
      return adminData;
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        toast.error("Invalid email or password");
        return;
      }
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    }
  };


  const logout = async () => {
    try {
      const response = await AdminAuthServices.logout();
      setAdmin(null);
      localStorage.removeItem("admin_token");
      router.push("/admin/login");
      toast.success("Logged out successfully!");
      return response;
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuthContext = () => useContext(AdminAuthContext);

