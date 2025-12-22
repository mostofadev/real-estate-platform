"use client";
import { useEffect, useState } from "react";
import PrimaryButton from "../ui/button/Primary";

export default function ProfileLoginButton() {
  const [hasToken, setHasToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    setHasToken(!!token);
  }, []);

  if (hasToken === null) return null;

  return (
    <div className="relative group">
      {hasToken ? (
        <PrimaryButton
          Type="link"
          to="/user/profile"
         // className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.03] overflow-hidden"
        >
          <span className="relative z-10">Profile</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </PrimaryButton>
      ) : (
        <PrimaryButton
          Type="link"
          to="/login"
        //  className="relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.03] overflow-hidden"
        >
          <span className="relative z-10">Login</span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </PrimaryButton>
      )}
    </div>
  );
}
