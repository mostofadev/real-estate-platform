"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../ui/button/Primary";

export default function ProfileLoginButton() {
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  const checkToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("user_token");
      setHasToken(!!token);
    }
  };

  useEffect(() => {
    checkToken();

    // Poll every 500ms to check token
    const interval = setInterval(checkToken, 500);

    window.addEventListener("storage", checkToken);
    window.addEventListener("loginStateChanged", checkToken);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("loginStateChanged", checkToken);
    };
  }, []);

  return (
    <div className="relative group">
      {hasToken ? (
        <PrimaryButton Type="link" to="/user/profile">
          <span className="relative z-10">Profile</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </PrimaryButton>
      ) : (
        <PrimaryButton Type="link" to="/login">
          <span className="relative z-10">Login</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </PrimaryButton>
      )}
    </div>
  );
}