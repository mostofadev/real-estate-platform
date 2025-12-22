"use client";
import toast from "react-hot-toast";
import UserAuthServices from "../Services/UserAuthServices";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { showCustomToast } from "@/lib/showCustomToast";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (credentials) => {
    try {
      const userData = await UserAuthServices.login(credentials);
      setUser(userData.token);
      localStorage.setItem("user_token", JSON.stringify(userData.data.token));
      localStorage.setItem("user_data", JSON.stringify(userData.data.user));
      return userData;
    } catch (error) {
      if (error.status === 401) {
        showCustomToast({
          title: "Error",
          message: error.response?.data?.message || "Invalid email or password",
          type: "error",
        });
        return;
      }
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      showCustomToast({
        title: "Error",
        message: message,
        type: "error",
      });
    }
  };

  const logout = async () => {
    try {
      const response = await UserAuthServices.logout();
      setUser(null);
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
      router.push("/login");
      showCustomToast({
        title: "Success",
        message: "Logged out successfully!",
        type: "success",
      });
      return response;
    } catch (error) {
      showCustomToast({
        title: "Error",
        message: error.response?.data?.message || "Logout failed. Try again.",
        type: "error",
      });
    }
  };

  const registerUser = async (userData) => {
    console.log("context is work", userData);
    try {
      const newUser = await UserAuthServices.register(userData);
      console.log("resgister faild", newUser);
      if (newUser.status === 200) {
        setUser(newUser);
        localStorage.setItem("user_token", JSON.stringify(newUser.data.token));
        localStorage.setItem("user_data", JSON.stringify(newUser.data.user));
        showCustomToast({
          title: "Success",
          message: "Register  successfully!",
          type: "success",
        });
        return newUser;
      }
    } catch (error) {
      console.log("validation error", error);
      if (error?.response?.status === 422) {
        const errors = error?.response?.data?.errors;
        const validationMessage = Object.values(errors).flat().join(" ");
        showCustomToast({
          title: "Validation Error",
          message: validationMessage,
          type: "error",
        });

        return;
      }
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      showCustomToast({
        title: "Error",
        message: message,
        type: "error",
      });
    }
  };

  const forgotPassword = async (email) => {
    console.log("context is work", email);

    try {
      const response = await UserAuthServices.forgotPassword(email);
      console.log("newUser", response);
      showCustomToast({
        title: "Success",
        message: "Password reset link sent to your email.",
        type: "success",
      });

      return response;
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 422) {
        const errors = error?.response?.data?.errors;
        const validationMessage = Object.values(errors).flat().join(" ");
        showCustomToast({
          title: "Validation Error",
          message: validationMessage,
          type: "error",
        });

        return;
      }
      const message =
        error.response?.data?.message || "Failed to send reset link.";
      showCustomToast({
        title: "Error",
        message: message,
        type: "error",
      });
    }
  };

  const verifyOtp = async (data) => {
    try {
      const response = await UserAuthServices.verifyOtp(data);
      return response;
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 422) {
        const errors = error?.response?.data?.errors;
        const validationMessage = Object.values(errors).flat().join(" ");
        showCustomToast({
          title: "Validation Error",
          message: validationMessage,
          type: "error",
        });

        return;
      }
      const message = error.response?.data?.message || "Failed to verify OTP.";
      showCustomToast({
        title: "Error",
        message: message,
        type: "error",
      });
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registerUser,
        forgotPassword,
        verifyOtp,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
export const useUserAuthContext = () => useContext(UserAuthContext);
